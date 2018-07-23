<template>
   <component ref='cmbthemeoption' :is="cmbthemecomponent"/>
</template>
<script>
import ChartTemplate from './../../../libs/ChartTemplate.js'
import CMBBar1 from './CMBBar1'
import {mapGetters} from 'vuex'
export default {
    props:{
            chartType: {
                type: String,
                default:'Bar'
            },
    },
    components:{
        CMBBar1,
    },
    computed: {
      ...mapGetters({
          //此处应获取图表类型，或者从父组件传入图表类型参数
      }),
      cmbthemecomponent: function(){
          switch(this.chartType){
              case 'Bar':
                return CMBBar1;
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