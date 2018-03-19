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
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                    },
                    series : [
                        {
                            type: 'pie',
                            radius : '75%',
                            center: ['50%', '50%'],
                            data:{name:'',value:''},
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                },              
                colorSelected:'blue',
            }
    },
    methods:{
       sentOption:function(){
           let Vue = this;
           Vue.selectdOption.color = ChartTemplate.COLORS[Vue.colorSelected];
           Vue.$emit('getSelectedOption',Vue.selectdOption);
       }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>