<style lang="less">
     @import "./styles/chart.less";
</style>
<template>
   <Row>
         <Row>
            <Col span='11'>
                <FormItem prop="xAxis">
                    NameSeries
                    <Select class="form-control" v-model='selectedX'>               
                        <Option v-for='(item,index) in groupbyList' :key="item.columnName" :value="index" >{{item.columnAlias}}</Option>
                    </Select>
                    <Checkbox v-model="params.isgroupby">以该字段分组</Checkbox>
                </FormItem>
            </Col>
            <Col span='11' offset='2'>
                <FormItem prop="yAxis">
                    ValueSeries
                    <Select class="form-control" v-model="selectedY">
                        <Option v-for='(item,index) in (params.isgroupby==true?aggregationFun:metrics)' :key="item.columnName" :value="index" >{{item.columnAlias}}</Option>
                    </Select>
                </FormItem>
            </Col>
        </Row>
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
                selectedX:-1,
                selectedY:-1,                
                params:{value:[],groupby:null,isgroupby:true}
            }
    },
    methods:{
        setData:function(eoption,filters){
            let Vue = this;
            Vue.selectdOption = $.extend(true, {}, eoption);
            Vue.params.value = filters.value;
            Vue.params.groupby = filters.groupby;
            Vue.params.isgroupby = filters.isgroupby;
            Vue.selectedY = -1;
            Vue.selectedX = Vue.findIndex(Vue.groupbyList,Vue.selectdOption.series[0].data.name);
            let colorFirst = Vue.selectdOption.color[0];
            if(Vue.params.isgroupby){
                let yIndex = Vue.findIndex(Vue.aggregationFun,Vue.selectdOption.series[0].data.value);
                Vue.selectedY = yIndex;
            } else {
                let yIndex = Vue.findIndex(Vue.metrics,Vue.selectdOption.series[0].data.value);
                Vue.selectedY = yIndex;
            }
            for (let j in ChartTemplate.COLORS){
                if(ChartTemplate.COLORS[j].color[0] == colorFirst){
                    Vue.colorSelected = parseInt(j);
                    break;
                }
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
                    Vue.selectdOption.color = ChartTemplate.COLORS[Vue.colorSelected].color;      
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
                Vue.$Message.error('NameSeries and ValueSeries is neccessary');
            }
       },
       reset:function(){
            let Vue = this;
            Vue.selectdOption.color = ChartTemplate.COLORS[0].color;
            Vue.selectdOption.series[0].data.name = '';
            Vue.selectdOption.series[0].data.value = '';
            Vue.selectdOption.series[0].radius = '60%';
            Vue.selectdOption.series[0].center[0]='50%';
            Vue.selectdOption.series[0].center[1]='50%';
            Vue.colorSelected = 0;
            Vue.selectedX = -1;
            Vue.selectedY=-1;               
            Vue.params = {value:[],groupby:null,isgroupby:true}
       }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->