<template>
    <div>
        <Input 
          v-model="defaultValue" 
          icon="refresh" 
          placeholder="Enter something..." 
          style="width: 200px"
          @on-click = 'sentDate'
        ></Input>
    </div>
</template>
<script>
    export default {
        props:["componentType",'defaultValue','index','standByValue'],
        watch:{
 
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
