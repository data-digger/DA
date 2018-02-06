<template>
    <div id="myChart"></div>
</template>
<script>
import echarts from 'echarts'
    export default {
        
        data(){
            return{
                option : {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line'
                    }]
                }
            }
        },
        methods:{
            drawChart:function(){
                let Vue = this;
                // 基于准备好的dom，初始化echarts实例
                  Vue.chartView = echarts.init(document.getElementById('myChart'));
                // 绘制图表
                  Vue.chartView.setOption(this.option);
                }   
        },
        mounted(){
            this.drawChart();
        }
    }
</script>
<style scoped="">
 #myChart{
  height: 250px;
}
</style>