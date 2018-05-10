<template>
    <Row>
      <DatePicker 
        v-if='datePickerShow' 
        :type="datePickerType" 
        :value='defaultValue' 
        @on-change='sentDate'
        style="width: 200px" 
      ></DatePicker>
      <Input v-if='defineDatePickerShow' :value='defaultValue'></Input>
    </Row>
</template>
<script>
    export default {
        props:["componentType",'defaultValue'],
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
          },
          datePickerShow(){
            let Vue = this;
            if(Vue.componentType == 'DateByMonth' || Vue.componentType == 'DateByDay'){
              return true;
            }
            if(Vue.componentType == 'DateByUser'){
              return false;
            }
          },
          defineDatePickerShow(){
            let Vue = this;
            if(Vue.componentType == 'DateByMonth' || Vue.componentType == 'DateByDay'){
              return false;
            }
            if(Vue.componentType == 'DateByUser'){
              return true;
            }
          }
        },
        watch:{

        },
        data () {
            return {

            }
        },
        methods:{
          //传递date到其他组件
          sentDate(currentDate){
            let Vue = this;
            Vue.$emit("sentDate",currentDate);
          },
        },
        beforeMount(){
           let Vue = this; 
        },
    }
</script>