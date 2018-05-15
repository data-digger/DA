<template>
    <Row>
      <DatePicker 
        :type="datePickerType"  
        :value='selectedValue' 
        @on-change='sentDate'
        style="width: 200px" 
      ></DatePicker>
    </Row>
</template>
<script>
    export default {
        props:["componentType",'defaultValue','index','randomName'],
        computed:{
          datePickerType(){
            let Vue = this;
            if(Vue.componentType){
              if(Vue.componentType == 'DateByMonth'){
                return 'month'        
              } 
              if(Vue.componentType == 'DateByDay'){
                return 'date'          
              }           
            }            
          }
        },
        watch:{
          randomName (val) {
             this.selectedValue = this.defaultValue;
          }
        },
        data () {
            return {
              selectedValue:this.defaultValue
            }
        },
        methods:{
          //传递date到其他组件
          sentDate(currentDate){
            let Vue = this;
            Vue.selectedValue = currentDate;
            Vue.$emit("sentDate",{index:Vue.index,value:currentDate});
          },
        },
    }
</script>