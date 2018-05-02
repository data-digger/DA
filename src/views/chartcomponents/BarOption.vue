<style lang="less">
    @import "./styles/chart.less";
</style>
<template>
   <Row>
       <Form id="barOption" ref="barOption" :label-width="80">
        <FormItem prop="xAxis">
            XAxis
            <Select class="form-control" v-model='selectedX'>               
                <Option v-for='(item,index) in groupbyList' :key="item.columnName" :value="index" >{{item.columnAlias}}</Option>
            </Select>
            <Checkbox v-model="params.isgroupby">以该字段分组</Checkbox>
        </FormItem>
        <FormItem prop="yAxis">
            YAxis
            <Select v-model="selectedY" multiple>
                <Option v-for='(item,index) in (params.isgroupby==true?aggregationFun:metrics)' :key="item.columnName" :value="index" >{{item.columnAlias}}</Option>
            </Select>
        </FormItem>
        <FormItem prop="Position">
            <Col span='5'>
                Left
                <Input v-model="selectdOption.grid.left"></Input>                    
            </Col>
            <Col span='5' offset='1'>
                Right
                <Input v-model="selectdOption.grid.right"></Input>                    
            </Col>
            <Col span='5' offset='1'>
                Top
                <Input v-model="selectdOption.grid.top"></Input>                    
            </Col>
            <Col span='6' offset='1'>
                Bottom
                <Input v-model="selectdOption.grid.bottom"></Input>                    
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
    </Form>           
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
                        trigger: 'axis'
                    },
                    legend: {
                        show:true
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            saveAsImage : {show: true}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '10%',
                        bottom: '3%',
                        top:'10%',
                        containLabel: true
                    },
                    calculable : true,
                    xAxis : {
                            type : 'category',
                            axisLabel: {  
                                interval:0,  
                                rotate:40  
                            },
                            name:'',
                            data : '',
                        },
                    yAxis : [
                        {
                            type : 'value',
                        }
                    ],                    
                    series : [
                    ]
                },
                selectedX:-1,
                selectedY:[],                
                colorSelected:0,
                params:{value:[],groupby:null,isgroupby:true}
            }
    },
    methods: {
         setData:function(eoption,filters){
            let Vue = this;
                Vue.selectdOption = $.extend(true, {}, eoption);
                Vue.params.value = filters.value;
                Vue.params.groupby = filters.groupby;
                Vue.params.isgroupby = filters.isgroupby;
                Vue.selectedY = [];
                Vue.selectedX = Vue.findIndex(Vue.groupbyList,Vue.selectdOption.xAxis.data);
                let colorFirst = Vue.selectdOption.color[0];
                if(Vue.params.isgroupby){
                     for(let i in Vue.selectdOption.series){
                            let yIndex = Vue.findIndex(Vue.aggregationFun,Vue.selectdOption.series[i].data);
                            Vue.selectedY.push(yIndex);
                        } 
                } else {
                    for(let i in Vue.selectdOption.series){
                            let yIndex = Vue.findIndex(Vue.metrics,Vue.selectdOption.series[i].data);
                            Vue.selectedY.push(yIndex);
                        } 
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
            if (Vue.selectedX!=-1 && Vue.selectedY.length>0) {
                    Vue.params.value = [];
                    Vue.params.groupby = null;
                    let xName = Vue.groupbyList[Vue.selectedX].columnName;
                    let xAlias = Vue.groupbyList[Vue.selectedX].columnAlias;
                    Vue.selectdOption.xAxis.name = xAlias;
                    Vue.selectdOption.xAxis.data = xName;
                    //Vue.params.groupby = Vue.groupbyList[Vue.selectedX];
                    Vue.params.groupby = xName;
                    Vue.selectdOption.color = ChartTemplate.COLORS[Vue.colorSelected].color;
                    //Vue.selectdOption.legend.data = [];
                    Vue.selectdOption.series = [];           
                    for (let i in Vue.selectedY){
                        if(Vue.params.isgroupby == true){
                            let yName = Vue.aggregationFun[Vue.selectedY[i]].columnName;
                            let yAlias = Vue.aggregationFun[Vue.selectedY[i]].columnAlias;
                            Vue.selectdOption.series.push({name:yAlias,data:yName,type: 'bar'});
                            //Vue.params.value.push(Vue.aggregationFun[Vue.selectedY[i]]);
                            Vue.params.value.push(yName);
                        } else {
                            var yName = Vue.metrics[Vue.selectedY[i]].columnName;
                            var yAlias = Vue.metrics[Vue.selectedY[i]].columnAlias;
                            Vue.selectdOption.series.push({name:yAlias,data:yName,type: 'bar'});
                            //Vue.params.value.push(Vue.metrics[Vue.selectedY[i]]);
                            Vue.params.value.push(yName);
                        }  
                        
                    }
                    Vue.$emit('getSelectedOption',{option:Vue.selectdOption,filter:Vue.params,isvalid:true});
            } else {
                Vue.$emit('getSelectedOption',{isvalid:false});
                Vue.$Message.error('X轴与Y轴不可为空');
            }
          
       },
       reset:function(){
           let Vue = this;
           Vue.selectdOption.color = ChartTemplate.COLORS[0].color;
           Vue.selectedX = -1;
           Vue.selectedY = [];
           Vue.selectdOption.xAxis.data= '',
           Vue.selectdOption.legend.show = true;
           //Vue.selectdOption.legend.data = Vue.selectedY;
           Vue.selectdOption.series = [];
           Vue.selectdOption.grid.left='3%';
           Vue.selectdOption.grid.right = '10%';
           Vue.selectdOption.grid.top = '10%';
           Vue.selectdOption.grid.bottom = '3%';
           Vue.colorSelected = 0;
           Vue.params = {value:[],groupby:null,isgroupby:true};
       }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->