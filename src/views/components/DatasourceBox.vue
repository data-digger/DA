<template>
  <Col :xs="4" :sm="4" :md="4" :lg="4">
    <Card class='box-card' :id="'card'+datasource.name">
      <div class='card-content'  @mouseenter="enter()">
        <div style='height:30px'><img src="./../../assets/img/datasource.png"></div>
        <div style='height:30px'>{{datasource.alias}}</div>  
      </div>
      <div :id='datasource.name' class='card-shade' @mouseleave="leave()">
       <!--  <div style='display:inline-block' @click='edit()'><Icon class='icon' type="edit"></Icon></div>
        <div style='display:inline-block' ><Icon  class='icon' type="search"></Icon></div> -->
        <img src="./../../assets/img/edit.png" @click='edit()'>
        <img src="./../../assets/img/info.png">
      </div>
    </Card>
  </Col>
</template>

<script>
export default {
  name: 'datasourcebox',
  props:['datasource'],
  components:{
  },
  data(){
    return {
     
    }
  },
  methods:{
    enter(event){
      let Vue = this;
      $(".card-shade").css("display",'none');
      $(".box-card").css('-webkit-transform','scale(1)');
      $('#'+Vue.datasource.name).css("display",'block');
      $('#card'+Vue.datasource.name).css('-webkit-transform','scale(1.1)');
    },
    leave(event){
      let Vue = this;
      $(".card-shade").css("display",'none');
      $('#card'+Vue.datasource.name).css('-webkit-transform','scale(1)');  
    },
    edit(routerpath ){
      let Vue = this; 
      Vue.$router.push({
        path:routerpath,
        name:"createDatasource",
        params:Vue.datasource
      });      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button_imgbox img{

}
.card-shade{
  background-color: #0e548e;
}
.box-card{
  background-color: #0096ff;
}
</style>
