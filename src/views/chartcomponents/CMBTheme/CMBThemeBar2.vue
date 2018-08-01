<template>
      <Row>
        <FormItem prop="Position">
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
                xAxisData:[],
                data:[10,13,24,35,46,
                        65,23,44,32,12,
                        35,46,65,23,44,
                        65,23,44,32,12,
                        23,44,32,12,46],
                option :{
                    xAxisName:['厦门','郑州','昆明','其他','沈阳',
                                '厦门','郑州','昆明','其他','沈阳',
                                '厦门','郑州','昆明','其他','沈阳',
                                '厦门','郑州','昆明','其他','沈阳',
                                '厦门','郑州','昆明','其他','沈阳'],
                    backgroundColor: '#08263a',
                    xAxis: [{
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                                formatter: function (value, index) {
                                //     var xAxisName = ['厦门','郑州','昆明','其他','沈阳',
                                // '厦门','郑州','昆明','其他','沈阳',
                                // '厦门','郑州','昆明','其他','沈阳',
                                // '厦门','郑州','昆明','其他','沈阳',
                                // '厦门','郑州','昆明','其他','沈阳']

                                    return this.option.xAxisName[value]
                            },
                            textStyle: {
                                color: '#4a657a'
                            }  
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#08263f'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        data: this.xAxisData
                    }],
                    visualMap: {
                        show: false,
                        min: 0,
                        max: 26,
                        dimension: 0,
                        inRange: {
                            color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
                        }
                    },
                    yAxis: {
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#4a657a'
                            }  
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#08263f'
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    series: [{
                        name: 'back',
                        type: 'bar',
                        data: this.data,
                        z: 0,
                        barWidth: '40%',
                        itemStyle: {
                            normal: {
                                opacity: 1,
                                barBorderRadius: 5,
                                shadowBlur: 3,
                                shadowColor: '#111'
                            }
                        }
                    },],
                }
            }
    },
    methods: {
         setData:function(eoption,theme){
            this.option = $.extend(true, {}, eoption);;
                
        },
        getOption:function(dataOption){
            let Vue = this;
            this.xAxisData = [];
            for(let i=0; i<this.data.length; i++){
                this.xAxisData.push(i)
            }
            this.option.xAxis[0].data = this.xAxisData;
            this.option.series[0].data = this.data;
            this.option.xAxis[0].axisLabel.formatter = function(value,index){
                return Vue.option.xAxisName[index]
            }
            return this.option;          
       },
       attachData:function(eoption,data){
            util.attachData(eoption,data,'Bar2',1);
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