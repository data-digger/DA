<template>
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card class='box-card'>
        <p slot="title">{{reportbox.name}}</p>
        <p class="box-desc" :title='reportbox.desc'> {{reportbox.desc}}</p>
        <button @click='viewReport("/viewReport")'>查看</button></p> 
    </Card>
  </Col>
</template>
<script>
export default {
  props:['reportbox'],
  methods:{
    viewReport(routerpath){
      this.$router.push({
        path:routerpath,
        name:"viewReport",
        params:this.reportbox
      }); 
    },
  }
}
</script>


<style scoped>

</style>
