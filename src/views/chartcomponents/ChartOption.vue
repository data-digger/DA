<style lang="less">
    @import "./styles/chart.less";
</style>
<template>
   <Row>
       <DataSelectOption ref='dataSelectOption'  :type="type"/>
       <ThemeOption ref='themeOption' :type="type"/>
    </Row>
</template>
<script>
import DataSelectOption from './DataSelect/DataSelectOption'
import ThemeOption from './ThemeOption'
import {mapGetters} from 'vuex'
export default {
    props:['type'],
    computed: {
      ...mapGetters({
      }),
    },
    components:{
    DataSelectOption,
    ThemeOption,
  },
    data () {
        return {
                dateOption:null,
                themeOption : null,
            }
    },
    methods: {
         setData:function(eoption,filters,theme){
           this.$refs['dataSelectOption'].setData(eoption,filters);
           this.$refs['themeOption'].setData(eoption,theme)
         },
         getOption:function(){
           this.dataOption = this.$refs['dataSelectOption'].getDataOption();
           this.themeOption = this.$refs['themeOption'].getThemeOption(this.dataOption);
           let option = {
                option:this.themeOption.option,
                filter:this.dataOption.params,
                isvalid:this.dataOption.isvalid,
                theme:this.themeOption.theme
            };
           this.$emit('getSelectedOption',option);
        },
        attachData:function(eoption,data){
            this.$refs['themeOption'].attachData(eoption,data);
        },
        reset:function(){
            this.$refs['dataSelectOption'].reset();
            this.$refs['themeOption'].reset()
       }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->