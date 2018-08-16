<template>
    <div>
        {{pName}}:
        <Select 
            :value = "selectedValue" 
            style="width:300px" 
            class='select'
            :multiple='componentType == "multiSelect" ? true:false'
            @on-change='sentDate'>
            <Option v-for='(sdbValue,sdbIndex) in standByValue' :value='sdbValue.key' :key='sdbValue.key'>{{sdbValue.value}}</Option>
        </Select>
    </div>
</template>
<script>
    export default {
        props:["cmpContent"],
        data(){
            return{
                pId :this.cmpContent.pId,
                pName:this.cmpContent.pName,
                selectedValue:this.cmpContent.defaultValue,
                standByValue : this.cmpContent.standByValue,
                componentType: "singleSelect",
            }
        },
        methods:{
          //传递所选值到其他组件
          sentDate(selection){
            let Vue = this;
            let paramValue = {};
            paramValue[Vue.pId] = selection;
            // if(Vue.componentType == 'singleSelect'){
            //     selection = [selection];
            // }
            Vue.$emit("sentDate",paramValue);
          },
        },
    }
</script>

<style scoped>
.ivu-select{
  display: block !important;
}
</style>
