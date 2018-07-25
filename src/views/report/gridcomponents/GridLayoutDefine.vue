<template>
     <div>
      <div class="toolbar"><Button @click="addPortlet()">添加模块</Button></div>
      <grid-layout :layout="report.defineJSON.content.portlets" 
                    :col-num="12" 
                    :row-height="30" 
                    :is-draggable="draggable" 
                    :is-resizable="resizable" 
                    :vertical-compact="true" 
                    :use-css-transforms="true">
        <grid-item v-for="item in report.defineJSON.content.portlets" 
                   :x="item.x" 
                   :y="item.y" 
                   :w="item.w" 
                   :h="item.h" 
                   :i="item.i" 
                   :key='item.i' 
                   drag-ignore-from=".no-drag" 
                   drag-allow-from=".vue-draggable-handle">
            <GridItemContent :portletID="item.i" ref='gridItemContent'></GridItemContent>
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
      _getBottom() {
           let Vue = this;
           let layouts = Vue.report.defineJSON.content.portlets;
           let max = 0, bottomY;
           for (let i = 0, len = layouts.length; i < len; i++) {
               bottomY = layouts[i]. y + layouts[i].h;
               if (bottomY > max) max = bottomY;
           }
           return max;
       },
        addPortlet(){
            let Vue = this;
            let y = Vue._getBottom();
            Vue.index = Vue.index+1;
            var portlet ={ "portletID":""+Vue.index,
                            "name":"portleName",
                            "x":0,"y":y,"w":6,"h":4,"i":""+Vue.index,
                            "tabs":[{"id":""+Vue.index,
                                   "title":"",
                                   'titleBackgroundImg':"",
                                   'chartBoxBackgroundImg':"",
                                   'chartBackgroundStyles':"",
                                   "objtype":"",
                                   "objid":""}
                            ]
                         };
            Vue.report.defineJSON.content.portlets.push(portlet);
            Vue.$store.commit("addDefinePorlets",Vue.report.defineJSON);
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
