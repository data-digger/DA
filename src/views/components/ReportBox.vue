<template>
  <Col :xs="12" :sm="8" :md="8" :lg="4">
    <Card class='box-card' :id="'card'+reportbox.name">
      <div class='card-content'  @mouseenter="enter()">
        <div style='height:30px'><img src="./../../assets/img/report.png"></div>
        <div style='height:30px; text-overflow:ellipsis'>{{reportbox.alias}}</div>   
      </div>
      <div :id='reportbox.name' class='card-shade' @mouseleave="leave()">
        <img src="./../../assets/img/edit.png">
        <img src="./../../assets/img/preview.png" @click='viewReport("/viewReport")'>
        <Tooltip placement="right" transfer>
          <img src="./../../assets/img/info.png">
          <div slot="content">
              <p>{{reportbox.alias}}</p>
              <p style='white-space: normal;'>{{reportbox.desc}}</p>
          </div>          
        </Tooltip>
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
      $(".card-shade").css("display",'none');
      $(".box-card").css('-webkit-transform','scale(1)');
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
  padding:60px 20px;
}
.card-shade>img:nth-child(2){
  margin:0 15.5px;
}
</style>
