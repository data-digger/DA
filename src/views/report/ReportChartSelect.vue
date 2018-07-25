<template>
  <!-- 图形选择和背景图片选择 -->
  <Modal
    v-model="isShow"
    title="选择图表"
    width ="1200px"
    @on-ok="drawReportChart">
      <!-- 背景图 -->
      <RadioGroup 
        v-model="imgAndChartInfo.imgSelecteToTitle" 
        class='imgSelecteToTitle'
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
        v-model="imgAndChartInfo.imgSelecteTochartBox" 
        class='imgSelecteTochartBox'
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
        v-model='imgAndChartInfo.tabType'
      >
        <TabPane 
          label="选择图形" 
          name='chart'>
          <RadioGroup 
            v-model="imgAndChartInfo.chartSelected" 
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
              v-model="imgAndChartInfo.tableSelected" 
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
      imgAndChartInfo:{
        imgSelecteToTitle:require("./../../assets/img/gridItemTitle1.png"),//选中title的背景图
        imgSelecteTochartBox:require('./../../assets/img/chartBox2.png'),//选中chart容器的背景图
        tabType:"chart",//modal中当前停留的的tab，默认chart
        chartSelected:0,//选中的chart图形
        tableSelected:0,//选中的table图形        
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
      this.$emit('drawReportChart', Vue.imgAndChartInfo)
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
.imgSelecteToTitle{
  margin: 10px 0px 20px 10px;
}
.imgSelecteTochartBox{
  margin: 0px 0px 50px 10px;
}
.ivu-radio-group-button .ivu-radio-wrapper{
  height:100% !important;
  margin: 10px;
}
</style>
