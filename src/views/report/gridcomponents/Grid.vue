<template>
    <grid-layout 
    :layout='portlets'
    :col-num="12" 
    :row-height="30" 
    :is-draggable="isEdit=='true'?true:false" 
    :is-resizable="isEdit=='true'?true:false" 
    :vertical-compact="true" 
    :use-css-transforms="true">
    <grid-item 
        v-for='(item,itemIndex) in portlets'
        :id="'grid_item'+item.i" 
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
          :isEdit = 'isEdit'
          ref='gridItemContent'        
        ></GridItemContent>
    </grid-item>
    </grid-layout>        
</template>

<script>
import VueGridLayout from "vue-grid-layout/dist/vue-grid-layout.js"
import GridItemContent from "./GridItemContent.vue"
import {mapGetters} from 'vuex'
var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;
export default {
  components: {
    "GridLayout": GridLayout,
    "GridItem": GridItem,
    GridItemContent,
  },
  data () {
    return {
      draggable: true,
      resizable: true,
    }       
  },
  props:['portlets','isEdit']
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
