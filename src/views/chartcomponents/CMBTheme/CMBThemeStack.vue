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
                    //backgroundColor: "#141f56",
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        show : true,
                        textStyle: {
                                    color: '#ffffff',
                                    fontWeight: 'bolder',
                                    fontSize: '12',
                                    textAlign:'left',
                        },
                    },
                    grid: {
                        left: '3%',
                        right: '10%',
                        top: '10%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
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
                                data: ''
                            },

                    yAxis: [
                                {
                                type: 'value',
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
                                            splitLine: {
                                                show: false,
                                            },
                                            splitArea: {
                                                show: false
                                            },
                                        }
                            ],
                    series: []
                    },
                    CMBThemeStack_colors:['#FF534D',"#E9F01D",'#00FF80']            
            }
    },
    methods: {
        setData:function(eoption,theme){
            this.option = $.extend(true, {}, eoption);;
                
        },
        getOption:function(dataOption){
            let xAxisName = dataOption.selectedX;
            let seriesName = dataOption.selectedY;
            this.option.xAxis.data = xAxisName.xName;
            this.option.series = [];
            for(let i=0; i<seriesName.length; i++){
                let seriesItem = {
                        name: seriesName[i].yAlias,
                        data: seriesName[i].yName,
                        type: 'bar',
                        barWidth: '70%',
                        stack: 'group1',  
                        color : this.CMBThemeStack_colors[i % 3],
                        label: {
                            normal: {
                            show: true,
                            position: 'inside',
                            fontWeight: 'bolder',
                            
                            }
                        }
                    }
                if (i == 0){
                    seriesItem.itemStyle = {
                                                normal: {
                                                    show: true,
                                                    barBorderRadius: [0,0,10,10],
                                                    borderWidth: 0,
                                                },
                                            }
                    }
                if (i == seriesName.length-1){
                    seriesItem.itemStyle = {
                                                normal: {
                                                    show: true,
                                                    barBorderRadius: [10,10,0,0],
                                                    borderWidth: 0,
                                                },
                                            }
                }
                this.option.series.push(seriesItem)
            }
            return this.option;          
       },
       attachData:function(eoption,data){
            util.attachData(eoption,data,'Stack',1);
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