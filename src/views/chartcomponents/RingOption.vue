<style lang="less">
    @import "./chart.less";
</style>
<template>
   <Row>
       <Col span='11'>
            <FormItem prop="xAxis">
                NameSeries
                <Select class="form-control" v-model='selectdOption.series[0].data.name'>               
                    <Option v-for='item in data' :key='item' :value="item" >{{item}}</Option>
                </Select>
            </FormItem>
        </Col>
        <Col span='11' offset='2'>
            <FormItem prop="yAxis">
                ValueSeries
                <Select class="form-control" v-model="selectdOption.series[0].data.value">
                    <Option v-for='item in data' :key='item' :value="item">{{item}}</Option>
                </Select>
            </FormItem>
        </Col>
         <FormItem prop="Radius">
            <Col span='11'>
                InnerRadius
                <Input v-model="selectdOption.series[0].radius[0]"></Input>                    
            </Col>
            <Col span='11' offset='2'>
                OuterRadius
                <Input v-model="selectdOption.series[0].radius[1]"></Input>                    
            </Col>
        </FormItem>   
         <FormItem prop="Position">
            <Col span='11'>
                Center-X
                <Input v-model="selectdOption.series[0].center[0]"></Input>                    
            </Col>
            <Col span='11' offset='2'>
                Center-Y
                <Input v-model="selectdOption.series[0].center[1]"></Input>                    
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
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c} ({d}%)"
                    },
                    legend: {
                        show:true,
                        orient: 'vertical',
                        x: 'right',
                    },
                    series: [
                        {
                            type:'pie',
                            radius: ['50%', '70%'],
                            center: ['50%', '50%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'outer'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data:{name:'',value:''},
                        }
                    ]
                },              
                colorSelected:0,
            }
    },
    methods:{
          setData:function(JSONOption){
            let Vue = this;
                Vue.selectdOption = JSON.parse(JSONOption);
                let colorFirst = Vue.selectdOption.color[0];
                for (let j in ChartTemplate.COLORS){
                    if(ChartTemplate.COLORS[j].color[0] == colorFirst){
                        Vue.colorSelected = j;
                        break;
                    }
                }
           // Vue.$store.commit('getInitOption',Vue.selectdOption);
        },
       sentOption:function(){
           let Vue = this;
           Vue.selectdOption.color = ChartTemplate.COLORS[Vue.colorSelected].color;
           Vue.$emit('getSelectedOption',Vue.selectdOption);
       },
       reset:function(){
           let Vue = this;
           Vue.selectdOption.color = ChartTemplate.COLORS[0].color;
           Vue.selectdOption.series[0].data.name = '';
           Vue.selectdOption.series[0].data.value = '';
           Vue.selectdOption.series[0].radius[0] = '50%';
           Vue.selectdOption.series[0].radius[1] = '70%';
           Vue.selectdOption.series[0].center[0]='50%';
           Vue.selectdOption.series[0].center[1]='50%';
           Vue.colorSelected = 0
       }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->