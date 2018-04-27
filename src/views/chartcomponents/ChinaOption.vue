<style lang="less">
     @import "./styles/chart.less";
</style>
<template>
   <Row>
       <FormItem prop="provinceSeries">
            ProvinceSeries
             <Select class="form-control" v-model='selectedX'>               
                <Option v-for='(item,index) in groupbyList' :key="item.columnName" :value="index" >{{item.columnAlias}}</Option>
            </Select>
            <Checkbox v-model="params.isgroupby">以该字段分组</Checkbox>
        </FormItem>
        <FormItem prop="valueSeries">
            ValueSeries
             <Select class="form-control" v-model="selectedY">
                <Option v-for='(item,index) in (params.isgroupby==true?aggregationFun:metrics)' :key="item.columnName" :value="index" >{{item.columnAlias}}</Option>
            </Select>
        </FormItem>
        <FormItem prop="color">
                <Col span='7'>
                    HighValueColor
                    <ColorPicker v-model="selectdOption.visualMap.inRange.color[1]" placement='top'/>
                </Col>
                 <Col span='7' offset='2'>
                    LowValueColor
                    <ColorPicker v-model="selectdOption.visualMap.inRange.color[0]" placement='top'/>
                </Col>
                <Col span='6' offset='2'>
                    SymbolColor
                    <ColorPicker v-model="selectdOption.series[0].itemStyle.normal.color" placement='top'/>                   
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
         //dimensions:'dimensions',
        metrics:'metrics',
        groupbyList:'groupbyList',
        aggregationFun:'aggregationFun'
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
                        left: 'left',
                        top: 'bottom',
                        text: ['高','低'], 
                        inRange: {
                            color: ['#e0ffff', '#006edd']
                        },// 文本，默认为数值文本
                        calculable: true,
                        left:'10%',
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
                selectedX:-1,
                selectedY:-1,                
                params:{value:[],groupby:null,isgroupby:true}             
            }
    },
    methods:{
         setData:function(eoption,filters){
            let Vue = this;
            Vue.selectdOption = eoption;
            Vue.params.value = filters.value;
            Vue.params.groupby = filters.groupby;
            Vue.params.isgroupby = filters.isgroupby;
            Vue.selectedY = -1;
            Vue.selectedX = Vue.findIndex(Vue.groupbyList,Vue.selectdOption.series[0].data.name);
            if(Vue.params.isgroupby){
                let yIndex = Vue.findIndex(Vue.aggregationFun,Vue.selectdOption.series[0].data.value);
                Vue.selectedY = yIndex;
            } else {
                let yIndex = Vue.findIndex(Vue.metrics,Vue.selectdOption.series[0].data.value);
                Vue.selectedY = yIndex;
            }
        },
        findIndex:function(list,name){
            var re = -1;
            for(let i=0; i<list.length; i++){
                if(list[i].columnName == name){
                    re = i;
                    break;
                }
            }
            return re;
        },
        sentOption:function(){
           let Vue = this;
            if (Vue.selectedX!=-1 && Vue.selectedY != -1) {
                    Vue.params.value = [];
                    Vue.params.groupby = null;
                    let xName = Vue.groupbyList[Vue.selectedX].columnName;
                    Vue.selectdOption.series[0].data.name = xName;
                    //Vue.params.groupby = Vue.groupbyList[Vue.selectedX];
                    Vue.params.groupby = xName;   
                    if(Vue.params.isgroupby == true){
                        let yName = Vue.aggregationFun[Vue.selectedY].columnName;
                        Vue.selectdOption.series[0].data.value = yName;
                        //Vue.params.value.push(Vue.aggregationFun[Vue.selectedY]);
                        Vue.params.value.push(yName);
                    } else {
                        var yName = Vue.metrics[Vue.selectedY].columnName;
                        Vue.selectdOption.series[0].data.value = yName;
                        //Vue.params.value.push(Vue.metrics[Vue.selectedY]);
                        Vue.params.value.push(yName);
                    }  
                    Vue.$emit('getSelectedOption',{option:Vue.selectdOption,filter:Vue.params,isvalid:true});
            } else {
                Vue.$emit('getSelectedOption',{isvalid:false});
                Vue.$Message.error('ProvinceSeries and ValueSeries is neccessary');
            }
       },
       reset:function(){
            let Vue = this;
            Vue.selectdOption.series[0].name = '';
            Vue.selectdOption.series[0].data.name = '';
            Vue.selectdOption.series[0].data.value = '';
            Vue.selectdOption.visualMap.show = true;
            Vue.selectdOption.legend.show = true;
            Vue.selectdOption.visualMap.inRange.color = ['#e0ffff', '#006edd'];
            Vue.selectdOption.series[0].itemStyle.normal.color = '#f4e925';
            Vue.selectedX = -1;
            Vue.selectedY = -1;                
            Vue.params = {value:[],groupby:null,isgroupby:true}  
       }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->