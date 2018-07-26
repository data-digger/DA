<template>
  <Grid :portlets='portlets' hasExtraIcon='true'></Grid>
</template>
<script>
import Grid from "./Grid"
export default {
  components: {
    Grid
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