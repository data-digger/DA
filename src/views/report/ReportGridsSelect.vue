<template>
  <RadioGroup 
    id='selectLayout' 
    v-model="gridLayoutSelected" 
    :on-change ='saveCurrentReportGridLayout()'>
     <Radio label="GridLayoutPredefine1">
        <Card class='layoutCard'>
          <img 
            class='layoutImg' 
            src="./../../assets/img/default_layout_1.png">
        </Card>
     </Radio >
     <Radio label="GridLayoutPredefine2">
        <Card class='layoutCard'>
          <img 
            class='layoutImg' 
            src="./../../assets/img/default_layout_2.png">
        </Card>
     </Radio >
     <Radio label="GridLayoutPredefine3">
        <Card class='layoutCard'>
          <img 
            class='layoutImg' 
            src="./../../assets/img/default_layout_3.png">
        </Card>
     </Radio >
    <Radio label="GridLayoutCustomDefine">
        <Card class='layoutCard'>
          <img 
            class='layoutImg' 
            src="./../../assets/img/diy.png">
        </Card>
     </Radio >
  </RadioGroup>
</template>

<script>
export default { 
  data(){
    return {
      gridLayoutSelected:"GridLayoutPredefine1"
    }
  },
  methods:{
    //保存选中的布局
    saveCurrentReportGridLayout(){
      this.$store.commit("saveCurrentReportGridLayout",this.gridLayoutSelected);
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
