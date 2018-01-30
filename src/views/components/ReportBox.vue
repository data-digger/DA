<template>
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card  @click='link(subpath)'>
        <p slot="title">{{name}}</p>
        <p> {{desc}}</p>
    </Card>
  </Col>
</template>

<script>

export default {
  name: 'reportbox',
  props:['id','name','desc','subpath'],
  methods:{
    link:function(subpath){
      this.$router.push({
        path:subpath
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
