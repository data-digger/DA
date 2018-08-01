<template>
   <component ref='cmbthemeoption' :is="cmbthemecomponent"/>
</template>
<script>
import ChartTemplate from './../../../libs/ChartTemplate.js'
import CMBThemeBar from './CMBThemeBar'
import CMBThemeStack from './CMBThemeStack'
import CMBThemeGuage from './CMBThemeGuage'
import CMBThemeFourQuadrant from './CMBThemeFourQuadrant'
import CMBThemeHBar from './CMBThemeHBar'
import CMBInforList from './CMBThemeInforList'
import CMBThemeBar2 from './CMBThemeBar2'
import {mapGetters} from 'vuex'
export default {
    props:{
            chartType: {
                type: String,
                default:'Bar'
            },
    },
    components:{
        CMBThemeBar,
        CMBThemeStack,
        CMBThemeGuage,
        CMBThemeFourQuadrant,
        CMBThemeHBar,
        CMBInforList,
        CMBThemeBar2
    },
    computed: {
      ...mapGetters({
          //此处应获取图表类型，或者从父组件传入图表类型参数
      }),
      cmbthemecomponent: function(){
          switch(this.chartType){
                case 'Bar':
                    return CMBThemeBar;
                case 'Stack':
                    return CMBThemeStack;
                case 'Guage':
                    return CMBThemeGuage;
                case 'FourQuadrant':
                    return CMBThemeFourQuadrant;
                case 'HBar':
                    return CMBThemeHBar;
                case 'InforList':
                    return CMBInforList;
                case 'Bar2':
                    return CMBThemeBar2;
          }
      }
    },
    methods: {
        setData:function(eoption,theme){
           this.$refs['cmbthemeoption'].setData(eoption,theme);
                
        },

       getOption:function(dataOption){
           return this.$refs['cmbthemeoption'].getOption(dataOption);
          
       },
       attachData:function(eoption,data){
            this.$refs['cmbthemeoption'].attachData(eoption,data);
        },
       reset:function(){
           this.$refs['cmbthemeoption'].reset();
       }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->