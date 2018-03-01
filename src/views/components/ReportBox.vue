<template>
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card style="margin-bottom:10px;height: 150px;">
        <p slot="title">{{reportbox.name}}</p>
        <p> {{reportbox.desc}}</p>
        <button @click='viewReport("/viewReport")'>查看</button></p> 
    </Card>
<!--     <Modal
      v-model="modalPreview"
      :title="reportbox.name"
      width ="900px"
      ok-text = '导出'
      @on-ok="editOk"
      @on-cancel="cancel">
        <ReportForm :report='reportbox' ref='reportForm'></ReportForm>
    </Modal>  -->   
  </Col>
</template>
<script>
export default {
  props:['reportbox'],
/*  components: {
      ReportForm
  },*/
  data(){
    return {
      /*modalPreview:false,*/
    }
  }, 
  methods:{
    viewReport(routerpath){
      this.$router.push({
        path:routerpath,
        name:"viewReport",
        params:this.reportbox
      });
/*      var self = this;
      self.modalPreview = true;
      self.$nextTick(function(){
        setTimeout(function(){
          self.$refs.reportForm.initReport();
        },500)
     })  */   
    },
  }
}
</script>


<style scoped>

</style>
