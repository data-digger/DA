<template>
  <RadioGroup id='selectLayout' v-model="layoutSelected" :on-change ='layoutselected()'>
     <Radio label="布局1">
        <Card style="margin-bottom:10px;width:200px;height:200px">
          <img class='layoutImg' src="./../../assets/img/default_layout_1.png">
        </Card>
     </Radio >
     <Radio label="布局2">
        <Card style="margin-bottom:10px;width:200px;height:200px">
          <img class='layoutImg' src="./../../assets/img/default_layout_2.png">
        </Card>
     </Radio >
     <Radio label="布局3">
        <Card style="margin-bottom:10px;width:200px;height:200px">
          <img class='layoutImg' src="./../../assets/img/default_layout_3.png">
        </Card>
     </Radio >
    <Radio label="自定义">
        <Card style="margin-bottom:10px;width:200px;height:200px">
          <img class='layoutImg' src="./../../assets/img/diy.png">
        </Card>
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
#selectLayout{
  margin:20px;
}
.layoutImg{
  width: 100%;
  height: 100%;
}
</style>
