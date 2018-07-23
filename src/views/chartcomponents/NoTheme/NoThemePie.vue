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
            }
    },
    methods: {
         setData:function(eoption,theme){
            this.option = $.extend(true, {}, eoption);;
                
        },
        getOption:function(dataOption){
           let xAxisName = dataOption.selectedX;
           let seriesName = dataOption.selectedY;
           this.option.series[0].data.name = xAxisName;
           this.option.series[0].data.value = seriesName;
           return this.option;
          
       },
       attachData:function(eoption,data){
            util.attachData(eoption,data,'Pie',0);
        },
       reset:function(){
            this.option.color = 0;
            this.option.series[0].data.name = '';
            this.option.series[0].data.value = '';
            this.option.series[0].radius = '60%';
            this.option.series[0].center[0]='50%';
            this.option.series[0].center[1]='50%';
       }
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->