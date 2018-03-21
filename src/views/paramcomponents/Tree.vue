<template>
    <div>
        <Tree :data="data" show-checkbox  @on-check-change='getCheckedNodes'></Tree>
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
            }
        },
        methods:{
           getCheckedNodes(CheckedNodes){
             let Vue = this;
             let t_name = null;
             let t_field_array = [];
             let t_field = '';

             for(var i=0; i<CheckedNodes.length;i++){
                if(CheckedNodes[i].children != null){
                    t_name = CheckedNodes[i].title;
                }else{
                    /*CheckedNodes[i].disableCheckbox = true;*/
                    t_field_array.push(CheckedNodes[i]);
                }
             }; 

             if(t_name == null){//点击了单选
                for(var j in t_field_array){
                    t_name = '我是父';
                    
                    t_field = t_field +  t_field_array[j].title+',<br/>';
                }                 
              }else{//点击了全选
                for(var j in t_field_array){
                    t_field = t_field + t_field_array[j].title+',<br/>';
                } 
             }


               if(t_field != null && t_name != null){
                   Vue.sql = "select</br>" + t_field + "from<br/>"+ t_name; 
               }else{
                   Vue.sql =null;
               }
            
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
    height: 250px;
    overflow-y: auto;
  }
  .sqlBox{
    height: 100px;
  }
</style>
