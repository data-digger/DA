<template>
  <Col :xs="12" :sm="8" :md="8" :lg="4">
    <Card class='box-card' :id="'card'+datasource.name">
      <div class='card-content'  @mouseenter="enter()">
        <div style='height:30px'><img src="./../../assets/img/datasource.png"></div>
        <div style='height:30px;text-overflow:ellipsis;'>{{datasource.alias}}</div>  
      </div>
      <div :id='datasource.name' class='card-shade' @mouseleave="leave()">
        <img src="./../../assets/img/edit.png" @click='edit()'>
        <Tooltip placement="right" transfer>
          <img src="./../../assets/img/info.png">
          <div slot="content">
              <p>{{datasource.alias}}</p>
              <p style='white-space: normal;'>{{datasource.desc}}</p>
          </div>          
        </Tooltip>
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
.card-shade>img:nth-child(1){
  margin-right:24px;
  display: inline-block;
}
.card-shade{
  background-color: #0e548e;
  padding: 60px 40px;
}
.box-card{
  background-color: #0096ff;
}
</style>
