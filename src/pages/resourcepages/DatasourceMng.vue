<template>
  <div id='datasourcemng'>
    <div class="row datasourcemng">
      <div class="col-md-12">
        <div class="portlet box">
            <div class="portlet-title">
                <i class="fa fa-gift"></i>数据源管理
            </div>
            <div class="row datasourcemng-filterbox">
                <label class="control-label col-md-1">选择</label>
                <select class="col-md-6 bs-select form-control datasourcemng-filter">
                  <option>11</option>
                  <option>11</option>
                  <option>11</option>
                  <option>11</option>
                </select>
            </div>         
            <multiselect></multiselect>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from'toastr/build/toastr.min.js'
import multiselect from'./../../components/MultiSelect.vue'
export default {
  name: 'DatasourceMng',
  components:{
    multiselect
  },
  data () {
    return {
     
    }
  },
  methods:{
   
  },
  mounted:function(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#datasourcemng{
  width: 87%;
  height: 100%;
  float: left;
  overflow-y: auto;
  overflow-x: hidden;
}
.datasourcemng.row{
  padding:20px;
}
.portlet.box > .portlet-title {
  border-bottom: 0;
  padding: 0 10px;
  margin-bottom: 0;
  color: #fff;
  background-color:#bbdba1;
  min-height: 41px;
  text-align: left;
  line-height: 41px;
}
#datasourcemng .portlet-body.form {
  border: 1px solid #d6e6f3;
  border-top: 0;
}
.portlet.box {
  padding: 0px !important;
  border:1px solid #bbdba1;
}
.portlet.box > .portlet-body {
  background-color: #fff;
  padding: 30px 10px;
}
.datasourcemng-filterbox{
  margin: 20px 10px;
}
.datasourcemng-filter{
  width: 70%;
}
</style>
