<template>
  <div id='ChartPreview'>
          <div class="portlet box crusta">
            <div class="portlet-title">
              <div class="caption">预览{{chartName}}</div>
              <div class="tools">
                <a href="javascript:;" class="remove" data-original-title="" title="" @click="closePreview()">×
                </a>
              </div>
            </div>
            <div class="portlet-body">
              <div id="priviewChart"></div>
           </div>
          </div>
      </div>
</template>

<script>
import echarts from 'echarts'
import JSON5 from 'json5'
import {mapGetters} from 'vuex'
export default {
  name: 'ChartPreview',
  data () {
    return {
      eoption:null,
      chartView:null
    }
  },
  computed: {
    ...mapGetters({
      chartId:'chartId',
      chartName:'chartName',
      chartOption:'chartOption'
    })
  },
  methods:{
    //解析图表选项并渲染图表
    previewChart:function(){
        if(this.chartView != null){
          this.chartView.dispose();
        }
        let Vue = this;
        this.eoption = eval("(" + this.chartOption + ")");
        
      // 基于准备好的dom，初始化echarts实例
        this.chartView = echarts.init(document.getElementById('priviewChart'))
        
        // 绘制图表
         this.chartView.setOption(this.eoption);
    },
    //关闭预览弹框
    closePreview (){
      this.$store.dispatch('chartState',{chartPreview:false})
    }
  },
  mounted:function(){
    this.previewChart();
  }
}
</script>

<style scoped>
/*@import "codemirror/lib/codemirror.css"*/
/*@import "./../../../node_modules/datatables/media/css/jquery.dataTables.css"*/
#ChartPreview{
  position: absolute;
  width: 500px;
  left: 250px;
  top: -430px;
}
.portlet.box > .portlet-title{
  border-bottom: 0;
  padding: 0 10px;
  margin-bottom: 0;
  color: #fff;
  background-color:#dca7b0;
  min-height: 41px;
  text-align: left;
  line-height: 41px;
}
.portlet .caption{
  width: 50%;
  display: inline-block;
}
.portlet > .portlet-title > .tools {
  float: right;
  display: inline-block;
}
.portlet.box > .portlet-title > .tools > a.remove {
  color: white;
}
.portlet.box > .portlet-body{
  background-color: #fff;
  padding: 30px 10px;
  border: 1px solid #dca7b0;
  overflow-x: auto;
  overflow-y: auto;
}
#priviewChart{
  height: 300px;
}
</style>
