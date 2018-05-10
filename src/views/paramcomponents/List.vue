<template>
    <div>
        <Select 
            v-model = "currentSelection" 
            style="width:200px" 
            class='select'
            :multiple='componentType == "multiSelect" ? true:false'
            @on-change='sentDate'>
            <Option v-for='(sdbValue,sdbIndex) in standByValue' :value='sdbValue.value' :key='sdbValue.value'>{{sdbValue.value}}</Option>
        </Select>
    </div>
</template>
<script>
    export default {
        props:["componentType",'defaultValue','index','standByValue'],
        data () {
           return {
            currentSelection:[],
           }
        },
        watch:{
 
        },
        methods:{
          //传递所选值到其他组件
          sentDate(selection){
            let Vue = this;
            Vue.$emit("sentDate",{index:Vue.index,value:selection});
          },
        },
        mounted(){
            let Vue = this;
            Vue.currentSelection = Vue.defaultValue
        }
    }
</script>

<style scoped>
.ivu-select{
  display: block !important;
}
</style>
