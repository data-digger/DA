<style lang="less">
    @import "./chart.less";
</style>
<template>
   <Row>
       <Col span='11'>
            <FormItem prop="xAxis">
                NameSeries
                <Select class="form-control" v-model='selectdOption.series[0].data.name'>               
                    <Option v-for='item in groupbyList' :key="item.columnName" :value="item.columnName" >{{item.columnAlias}}</Option>
                </Select>
            </FormItem>
        </Col>
        <Col span='11' offset='2'>
            <FormItem prop="yAxis">
                ValueSeries
                <Select class="form-control" v-model="selectdOption.series[0].data.value">
                    <Option v-for='item in metrics' :key="item.columnName" :value="item.columnName" >{{item.columnAlias}}</Option>
                </Select>
            </FormItem>
        </Col>
         <FormItem prop="Position">
            <Col span='8'>
                Radius
                <Input v-model="selectdOption.series[0].radius"></Input>                    
            </Col>
            <Col span='7' offset='1'>
                Center-X
                <Input v-model="selectdOption.series[0].center[0]"></Input>                    
            </Col>
            <Col span='7' offset='1'>
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
import {mapGetters} from 'vuex'
export default {
    props:['data'],
    computed: {
    ...mapGetters({
        dimensions:'dimensions',
        metrics:'metrics',
        groupbyList:'groupbyList'
      }),
      COLORS : function(){
          return ChartTemplate.COLORS;
      }
    },
    data () {
        return {
                selectdOption:{
                    color:ChartTemplate.COLORS[0].color,
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
                            radius : '60%',
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
           Vue.selectdOption.series[0].radius = '60%';
           Vue.selectdOption.series[0].center[0]='50%';
           Vue.selectdOption.series[0].center[1]='50%';
           Vue.colorSelected = 0
       }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->