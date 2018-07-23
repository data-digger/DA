<template>
   <Row>
        <FormItem prop="theme">
            主题
            <Select class="form-control" v-model='selectedTheme'>               
                <Option v-for='(item,index) in THEMES' :key="item" :value="index" >{{item}}</Option>
            </Select>
        </FormItem>
        <component ref='theme' :is="themecomponent" :chart-type="chartType"/>        
    </Row>
</template>
<script>
import ChartTemplate from './../../libs/ChartTemplate.js'
import {mapGetters} from 'vuex'
import NoThemeOption from './NoTheme/NoThemeOption'
import CMBThemeOption from './CMBTheme/CMBThemeOption'
export default {
    props:{
            chartType: {
                type: String,
                default:'Bar'
            },
    },
    components:{
        NoThemeOption,
        CMBThemeOption
    },
    computed: {
      THEMES : function(){
          return ChartTemplate.THEME;
      },
      themecomponent: function(){
          switch(this.selectedTheme){
                case 0:
                    return NoThemeOption;
                case 1:
                    return CMBThemeOption
          }
      }
    },
    data () {
        return {
                selectedTheme:0,
                option:null
            }
    },
    methods: {
         setData:function(eoption,theme){
            let Vue = this;
            Vue.selectedTheme = theme; 
            this.$refs['theme'].setData(eoption,theme);
        },
         getThemeOption:function(dataOption){
            this.option = this.$refs['theme'].getOption(dataOption);
            return {theme:this.selectedTheme,option:this.option};
        },
        attachData:function(eoption,data){
            this.$refs['theme'].attachData(eoption,data);
        },
        reset:function(){
            this.selectedTheme = 0;
            this.option = null;
        }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->