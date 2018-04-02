<template>
    <div>
<!--         <div class='treeTitle'>{{treeName}}表字段</div>
        <Tree :data="data" show-checkbox  @on-check-change='getCheckedNodes' ref='jj'></Tree> -->
        <Card  style='margin: 10px;height:220px'>
            <p slot="title">{{treeName}}表字段</p>
            <Tree class='tree' :data="data" show-checkbox  @on-check-change='getCheckedNodes' ref='jj'></Tree>
        </Card>
        <Card  style='margin: 10px;height:230px'>
            <p slot="title">参考sql</p><!-- <button @click="copyHtml()">copy</button> -->
            <!-- <p v-html="sql" class='sqlBox' style='overflow-y: auto;height:170px'></p> -->
            <p v-html="sql" class='sqlBox' id="text"></p>
            <!-- <textarea id="input"></textarea> -->
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
            
          },
          copyHtml(){
            var html = $("#text").html();
            var input = document.getElementById("input");
            input.value = html; // 修改文本框的内容
            input.select(); // 选中文本
            document.execCommand("copy"); // 执行浏览器复制命令
            alert("复制成功");            
          }
        },
    }
</script>
<style scoped>
  .tree{
    height: 120px;
    overflow-y: auto;
  }
  .sqlBox{
    height: 120px;
    overflow-y: auto;
  }
  #input {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: -10;
  }
</style>
