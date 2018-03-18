<template>
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card class='box-card'>
        <p slot="title">{{tablebox.name}}</p>
        <p class="box-desc" :title='tablebox.desc'>{{tablebox.desc}}</p>
        <button @click='preview()'>预览</button></p> 
    </Card> 
    <Modal
      v-model="modalpreview"
      width ="1200px"
      title="Common Modal dialog box title"
      @on-ok="previewOk"
      @on-cancel="cancel">
      <Row><component class='paramcomponent' v-for='(cmp,index) in paramComponent' :is="cmp.component" :key='index' :cmpContent='cmp' @sentParam = 'refreshQueryData'></component></Row>
      <iviewtable :chartCmpContent='currentTableData'></iviewtable> 
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
      paramComponent:[],
      paramSelected:null
    }
  }, 
  methods:{
    preview(){
      let Vue = this;
      Vue.modalpreview = true;
      Vue.paramComponent = [];
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
    cancel(){

    },
    previewOk(){

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
</style>
