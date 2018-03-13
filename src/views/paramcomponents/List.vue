<template>
    <div>
        <Select v-model = "defaultDefine" style="width:200px" placeholder="Select ..." >
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
        created(){
            let Vue = this;
            Vue.defaultDefine = Vue.cmpContent.defaultListValue.key;
            Vue.AxiosPost("getStandByValue",
                {"paramId":Vue.cmpContent.paramId},
                function(response){
                   Vue.getStandByValue = response.data.standByList;
            });
        }
    }
</script>
<style scoped>

</style>
