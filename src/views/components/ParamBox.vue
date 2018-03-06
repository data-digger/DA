<template >
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card class='box-card'>
        <p slot="title">{{parambox.name}}</p>
        <p class="box-desc">{{parambox.desc}}</p>
        <p><button @click='edit()'>编辑</button></p> 
    </Card>
    <Modal
      v-model="modaledit"
      width ="1200px"
      title="Common Modal dialog box title"
      @on-ok="previewOk"
      @on-cancel="cancel">   
    </Modal>
  </Col>
</template>

<script>
export default {
  name: 'parambox',
  props:["parambox"],
  components:{
    
  },
  data(){
    return {
      modaledit:false
    }
  },
  methods:{
    previewOk(){},
    cancel(){},
    edit(){
      this.modaledit = true;
    }
   }
}
</script>
<style scoped>
</style>
