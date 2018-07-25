<template>
      <Row>
        <FormItem prop="Position">
            <Col span='8'>
                Radius
                <Input v-model="option.series[0].radius"></Input>                    
            </Col>
            <Col span='7' offset='1'>
                Center-X
                <Input v-model="option.series[0].center[0]"></Input>                    
            </Col>
            <Col span='7' offset='1'>
                Center-Y
                <Input v-model="option.series[0].center[1]"></Input>                    
            </Col>
        </FormItem> 
        <FormItem prop="maxAndMin">
            <Col span='8'>
                min
                <Input v-model="option.series[0].min"></Input>                    
            </Col>
            <Col span='7' offset='1'>
                Max
                <Input v-model="option.series[0].max"></Input>                    
            </Col>
        </FormItem>  
        <FormItem prop="angle">
            <Col span='8'>
                startAngle
                <Input v-model="option.series[0].startAngle"></Input>                    
            </Col>
            <Col span='7' offset='1'>
                endAngle
                <Input v-model="option.series[0].endAngle"></Input>                    
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
                        //backgroundColor: '#031845',
                        title: [ {
                            x: 'center',
                            top: '59%',
                            text: '',
                            textStyle: {
                                fontWeight: 'bolder',
                                fontSize: 18,
                                color: "#fff"
                            },
                        }],
                        tooltip: {
                            show: true,


                        },
                        series: [{
                            name: '',
                            type: 'gauge',
                            startAngle: 180,
                            endAngle: 0,
                            min:0,
                            max:100,
                            radius: '70%',
                            center: ['50%', '55%'], // 默认全局居中  
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    width: 40,
                                    shadowBlur: 0,
                                    color: [
                                        [0.5, '#91c7ae'],
                                        [0.8, '#EFC631'],
                                        [1, '#c23531'],
                                    ]
                                }
                            },
                            axisTick: {
                                show: false,
                                splitNumber: 0

                            },
                            splitLine: {
                                show: false,
                                length: 20,

                            },

                            axisLabel: {
                                show: true,
                                //color:'#ffffff',
                                //inside: false,
                                distance:'35',
                                textStyle: {
                                fontWeight: 'bolder',
                                fontSize: 16,
                                //color: "#fff"
                                },
                                formatter: function (value) {
                                    if(value === 0 || value === 100){
                                        return value
                                    } else {
                                        return ''
                                    }
                                }
                            },
                            pointer: {
                                show: true,
                                length: '58%',
                                //color:'#ffffff'
                            },
                            detail: {
                                show: true,
                                offsetCenter: [0, '60%'],
                                textStyle: {
                                    fontSize: 32,
                                    fontWeight:'bolder'
                                },
                                formatter:'{value}%'
                            },
                            itemStyle: {
                                normal: {
                                    color: "#ffffff",

                                }
                            },
                            data: [{
                                value: 50
                            }]
                        },  ]
                    }             
            }
    },
    methods: {
         setData:function(eoption,theme){
            this.option = $.extend(true, {}, eoption);;
                
        },
        getOption:function(dataOption){
            let dataName = dataOption.selectedData.dataName;
            let dataAlias = dataOption.selectedData.dataAlias;
            this.option.title[0].text = dataAlias;
            this.option.series[0].name = dataAlias;
            this.option.series[0].data[0].value = dataName;
            return this.option;          
       },
       attachData:function(eoption,data){
            util.attachData(eoption,data,'Guage',1);
        },

        reset:function(){
           let Vue = this;
           Vue.option.series[0].radius = '50%',
           Vue.option.series[0].center = ['50%', '55%'];
           Vue.option.series[0].min = 0;
           Vue.option.series[0].max = 100;
       },
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->