<template>
    <div>
        <Input 
          v-model="selectedValue" 
          icon="refresh" 
          placeholder="Enter something..." 
          style="width: 200px"
          @on-click = 'sentDate'
        ></Input>
    </div>
</template>
<script>
    export default {
        props:["componentType",'defaultValue','index','standByValue','randomName'],
        data(){
          return {
            selectedValue: this.defaultValue
          }
        },
        watch:{
          randomName (val) {
             this.selectedValue = this.defaultValue;
          }
        },
        methods:{
          //传递所选值到其他组件
          sentDate(){
            let Vue = this;
            Vue.$emit("sentDate",{index:Vue.index,value:Vue.defaultValue});
          },
        },
    }
</script>

<style scoped>
.ivu-select{
  display: block !important;
}
</style>
