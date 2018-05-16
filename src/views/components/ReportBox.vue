<template>
  <Col :xs="12" :sm="8" :md="8" :lg="4">
    <Card class='box-card' :id="'report'+reportbox.name">
      <div class='card-content'  @mouseenter="enter()">
        <div><img src="./../../assets/img/report.png"></div>
        <p>{{reportbox.alias}}</p>   
      </div>
      <div :id='"report_shade"+reportbox.name' class='card-shade' @mouseleave="leave()">
        <img src="./../../assets/img/edit.png">
        <img src="./../../assets/img/preview.png" @click='viewReport("/viewReport")'>
        <Tooltip placement="right" transfer>
          <img src="./../../assets/img/info.png">
          <div slot="content">
              <p style='font-size:14px'>{{reportbox.alias}}</p>
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
      $('#report_shade'+Vue.reportbox.name).css("display",'block');
      $('#report'+Vue.reportbox.name).css('-webkit-transform','scale(1.1)');
    },
    leave(){
      let Vue = this;
      $(".card-shade").css("display",'none');
      $('#report'+Vue.reportbox.name).css('-webkit-transform','scale(1)');  
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
  background-color: #e87653;
}
.card-shade{
  background-color: #e0592f;
  opacity: 0.9;
  padding:60px 12px;
}
.card-shade>img:nth-child(2){
  margin:0 15.5px;
}
</style>
