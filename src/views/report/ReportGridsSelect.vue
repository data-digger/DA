<template>
  <RadioGroup id='selectLayout' v-model="layoutSelected" :on-change ='layoutselected()'>
     <Radio label="布局1">
        <Card class='layoutCard'>
          <img class='layoutImg' src="./../../assets/img/default_layout_1.png">
        </Card>
     </Radio >
     <Radio label="布局2">
        <Card class='layoutCard'>
          <img class='layoutImg' src="./../../assets/img/default_layout_2.png">
        </Card>
     </Radio >
     <Radio label="布局3">
        <Card class='layoutCard'>
          <img class='layoutImg' src="./../../assets/img/default_layout_3.png">
        </Card>
     </Radio >
    <Radio label="自定义">
        <Card class='layoutCard'>
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
    //向store中存储选中的布局
    layoutselected(){
      let currentReportLayout = null;
      if(this.layoutSelected == "布局1"){ currentReportLayout = 'Layout1'};
      if(this.layoutSelected == "布局2"){ currentReportLayout = 'Layout2'};
      if(this.layoutSelected == "布局3"){ currentReportLayout = 'Layout3'};
      if(this.layoutSelected == "自定义"){ currentReportLayout = 'Layout4'};
      this.$store.commit("currentReportLayout",currentReportLayout);
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
.layoutCard{
  margin-bottom:10px;
  width:200px;
  height:200px
}
</style>
