<template>
  <RadioGroup id='selectLayout' v-model="gridLayoutSelected" :on-change ='gridLayoutselected()'>
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
      gridLayoutSelected:"布局1"
    }
  },
  methods:{
    //向store中存储选中的布局
    gridLayoutselected(){
      let currentReportGridLayout = null;
      if(this.gridLayoutSelected == "布局1"){ currentReportGridLayout = 'GridLayoutPredefine1'};
      if(this.gridLayoutSelected == "布局2"){ currentReportGridLayout = 'GridLayoutPredefine2'};
      if(this.gridLayoutSelected == "布局3"){ currentReportGridLayout = 'GridLayoutPredefine3'};
      if(this.gridLayoutSelected == "自定义"){ currentReportGridLayout = 'GridLayoutDefine'};
      this.$store.commit("currentReportGridLayout",currentReportGridLayout);
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
