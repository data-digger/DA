<template>
  <Col :xs="12" :sm="8" :md="8" :lg="4" id='datasourceBox'>
    <Card class='box-card' :id="'datasource'+datasource.name">
      <div class='card-content'  @mouseenter="enter()">
        <div><img src="./../../assets/img/datasource.png"></div>
        <div>{{datasource.alias}}</div>  
      </div>
      <div :id='"datasource_shade"+datasource.name' class='card-shade' @mouseleave="leave()">
        <img src="./../../assets/img/edit.png" @click='edit()'>
        <Tooltip placement="right" transfer>
          <img src="./../../assets/img/info.png">
          <div slot="content">
              <p style='font-size:14px'>{{datasource.alias}}</p>
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
      $('#datasource_shade'+Vue.datasource.name).css("display",'block');
      $('#datasource'+Vue.datasource.name).css('-webkit-transform','scale(1.1)');
    },
    leave(event){
      let Vue = this;
      $(".card-shade").css("display",'none');
      $('#datasource'+Vue.datasource.name).css('-webkit-transform','scale(1)');  
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
  background-color: #008cdd;
  opacity: 0.9;
  padding: 60px 33px;
}
.box-card{
  background-color: #00a2ff;
}
</style>
