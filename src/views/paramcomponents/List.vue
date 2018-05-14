<template>
    <div>
        <Select 
            :value = "selectedValue" 
            style="width:300px" 
            class='select'
            :multiple='componentType == "multiSelect" ? true:false'
            @on-change='sentDate'>
            <Option v-for='(sdbValue,sdbIndex) in standByValue' :value='sdbValue.value' :key='sdbValue.value'>{{sdbValue.value}}</Option>
        </Select>
    </div>
</template>
<script>
    export default {
        props:["componentType",'standByValue','defaultValue','index','randomName'],
        data(){
            return{
                selectedValue:this.defaultValue
            }
        },
        watch:{
          randomName (val) {
             this.selectedValue = this.defaultValue;
          }
        },
        methods:{
          //传递所选值到其他组件
          sentDate(selection){
            let Vue = this;
            if(selection == ''){
                this.selectedValue = this.defaultValue;
                selection = this.defaultValue;
            }
            Vue.$emit("sentDate",{index:Vue.index,value:selection});
          },
        },
    }
</script>

<style scoped>
.ivu-select{
  display: block !important;
}
</style>
