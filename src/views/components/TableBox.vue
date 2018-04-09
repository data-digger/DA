<template>
<!--   <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card class='box-card'>
        <p slot="title">{{tablebox.name}}</p>
        <p class="box-desc" :title='tablebox.desc'>{{tablebox.desc}}</p>
        <button @click='preview()'>预览</button></p> 
    </Card>  -->
  <Col :xs="4" :sm="4" :md="4" :lg="4">
    <Card class='box-card' :id="'card'+tablebox.name">
      <div class='card-content'  @mouseenter="enter()">    
        <div style='height:30px'><img src="./../../assets/img/table.png"></div>
        <div style='height:30px'>{{tablebox.alias}}</div> 
      </div>
      <div :id='tablebox.name' class='card-shade' @mouseleave="leave()">
      <!--   <Icon style='font-size:40px' type="edit" @click='edit()'></Icon>
        <Icon style='font-size:40px' type="search"></Icon> -->
        <img src="./../../assets/img/edit.png" @click='edit()'>
        <img src="./../../assets/img/preview.png" @click='preview()'>
        <img src="./../../assets/img/info.png">
      </div>
    </Card>
    <Modal
      v-model="modalpreview"
      width ="1200px"
      title="Common Modal dialog box title"
      @on-ok="previewOk"
      @on-cancel="cancel">
      <Row>
        <component class='paramcomponent' v-for='(cmp,index) in paramComponent' :is="cmp.component" :key='index' :cmpContent='cmp' @sentParam = 'refreshQueryData'></component>
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
    enter(){
      let Vue = this;
      $('#'+Vue.tablebox.name).css("display",'block');
      $('#card'+Vue.tablebox.name).css('-webkit-transform','scale(1.1)');
    },
    leave(){
      let Vue = this;
      $(".card-shade").css("display",'none');
      $('#card'+Vue.tablebox.name).css('-webkit-transform','scale(1)');  
    },
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
.card-shade{
  background-color: #2b4270;
}
.box-card{
  background-color: #3d6bc8;
}
</style>
