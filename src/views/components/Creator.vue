<template>
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card style="margin-bottom:10px;height: 150px;">
        <p slot="title">新建</p> 
        <p @click="create(routerpath)" style='text-align:center'><Icon  class='newbuild'type="plus"></Icon></p>  
    </Card>
  </Col>
</template>

<script>

export default {
  props:["routerpath"],
  data(){
     return{    
     }
  },
  methods:{
    create:function(routerpath){
      this.$router.push({
        path:routerpath,
        param:null,
        query:{
          random:Math.random()
        }
      });
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
    cursor: pointer;
}
</style>
