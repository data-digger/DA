<template>
     <div>
      <div class="toolbar"><Button @click="addPortlet()">添加模块</Button></div>
      <grid-layout 
        :layout="report.defineJSON.content.portlets" 
        :col-num="12" 
        :row-height="30" 
        :is-draggable="draggable" 
        :is-resizable="resizable" 
        :vertical-compact="true" 
        :use-css-transforms="true">
        <grid-item 
          v-for="item in report.defineJSON.content.portlets" 
          :x="item.x" 
          :y="item.y" 
          :w="item.w" 
          :h="item.h" 
          :i="item.i" 
          :key='item.i' 
          drag-ignore-from=".no-drag" 
          drag-allow-from=".vue-draggable-handle">
          <GridItemContent 
            :portletID="item.i" 
            ref='gridItemContent'
          ></GridItemContent>
        </grid-item>
      </grid-layout>        
    </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout/dist/vue-grid-layout.js"
import GridItemContent from "./GridItem.vue"
import {mapGetters} from 'vuex'
var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;
export default {
  components: {
    "GridLayout": GridLayout,
    "GridItem": GridItem,
    GridItemContent
  },
  data () {
    return {
      draggable: true,
      resizable: true,
      index:-1,
      report:{
        defineJSON:{
          header:{
            conditons:[],
            globalFilter:[]
          },
          content:{
            portlets:[]
          },
          tail:{}
        }
      }
      
    }       
  },
  methods:{
    _isCollides(layoutItem1, layoutItem2) {
        let Vue = this;
        if (layoutItem1 === layoutItem2) return false; // same element
        if (layoutItem1.x + layoutItem1.w <= layoutItem2.x) return false; // layoutItem1 is left of layoutItem2
        if (layoutItem1.x >= layoutItem2.x + layoutItem2.w) return false; // layoutItem1 is right of layoutItem2
        if (layoutItem1.y + layoutItem1.h <= layoutItem2.y) return false; // layoutItem1 is above layoutItem2
        if (layoutItem1.y >= layoutItem2.y + layoutItem2.h) return false; // layoutItem1 is below layoutItem2
        return true; // boxes overlap
    },
    _getFirstCollision(layout, layoutItem) {
      let Vue = this;
      for (let i = 0, len = layout.length; i < len; i++) {
        if (Vue._isCollides(layout[i], layoutItem)) return layout[i];
      }
    },
    _compactItem(layout, layoutItem,verticalCompact ) {
          let Vue = this;
          if (verticalCompact) {
            // Move the element up as far as it can go without colliding.
            while (layoutItem.y > 0 && !Vue._getFirstCollision(layout, layoutItem)) {
              layoutItem.y--;
            }
          }
          // Move it down, and keep moving it down if it's colliding.
          let collides;
          while((collides = Vue._getFirstCollision(layout, layoutItem))) {
            layoutItem.x = collides.x + collides.w;
            if(layoutItem.x >= 12){
              layoutItem.y = collides.y + collides.h;
              layoutItem.x = 0 ;
            }
          }
          return layoutItem;
    },
    _getBottom(layouts) {
          let max = 0, bottomY;
          for (let i = 0, len = layouts.length; i < len; i++) {
              bottomY = layouts[i]. y + layouts[i].h;
              if (bottomY > max) max = bottomY;
          }
          return max;
      },
    /**
     * 添加porlet模块
     */
    addPortlet(){
      let Vue = this;
      let layout = Vue.report.defineJSON.content.portlets;
      let y = Vue._getBottom(layout);
      Vue.index = Vue.index+1;
      var portlet = { 
        "portletID":""+Vue.index,
        "name":"portleName",
        "x":0,"y":0,"w":6,"h":4,"i":""+Vue.index,
        "tabs":[{
          "id":""+Vue.index,
          "title":"",
          'titleBackgroundImg':"",
          'chartBoxBackgroundImg':"",
          'chartBackgroundStyles':"",
          "objtype":"",
          "objid":""}]
      };
      portlet = Vue._compactItem(layout,portlet,true);
      Vue.report.defineJSON.content.portlets.push(portlet);
      Vue.$store.commit("saveCurrentReportGridItem",Vue.report.defineJSON.content.portlets);
    }
  }
}
</script>

<style scoped>
.toolbar{
   padding: 3px;
   margin: 3px;
}
.toolbar Button{
   background-color:#2d8cf0;
   color:white;
}
.delete-icon{
   float: right;
}
</style>
