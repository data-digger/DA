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
                selectedTheme:1,
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

{"filters":{"orderby":{"field":"","type":"ASC"},"limit":200,"where":[{"field":"category_id","mark":"=","value":"1"}],"whereType":["select"],"value":["film_cnt"],"groupby":null,"isgroupby":false},"option":{"backgroundColor":"#031845","title":[{"x":"center","top":"59%","text":"总数统计","textStyle":{"fontWeight":"bolder","fontSize":18,"color":"#fff"}}],"tooltip":{"show":true},"series":[{"name":"总数统计","type":"gauge","startAngle":180,"endAngle":0,"min":"0","max":100,"radius":"60%","center":["50%","55%"],"axisLine":{"show":false,"lineStyle":{"width":25,"shadowBlur":0,"color":[[0.5,"#91c7ae"],[0.8,"#EFC631"],[1,"#c23531"]]}},"axisTick":{"show":false,"splitNumber":0},"splitLine":{"show":false,"length":20},"axisLabel":{"show":true,"distance":"10","textStyle":{"fontWeight":"bolder","fontSize":16}},"pointer":{"show":true,"length":"58%","color":"#ffffff"},"detail":{"show":true,"offsetCenter":[0,"60%"],"textStyle":{"fontSize":30,"fontWeight":"bolder"},"formatter":"{value}%"},"itemStyle":{"normal":{"color":"#ffffff"}},"data":[{"value":"film_cnt"}]}]},"theme":1}