<template>
  <div id='datasource'>
      <div class="row datasource">
        <div class="col-md-12">
          <!-- BEGIN PORTLET-->
          <div class="portlet box crusta">
            <div class="portlet-title">
              <div class="caption">
                <i class="fa fa-gift"></i>新建数据源
              </div>
            </div>
            <div class="portlet-body form">
              <form action="#" id="form-username" class="form-horizontal form-bordered">
                <div class="form-group col-md-6">
                  <label class="col-sm-3 control-label">名称:</label>
                  <div class="col-sm-9">
                    <div class="input-group">
                      <span class="input-group-addon">
                      <i class="fa fa-user"></i>
                      </span>
                      <input type="text" id="name" v-model="datasource.name" class="form-control"/>
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label class="col-sm-3 control-label">别名:</label>
                  <div class="col-sm-9">
                    <div class="input-group">
                      <span class="input-group-addon">
                      <i class="fa fa-search"></i>
                      </span>
                      <input type="text" id="alias" v-model="datasource.alias" class="form-control"/>
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-6">
                    <label class="control-label col-sm-3">驱动程序类型:</label>
                    <div class="col-md-9">
                      <select class="form-control" data-placeholder="Select..." v-model="datasource.driverType">
                    
                        <option value="MySQL">MySQL</option>
                        <option value="DB2">DB2</option>
                      </select>
                    </div>
               </div>
                <div class="form-group col-md-6">
                  <label class="col-sm-3 control-label">驱动程序类:</label>
                  <div class="col-sm-9">
                    <div class="input-group">
                      <span class="input-group-addon">
                      <i class="fa fa-cogs"></i>
                      </span>
                      <input type="text" id="driver" v-model="datasource.driver"  class="form-control"/>
                    </div>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label class="col-sm-3 control-label">连接字符串:</label>
                  <div class="col-sm-9">
                    <div class="input-group">
                      <span class="input-group-addon">
                      <i class="fa fa-check"></i>
                      </span>
                      <input type="text" id="url" v-model="datasource.url"  class="form-control"/>
                    </div>
                  </div>
                </div>
                 <div class="form-group col-md-6">
                    <label class="control-label col-sm-3">数据库字符集:</label>
                    <div class="col-md-9">
                      <select class="form-control" data-placeholder="Select..." v-model="datasource.dbCharset">
                        <option value="UTF-8">UTF-8</option>
                        <option value="GBK">GBK</option>
                        
                      </select>
                    </div>
               </div>
                <div class="form-group col-md-6">
                  <label class="col-sm-3 control-label">最大连接数:</label>
                  <div class="col-sm-9">
                    <div class="input-group">
                      <span class="input-group-addon">
                      <i class="fa fa-check"></i>
                      </span>
                      <input type="text" id="maxConnection" v-model="datasource.maxConnection"  class="form-control"/>
                    </div>
                  </div> 
                </div>
                <div class="form-group col-md-6">
                  <label class="col-sm-3 control-label">校验语句:</label>
                  <div class="col-sm-9">
                    <div class="input-group">
                      <span class="input-group-addon">
                      <i class="fa fa-check"></i>
                      </span>
                      <input type="text" id="validationQuery" v-model="datasource.validationQuery"  class="form-control"/>
                    </div>             
                  </div>
                </div>
                   <div class="form-group col-md-6">
                  <label class="col-sm-3 control-label">用户名:</label>
                  <div class="col-sm-9">
                    <div class="input-group">
                      <span class="input-group-addon">
                      <i class="fa fa-check"></i>
                      </span>
                      <input type="text" id="user" v-model="datasource.user"  class="form-control"/>
                    </div>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <label class="col-sm-3 control-label">密码:</label>
                  <div class="col-sm-9">
                    <div class="input-group">
                      <span class="input-group-addon">
                      <i class="fa fa-check"></i>
                      </span>
                      <input type="text" id="password" v-model="datasource.password" class="form-control"/>
                    </div>
                  </div>
                </div>
                 <div class="form-group col-md-6">
                    <label class="control-label col-sm-3">事物隔离级别:</label>
                    <div class="col-md-9">
                      <select class="form-control" data-placeholder="Select..." v-model="datasource.transactionIsolation">
                        
                        <option value=-1>-1</option>
                        
                      </select>
                    </div>
               </div>
               <div class="form-group col-md-6">
                    <label class="col-md-3 control-label">描述:</label>
                    <div class="col-md-9">
                      <textarea class="form-control" rows="3" v-model="datasource.desc"></textarea>
                    </div>
              </div>
                <div class="form-actions">
                  <div class="row">
                    <div class="col-md-offset-2 col-md-8">
                      <button type="button" class="btn btn-blue" @click="createDatasource(datasource)">提交</button>
                      <button type="button" class="btn" @click="comeback()">返回</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <!-- END PORTLET-->
        </div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Datasource',
  data (){
   return{
    datasource:{     
      name:'',
      alias:'',
      driverType:'MySQL',
      driver:'com.mysql.jdbc.Driver',
      url:'jdbc:mysql://localhost:3306/datadigger?useUnicode=true&characterEncoding=GBK&useSSL=false',
      dbCharset:'UTF-8',
      maxConnection:100,
      validationQuery:'SELECT 1 FROM DUAL',
      user:'root',
      password:'admin',
      transactionIsolation:-1,
      desc:'This is DataSource for create Business View Query'},
    }
  },
  methods:{
    createDatasource:function(){
      let Vue = this;
      Vue.AxiosPost("createDatasource",Vue.datasource,
      function(){
        alert("新建数据源成功!")
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#datasource{
  width: 87%;
  height: 100%;
  float: left;
  overflow-x: hidden;
  overflow-y: auto;
}
.datasource{
  margin:9px;
}
#notific8_show{
  color: white;
  background-color: #1bbc9b;
}
.portlet.box > .portlet-title {
    border-bottom: 0;
    padding: 0 10px;
    margin-bottom: 0;
    color: #fff;
    background-color:#578ebe;
    min-height: 41px;
    text-align: left;
    line-height: 41px;
}
.portlet > .portlet-body.crusta, .portlet.crusta {
    background-color: #fff;
    border: 1px solid #578ebe;
    border-top: 0;
}
.portlet.box {
    padding: 0px !important;
}
.portlet.box > .portlet-body {
    background-color: #fff;
    padding: 30px 10px;
}
.btn-blue{
  background-color:#578ebe; 
}
</style>
