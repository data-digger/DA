<template>
   <component ref='nothemeoption' :is="nothemecomponent"></component>
</template>
<script>
import ChartTemplate from './../../../libs/ChartTemplate.js'
import Bar from './NoThemeBar'
import Pie from './NoThemePie'
import Stack from './NoThemeStack'
import {mapGetters} from 'vuex'
export default {
    props:{
            chartType: {
                type: String,
                default:'Bar'
            },
    },
    components:{
        Bar,
        Pie,
        Stack
    },
    computed: {
      ...mapGetters({
          //此处应获取图表类型，或者从父组件传入图表类型参数
      }),
      nothemecomponent: function(){
          switch(this.chartType){
              case 'Bar':
                return Bar;
              case 'Pie':
                return Pie;
              case 'Stack':
                return Stack;
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