<template>
      <Row>
          <FormItem prop="axisName">
             <Col span='11'>
                x轴名称
                <Input v-model="option.xAxis.name"></Input>                    
            </Col>
            <Col span='11' offset='2'>
                y轴名称
                <Input v-model="option.yAxis.name"></Input>                    
            </Col>
        </FormItem>  
        <FormItem prop="Threshold">
             <Col span='5'>
                阈值-X
                <Input v-model="option.series[0].markLine.data[0].xAxis"></Input>                    
            </Col>
            <Col span='5' offset='1'>
                Format-X
                <Select class="form-control" v-model='option.xAxis.axisLabel.formatter'>               
                    <Option v-for='(item,index) in FORMAT' :key="'value1'+index" :value="item.value" >{{item.display}}</Option>
                </Select>                  
            </Col>
            <Col span='5' offset='1'>
                阈值-Y
                <Input v-model="option.series[0].markLine.data[1].yAxis"></Input>                    
            </Col>
            <Col span='6' offset='1'>
                Format-Y
                <Select class="form-control" v-model='option.yAxis.axisLabel.formatter'>               
                    <Option v-for='(item,index) in FORMAT' :key="'value2'+index" :value="item.value" >{{item.display}}</Option>
                </Select>                      
            </Col> 
        </FormItem>  
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
                option : {
                        color:['red','green','yellow','blue'],
                        grid:{
                            show:true,
                            borderWidth:0.8,
                            left: '10%',
                            right: '5%',
                            bottom: '15%',
                            top:'10%',
                        },
                        tooltip: {
                            trigger: 'item',
                            axisPointer: {
                                show: true,
                                type: 'cross',
                                lineStyle: {
                                    type: 'dashed',
                                    width: 1
                                },
                            label:{
                                backgroundColor:'rgba(0,0,0,.5)'
                            }
                            },
                        },
                        xAxis: {
                            name: '满意度评价',
                            nameLocation:'middle',
                            nameGap:30,
                            type: 'value',
                            //scale: true,
                            axisLabel: {
                                formatter: '{value}',
                            },
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#ccc'
                                }
                            }
                        },
                        yAxis: {
                            name: '重要性',
                            type: 'value',
                            nameLocation:'middle',
                            nameGap:40,
                            //scale: true,
                            axisLabel: {
                                formatter: '{value}',
                            },
                            splitLine: {
                                show: false
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#ccc'
                                }
                            }
                        },
                        series: [{
                            type: 'effectScatter',
                            data: '',
                            symbolSize: 10,
                            label: {
                                show: true,
                                position: 'bottom',
                                distance : 10,
                                formatter: function(params) {
                                    return params.name
                                },
                            },
                            markLine: {
                                label:{
                                    show:false
                                },
                                lineStyle: {
                                    normal: {
                                        color: "#ccc",
                                        type: 'solid',
                                        width: 0.8,
                                    },
                                    emphasis: {
                                        color: "#ccc"
                                    }
                                },
                                data: [{
                                    xAxis: 70,
                                    itemStyle: {
                                        normal: {
                                            color: "#ccc",
                                        }
                                    }
                                }, {
                                    yAxis: 0.3,
                                    itemStyle: {
                                        normal: {
                                            color: "#ccc",
                                        }
                                    }
                                }]
                            },
                        },
                        {
                            type: 'effectScatter',
                            data: '',
                            symbolSize: 10,
                            label: {
                                show: true,
                                position: 'bottom',
                                distance : 10,
                                formatter: function(params) {
                                    return params.name
                                },
                            },
                        },
                        {
                            type: 'effectScatter',
                            data: '',
                            symbolSize: 10,
                            label: {
                            show: true,
                                position: 'bottom',
                                distance : 10,
                                formatter: function(params) {
                                    return params.name
                                },
                            },
                        },
                        {
                            type: 'effectScatter',
                            data: '',
                            symbolSize: 10,
                            label: {
                                show: true,
                                position: 'bottom',
                                distance : 10,
                                formatter: function(params) {
                                    return params.name
                                },
                            },
                        }
                    ]
                },

                FORMAT:[{value:'{value}',display:'值'},{value:'{value}%',display:'%'}]
            
            }
        
        },
    methods: {
         setData:function(eoption,theme){
            this.option = $.extend(true, {}, eoption);;
                
        },
        getOption:function(dataOption){
            let name = dataOption.selectedName.xName;
            let value = dataOption.selectedValue;
            this.option.series[0].data = {name:name,value:[value[0].yName,value[1].yName]};
            return this.option;          
       },
       attachData:function(eoption,data){
            util.attachData(eoption,data,'FourQuadrant',1);
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