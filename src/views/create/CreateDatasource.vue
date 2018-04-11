<template>
  <Row class='createDatasource'>
    <Form id="createDatasource" ref="datasource" :model="datasource" :rules="ruleValidate" :label-width="130">
      <Col span='12'>
        <FormItem label="名称" prop="name">
            <Input class='cd_input' v-model="datasource.name" :disabled ='nameEdit' placeholder="输入名称"></Input>
        </FormItem>
        <FormItem label="驱动程序类型" prop="driverType">
            <Select v-model="datasource.driverType" placeholder="Select ...">
               <Option value="MySQL">MySQL</Option>
               <Option value="DB2">DB2</Option>
            </Select>
        </FormItem>
        <FormItem label="数据库字符集" prop="dbCharset">
            <Select v-model="datasource.dbCharset" placeholder="Select ...">
               <Option value="UTF-8">UTF-8</Option>
               <Option value="GBK">GBK</Option>
            </Select>
        </FormItem>
         <FormItem label="校验语句" prop="validationQuery">
            <Input v-model="datasource.validationQuery" placeholder="输入校验语句"></Input>
        </FormItem>
         <FormItem label="用户名" prop="user">
            <Input v-model="datasource.user" placeholder="输入用户名"></Input>
        </FormItem>        
      </Col>

      <Col span='12'>
        <FormItem label="别名" prop="alias">
            <Input v-model="datasource.alias" placeholder="输入别名"></Input>
        </FormItem>  
        <FormItem label="驱动程序类" prop="driver">
            <Input v-model="datasource.driver" placeholder="输入驱动程序类"></Input>
        </FormItem>    
        <FormItem label="最大连接数" prop="maxConnection">
            <Input v-model="datasource.maxConnection" placeholder="输入最大连接数"></Input>
        </FormItem>
        <FormItem label="事物隔离级别" prop="transactionIsolation">
            <Input v-model="datasource.transactionIsolation" placeholder="输入事物隔离级别"></Input>
        </FormItem>  
         <FormItem label="密码" prop="password">
            <Input v-model="datasource.password" placeholder="输入密码"></Input>
        </FormItem>                          
      </Col>

      <Col span='24'>
        <FormItem label="连接字符串" prop="url">
            <Input v-model="datasource.url" placeholder="输入连接字符串"></Input>
        </FormItem>
        <FormItem label="描述" prop="desc">
            <Input v-model="datasource.desc" type="textarea" :autosize="{minRows: 6,maxRows: 10}" placeholder="Enter something..."></Input>
        </FormItem>   
        <FormItem class='cd_button_box'>
            <Button type="primary" class='cd_button_submit' @click="createDatasource('datasource')">提交</Button>
            <Button type="primary" class='cd_button_reset' @click="handleReset('datasource')">重置</Button>
        </FormItem>     
      </Col>
    </Form>
  </Row>
</template>
<script>
  export default {
    name:'createDatasource',
    computed:{
      nameEdit(){
        let Vue = this;  
        if(Vue.isCreate){
            return false;
        }else{
          return true;
        }
      }
    },        
    data () {
      return {
        datasource:null,
        isCreate:true,
        ruleValidate:{
          name: [
              { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          alias: [
              { required: true, message: '别名不能为空', trigger: 'blur' }
          ],
          driverType: [
              { required: true, message: '驱动程序类型不能为空', trigger: 'change' }
          ],
          driver: [
              { required: true, message: '驱动程序类不能为空', trigger: 'blur' }
          ],
          url: [
              { required: true, message: '链接字符串不能为空', trigger: 'blur' }
          ],
          dbCharset: [
              { required: true, message: '数据库字符集不能为空', trigger: 'change'}
          ],
          maxConnection: [
              { required: true, type:"number", message: '最大连接数不能为空', trigger: 'blur'}
          ],
          validationQuery: [
              { required: true, message: '校验语句不能为空', trigger: 'blur' }
          ],
          user: [
              { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          password: [
              { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          transactionIsolation: [
              { required: true, message: '事务隔离级别不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      createDatasource(datasource){
         let Vue = this;
         Vue.$refs[datasource].validate((valid) => {
              if (valid) {
                  Vue.AxiosPost("createDatasource",Vue.datasource,
                    function(){
                       Vue.$Message.success('新建成功!');
                       Vue.closePage(event,'createDatasource');
                  })
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
      handleReset (datasource) {
          let Vue = this;
          Vue.$refs[datasource].resetFields();
      },
      initDatasourceData(to,from){
        let Vue = this;             
        Vue.isCreate =  $.isEmptyObject(to.params);
        if(Vue.isCreate == false){     
          Vue.datasource = to.params;
        }
        if(Vue.isCreate == true){
          Vue.datasource = {     
            name:'',
            alias:'',
            driverType:'MySQL',
            driver:'com.mysql.jdbc.Driver',
            url:'jdbc:mysql://localhost:3306/请输入数据库名?useUnicode=true&characterEncoding=UTF-8&useSSL=false',
            dbCharset:'UTF-8',
            maxConnection:100,
            validationQuery:'SELECT 1 FROM DUAL',
            user:'root',
            password:'admin',
            transactionIsolation:'-1',
            desc:'...'
          } 
        }
      }
    },
    beforeMount(){
      let Vue = this;
      Vue.initDatasourceData(Vue.$route/*,{fullPath:'/*'}*/);//第一次从上一个页面（resource.vue）进来，默认执行一次
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.createDatasource{
  padding: 40px 77px 0px 14px;
}
.ivu-input{
  background-color: #404c60 !important;
  color: #ffffff !important;
  border:0;
}
.ivu-input:focus{
  box-shadow: 0 0 0 1px #738096;
}
.cd_button_box{
  text-align: center;
}
.cd_button_box button{
  width: 150px;
}
.cd_button_box button:hover{
  border:0;
}
.cd_button_submit{
  background-color: #008aff;
  margin-right: 15px;
}
.cd_button_reset{
  background-color: #7e8da6;
  color: #2f3949;
}
</style>
