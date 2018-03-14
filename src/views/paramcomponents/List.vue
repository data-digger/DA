<template>
    <div>
        <Select v-model = "defaultDefine" style="width:200px" placeholder="Select ..." class='select'>
            <Option v-for='(stbValue,index) in getStandByValue' :value='stbValue.key' :key='index'>{{stbValue.key}}</Option>
        </Select>
    </div>
</template>
<script>
    export default {
        props:['cmpContent'],
        data () {
           return {
            defaultDefine:'',
            getStandByValue:''
           }
        },
        watch:{
        　　　'defaultDefine': 'sentListParam',
        　},
        methods:{
            sentListParam(){
                let Vue = this;
                let paramSelected = {};
                if(Vue.cmpContent.content.paramType == 'list'){
                    paramSelected[Vue.cmpContent.content.paramId] = Vue.defaultDefine; 
                }
                Vue.$emit("sentParam",paramSelected);
            }
        },
        beforeMount(){
            let Vue = this;
            if(Vue.cmpContent){  
                Vue.AxiosPost("getStandByValue",
                    {"paramId":Vue.cmpContent.content.paramId},
                    function(response){
                       Vue.getStandByValue = response.data.standByList;
                }); 
                Vue.defaultDefine = Vue.cmpContent.content.defaultListValue.key;              
            }
        }
    }
</script>
<style scoped>
.ivu-select{
  display: block !important;
}
</style>
