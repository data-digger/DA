<template>
      <Row>
        <FormItem prop="Position">
             <Col span='5'>
                Left
                <Input v-model="option.grid.left"></Input>                    
            </Col>
            <Col span='5' offset='1'>
                Right
                <Input v-model="option.grid.right"></Input>                    
            </Col>
            <Col span='5' offset='1'>
                Top
                <Input v-model="option.grid.top"></Input>                    
            </Col>
            <Col span='6' offset='1'>
                Bottom
                <Input v-model="option.grid.bottom"></Input>                    
            </Col> 
        </FormItem> 
        <Col span='24'>
            <FormItem prop="color">
                Color  
                <RadioGroup v-model="option.series[0].itemStyle.normal.color" size='large'>
                    <Radio label="red">
                        <Icon type="egg" color="red" size='15'></Icon>
                    </Radio>
                    <Radio label="green">
                        <Icon type="egg" color="green" size='15'></Icon>
                    </Radio>
                    <Radio label="blue">
                        <Icon type="egg" color="blue" size='15'></Icon>
                    </Radio>
                </RadioGroup>
            </FormItem>
        </Col>          
    </Row>
</template>
<script>
import echarts from 'echarts'
import ChartTemplate from './../../../libs/ChartTemplate.js'
import {mapGetters} from 'vuex'
import util from './../util.js'
export default {
    computed: {
      ...mapGetters({

      }),
    },
    data () {
        return {
                option:{
                        //backgroundColor: "#141f56",
                        tooltip: {
                            show: false,
                        },
                        legend: {
                            show:false,
                        },
                        grid: {
                            borderWidth: 0,
                            left: '10%',
                            right: '5%',
                            bottom: '15%',
                            top:'10%',
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        yAxis: [{
                            type: 'category',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false,
                            },
                            axisLabel: {
                                inside: false,
                                textStyle: {
                                    color: '#ccc',
                                    fontWeight: 'bolder',
                                    fontSize: '12',
                                    textAlign:'left',
                                },
                            },
                            data: '',
                        }],
                        xAxis: {
                            type: 'value',
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false,
                            },
                            splitLine: {
                                show: false,
                            },
                            axisLabel: {
                                show: false,
                            },
                        },
                        series: [{
                                type: 'bar',
                                itemStyle: {
                                    normal: {
                                        show: true,
                                        color:'red',
                                        barBorderRadius: 50,
                                        borderWidth: 0,
                                    },
                                    emphasis: {
                                        shadowBlur: 15,
                                        shadowColor: 'rgba(105,123, 214, 0.7)'
                                    }
                                },
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'right',
                                        textStyle: {
                                            color: '#ccc',
                                            fontStyle: 'normal',
                                            fontWeight: 'bolder',
                                            fontFamily: '微软雅黑',
                                            textAlign: 'left',
                                            fontSize: 12,
                                        },
                                    },
                                },
                                barWidth: '40%',
                                data: '',
                            }]
                    },
                    selectedColor:'red'             
            }
    },
    methods: {
         setData:function(eoption,theme){
            this.option = $.extend(true, {}, eoption);;
                
        },
        getOption:function(dataOption){
            let yAxisName = dataOption.selectedY;
            let seriesName = dataOption.selectedX;
            //this.option.xAxis[0].name = xAxisName.xAlias;
            this.option.yAxis[0].data = yAxisName.yName;
            this.option.series[0].name = seriesName[0].xAlias;
            this.option.series[0].data = seriesName[0].xName;
            return this.option;          
       },
       attachData:function(eoption,data){
            util.attachData(eoption,data,'HBar',1);
        },

        reset:function(){
           let Vue = this;
           Vue.option.grid.left='10%';
           Vue.option.grid.right = '5%';
           Vue.option.grid.top = '10%';
           Vue.option.grid.bottom = '15%';
       },
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->