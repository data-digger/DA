<template>
     <div>
      <div class="toolbar"><Button @click="addPortlet()">添加模块</Button></div>
      <Grid 
        :portlets='portlets'
        isEdit='true'
      ></Grid>      
    </div>
</template>

<script>

import Grid from "./Grid"
export default {
  components: {
    Grid
  },
  data () {
    return {
      portlets:[],
      index:-1
    }       
  },
  methods:{
    /**
     * 添加porlet模块
     */
    addPortlet(){
      let Vue = this;
      let layout = Vue.portlets;
      let y = Vue._getBottom(layout);
      Vue.index = Vue.index+1;
      let portlet = { 
        "portletID":""+Vue.index,
        "name":"portleName",
        "x":0,"y":y,"w":6,"h":4,"i":""+Vue.index,
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
      Vue.portlets.push(portlet);
      Vue.$store.commit("saveCurrentReportGridItem",Vue.portlets);
     },
     
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
