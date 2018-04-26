<style lang="less">
     @import "./styles/chart.less";
</style>
<template>
   <Row>
        <FormItem prop="yAxis">
            YAxis
            <Select class="form-control" v-model='selectedY'>               
                <Option v-for='(item,index) in groupbyList' :key="item.columnName" :value="index" >{{item.columnAlias}}</Option>
            </Select>
            <Checkbox v-model="params.isgroupby">以该字段分组</Checkbox>            
        </FormItem>
        <FormItem prop="xAxis">
            XAxis
            <Select v-model="selectedX" multiple>
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
                    xAxis : [{
                            type: 'value',
                            boundaryGap: [0, 0.01]
                        }],
                    yAxis : 
                        {
                            type: 'category',
                            data: '',
                            name:'',
                        },
                    series : [
                    ]
                },              
                colorSelected:0,
                selectedX:[],  
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
            Vue.selectedX = [];
            Vue.selectedY = Vue.findIndex(Vue.groupbyList,Vue.selectdOption.yAxis.data);
            let colorFirst = Vue.selectdOption.color[0];
            if(Vue.params.isgroupby){
                    for(let i in Vue.selectdOption.series){
                        let xIndex = Vue.findIndex(Vue.aggregationFun,Vue.selectdOption.series[i].data);
                        Vue.selectedX.push(xIndex);
                    } 
            } else {
                for(let i in Vue.selectdOption.series){
                        let xIndex = Vue.findIndex(Vue.metrics,Vue.selectdOption.series[i].data);
                        Vue.selectedX.push(xIndex);
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
            if (Vue.selectedY!=-1 && Vue.selectedX.length>0) {
                Vue.params.value = [];
                Vue.params.groupby = null;
                let yName = Vue.groupbyList[Vue.selectedY].columnName;
                let yAlias = Vue.groupbyList[Vue.selectedY].columnAlias;
                Vue.selectdOption.yAxis.name = yAlias;
                Vue.selectdOption.yAxis.data = yName;
                Vue.params.groupby = Vue.groupbyList[Vue.selectedY];
                Vue.selectdOption.color = ChartTemplate.COLORS[Vue.colorSelected].color;
                //Vue.selectdOption.legend.data = [];
                Vue.selectdOption.series = [];           
                for (let i in Vue.selectedX){
                    if(Vue.params.isgroupby == true){
                        let xName = Vue.aggregationFun[Vue.selectedX[i]].columnName;
                        let xAlias = Vue.aggregationFun[Vue.selectedX[i]].columnAlias;
                        Vue.selectdOption.series.push({name:xAlias,data:xName,type: 'bar'});
                        Vue.params.value.push(Vue.aggregationFun[Vue.selectedX[i]]);
                    } else {
                        var xName = Vue.metrics[Vue.selectedX[i]].columnName;
                        var xAlias = Vue.metrics[Vue.selectedX[i]].columnAlias;
                        Vue.selectdOption.series.push({name:xAlias,data:xName,type: 'bar'});
                        Vue.params.value.push(Vue.metrics[Vue.selectedX[i]]);
                    }  
                    
                }
                Vue.$emit('getSelectedOption',{option:Vue.selectdOption,filter:Vue.params,isvalid:true});
            } else {
                Vue.$emit('getSelectedOption',{isvalid:false});
                Vue.$Message.error('x and y is neccessary');
            }
       },
       reset:function(){
            let Vue = this;
            Vue.selectdOption.color = ChartTemplate.COLORS[0].color;
            Vue.selectedX = [];
            Vue.selectdOption.yAxis.data= '';
            Vue.selectdOption.yAxis.name = '';
            Vue.selectdOption.series = [];
            Vue.selectdOption.grid.left='3%';
            Vue.selectdOption.grid.right = '10%';
            Vue.selectdOption.grid.top = '10%';
            Vue.selectdOption.grid.bottom = '3%';
            Vue.colorSelected = 0;
            Vue.selectedX = [];  
            Vue.selectedY = -1;
            Vue.params = {value:[],groupby:null,isgroupby:true};
       }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
