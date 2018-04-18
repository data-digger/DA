<template >
  <Col :xs="12" :sm="8" :md="8" :lg="4">
    <Card class='box-card' :id="'param'+parambox.name">
      <div class='card-content'  @mouseenter="enter()"> 
        <div style='height:30px'><img src="./../../assets/img/parameter.png"></div>
        <div style='height:30px; text-overflow:ellipsis'>{{parambox.alias}}</div>          
      </div>
      <div :id='"param_shade"+parambox.name' class='card-shade' @mouseleave="leave()">
        <img src="./../../assets/img/edit.png" @click='edit()'>
        <Tooltip placement="right" transfer>
          <img src="./../../assets/img/info.png">
          <div slot="content">
              <p style='font-size:14px'>{{parambox.alias}}</p>
              <p style='white-space: normal;'>{{parambox.desc}}</p>
          </div>          
        </Tooltip>
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
      $('#param_shade'+Vue.parambox.name).css("display",'block');
      $('#param'+Vue.parambox.name).css('-webkit-transform','scale(1.1)');
    },
    leave(){
      let Vue = this;
      $(".card-shade").css("display",'none');
      $('#param'+Vue.parambox.name).css('-webkit-transform','scale(1)');  
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
  background-color: #0f9171;
  opacity: 0.9;
  padding:60px 40px;
}
.card-shade>img:nth-child(1){
  margin-right:24px;
}
.box-card{
  background-color: #22b687;
}
</style>
