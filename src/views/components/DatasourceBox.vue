<template>
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card class='box-card'>
        <p slot="title">{{datasource.name}}</p>
        <p class="box-desc" :title='datasource.desc'> {{datasource.desc}}</p>
        <p><button @click='edit("/createDatasource")'>编辑</button></p>
    </Card>
  </Col>
</template>

<script>
export default {
  name: 'datasourcebox',
  props:['datasource'],
  components:{
  },
  data(){
    return {
    }
  },
  methods:{
    edit(routerpath ){
      let Vue = this; 
      Vue.$router.push({
        path:routerpath,
        name:"createDatasource",
        params:Vue.datasource
      });      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
