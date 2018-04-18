<template>
  <Col :xs="4" :sm="4" :md="4" :lg="4">
    <Card class='box-card' :id='id' >
      <div class='card-content' @mouseenter="enter()" @mouseleave="leave()">
        <p @click="create(routerpath)" style='text-align:center'><Icon style='color: #adb4c2;' class='newbuild'type="plus"></Icon></p> 
      </div>
    </Card>
  </Col>
</template>

<script>

export default {
  props:["routerpath",'id'],
  data(){
     return{    
     }
  },
  methods:{
    enter(){
      let Vue = this;
      $("#"+Vue.id).css('-webkit-transform','scale(1.1)');
    },
    leave(){
      let Vue = this;
      $("#"+Vue.id).css('-webkit-transform','scale(1)');
    },
    create:function(routerpath){
      this.$router.push({
        path:routerpath,
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.newbuild{
  font-size: 40px;
  display: inline-block;
  text-align: center;
  cursor: pointer;
}
.box-card{
  background-color: #ffffff;
}
</style>
