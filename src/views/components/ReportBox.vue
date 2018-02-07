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
      width ="900px"
      ok-text = '导出'
      @on-ok="editOk"
      @on-cancel="cancel">
        <ReportForm :report='reportbox' ref='reportForm'></ReportForm>
    </Modal>    
  </Col>
</template>
<script>
import ReportForm from "./ReportForm.vue"
export default {
  props:['reportbox'],
  components: {
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
      this.$nextTick(function(){
        this.$refs.reportForm.initReport();
     })     
    },
  }
}
</script>


<style scoped>

</style>
