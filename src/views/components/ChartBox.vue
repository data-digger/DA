<template >
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card  @click='link(subpath)' style="margin-bottom:10px;height: 150px;">
        <p slot="title">{{chartbox.name}}</p>
        <p> {{chartbox.desc}}</p>
        <p><button @click='edit()'>编辑</button>
        <button @click='preview()'>预览</button> </p>        
    </Card>
    <Modal
      v-model="modaledit"
      title="编辑图表"
      @on-ok="editOk"
      @on-cancel="cancel">
      <ChartForm ref="chartedit" :myChart='chartbox'></ChartForm>
    </Modal>
    <Modal
      v-model="modalpreview"
      title="图表预览"
      @on-ok="previewOk"
      @on-cancel="cancel">
      <div class="previewChart" :id="'previewChart'+chartbox.id"></div>
    </Modal>
  </Col>
</template>

<script>
import echarts from 'echarts'
import ChartForm from './../components/ChartForm'
import chartUtil from './../../libs/chartUtil.js'
export default {
  name: 'ChartBox',
  components:{
    ChartForm
  },
  data(){
    return {
      modaledit:false,
      modalpreview:false
    }
  },
  props:['chartbox','index'],
  methods:{
    preview (){ 
      this.modalpreview = true;
      this.$nextTick(function(){
        this.previewChart();
      })
      
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
    previewChart(){
      let Vue = this;
      let eoption = eval("(" + Vue.chartbox.defineJSON + ")");
      //let eoption = JSON.parse(Vue.chartbox.defineJSON);
      //解析Option
      Vue.AxiosPost("previewBizView",{'bizViewId':Vue.chartbox.bizViewId},
        function(response){
          chartUtil.analysis(eoption,Vue.chartbox.type,response.data);
          // 基于准备好的dom，初始化echarts实例
          let chartView = echarts.init(document.getElementById('previewChart'+Vue.chartbox.id));
          // 绘制图表
          chartView.setOption(eoption);
        }
      ); 
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .previewChart{
    height: 250px;
  }
</style>
