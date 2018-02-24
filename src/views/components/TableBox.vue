<template>
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card style="margin-bottom:10px;height: 150px;">
        <p slot="title">{{tablebox.name}}</p>
        <p>{{tablebox.desc}}</p>
        <button @click='preview()'>预览</button></p> 
    </Card>   
  </Col>
</template>
<script>
export default {
  props:['tablebox'],
  components: {
  },
  data(){
    return {
    }
  }, 
  methods:{
  }
}
</script>


<style scoped>

</style>
