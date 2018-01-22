<template>
  <div class="col col-lg-3 col-md-3 col-sm-6 col-xs-12">
    <div class="dashboard-stat blue-madison">
      <div class="visual">
        <i class="fa fa-comments"></i>
      </div>
      <div class="details">
        <div class="name">
           {{name}}
        </div>
        <div class="desc">
           {{desc}}
        </div>
      </div>
      <div class="more">
      <span @click='edit()'>编辑</span>
      <span @click='preview()'>预览</span> 
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../assets/js/TransferBus.js"
export default {
  name: 'query',
  props:['id','name','desc'],
  methods:{
    preview:function(){ 
      let param = {showEdit:false,showPreview:true,bizViewId:this.id,bizViewName:this.name};
      this.$store.dispatch('changeState',param);
    },
    edit:function(){
      let param = {showEdit:true,showPreview:false,bizViewId:this.id,bizViewName:this.name};
      this.$store.dispatch('changeState',param);
    }
  }
}
</script>
<style scoped>
.col{
  width: 20%;
  height: 120px;
  margin:15px;
  text-align: right;
  padding-top: 25px;
  color:white;
  position: relative;
  background-color:#45b6af;
}
.col:hover{
  cursor: pointer;
}
.more{
  width: 100%;
  height: 30px;
  position: absolute;
  left: 0;
  bottom: 0;
  text-align: left;
  padding-left: 6px;
  line-height: 30px;
  color: #d4abab;
  background-color:#c5e3e1;
}
.more span {
  float: left;
  margin-right:10px;
}
.name{
  font-size: 16px;
  color:#e3f4f3;
}
.desc{
  font-size: 12px;
  color:#def1ea;
}
</style>
