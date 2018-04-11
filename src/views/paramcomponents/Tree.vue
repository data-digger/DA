<template>
    <div>
      <Card class='card_field_tree'>
        <div>
          <p class='field_tree_title'>{{treeName}}表字段</p>
          <Tree class='tree' :data="data" show-checkbox  @on-check-change='getCheckedNodes' ref='jj'></Tree>
        </div>
      </Card>
      <Card  class='card_field_tree'>
        <div>
          <p class='field_tree_title'>参考sql</p>
          <p v-html="sql" class='sqlBox' id="text"></p>
        </div>
      </Card>
    </div>
</template>
<script>
    export default {
        props:['datasourceId','treeName'],
        data () {
            return {
                data: [],
                sql:null,
            }
        },
        watch:{
          'datasourceId':'getTablesTree'
        },
        methods:{
          getTablesTree(){
            let Vue = this;
            Vue.AxiosPost("getTablesTree",{'dsId':Vue.datasourceId},
              function(response){
                Vue.data = response.data.content;
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

            if(t_field != "" && t_name != ""){
              t_field = t_field.substring(0,t_field.length-6); 
              Vue.sql = "select</br>" + t_field + "<br/>from"+ t_name+"<br/>where<br/>..."; 
            }else{
              Vue.sql =null;
            }
            
          }
        },
    }
</script>
<style scoped>
  .tree{
    height: 180px;
    overflow-y: auto;
    color: #ffffff;
    padding: 0 0 10px 10px;
    font-size: 12px;
  }
  .sqlBox{
    height: 180px;
    overflow-y: auto;
    color:#ffffff;
    padding: 10px;
  }
  #input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: -10;
  }
  .card_field_tree{
    margin: 10px;
    height:220px;
    background-color: #404c60;
    border:0 !important;
  }
  .field_tree_title{
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    height:35px;
    line-height: 35px;
    color:#a0acbf;
    padding-left: 5px;
    font-size: 12px;
    background-color: #57647a;
    border-bottom: 1px solid #28313d;
  }
</style>
