<template>
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card>
        <p slot="title">{{reportbox.name}}</p>
        <p> {{reportbox.desc}}</p>
        <button @click='preview()'>预览</button></p> 
    </Card>
    <Modal
      v-model="reportPreview"
      :title="reportbox.name"
      ok-text = '导出'
      @on-ok="editOk"
      @on-cancel="cancel">
         <ReportForm :report='reportbox' :reportPreview='reportPreview'></ReportForm>
    </Modal>    
  </Col>
</template>
<script>
/*import VueGridLayout from "vue-grid-layout/dist/vue-grid-layout.js"*/
import ReportForm from "./ReportForm.vue"
/*var GridLayout = VueGridLayout.GridLayout;
var GridItem = VueGridLayout.GridItem;*/
export default {
  props:['reportbox'],
  components: {
/*      "GridLayout": GridLayout,
      "GridItem": GridItem,*/
      ReportForm
  },
  data(){
    return {
      reportPreview:false,
    }
  }, 
  methods:{
    preview(){
      this.reportPreview = true;
    },
  }
}
</script>


<style scoped>

</style>
