<template>
   <div class="previewChart" :id="'previewChart'+chartbox.id"></div>
</template>
<script>
import echarts from 'echarts'
import chartUtil from './../../libs/chartUtil.js'
export default {
    props:["chartbox","option"],
    data () {
        return {
            chartView:null
        }
    },
    methods:{
        show(){
        let Vue = this;
        if(Vue.chartView != null){
            Vue.chartView.dispose();
        }    
        Vue.chartView = echarts.init(document.getElementById('previewChart'+Vue.chartbox.id));       
        Vue.chartView.setOption(Vue.option); 
},
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .previewChart{
    height: 250px;
  }
  </style>