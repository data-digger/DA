<template >
  <Col :xs="12" :sm="8" :md="8" :lg="4">
    <Card class='box-card' :id="'query'+querybox.name">
      <div class='card-content'  @mouseenter="enter()"> 
        <div><img src="./../../assets/img/search.png"></div>
        <p>{{querybox.alias}}</p> 
      </div>
      <div :id='"query_shade"+querybox.name' class='card-shade' @mouseleave="leave()">
        <img src="./../../assets/img/edit.png" @click='edit()'>
        <img src="./../../assets/img/preview.png" @click='preview()'>
        <Tooltip placement="right" transfer>
          <img src="./../../assets/img/info.png">
          <div slot="content">
              <p style='font-size:14px'>{{querybox.alias}}</p>
              <p style='white-space: normal;'>{{querybox.desc}}</p>
          </div>          
        </Tooltip>
      </div>
    </Card>
    <Modal
      v-model="modalpreview"
      width ="1200px"
      :title="'预览'+querybox.name+'查询器数据'">
      <Row>
        <component class='paramcomponent' v-for='(cmp,index) in paramComponent' :is="cmp.component" :key='index' :cmpContent='cmp' @sentParam = 'currentTableData'></component>
      </Row>
      <Tabs type="card" :animated="false" >
        <TabPane label="计算字段"><iviewtable :tableContent='currentTableData' :ifPage='true'></iviewtable></TabPane>
        <TabPane label="聚合"><iviewtable></iviewtable></TabPane>
      </Tabs>  
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
      $(".card-shade").css("display",'none');
      $(".box-card").css('-webkit-transform','scale(1)');
      $('#query_shade'+Vue.querybox.name).css("display",'block');
      $('#query'+Vue.querybox.name).css('-webkit-transform','scale(1.1)');
    },
    leave(){
      let Vue = this;
      $(".card-shade").css("display",'none');
      $('#query'+Vue.querybox.name).css('-webkit-transform','scale(1)');  
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
  background-color: #d0912e;
  opacity: 0.9;
  padding:60px 12px;
}
.card-shade>img:nth-child(2){
  margin:0 15.5px;
}
.box-card{
  background-color: #e2ab4c;
}
</style>
