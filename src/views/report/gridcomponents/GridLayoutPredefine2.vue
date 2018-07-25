<template>
    <grid-layout
      :layout="portlets"
      :col-num="12"
      :row-height="30"
      :is-draggable="false"
      :is-resizable="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item 
        v-for="item in portlets"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key='item.i'>
          <GridItemContent 
            :portletID="item.i"  
            :hasExtraIcon = 'false'
          ></GridItemContent>
      </grid-item>
    </grid-layout>
</template>
<script>
import VueGridLayout from "vue-grid-layout/dist/vue-grid-layout.js"
import GridItemContent from "./GridItem.vue"
var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;
export default {
  components: {
    "GridLayout": GridLayout,
    "GridItem": GridItem,
    GridItemContent
  },
  data(){
    return{
      portlets:[
        {"portletID":"0",
          "name":"",
          "x":0,"y":0,"w":6,"h":12,"i":"0",
          "tabs":[{"id":"0","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]
        },
        {"portletID":"1",
          "name":"",
          "x":6,"y":8,"w":6,"h":6,"i":"1",
          "tabs":[{"id":"1","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]
        } ,
        {"portletID":"2",
          "name":"",
          "x":6,"y":8,"w":6,"h":6,"i":"2",
          "tabs":[{"id":"2","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]
        }]                    
    }
  },
  mounted(){
    this.saveCurrentReportGridItem();
  },
  
  methods:{
    saveCurrentReportGridItem(){
      this.$store.commit("saveCurrentReportGridItem",this.portlets); 
    }
  }
}
</script>
<style scoped>
.griditem-title{
 background-color:lightgray;
}
</style>