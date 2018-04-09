	<template >
<!--   <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card class='box-card'>
        <p slot="title">{{querybox.alias}}</p>
        <p class="box-desc" :title='querybox.desc'> {{querybox.desc}}</p>
        <p><button @click='edit("/createQuery")'>编辑</button>
        <button @click='preview()'>预览</button> </p>     
    </Card> -->
  <Col :xs="4" :sm="4" :md="4" :lg="4">
    <Card class='box-card' :id="'card'+querybox.name">
      <div class='card-content'  @mouseenter="enter()"> 
        <div style='height:30px'><img src="./../../assets/img/search.png"></div>
        <div style='height:30px'>{{querybox.alias}}</div> 
      </div>
      <div :id='querybox.name' class='card-shade' @mouseleave="leave()">
<!--         <Icon style='font-size:40px' type="edit" @click='edit()'></Icon>
        <Icon style='font-size:40px' type="search"></Icon> -->
        <img src="./../../assets/img/edit.png" @click='edit()'>
        <img src="./../../assets/img/info.png" @click='preview()'>
      </div>
    </Card>
    <Modal
      v-model="modalpreview"
      width ="1200px"
      title="Common Modal dialog box title">
      <Row>
        <component class='paramcomponent' v-for='(cmp,index) in paramComponent' :is="cmp.component" :key='index' :cmpContent='cmp' @sentParam = 'currentTableData'></component>
      </Row>
      <iviewtable :chartCmpContent='currentTableData' :ifPage='true'></iviewtable>       
    </Modal>
  </Col>
</template>

<script>
import datepicker from "./../paramcomponents/DatePicker"
import list from "./../paramcomponents/List"
import iviewtable from './../chartcomponents/Table'
export default {
  name: 'query',
  components:{
    datepicker,
    list,
    iviewtable
  },
  data(){
    return {
      modalpreview:false,
      currentTableData:null,
      paramComponent:[],
      paramSelected:null    
    }
  },
  props:['querybox'],
  methods:{
    enter(){
      let Vue = this;
      $('#'+Vue.querybox.name).css("display",'block');
      $('#card'+Vue.querybox.name).css('-webkit-transform','scale(1.1)');
    },
    leave(){
      let Vue = this;
      $(".card-shade").css("display",'none');
      $('#card'+Vue.querybox.name).css('-webkit-transform','scale(1)');  
    },
    preview (){ 
      let Vue = this;
      Vue.modalpreview = true;
      Vue.paramComponent = [];
      Vue.AxiosPost("previewBizView",{'bizViewId':Vue.querybox.id,'pageSize':6},
        function(response){
          Vue.currentTableData = response.data.content;
/*          if(response.data.defaultParameters.length != 0){
            for(var i in response.data.defaultParameters){
              if(response.data.defaultParameters[i].paramType == 'list'){
                var cmpObj = {};
                cmpObj.component = list;
                cmpObj.content = response.data.defaultParameters[i];
                Vue.paramComponent.push(cmpObj);
              };
              if(response.data.defaultParameters[i].paramType == 'date'){
                var cmpObj = {};
                cmpObj.component = datepicker;
                cmpObj.content = response.data.defaultParameters[i];
                Vue.paramComponent.push(cmpObj);
              }
            }            
          }else{
            Vue.currentTableData = response.data;
          } */         
        }
      );
    },
    edit (routerpath){
      let Vue = this; 
      Vue.AxiosPost("getFieldTable",{'bizviewId':Vue.querybox.id},
      function(response){         
        Vue.$router.push({
          path:routerpath,
          name:"createQuery",
          params:{querybox:Vue.querybox,fieldTableData:response.data.content}
        });
      }); 

    },
/*    refreshQueryData(param){
      let Vue = this;
      Vue.paramSelected = $.extend(Vue.paramSelected,param);
      let paramLength = Object.keys(Vue.paramSelected).length;
      let JSONParam = JSON.stringify(Vue.paramSelected);
      if(paramLength == Vue.paramComponent.length){
        Vue.AxiosPost("updateBizView",{"bizViewId":Vue.querybox.id,"JSONParam":JSONParam},
          function(response){
            Vue.currentTableData = response.data;
        });         
      }
     
    }*/
   }
}
</script>
<style scoped>
.paramcomponent{
 display: inline-block;
 margin: 0px 3px;
}
.card-shade{
  background-color: #5b4227;
}
.box-card{
  background-color: #ca8c4a;
}
</style>
