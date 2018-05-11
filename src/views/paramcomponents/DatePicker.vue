<template>
    <Row>
      <DatePicker 
        :type="datePickerType"  
        :value='currentDate' 
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
            Vue.$emit("sentDate",{index:Vue.index,value:currentDate});
          },
        },
        mounted(){
            let Vue = this;
            Vue.currentDate = Vue.defaultValue
            console.log('mounted');
        },
        beforeCreate(){
          console.log('beforeCreate');
        },
        created(){
          console.log('created');
        },
        beforeMount(){
          console.log('beforeMount');
        },
        beforeUpdate(){
          console.log('beforeUpdate');
        },
        updated(){
          console.log('updated');
        },
        beforeDestroy(){
          console.log('beforeDestroy');
        },
        destroyed(){
          console.log('destroyed');
        }
    }
</script>