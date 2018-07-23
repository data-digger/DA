<template>
   <component ref='dataselect' :is="dataselect"/>
</template>
<script>

import BarData from './DataSelectBar'
import PieData from './DataSelectPie'
import {mapGetters} from 'vuex'

export default {
    props:{
            chartType: {
                type: String,
                default:'Bar'
            },
    },
    components:{
        BarData,
        PieData
    },
    computed: {
        ...mapGetters({
        }),
        dataselect : function(){
            switch(this.chartType){
              case 'Bar':
                return BarData;
              case 'Pie':
                return PieData;
              case 'Stack':
                return BarData;
          }
        }
    },
    data () {
        return {
            
            }
    },
    methods: {
        setData:function(eoption,filters){
           this.$refs['dataselect'].setData(eoption,filters);
        },

        getDataOption:function(){
            return this.$refs['dataselect'].getOption();
          
        },
       reset:function(){
           this.$refs['dataselect'].reset();
       }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->