<template>
   <component ref='nothemeoption' :is="nothemecomponent"></component>
</template>
<script>
import ChartTemplate from './../../../libs/ChartTemplate.js'
import Bar1 from './Bar1'
import Pie from './Pie'
import {mapGetters} from 'vuex'
export default {
    props:{
            chartType: {
                type: String,
                default:'Bar'
            },
    },
    components:{
        Bar1,
        Pie
    },
    computed: {
      ...mapGetters({
          //此处应获取图表类型，或者从父组件传入图表类型参数
      }),
      nothemecomponent: function(){
          switch(this.chartType){
              case 'Bar':
                return Bar1;
              case 'Pie':
                return Pie;
          }
      }
    },
    methods: {
        setData:function(eoption,theme){
           this.$refs['nothemeoption'].setData(eoption,theme);
                
        },

       getOption:function(dataOption){
           return this.$refs['nothemeoption'].getOption(dataOption);
          
       },
       attachData:function(eoption,data){
            this.$refs['nothemeoption'].attachData(eoption,data);
        },
       reset:function(){
           this.$refs['nothemeoption'].reset();
       }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->