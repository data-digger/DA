<template>
  <Form id="createReport"  :model="report" :label-width="80" :rules="ruleValidate">
        <FormItem label="名称" prop="name">
            <Input v-model="report.name" placeholder="输入名称"></Input>
        </FormItem>
        <FormItem label="别名" prop="alias">
            <Input v-model="report.alias" placeholder="输入别名"></Input>
        </FormItem>
        <FormItem label="描述" prop="desc">
            <Input v-model="report.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter report descript..."></Input>
        </FormItem>
   </Form>
</template>

<script>
import {mapGetters} from 'vuex'
 export default {
    data(){
       return {
        report:{
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
       //更新报表中baseInfo
       initBaseInfo(){
         this.$store.commit("initReportBaseInfo",this.report)
       }
    },
    mounted(){
    }
}
</script>

<style scoped>
.vue-grid-layout {
   height: 400px !important;
}
</style>
