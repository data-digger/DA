<template>
  <Form 
    id="createReport"  
    :label-width="80">
    <FormItem label="名称">
        <Input 
          v-model="reportInfo.name" 
          placeholder="输入名称"
          :disabled='isCreat=="true"?false:true'
        ></Input>
    </FormItem>
    <FormItem label="别名">
        <Input 
          v-model="reportInfo.alias" 
          placeholder="输入别名"
        ></Input>
    </FormItem>
    <FormItem label="描述">
        <Input 
          v-model="reportInfo.desc" 
          type="textarea" 
          :autosize="{minRows: 2,maxRows: 5}" 
          placeholder="Enter report descript..."
        ></Input>
    </FormItem>
   </Form>
</template>

<script>

export default {
    data(){
        return {
               
        }
    },
    props:["reportInfo",'isCreat'],
    mounted(){
        console.log(this.reportInfo);
    },
    methods:{
        /**
        * 向store中保存报表中基本信息
        */
        saveReportBaseInfo(){
            this.$store.commit("saveReportBaseInfo",this.reportInfo);
        }
    }
}
</script>

<style scoped>
#createReport{
  margin: 20px 40px auto 10px;
}
</style>
