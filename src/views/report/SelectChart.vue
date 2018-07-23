<template>
      <!-- 图形选择和背景图片选择 -->
      <Modal
        v-model="showSelectChartModal"
        title="选择图表"
        width ="1200px"
        @on-ok="drawReportChart">
          <!-- 背景图 -->
          <RadioGroup v-model="imgSelecteToTitle" class='imgSelecteToTitle'>选择title背景图：
              <Radio :label="require('./../../assets/img/gridItemTitle1.png')"><img src="./../../assets/img/gridItemTitle1.png" alt=""></Radio>
              <Radio :label="require('./../../assets/img/gridItemTitle2.png')"><img src="./../../assets/img/gridItemTitle2.png" alt=""></Radio>
          </RadioGroup>
          <RadioGroup v-model="imgSelecteTochartBox" class='imgSelecteTochartBox'>选择容器背景图：
              <Radio :label="require('./../../assets/img/chartBox1.png')"><img src="./../../assets/img/chartBox1.png" alt=""></Radio>
              <Radio :label="require('./../../assets/img/chartBox2.png')"><img src="./../../assets/img/chartBox2.png" alt=""></Radio>
              <Radio label="">无背景</Radio>
          </RadioGroup>  
          <!-- 图形 -->
          <Tabs type="card" v-model='currentTab'>
              <TabPane label="选择图形" name='chart'>
                <RadioGroup v-model="chartSelected" type='button'>
                  <Radio v-for='(chart,chartIndex) in chartList' :key='chart.id' :label='chartIndex'>
                    <Card style="width:250px;margin:10px;display:inline-block;" >
                        <p slot="title" :title="chart.name">{{chart.name}}</p>
                        <p :title="chart.desc">{{chart.desc}}</p>      
                    </Card> 
                  </Radio>
                </RadioGroup>
              </TabPane>
              <TabPane label="选择表格" name='table'>
                <RadioGroup v-model="tableSelected" type='button'>
                  <Radio v-for='(table,tableIndex) in tableList' :key='table.id' :label='tableIndex'>
                    <Card style="width:250px;margin:10px;display:inline-block;">
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

export default {

}
</script>

<style scoped>

</style>
