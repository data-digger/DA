<template>
  <Form 
    id="createReport"  
    :model="reportInfo" 
    :label-width="80" 
    :rules="ruleValidate">
    <FormItem label="名称" prop="name">
        <Input 
          v-model="reportInfo.name" 
          placeholder="输入名称"
        ></Input>
    </FormItem>
    <FormItem label="别名" prop="alias">
        <Input 
          v-model="reportInfo.alias" 
          placeholder="输入别名"
        ></Input>
    </FormItem>
    <FormItem label="描述" prop="desc">
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
import {mapGetters} from 'vuex'
export default {
    data(){
        return {
            reportInfo:{
                name:'',
                alias:'',
                desc:''
            },
            ruleValidate:{
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                ],
                alias: [
                    { required: true, message: '别名不能为空', trigger: 'blur' }
                ]
            }         
        }
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
