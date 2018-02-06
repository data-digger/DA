<template>
    <div>
      <div class='header' style='width:100%;height:30px;background-color:lightgray'>我是报表的header</div>
      <div class='content'>
      <grid-layout :layout="report.defineJSON.content.portlets":col-num="12":row-height="30":is-draggable="draggable":is-resizable="resizable":vertical-compact="true":use-css-transforms="true">
            <grid-item v-for="(item,index) in report.defineJSON.content.portlets":x="item.x":y="item.y":w="item.w":h="item.h":i="item.i":key='item.i'>

            </grid-item>
         </grid-layout>
      </div>
      <div class='tail'style='width:100%;height:30px;background-color:lightgray'>我是报表的tail</div>
    </div>    
</template>
<script>
import VueGridLayout from "vue-grid-layout/dist/vue-grid-layout.js"
var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;
export default {
  props:['report','reportPreview'],
  components: {
      "GridLayout": GridLayout,
      "GridItem": GridItem,
  },
  data(){
    return {

    }
  }, 
  methods:{

  }
}
</script>


<style scoped>

</style>
