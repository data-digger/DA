<template>
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card style="margin-bottom:10px;height: 150px;">
        <p slot="title">{{datasource.name}}</p>
        <p> {{datasource.desc}}</p>
        <p><button @click='edit()'>编辑</button>
           <button @click='manage()'>管理</button></p>
    </Card>
    <Modal
      v-model="modaledit"
      :title='"编辑"+datasource.name'
      @on-ok="editOk"
      @on-cancel="cancel"
      width='630px'>
      <DatasourceForm ref="datasourcedit" :datasource='datasource'></DatasourceForm>
    </Modal>
     <Modal
      v-model="modalmng"
      :title='"管理"+datasource.name'
      @on-ok="editOk"
      @on-cancel="cancel"
      width='500px'>
      <DatasourceMng ref="datasourcemng" :datasource='datasource'></DatasourceMng>
    </Modal>
  </Col>
</template>

<script>
import DatasourceForm  from './../components/DatasourceForm'
import DatasourceMng  from './../components/DatasourceMng'
export default {
  name: 'datasourcebox',
  props:['datasource'],
  components:{
    DatasourceForm,
    DatasourceMng
  },
  data(){
    return {
      modaledit:false,
      modalmng:false,
    }
  },
  methods:{
    edit (){
      this.modaledit =true;
    },
    manage (){
      this.modalmng = true;
    },
    editOk (){
      this.$refs.datasourcedit.createDatasource()
    },
    cancel(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
