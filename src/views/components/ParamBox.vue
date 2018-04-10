<template >
<!--   <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card class='box-card'>
        <p slot="title">{{parambox.alias}}</p>
        <p class="box-desc">{{parambox.desc}}</p>
        <p><button @click='edit("/createParam")'>编辑</button></p> 
    </Card>
  </Col> -->
  <Col :xs="4" :sm="4" :md="4" :lg="4">
    <Card class='box-card' :id="'card'+parambox.name">
      <div class='card-content'  @mouseenter="enter()"> 
        <div style='height:30px'><img src="./../../assets/img/parameter.png"></div>
        <div style='height:30px'>{{parambox.alias}}</div>          
      </div>
      <div :id='parambox.name' class='card-shade' @mouseleave="leave()">
<!--         <div style='display:inline-block' @click='edit()'><Icon  class='icon' type="edit" ></Icon></div>
        <div style='display:inline-block' ><Icon class='icon'  type="search"></Icon></div> -->
        <img src="./../../assets/img/edit.png" @click='edit()'>
        <img src="./../../assets/img/info.png">
      </div>
    </Card>
  </Col>
</template>

<script>
export default {
  name: 'parambox',
  props:["parambox"],
  components:{
    
  },
  data(){
    return {

    }
  },
  methods:{
    enter(){
      let Vue = this;
      $(".card-shade").css("display",'none');
      $(".box-card").css('-webkit-transform','scale(1)');
      $('#'+Vue.parambox.name).css("display",'block');
      $('#card'+Vue.parambox.name).css('-webkit-transform','scale(1.1)');
    },
    leave(){
      let Vue = this;
      $(".card-shade").css("display",'none');
      $('#card'+Vue.parambox.name).css('-webkit-transform','scale(1)');  
    },
    edit(routerpath ){
      let Vue = this; 
      Vue.$router.push({
        path:routerpath,
        name:"createParam",
        params:Vue.parambox
      });      
    }
   }
}
</script>
<style scoped>
.icon{
  font-size:40px;
  cursor: pointer;
}
.card-shade{
  background-color: #294c41;
}
.box-card{
  background-color: #25aa80;
}
</style>
