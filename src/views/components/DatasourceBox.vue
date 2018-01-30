<template>
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card  @click='link(subpath)' style="margin-bottom:10px">
        <p slot="title">{{datasource.name}}</p>
        <p> {{datasource.desc}}</p>
        <p><button @click='edit()'>编辑</button>
           <button @click='manage()'>管理</button></p>
    </Card>
    <Modal
      v-model="datasourcedit"
      title="编辑数据源"
      @on-ok="editOk"
      @on-cancel="cancel"
      width='630px'>
      <DatasourceForm ref="datasourcedit" :datasource='datasource'></DatasourceForm>
    </Modal>
     <Modal
      v-model="datasourcemng"
      title="管理数据源"
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
      datasourcedit:false,
      datasourcemng:false,
    }
  },
  methods:{
    edit (){
      this.datasourcedit =true;
    },
    manage (){
      this.datasourcemng = true;
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
