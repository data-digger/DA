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
    <Card style="margin-bottom:10px;height: 150px;">
        <p slot="title">新建</p> 
        <p @click="createDataSource(routerpath)" style='text-align:center'><Icon  class='newbuild'type="plus"></Icon></p>  
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
.newbuild{
    font-size: 45px;
    display: inline-block;
    text-align: center;
}
</style>
