<template>
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
            Vue.selectedX = util.findIndex(Vue.groupbyList,eoption.series[0].data.name);
            if(Vue.params.isgroupby){
                let yIndex = util.findIndex(Vue.aggregationFun,eoption.series[0].data.value);
                Vue.selectedY = yIndex;
            } else {
                let yIndex = util.findIndex(Vue.metricNoFun,eoption.series[0].data.value);
                Vue.selectedY = yIndex;
            }        
        },

        getOption:function(){
            let Vue = this;
            if (Vue.selectedX!=-1 && Vue.selectedY!=-1) {
                    Vue.params.value = [];
                    Vue.params.groupby = null;
                    let xName = Vue.groupbyList[Vue.selectedX].columnName;
                    let yName = '';
                    Vue.params.groupby = xName;  
                    if(Vue.params.isgroupby == true){
                        yName = Vue.aggregationFun[Vue.selectedY].columnName;
                        Vue.params.value.push(yName);
                    } else {
                        yName = Vue.metricNoFun[Vue.selectedY].columnName;
                        Vue.params.value.push(yName);
                    }  
                return {selectedX:xName,selectedY:yName,params:Vue.params,isvalid:true};
            } else {
                return {selectedX:'',selectedY:'',params:Vue.params,isvalid:false}
            }
        },

        reset:function(){
            this.selectedX = -1;
            this.selectedY = -1;            
            this.params = {value:[],groupby:null,isgroupby:true};
        }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->