<template>
    <div>
        <Tree :data="data" show-checkbox  @on-check-change='getCheckedNodes' ref='jj'></Tree>
<!--         <div class='sqlBox' v-html="sql">
            
        </div> -->
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
                CheckedNodes:[]
            }
        },
/*        watch:{
          'oldCheckedNodes':'checkedCancel'
        },*/
        methods:{
          getTablesTree(){
            let Vue = this;
            Vue.AxiosPost("getTablesTree",{'dsId':Vue.datasourceId},
              function(response){
                Vue.data = response.data;
            })
          },
/*          checkedCancel(){
            let Vue = this;
             for(var d in Vue.oldCheckedNodes){
               Vue.oldCheckedNodes[d].checked = false;
             }            
          },*/
          getCheckedNodes(CheckedNodes){
            let Vue = this;
            let t_name = null;
            let t_field_array = [];
            let t_field = '';

     
            Vue.CheckedNodes = CheckedNodes;
            
            for(var i=0; i<CheckedNodes.length;i++){
                if(CheckedNodes[i].children != null){
                    t_name = CheckedNodes[i].title;
                }else{
                    t_field_array.push(CheckedNodes[i]);
                }
              }; 

            if(t_name == null){//点击了单选
              for(var j in t_field_array){
                  var parent = Vue.$refs.jj.getParentNode(t_field_array[j].nodeKey);
                  if(parent){
                    t_name = parent.title;
                    t_field = t_field +  t_field_array[j].title+',<br/>';                   
                  }
              }                 
            }else{//点击了全选
              for(var j in t_field_array){
                  t_field = t_field + t_field_array[j].title+',<br/>';
              } 
            }


            if(t_field != null && t_name != null){
              t_field = t_field.substring(0,t_field.length-6); 
              Vue.sql = "select</br>" + t_field + "<br/>from<br/>"+ t_name; 
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
