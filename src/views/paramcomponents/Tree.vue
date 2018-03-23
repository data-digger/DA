<template>
    <div>
        <Tree :data="data" show-checkbox  @on-check-change='getCheckedNodes' ref='jj'></Tree>
        <Card  :bordered="false">
            <p slot="title">参考sql</p>
            <p v-html="sql" class='sqlBox' style='overflow-y: auto;'></p>
        </Card>
    </div>
</template>
<script>
    export default {
        props:['datasourceId'],
        data () {
            return {
                data: [],
                sql:null,
            }
        },
        methods:{
          getTablesTree(){
            let Vue = this;
            Vue.AxiosPost("getTablesTree",{'dsId':Vue.datasourceId},
              function(response){
                Vue.data = response.data;
            })
          },
          getCheckedNodes(CheckedNodes){
            let Vue = this;
            let t_name_bak = [];
            let t_field_array = [];
            let t_name = [];
            let t_field = '';

            

            for(var i in CheckedNodes){
              var parentNodes = Vue.$refs.jj.getParentNode(CheckedNodes[i].nodeKey);
              if(parentNodes){//自身为子节点
                t_name_bak.push('<br/>'+parentNodes.title);
                t_field_array.push(CheckedNodes[i]);
              }else{//自身为父节点
                t_name_bak.push('<br/>'+CheckedNodes[i].title);
              }
            }
  
            for( var j in t_field_array){
              t_field = t_field +  t_field_array[j].title+',<br/>';  
            }

            
            //遍历数组,去重
            for(var i = 0;i<t_name_bak.length;i++){
                if(t_name.indexOf(t_name_bak[i]) == -1){  //判断在t_name数组中是否存在，不存在则push到t_name数组中
                    t_name.push(t_name_bak[i]);
                }
            }
            t_name = t_name.toString();

            if(t_field != null && t_name != null){
              t_field = t_field.substring(0,t_field.length-6); 
              Vue.sql = "select</br>" + t_field + "<br/>from"+ t_name+"<br/>where<br/>..."; 
            }else{
              Vue.sql =null;
            }
            
          }
        },
        mounted(){
          let Vue = this;
          Vue.getTablesTree();
        }
    }
</script>
<style scoped>
  .ivu-tree{
    height: 250px;
    overflow-y: auto;
  }
  .sqlBox{
    height: 100px;
  }
</style>
