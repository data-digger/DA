<template>
   <Row>
       <Col span='10'>
            <FormItem prop="xAxis">
                XAxis
                <Select v-model="selectedX" multiple>
                    <Option v-for='item in data' :key='item' :value="item">{{item}}</Option>
                </Select>               
            </FormItem>
        </Col>
        <Col span='13' offset='1'>
            <FormItem prop="yAxis">
                YAxis
                <Select class="form-control" v-model='selectdOption.yAxis.data'>               
                    <Option v-for='item in data' :key='item' :value="item" >{{item}}</Option>
                </Select>
            </FormItem>
        </Col> 
         <Col span='24'>
            <FormItem prop="color">
                Color
                <Select class="form-control" v-model='colorSelected'>               
                    <Option v-for='item in COLORS' :key='item' :value="item" >{{item}}</Option>
                </Select>
            </FormItem>
        </Col>        
    </Row>
</template>
<script>
import ChartTemplate from './../../libs/ChartTemplate.js'
export default {
    props:['data'],
    computed: {
      COLORS : function(){
          return Object.keys(ChartTemplate.COLORS)
      }
    },
    data () {
        return {
                selectdOption:{
                    color:ChartTemplate.COLORS['blue'],
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        show:true
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [{
                            type: 'value',
                            boundaryGap: [0, 0.01]
                        }],
                    yAxis : 
                        {
                            type: 'category',
                            data: ''
                        },
                    series : [
                    ]
                },
                selectedX:[],                
                colorSelected:'blue',
            }
    },
    methods:{
       sentOption:function(){
           let Vue = this;
           Vue.selectdOption.color = ChartTemplate.COLORS[Vue.colorSelected];
           Vue.selectdOption.legend.data = Vue.selectedX;
           Vue.selectdOption.series = [];
           for (let i in Vue.selectedX){

               Vue.selectdOption.series.push({name:Vue.selectedX[i],data:Vue.selectedX[i],type: 'bar'})
           }
           Vue.$emit('getSelectedOption',Vue.selectdOption);
       }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>