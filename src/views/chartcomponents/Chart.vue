<template>
   <div :style="styles" class="previewChart" :id="'previewChart'+chartId"></div>
</template>
<script>
import echarts from 'echarts'
import chartUtil from './../../libs/chartUtil.js'
export default {
    props:["chartId","option","styles"],
    data () {
        return {
            chartView:null
        }
    },
    methods:{
        show(option){
        let Vue = this;
        if(Vue.chartView != null){
            Vue.chartView.dispose();
        }    
        Vue.chartView = echarts.init(document.getElementById('previewChart'+Vue.chartId));       
        Vue.chartView.setOption(option); 
        },
        reset(){
            let Vue = this;
            if(Vue.chartView != null){
                Vue.chartView.dispose();
                Vue.chartView = null;
            }
        }
    },
    mounted(){
        $(window).resize(function() {
            if(this.chartView != null){
                this.chartView.resize();
            }
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .previewChart{
    height: 250px;
  }
  </style>