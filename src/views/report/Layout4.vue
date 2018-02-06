<template>
     <div>
      <div class="toolbar"><Button @click="addPortlet()">添加模块</Button></div>
      <grid-layout :layout="report.defineJSON.content.portlets":col-num="12":row-height="30":is-draggable="draggable":is-resizable="resizable":vertical-compact="true":use-css-transforms="true">
        <grid-item v-for="(item,index) in report.defineJSON.content.portlets":x="item.x":y="item.y":w="item.w":h="item.h":i="item.i":key='item.i'drag-ignore-from=".no-drag"drag-allow-from=".vue-draggable-handle">
           <GridItemContent :griditemTitle='item.i' :portletID="item.i"></GridItemContent>
        </grid-item>
      </grid-layout>        
    </div>
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
        GridItemContent
    },
    computed: {
    ...mapGetters({
      report: 'report'
    })
    },
    data(){
      return {
        draggable: true,
        resizable: true,
        index:0
      }
    },
    methods:{
        addPortlet(){
            this.index = this.index+1;
            var portlet ={ "id":this.index,
                           "name":"",
                           "x":0,"y":0,"w":2,"h":4,"i":this.index,
                           "tabs":[{"id":this.index,"title":"","objtype":"","objid":""}]
                         };
            this.$store.commit("addPortlet",portlet);
        }
    },
    created(){
        console.log('Layout4 created');
    },
    mounted(){
        console.log('Layout4 mounted');
    }
}
</script>

<style scoped>
.toolbar{
    padding: 3px;
    margin: 3px;
}
.delete-icon{
    float: right;
}
</style>
