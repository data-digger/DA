<style lang="less">
    @import "./chart.less";
</style>
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
        <FormItem prop="Position">
            <Col span='5'>
                Left
                <Input v-model="selectdOption.grid.left"></Input>                    
            </Col>
            <Col span='5' offset='1'>
                Right
                <Input v-model="selectdOption.grid.right"></Input>                    
            </Col>
            <Col span='5' offset='1'>
                Top
                <Input v-model="selectdOption.grid.top"></Input>                    
            </Col>
            <Col span='6' offset='1'>
                Bottom
                <Input v-model="selectdOption.grid.bottom"></Input>                    
            </Col>
        </FormItem>    
         <FormItem prop="colorTex">
           Color
        </FormItem> 
        <FormItem prop="color">
             <RadioGroup v-model="colorSelected" type="button">
                <Radio v-for='(c,index) in COLORS' :label="index" :key="index">
                    <img v-bind:src="c.src">
                </Radio>
            </RadioGroup>                
        </FormItem>
        <FormItem prop="legend">
            <span class="legend-area">Legend&nbsp;</span><i-switch v-model="selectdOption.legend.show"></i-switch>            
        </FormItem>         
    </Row>
</template>
<script>
import ChartTemplate from './../../libs/ChartTemplate.js'
export default {
    props:['data'],
    computed: {
      COLORS : function(){
          return ChartTemplate.COLORS;
      }
    },
    data () {
        return {
                selectdOption:{
                    color:ChartTemplate.COLORS[0].color,
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
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top:'10%',
                        containLabel: true
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
                colorSelected:0,
            }
    },
    methods:{
       sentOption:function(){
           let Vue = this;
           Vue.selectdOption.color = ChartTemplate.COLORS[Vue.colorSelected].color;
           Vue.selectdOption.legend.data = Vue.selectedY;
           Vue.selectdOption.series = [];
           for (let i in Vue.selectedY){

               Vue.selectdOption.series.push({name:Vue.selectedY[i],data:Vue.selectedY[i],type: 'line'})
           }
           Vue.$emit('getSelectedOption',Vue.selectdOption);
       },
       reset:function(){
           let Vue = this;
           Vue.selectdOption.color = ChartTemplate.COLORS[0].color;
           Vue.selectedY = [];
           Vue.selectdOption.xAxis.data= '',
           Vue.selectdOption.legend.data = Vue.selectedY;
           Vue.selectdOption.series = [];
           Vue.selectdOption.grid.left='3%',
           Vue.selectdOption.grid.right = '4%',
           Vue.selectdOption.grid.top = '10%',
           Vue.selectdOption.grid.bottom = '3%',
           Vue.colorSelected = 0
       }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
