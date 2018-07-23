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
                        backgroundColor: "#141f56",
                        tooltip: {
                            show: false,
                        },
                        legend: {
                            show:false,
                        },
                        grid: {
                            borderWidth: 0,
                            left: '5%',
                            right: '5%',
                            bottom: '15%',
                            top:'10%',
                            textStyle: {
                                color: "#fff"
                            }
                        },
                        xAxis: [{
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
                                    color: '#ffffff',
                                    fontWeight: 'bolder',
                                    fontSize: '12',
                                    textAlign:'left',
                                },
                            },
                            data: '',
                        }, {
                            type: 'category',
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                show: false
                            },
                            splitArea: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            data:'',
                        }],
                        yAxis: {
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
                                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#00c0e9'
                                        }, {
                                            offset: 1,
                                            color: '#3b73cf'
                                        }]),
                                        barBorderRadius: [50,50,0,0],
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
                                        position: 'top',
                                        textStyle: {
                                            color: '#ffffff',
                                            fontStyle: 'normal',
                                            fontWeight: 'bolder',
                                            fontFamily: '微软雅黑',
                                            textAlign: 'left',
                                            fontSize: 12,
                                        },
                                    },
                                },
                                zlevel: 2,
                                barWidth: '30%',
                                data: '',
                            },
                            {
                                name: '',
                                type: 'bar',
                                xAxisIndex: 1,
                                zlevel: 1,
                                itemStyle: {
                                    normal: {
                                        color: '#121847',
                                        borderWidth: 0,
                                        barBorderRadius: [50,50,0,0],
                                        shadowBlur: {
                                            shadowColor: 'rgba(255,255,255,0.31)',
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowOffsetY: 2,
                                        },
                                    }
                                },
                                barWidth: '30%',
                                data: '',
                            }]
                    }              
            }
    },
    methods: {
         setData:function(eoption,theme){
            this.option = $.extend(true, {}, eoption);;
                
        },
        getOption:function(dataOption){
            let xAxisName = dataOption.selectedX;
            let seriesName = dataOption.selectedY;
            //this.option.xAxis[0].name = xAxisName.xAlias;
            this.option.xAxis[0].data = xAxisName.xName;
            this.option.series[0].name = seriesName[0].yAlias;
            this.option.series[0].data = seriesName[0].yName;
            return this.option;          
       },
       attachData:function(eoption,data){
            util.attachData(eoption,data,'Bar',1);
        },

        reset:function(){
           let Vue = this;
           Vue.option.grid.left='5%';
           Vue.option.grid.right = '5%';
           Vue.option.grid.top = '10%';
           Vue.option.grid.bottom = '15%';
       },
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->