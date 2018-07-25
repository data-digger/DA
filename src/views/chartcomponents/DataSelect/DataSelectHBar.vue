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
                <Option v-for='(item,index) in (params.isgroupby==true?aggregationFun:metricNoFun)' :key="item.columnName" :value="index" >{{item.columnAlias}}</Option>
            </Select>
        </FormItem>
   </Row>
</template>
<script>

import {mapGetters} from 'vuex'
import util from './../util.js'

export default {
    computed: {
      ...mapGetters({
        metrics:'metrics',
        groupbyList:'groupbyList',
        aggregationFun:'aggregationFun'
      }),
      metricNoFun : function(){
          return this.metrics.filter(m => m.category != 2);
      }
    },
    data () {
        return {
                selectedX:[],
                selectedY:-1,                
                params:{value:[],groupby:null,isgroupby:true}
            }
    },
    methods: {
        setData:function(eoption,filters){
            let Vue = this;
            Vue.params.value = filters.value;
            Vue.params.groupby = filters.groupby;
            Vue.params.isgroupby = filters.isgroupby;
            Vue.selectedX = [];
            Vue.selectedY = util.findIndex(Vue.groupbyList,eoption.yAxis[0].data);
            if(Vue.params.isgroupby){
                for(let i in eoption.series){
                    let xIndex = util.findIndex(Vue.aggregationFun,eoption.series[i].data);
                    Vue.selectedX.push(xIndex);
                } 
            } else {
                for(let i in eoption.series){
                        let xIndex = util.findIndex(Vue.metricNoFun,eoption.series[i].data);
                        Vue.selectedX.push(xIndex);
                    } 
            }
                
        },

        getOption:function(){
            let Vue = this;
            if (Vue.selectedY!=-1 && Vue.selectedX.length>0) {
                    Vue.params.value = [];
                    Vue.params.groupby = null;
                    let yAxisName = {};
                    yAxisName.yName = Vue.groupbyList[Vue.selectedY].columnName;
                    yAxisName.yAlias = Vue.groupbyList[Vue.selectedY].columnAlias;
                    Vue.params.groupby = yAxisName.yName;
                    let seriesName = [];           
                    for (let i in Vue.selectedX){
                        if(Vue.params.isgroupby == true){
                            let xName = Vue.aggregationFun[Vue.selectedX[i]].columnName;
                            let xAlias = Vue.aggregationFun[Vue.selectedX[i]].columnAlias;
                            seriesName.push({xName:xName,xAlias:xAlias});
                            Vue.params.value.push(xName);
                        } else {
                            let xName = Vue.metricNoFun[Vue.selectedX[i]].columnName;
                            let xAlias = Vue.metricNoFun[Vue.selectedX[i]].columnAlias;
                            seriesName.push({xName:xName,xAlias:xAlias});
                            Vue.params.value.push(xName);
                        }    
                    }
                return {selectedX:seriesName,selectedY:yAxisName,params:this.params,isvalid:true};
            } else {
                return {selectedX:[],selectedY:'',params:this.params,isvalid:false}
            }           
        },

        reset:function(){
            this.selectedX = [];
            this.selectedY = -1;          
            this.params = {value:[],groupby:null,isgroupby:true};
        }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->