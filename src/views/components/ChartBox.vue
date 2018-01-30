<template>
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card>
        <p slot="title">{{name}}</p>
        <p> {{desc}}</p>
    </Card>
  </Col>  
</template>

<script>

export default {
  name: 'dashboardbox',
  props:['id','name','desc'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
