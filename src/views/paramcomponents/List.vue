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
                paramSelected[Vue.cmpContent.paramId] = Vue.defaultDefine;
                Vue.$emit("sentParam",paramSelected);
            }
        },
        created(){
            let Vue = this;
            for(var i in Vue.cmpContent){
                if(Vue.cmpContent[i].paramType == "list"){
                    Vue.defaultDefine = Vue.cmpContent[i].defaultListValue.key;
                    Vue.AxiosPost("getStandByValue",
                        {"paramId":Vue.cmpContent[i].paramId},
                        function(response){
                           Vue.getStandByValue = response.data.standByList;
                    });                    
                }
            }  

        }
    }
</script>
<style scoped>
.ivu-select{
  display: block !important;
}
</style>
