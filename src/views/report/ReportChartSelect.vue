<template>
  <!-- 图形选择和背景图片选择 -->
  <Modal
    v-model="isShow"
    title="选择图表"
    width ="1200px"
    @on-ok="drawReportChart">
      <!-- 背景图 -->
      <RadioGroup 
        v-model="gridItemContent.gridItemTitleBackgroundImg" 
        class='gridItemTitleBackgroundImg'
      >选择title背景图：
        <Radio :label="require('./../../assets/img/gridItemTitle1.png')">
          <img 
            src="./../../assets/img/gridItemTitle1.png" 
            alt="" >
        </Radio>
        <Radio :label="require('./../../assets/img/gridItemTitle2.png')">
          <img 
            src="./../../assets/img/gridItemTitle2.png" 
            alt="">
        </Radio>
      </RadioGroup>
      <RadioGroup 
        v-model="gridItemContent.gridItemChartBoxBackgroundImg" 
        class='gridItemChartBoxBackgroundImg'
      >选择容器背景图：
        <Radio :label="require('./../../assets/img/chartBox1.png')">
          <img 
            src="./../../assets/img/chartBox1.png" 
            alt="">
        </Radio>
        <Radio :label="require('./../../assets/img/chartBox2.png')">
          <img 
            src="./../../assets/img/chartBox2.png" 
            alt="">
        </Radio>
        <Radio label="">无背景</Radio>
      </RadioGroup>  
      <!-- 图形 -->
      <Tabs 
        type="card" 
        v-model='tabType'
      >
        <TabPane 
          label="选择图形" 
          name='chart'>
          <RadioGroup 
            v-model="chartSelected" 
            type='button'>
            <Radio 
              v-for='(chart,chartIndex) in chartList' 
              :key='chart.id' 
              :label='chartIndex'>
              <Card class="card">
                <p slot="title" :title="chart.name">{{chart.name}}</p>
                <p :title="chart.desc">{{chart.desc}}</p>      
              </Card> 
            </Radio>
          </RadioGroup>
        </TabPane>
          <TabPane 
            label="选择表格" 
            name='table'>
            <RadioGroup 
              v-model="tableSelected" 
              type='button'>
              <Radio 
                v-for='(table,tableIndex) in tableList' 
                :key='table.id' 
                :label='tableIndex'>
                <Card class='card'>
                  <p slot="title" :title="table.name">{{table.name}}</p>
                  <p :title="table.desc">{{table.desc}}</p>      
                </Card>
              </Radio>
            </RadioGroup>
          </TabPane>
      </Tabs>                   
  </Modal> 
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      chartList:'chartList',
      tableList:'tableList'
    }),
  },
  data(){
    return {
      isShow:false,
      tabType:"chart",//modal中当前停留的的tab，默认chart
      chartSelected:0,//选中的chart图形
      tableSelected:0,
      gridItemContent:{
        gridItemTitle:"",
        gridItemTitleBackgroundImg:require("./../../assets/img/gridItemTitle1.png"),//选中title的背景图
        gridItemChartBoxBackgroundImg:require('./../../assets/img/chartBox2.png'),//选中chart容器的背景图
        chartId:"",
        chartType:'',
        chartComponent:"",
        chartOption:'',
        chartData:null      
      }
    }
  },
  methods:{

    showChartSelectModal(){
      let Vue = this;
      Vue.isShow = true;
    },

    drawReportChart(){
      let Vue = this;
      let chart = {};
      if(Vue.tabType == "chart"){
        chart = Vue.chartList[Vue.chartSelected];
      }
      Vue.gridItemContent.chartId = chart.id;
      Vue.gridItemContent.chartType = chart.type;
      Vue.AxiosPost("getChartData",{'chartId':chart.id},
        function(response){
          Vue.gridItemContent.chartData = response.data.content;    
          Vue.gridItemContent.chartComponent = "Chart" ;
          Vue.$emit('initGridItemContent', Vue.gridItemContent);    
        }
      );

    }
  }

}
</script>

<style scoped>
.card{
  width:250px;
  margin:10px;
  display:inline-block;
}
.gridItemTitleBackgroundImg{
  margin: 10px 0px 20px 10px;
}
.gridItemChartBoxBackgroundImg{
  margin: 0px 0px 50px 10px;
}
.ivu-radio-group-button .ivu-radio-wrapper{
  height:100% !important;
  margin: 10px;
}
</style>
