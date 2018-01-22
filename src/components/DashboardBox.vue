<template>
  <div class="col col-lg-3 col-md-3 col-sm-6 col-xs-12" @click='link(subpath)' >
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
      VIEW MORE <i class="m-icon-swapright m-icon-white"></i>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'dashboardbox',
  props:['id','name','desc','subpath'],
  methods:{
    link:function(subpath){
      this.$router.push({
        path:subpath
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col{
  width: 20%;
  height: 120px;
  margin:15px;
  text-align: right;
  padding-top: 25px;
  color:white;
  position: relative;
  background-color:#dca7b0;
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
  background-color:#f9f0f0;
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
