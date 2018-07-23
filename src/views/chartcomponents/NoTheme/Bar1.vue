<template>
      <Row>
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
        <FormItem prop="colorTex">
        Color
        </FormItem> 
        <FormItem prop="color">
            <RadioGroup v-model="option.color" type="button">
                <Radio v-for='(c,index) in COLORS' :label="index" :key="index">
                    <img v-bind:src="c.src">
                </Radio>
            </RadioGroup>                
        </FormItem> 
        <FormItem prop="legend">
            <span class="legend-area">Legend&nbsp;</span><i-switch v-model="option.legend.show"></i-switch>            
        </FormItem>          
    </Row>
</template>
<script>
import ChartTemplate from './../../../libs/ChartTemplate.js'
import {mapGetters} from 'vuex'
import util from './../util.js'
export default {
    props:[],
    computed: {
      ...mapGetters({

      }),
      COLORS : function(){
          return ChartTemplate.COLORS;
      },
    },
    data () {
        return {
                option:{
                    color:0,
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
            }
    },
    methods: {
         setData:function(eoption,theme){
            this.option = $.extend(true, {}, eoption);;
                
        },
        getOption:function(dataOption){
           let xAxisName = dataOption.selectedX;
           let seriesName = dataOption.selectedY;
           this.option.xAxis.name = xAxisName.xAlias;
           this.option.xAxis.data = xAxisName.xName;
           this.option.series = [];
           for(let i=0; i<seriesName.length; i++){
               this.option.series.push({name:seriesName[i].yAlias,data:seriesName[i].yName,type: 'bar'})
           }
           return this.option;
          
       },
       attachData:function(eoption,data){
            util.attachData(eoption,data,'Bar',0);
        },
       reset:function(){
           let Vue = this;
           Vue.option.color = 0;
           Vue.option.xAxis.data= '',
           Vue.option.legend.show = true;
           Vue.option.series = [];
           Vue.option.grid.left='3%';
           Vue.option.grid.right = '10%';
           Vue.option.grid.top = '10%';
           Vue.option.grid.bottom = '3%';
       }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->