<template>
<!--   <div class="col col-lg-3 col-md-3 col-sm-6 col-xs-12"  >
    <div class="dashboard-stat blue-madison">
      <div class="visual">
        <i class="fa fa-comments"></i>
      </div>
      <div class="details">
        <div class="name" @click='createDataSource(routerpath)'>
           新建
        </div>
      </div>
    </div>
  </div> -->
  <Col :xs="8" :sm="8" :md="8" :lg="6">
  <Card >
    <p @click='createDataSource(routerpath)'>新建</p>
  </Card>
</Col>
</template>

<script>

export default {
  name: 'createdatasourcebox',
  props:["routerpath"],
  methods:{
    createDataSource:function(routerpath){
      this.$router.push({
        path:routerpath
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
  background-color:#bbdba1;
  float: left;
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
  background-color:#eef7ea;
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
