<template>
     <div class="text">
        <div class="no-drag">
          <Dropdown style='float:right;margin-right:5px' @on-click='selectChart'>   
            <Icon type="arrow-down-b"></Icon>
            <DropdownMenu slot="list">
                <DropdownItem name="line">line</DropdownItem>
                <DropdownItem name="line2">line2</DropdownItem>
            </DropdownMenu>
          </Dropdown> 
          <div class='griditem-title'><input style='background-color:lightgray;border: 0;'placeholder="点击编辑title" :value='griditemTitle'></input></div>
          <component :is="component"></component>
        </div>
        <div class="vue-draggable-handle"></div> 
    </div>
</template>

<script>
import line from "./line.vue"
import line2 from "./line2.vue"
import {mapGetters} from 'vuex'
export default {
    components: {
        line2,
        line
    },
    props:['griditemTitle','portletID'],
    data(){
      return {
        component:null
      }
    },
    methods:{
        selectChart(name){
          if(name =="line"){
            this.component=line;
            var tabs = [{"portletID":this.portletID,"title":this.griditemTitle,"objtype":"Line","objid":"charid"}];
            this.$store.commit("addChartComponent",tabs);
          }
          if(name == "line2"){
            this.component=line2;
            this.$store.commit("addChartComponent",{title:this.griditemTitle,chartId:"#myChartLine2"});
          }
        }
    }
}
</script>

<style scoped>
.griditem-title{
    background-color:lightgray;
}
</style>
