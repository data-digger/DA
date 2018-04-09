<template>
<!--   <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card class='box-card'>
        <p slot="title">{{reportbox.name}}</p>
        <p class="box-desc" :title='reportbox.desc'> {{reportbox.desc}}</p>
        <button @click='viewReport("/viewReport")'>查看</button></p> 
    </Card> -->
  <Col :xs="4" :sm="4" :md="4" :lg="4">
    <Card class='box-card' :id="'card'+reportbox.name">
      <div class='card-content'  @mouseenter="enter()">
        <div style='height:30px'><img src="./../../assets/img/report.png"></div>
        <div style='height:30px'>{{reportbox.alias}}</div>   
      </div>
      <div :id='reportbox.name' class='card-shade' @mouseleave="leave()">
<!--         <Icon style='font-size:40px' type="edit" @click='edit()'></Icon>
        <Icon style='font-size:40px' type="search"></Icon> -->
        <img src="./../../assets/img/edit.png">
        <img src="./../../assets/img/preview.png" @click='viewReport("/viewReport")'>
        <img src="./../../assets/img/info.png">
      </div>
    </Card>
  </Col>
</template>
<script>
export default {
  props:['reportbox'],
  methods:{
    enter(){
      let Vue = this;
      $('#'+Vue.reportbox.name).css("display",'block');
      $('#card'+Vue.reportbox.name).css('-webkit-transform','scale(1.1)');
    },
    leave(){
      let Vue = this;
      $(".card-shade").css("display",'none');
      $('#card'+Vue.reportbox.name).css('-webkit-transform','scale(1)');  
    },
    viewReport(routerpath){
      this.$router.push({
        path:routerpath,
        name:"viewReport",
        params:this.reportbox
      }); 
    },
  }
}
</script>


<style scoped>
.box-card{
  background-color: #e26f4c;
}
.card-shade{
  background-color: #683c2f;
}
</style>
