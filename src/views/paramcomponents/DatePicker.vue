<template>
    <Row>
      <DatePicker 
        :type="datePickerType"  
        :value='defaultValue' 
        @on-change='sentDate'
        style="width: 200px" 
      ></DatePicker>
    </Row>
</template>
<script>
    export default {
        props:["componentType",'defaultValue','index'],
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

        },
        data () {
            return {
              currentDate:null
            }
        },
        methods:{
          //传递date到其他组件
          sentDate(currentDate){
            let Vue = this;
            Vue.defaultValue = currentDate;
            Vue.$emit("sentDate",{index:Vue.index,value:currentDate});
          },
        }
    }
</script>