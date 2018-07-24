<template>
   <Row>
    <FormItem prop="value">
        Data
        <Select class="form-control" v-model='selectdData'>               
            <Option v-for='(item,index) in metrics' :key="item.columnName" :value="index" >{{item.columnAlias}}</Option>
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
      }),
    },
    data () {
        return {
                 selectdData:-1,
                 params:{value:[],groupby:null,isgroupby:false}
            }
    },
    methods: {
        setData:function(eoption,filters){
            let Vue = this;
            Vue.params.value = filters.value;
            Vue.params.groupby = filters.groupby;
            Vue.params.isgroupby = filters.isgroupby;
            Vue.selectdData = util.findIndex(Vue.metrics,eoption.series[0].data[0].value);        
        },

        getOption:function(){
            let Vue = this;
            let selected = {};
            if (Vue.selectdData != -1){
                Vue.params.value = [];
                selected.dataName = Vue.metrics[Vue.selectdData].columnName;
                selected.dataAlias = Vue.metrics[Vue.selectdData].columnAlias;
                Vue.params.value.push(selected.dataName);
                return {selectedData:selected,params:this.params,isvalid:true};
            } else {
                return {selectedData:'',params:this.params,isvalid:false}
            }
           
        },

        reset:function(){
            this.selectdData = -1;   
            this.params = {value:[],groupby:null,isgroupby:true};
        }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->