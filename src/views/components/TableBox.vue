<template>
  <Col :xs="12" :sm="8" :md="8" :lg="4">
    <Card class='box-card' :id="'table'+tablebox.name">
      <div class='card-content'  @mouseenter="enter()">    
        <div><img src="./../../assets/img/table.png"></div>
        <p>{{tablebox.alias}}</p> 
      </div>
      <div :id='"table_shade"+tablebox.name' class='card-shade' @mouseleave="leave()">
        <img src="./../../assets/img/edit.png" @click='edit()'>
        <img src="./../../assets/img/preview.png" @click='preview()'>
        <Tooltip placement="right" transfer>
          <img src="./../../assets/img/info.png">
          <div slot="content">
              <p style='font-size:14px'>{{tablebox.alias}}</p>
              <p style='white-space: normal;'>{{tablebox.desc}}</p>
          </div>          
        </Tooltip>
      </div>
    </Card>
    <Modal
      v-model="modalpreview"
      width ="1200px"
      title="Common Modal dialog box title">
      <iviewtable :chartCmpContent='currentTableData' :ifPage='true'></iviewtable> 
    </Modal>  
  </Col>
</template>
<script>
import datepicker from "./../paramcomponents/DatePicker"
import list from "./../paramcomponents/List"
import iviewtable from './../chartcomponents/Table'
export default {
  props:['tablebox','index'],
  components: {
    datepicker,
    list,
    iviewtable
  },
  data(){
    return {
      modalpreview:false,
      currentTableData:null, 
      paramSelected:null
    }
  }, 
  methods:{
    enter(){
      let Vue = this;
      $(".card-shade").css("display",'none');
      $(".box-card").css('-webkit-transform','scale(1)');
      $('#table_shade'+Vue.tablebox.name).css("display",'block');
      $('#table'+Vue.tablebox.name).css('-webkit-transform','scale(1.1)');
    },
    leave(){
      let Vue = this;
      $(".card-shade").css("display",'none');
      $('#table'+Vue.tablebox.name).css('-webkit-transform','scale(1)');  
    },
    preview(){
      let Vue = this;
      Vue.modalpreview = true;
      Vue.AxiosPost("previewBizView",{'bizViewId':Vue.tablebox.bizViewId},
        function(response){
          if(response.data.defaultParameters.length != 0){
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
          }        
        }
      );
    },
    refreshQueryData(param){
      let Vue = this;
      Vue.paramSelected = $.extend(Vue.paramSelected,param);
      let paramLength = Object.keys(Vue.paramSelected).length;
      let JSONParam = JSON.stringify(Vue.paramSelected);
      if(paramLength == Vue.paramComponent.length){
        Vue.AxiosPost("updateBizView",{"bizViewId":Vue.tablebox.bizViewId,"JSONParam":JSONParam},
          function(response){
          Vue.currentTableData = response.data;
        });         
      }
     
    }
  }
}
</script>


<style scoped>
.paramcomponent{
  display: inline-block;
  margin: 0px 3px;
}
.card-shade{
  background-color: #4871da;
  opacity: 0.9;
  padding:60px 12px;
}
.card-shade>img:nth-child(2){
  margin:0 15.5px;
}
.box-card{
  background-color: #5b82e5;
}
</style>
