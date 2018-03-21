<template>
    <Tree  :data="data" show-checkbox @on-check-change='getCheckedNodes'></Tree>
</template>
<script>
    export default {
        props:['datasourceId'],
        data () {
            return {
                data: []
            }
        },
        methods:{
           getCheckedNodes(){
              console.log(this.getCheckedNodes());
           }
        },
        mounted(){
            let Vue = this;
            Vue.AxiosPost("getTablesTree",{'dsId':Vue.datasourceId},
              function(response){
                Vue.data = response.data;    
            })
        }
    }
</script>
<style scoped>
  .ivu-tree{
    height: 300px;
    overflow-y: auto;
  }
</style>
