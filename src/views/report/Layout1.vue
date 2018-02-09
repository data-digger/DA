<template>
  <div>
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
        <grid-item v-for="item in portlets"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :key='item.i'>
         <GridItemContent :griditemTitle='item.i' :portletID="item.i"></GridItemContent>
        </grid-item>
    </grid-layout>
  </div>
</template>
<script>
import VueGridLayout from "vue-grid-layout/dist/vue-grid-layout.js"
import GridItemContent from "./GridItemContent.vue"
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
            portlets:[{"portletID":"0",
                     "name":"",
                     "x":0,"y":0,"w":12,"h":4,"i":"0",
                     "tabs":[{"id":"0","title":"","objtype":"","objid":""}]
                    },
                    {"portletID":"1",
                     "name":"",
                     "x":0,"y":4,"w":12,"h":8,"i":"1",
                     "tabs":[{"id":"1","title":"","objtype":"","objid":""}]
                    } ,
                    {"portletID":"2",
                     "name":"",
                     "x":0,"y":12,"w":12,"h":8,"i":"2",
                     "tabs":[{"id":"2","title":"","objtype":"","objid":""}]
                    },
                    {"portletID":"3",
                     "name":"",
                     "x":0,"y":20,"w":12,"h":8,"i":"3",
                     "tabs":[{"id":"3","title":"","objtype":"","objid":""}]
                    },
                    {"portletID":"4",
                     "name":"",
                     "x":0,"y":28,"w":12,"h":8,"i":"4",
                     "tabs":[{"id":"4","title":"","objtype":"","objid":""}]
                    }]
        }
      },
    mounted(){
       this.$store.commit("addDedinedPortlets",this.portlets);
    }
    
}
</script>
<style scoped>
.griditem-title{
 background-color:lightgray;
}
</style>