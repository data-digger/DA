<template>
  <RadioGroup v-model="layoutSelected" :on-change ='layoutselected()'>
     <Radio label="布局1">
        <Card style="margin-bottom:10px;width:200px;height:200px"></Card>
     </Radio >
     <Radio label="布局2">
        <Card style="margin-bottom:10px;width:200px;height:200px"></Card>
     </Radio >
     <Radio label="布局3">
        <Card style="margin-bottom:10px;width:200px;height:200px"></Card>
     </Radio >
    <Radio label="布局4">
        <Card style="margin-bottom:10px;width:200px;height:200px"></Card>
     </Radio >
  </RadioGroup>
</template>

<script>
 export default {
    data(){
       return {
          layoutSelected:"布局1"
       }
    },
    methods:{
      //存储选中的布局
      layoutselected(){
        this.$store.commit("layoutSelected",this.layoutSelected);
      }
    }
}
</script>

<style scoped>
</style>
