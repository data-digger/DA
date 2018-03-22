<template >
  <Col :xs="8" :sm="8" :md="8" :lg="6">
    <Card class='box-card'>
        <p slot="title">{{parambox.name}}</p>
        <p class="box-desc">{{parambox.desc}}</p>
        <p><button @click='edit("/createParam")'>编辑</button></p> 
    </Card>
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

    }
  },
  methods:{
    edit(routerpath ){
      let Vue = this; 
      this.$router.push({
        path:routerpath,
        name:"createParam",
        params:Vue.parambox
      });      
    }
   }
}
</script>
<style scoped>
</style>
