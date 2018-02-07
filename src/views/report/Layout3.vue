<template>
  <div>
     <grid-layout
            :layout="layout"
            :col-num="12"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="true"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
    >

        <grid-item v-for="item in layout"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key='item.i'>
           <div class='griditem-title'>{{item.i}}</div>
        </grid-item>
    </grid-layout>
    </div>
</template>
<script>
import VueGridLayout from "vue-grid-layout/dist/vue-grid-layout.js"
var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;
export default {
    components: {
      "GridLayout": GridLayout,
      "GridItem": GridItem,
    },
    data(){
        return{
            layout:[{"x":0,"y":0,"w":12,"h":8,"i":'0'},
                    {"x":0,"y":8,"w":12,"h":4,"i":'1'},
                    {"x":0,"y":12,"w":12,"h":8,"i":'2'},
                    {"x":0,"y":20,"w":6,"h":4,"i":'3'},
                    {"x":6,"y":20,"w":6,"h":4,"i":'4'}]
        }
    }
}
</script>
<style scoped>
.griditem-title{
 background-color:lightgray;
}
</style>
