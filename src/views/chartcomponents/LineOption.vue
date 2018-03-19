<template>
   <Row>
       <Col span='10'>
            <FormItem prop="xAxis">
                XAxis
                <Select class="form-control" v-model='selectdOption.xAxis.data'>               
                    <Option v-for='item in data' :key='item' :value="item" >{{item}}</Option>
                </Select>
            </FormItem>
        </Col>
        <Col span='13' offset='1'>
            <FormItem prop="yAxis">
                YAxis
                <Select v-model="selectedY" multiple>
                    <Option v-for='item in data' :key='item' :value="item">{{item}}</Option>
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
                    xAxis : {
                            type : 'category',
                            data : '',
                        },
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                    ]
                },
                selectedY:[],                
                colorSelected:'blue',
            }
    },
    methods:{
       sentOption:function(){
           let Vue = this;
           Vue.selectdOption.color = ChartTemplate.COLORS[Vue.colorSelected];
           Vue.selectdOption.legend.data = Vue.selectedY;
           Vue.selectdOption.series = [];
           for (let i in Vue.selectedY){

               Vue.selectdOption.series.push({name:Vue.selectedY[i],data:Vue.selectedY[i],type: 'line'})
           }
           Vue.$emit('getSelectedOption',Vue.selectdOption);
       }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>