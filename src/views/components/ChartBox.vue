<template>
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card class='box-card'@click='link(subpath)'>
        <p slot="title">{{chartbox.alias}} ({{chartbox.type}})</p>
        <p class="box-desc" :title='chartbox.desc'> {{chartbox.desc}}</p>
        <p><button @click='edit()'>编辑</button>
        <button @click='preview()'>预览</button> </p>        
    </Card>
    <Modal
      v-model="modaledit"
      width ="1200px"
      title="编辑图表"
      @on-ok="editOk"
      @on-cancel="cancel">
      <ChartForm ref="chartedit" :myChart='chartbox'></ChartForm>
    </Modal>
    <Modal
      v-model="modalpreview"
      width ="1200px"
      title="图表预览"
      @on-ok="previewOk"
      @on-cancel="cancel">
      <Condition :showOptions='showOptions'></Condition>
      <div v-if="chartbox.type != 'Card'" class="previewChart" :id="'previewChart'+chartbox.id"></div>
      <div v-if="chartbox.type == 'Card'" class="previewCard">
        <infoCard 
              v-if = "cardShow"
              :id-name="chartbox.id"
              :end-val="cardOption.data"
              :iconType="cardOption.iconType"
              :icon-size="cardOption.iconSize"
              :color="cardOption.color"
              :count-size="cardOption.countSize"
              :count-weight="cardOption.countWeight"
              :intro-text="cardOption.introText"
              :intro-color='cardOption.introColor'
              :intro-size='cardOption.introSize'
              :intro-weight='cardOption.introWeight'                         
          ></infoCard>
      </div>
    </Modal>
  </Col>
</template>

<script>
import echarts from 'echarts'
import ChartForm from './../components/ChartForm'
import Condition from './../components/Condition'
import chartUtil from './../../libs/chartUtil.js'
import infoCard from './../home/components/inforCard'
export default {
  name: 'ChartBox',
  components:{
    ChartForm,
    Condition,
    infoCard
  },
  data(){
    return {
      modaledit:false,
      modalpreview:false,
      tableView:null,
      chartView:null,
      cardShow:false,
      cardOption:null,
      showOptions:{date:true},
      queryData:null,
    }
  },
  props:['chartbox','index'],
  methods:{
    preview (){ 
      let Vue = this;
       Vue.AxiosPost("previewBizView",{'bizViewId':Vue.chartbox.bizViewId},
        function(response){
          Vue.queryData = response.data.gridData;
          Vue.modalpreview = true;
          if(Vue.chartbox.type=='Card'){
              Vue.drawCard();
          }else{
              Vue.$nextTick(function(){
              Vue.drawEChart();
            })
          }
         
      });
    },
    edit (){
      this.modaledit = true;
    },
    editOk(){
      this.$refs.chartedit.saveChart();
    },
    previewOk(){

    },
    cancel(){
      
    },
    drawCard(){
      let Vue = this;
      Vue.cardOption = eval("(" + Vue.chartbox.defineJSON + ")");
      chartUtil.analysis(Vue.cardOption,Vue.chartbox.type,Vue.queryData);
      Vue.cardShow = true;     
    },
    drawEChart(){
      let Vue = this;
      if(Vue.chartView != null){
            Vue.chartView.dispose();
            Vue.chartView = null;
       } 
      let eoption = eval("(" + Vue.chartbox.defineJSON + ")");
         //解析Option
          chartUtil.analysis(eoption,Vue.chartbox.type,Vue.queryData);
          // 基于准备好的dom，初始化echarts实例
          let chartView = echarts.init(document.getElementById('previewChart'+Vue.chartbox.id));
          // 绘制图表
          chartView.setOption(eoption); 
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .previewChart{
    height: 250px;
  }
  .previewCard{
    width: 400px;
    height: 150px;
    margin: auto;
  }
</style>
