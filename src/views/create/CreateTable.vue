<template>
  <Form id="createTable" ref="table" :model="table" :rules="ruleValidate" :label-width="80">
        <FormItem label="名称" prop="name">
            <Input v-model="table.name" placeholder="表名称"></Input>
        </FormItem>
        <FormItem label="别名" prop="alias">
            <Input v-model="table.alias" placeholder="表别名"></Input>
        </FormItem>
        <FormItem label="描述" prop="desc">
            <Input v-model="table.desc" placeholder="表描述"></Input>
        </FormItem>
        <FormItem label="查询器" prop="bizViewId">
            <Select class="form-control" v-model='table.bizViewId'>               
                <Option v-for = 'q in queryList' :key='q.id' :name='q.name' :value="q.id" >{{q.name}}</Option>
            </Select>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="createTable('table')">提交</Button>
            <Button type="ghost" @click="handleReset('table')" style="margin-left: 8px">重置</Button>
        </FormItem>     
    </Form>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name:"createQuery",
  data(){
    return {
      table: {
        id:'',
        bizViewId:'',
        name:'',
        alias:'',
        desc:'',
      },
      ruleValidate:{
        name: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        alias: [
            { required: true, message: 'alias cannot be empty', trigger: 'blur' }
        ],
        bizViewId: [
            { required: true, message: 'Please select the bizView', trigger: 'change' }
        ],
      }
    }
  },
  computed: {
    ...mapGetters({
      queryList:'queryList',
    }),
  },
  methods:{
    createTable(table){
      let Vue = this;
      Vue.$refs[table].validate((valid) => {
        if (valid) {
             Vue.AxiosPost("createTable",
              Vue.table,
               function(){
                 Vue.$Message.success('新建成功!');
                 Vue.closePage(event,'createTable');
               });
        } else {
            Vue.$Message.error('Fail!');
        }
      })      
    },
    closePage(event, name){
      let pageOpenedList = this.$store.state.app.pageOpenedList;
      let lastPageObj = pageOpenedList[1];
      this.$store.commit('removeTag', name);
      this.$store.commit('closePage', name);
      pageOpenedList = this.$store.state.app.pageOpenedList;
      localStorage.pageOpenedList = JSON.stringify(pageOpenedList);  
      this.linkTo(lastPageObj);            
    },
    linkTo (item) {
        let routerObj = {};
        routerObj.name = item.name;
        if (item.argu) {
            routerObj.params = item.argu;
        }
        if (item.query) {
            routerObj.query = item.query;
        }
        this.$router.push(routerObj);
    },
    handleReset(table){
      let Vue = this;
      Vue.$refs[table].resetFields();
    }
   },
  mounted:function(){

  }
}
</script>

<style scoped>
</style>
