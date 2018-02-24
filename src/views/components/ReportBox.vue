<template>
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card style="margin-bottom:10px;height: 150px;">
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
      var self = this;
      self.reportPreview = true;
      self.$nextTick(function(){
        setTimeout(function(){
          self.$refs.reportForm.initReport();
        },500)
     })     
    },
    editOk(){
      
    },
    cancel(){
      
    },
  }
}
</script>


<style scoped>

</style>
