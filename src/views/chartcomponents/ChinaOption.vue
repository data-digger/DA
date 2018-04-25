<style lang="less">
     @import "./styles/chart.less";
</style>
<template>
   <Row>
       <FormItem prop="provinceSeries">
            ProvinceSeries
            <Select class="form-control" v-model='selectdOption.series[0].data.name'>               
                <Option v-for='item in groupbyList' :key="item.columnName" :value="item.columnName" >{{item.columnAlias}}</Option>
            </Select>
        </FormItem>
        <FormItem prop="valueSeries">
            ValueSeries
            <Select class="form-control" v-model="selectdOption.series[0].data.value">
                <Option v-for='item in metrics' :key="item.columnName" :value="item.columnName" >{{item.columnAlias}}</Option>
            </Select>
        </FormItem>
        <FormItem prop="color">
                <Col span='7'>
                    HighValueColor
                    <ColorPicker v-model="selectdOption.visualMap.inRange.color[1]"/>
                </Col>
                 <Col span='7' offset='2'>
                    LowValueColor
                    <ColorPicker v-model="selectdOption.visualMap.inRange.color[0]"/>
                </Col>
                <Col span='6' offset='2'>
                    SymbolColor
                    <ColorPicker v-model="selectdOption.series[0].itemStyle.normal.color"/>                   
                </Col>
            </FormItem>
        <Col span='6'>
            <FormItem prop="legend">
                Legend<i-switch v-model="selectdOption.legend.show"></i-switch>            
            </FormItem>
        </Col>  
        <Col span='6' offset='1'>  
            <FormItem prop="visualMap">
                VisualMap<i-switch v-model="selectdOption.visualMap.show"></i-switch>            
            </FormItem>
        </Col>  
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
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        show:true,
                        left: 'center',
                    },
                    visualMap: {
                        show:true,
                        min: 0,
                        max: 2500,
                        left: 'left',
                        top: 'bottom',
                        text: ['高','低'], 
                        inRange: {
                            color: ['#e0ffff', '#006edd']
                        },// 文本，默认为数值文本
                        calculable: true
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            saveAsImage : {show: true}
                        }
                    },
                    series: [
                        {
                            name:'',
                            type: 'map',
                            mapType: 'china',
                            roam: false,
                            showLegendSymbol:true,
                            label: {
                                normal: {
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal:{
                                    color: '#f4e925',
                                    borderColor: 'rgba(0, 0, 0, 0.2)'
                            },
                            emphasis:{
                                areaColor: null,
                                shadowOffsetX: 0,
                                shadowOffsetY: 0,
                                shadowBlur: 20,
                                borderWidth: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            data:{name:'',value:''}
                        },
                    ]
                },              
            }
    },
    methods:{
          setData:function(JSONOption){
            let Vue = this;
                Vue.selectdOption = JSON.parse(JSONOption);
           // Vue.$store.commit('getInitOption',Vue.selectdOption);
        },
       sentOption:function(){
           let Vue = this;
           Vue.selectdOption.series[0].name = Vue.selectdOption.series[0].data.value;
           Vue.$emit('getSelectedOption',Vue.selectdOption);
       },
       reset:function(){
           let Vue = this;
           Vue.selectdOption.series[0].name = '';
           Vue.selectdOption.series[0].data.name = '';
           Vue.selectdOption.series[0].data.value = '';
           Vue.selectdOption.visualMap.show = true;
           Vue.selectdOption.legend.show = true;
           Vue.selectdOption.visualMap.inRange.color = ['#e0ffff', '#006edd'];
           Vue.selectdOption.series[0].itemStyle.normal.color = '#f4e925'
       }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->