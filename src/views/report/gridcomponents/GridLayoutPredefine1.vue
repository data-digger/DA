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
        {"portletID":"0","name":"","x":0,"y":0,"w":6,"h":18,"i":"0","tabs":[{"id":"0","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"1","name":"","x":6,"y":0,"w":6,"h":9,"i":"1","tabs":[{"id":"1","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"2","name":"","x":6,"y":9,"w":6,"h":9,"i":"2","tabs":[{"id":"2","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"3","name":"","x":0,"y":18,"w":4,"h":12,"i":"3","tabs":[{"id":"3","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"4","name":"","x":4,"y":18,"w":4,"h":12,"i":"4","tabs":[{"id":"4","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"5","name":"","x":8,"y":18,"w":4,"h":12,"i":"5","tabs":[{"id":"5","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"6","name":"","x":0,"y":30,"w":4,"h":12,"i":"6","tabs":[{"id":"6","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"7","name":"","x":4,"y":30,"w":4,"h":12,"i":"7","tabs":[{"id":"7","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"8","name":"","x":8,"y":30,"w":4,"h":12,"i":"8","tabs":[{"id":"8","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"9","name":"","x":0,"y":42,"w":4,"h":12,"i":"9","tabs":[{"id":"9","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"10","name":"","x":4,"y":42,"w":4,"h":12,"i":"10","tabs":[{"id":"10","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"11","name":"","x":8,"y":42,"w":4,"h":12,"i":"11","tabs":[{"id":"11","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"12","name":"","x":0,"y":54,"w":3,"h":10,"i":"12","tabs":[{"id":"12","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"13","name":"","x":3,"y":54,"w":3,"h":10,"i":"13","tabs":[{"id":"13","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"14","name":"","x":6,"y":54,"w":3,"h":10,"i":"14","tabs":[{"id":"14","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"15","name":"","x":9,"y":54,"w":3,"h":10,"i":"15","tabs":[{"id":"15","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"16","name":"","x":0,"y":64,"w":12,"h":17,"i":"16","tabs":[{"id":"16","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]},
        {"portletID":"17","name":"","x":0,"y":81,"w":12,"h":14,"i":"17","tabs":[{"id":"17","title":"","objtype":"","objid":"",'titleBackgroundImg':"",'chartBoxBackgroundImg':"",'chartBackgroundStyles':""}]}
      ],
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
.header{
  width: 100%;
  height: 90px;
  background: url('./../../../assets/img/report_header.png');
}
.header .left_logo,
.header .right_logo{
  width:400px;
}
.left_logo{
  float: left;
  height: 50px;
  margin: 22px;
  background: url('./../../../assets/img/left_logo.png') no-repeat;
}
.right_logo{
  float: right;
  height: 90px;
  margin:5px 10px;
  background: url('./../../../assets/img/right_logo.png') no-repeat;
}
.griditem-title{
 background-color:lightgray;
}
</style>