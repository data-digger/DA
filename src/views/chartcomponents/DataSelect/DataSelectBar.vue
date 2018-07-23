<template>
   <Row>
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
                selectedX:-1,
                selectedY:[],                
                params:{value:[],groupby:null,isgroupby:true}
            }
    },
    methods: {
        setData:function(eoption,filters){
            let Vue = this;
            Vue.params.value = filters.value;
            Vue.params.groupby = filters.groupby;
            Vue.params.isgroupby = filters.isgroupby;
            Vue.selectedY = [];
            Vue.selectedX = util.findIndex(Vue.groupbyList,eoption.xAxis.data);
            if(Vue.params.isgroupby){
                for(let i in eoption.series){
                    let yIndex = util.findIndex(Vue.aggregationFun,eoption.series[i].data);
                    Vue.selectedY.push(yIndex);
                } 
            } else {
                for(let i in eoption.series){
                        let yIndex = util.findIndex(Vue.metricNoFun,eoption.series[i].data);
                        Vue.selectedY.push(yIndex);
                    } 
            }
                
        },

        getOption:function(){
            let Vue = this;
            if (Vue.selectedX!=-1 && Vue.selectedY.length>0) {
                    Vue.params.value = [];
                    Vue.params.groupby = null;
                    let xAxisName = {};
                    xAxisName.xName = Vue.groupbyList[Vue.selectedX].columnName;
                    xAxisName.xAlias = Vue.groupbyList[Vue.selectedX].columnAlias;
                    Vue.params.groupby = xAxisName.xName;
                    let seriesName = [];           
                    for (let i in Vue.selectedY){
                        if(Vue.params.isgroupby == true){
                            let yName = Vue.aggregationFun[Vue.selectedY[i]].columnName;
                            let yAlias = Vue.aggregationFun[Vue.selectedY[i]].columnAlias;
                            seriesName.push({yName:yName,yAlias:yAlias});
                            Vue.params.value.push(yName);
                        } else {
                            let yName = Vue.metricNoFun[Vue.selectedY[i]].columnName;
                            let yAlias = Vue.metricNoFun[Vue.selectedY[i]].columnAlias;
                            seriesName.push({yName:yName,yAlias:yAlias});
                            Vue.params.value.push(yName);
                        }    
                    }
                return {selectedX:xAxisName,selectedY:seriesName,params:this.params,isvalid:true};
            } else {
                return {selectedX:'',selectedY:[],params:this.params,isvalid:false}
            }
            
           
        },

        reset:function(){
            this.selectedX = -1;
            this.selectedY = [];          
            this.params = {value:[],groupby:null,isgroupby:true};
        }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->