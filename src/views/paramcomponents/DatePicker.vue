<template>
    <Row>
      <DatePicker v-if='monthShow' type="month" placeholder="Select month" style="width: 200px" @on-change="getSelectedDate" :value='defaultMonth' @on-open-change ='closeDatePicker'></DatePicker>
      <DatePicker v-if='dayShow' type="date" placeholder="Select month" style="width: 200px" @on-change="getSelectedDate" :value='defaultDay' @on-open-change ='closeDatePicker'></DatePicker>
      <Input v-if='defineShow' :on-blur = 'closeDatePicker' v-model ='selectedDate' placeholder='请输入'></Input>
<!--       <DatePicker v-if='dayShow' type="date" :options="options1" placement="bottom-start" placeholder="Select date" style="width: 200px"  @on-change="getSelectedDate" @on-open-change ='closeDatePicker' :value='defaultDate'></DatePicker> -->
    </Row>
</template>
<script>
    export default {
        props:["dateType",'cmpContent'],
        watch:{
          /*'defaultDate':'saveDate',*/
          'dateType':'dateTypeSelect',
         /* 'cmpContent':'dateTypeSelect'*/
        },
        data () {
            return {
                selectedDate:'',
                defaultMonth:'2018-5',
                defaultDay:'2018-5-2',
                monthShow:false,
                dayShow:false,
                defineShow:false,
 /*               options1: {
                  shortcuts: [
                      {
                          text: 'Today',
                          value () {
                              return new Date();
                          },
                          onClick: (picker) => {
                              this.$Message.info('Click today');
                          }
                      },
                      {
                          text: 'Yesterday',
                          value () {
                              const date = new Date();
                              date.setTime(date.getTime() - 3600 * 1000 * 24);
                              return date;
                          },
                          onClick: (picker) => {
                              this.$Message.info('Click yesterday');
                          }
                      },
                      {
                          text: 'One week',
                          value () {
                              const date = new Date();
                              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                              return date;
                          },
                          onClick: (picker) => {
                              this.$Message.info('Click a week ago');
                          }
                      }
                  ]
                }, */            
            }
        },
        methods:{

            /*获取选中日期*/
            getSelectedDate(dateData){
              let Vue = this;
              Vue.selectedDate = dateData;
            },

            /*关闭日期控件时*/
            closeDatePicker(DatePicker){
              let Vue = this;
           /*   if(DatePicker == false){*/
              Vue.getSelectedDate();
              Vue.$emit("sendDate",Vue.selectedDate);
  /*            }*/
            },

            /*自定义日期控件失去焦点*/
/*            sendDefineDate(){
              let Vue = this;
              Vue.$emit("sendDate",Vue.selectedDate);
            },*/
            /*保存日期*/
       /*          saveDate(){
              let Vue = this;
         if(Vue.cmpContent){
                let paramSelected = {};
                if(Vue.cmpContent.content.paramType == 'date'){
                  paramSelected[Vue.cmpContent.content.paramId] = Vue.selectedDate;  
                }
                Vue.$emit("sentParam",paramSelected);                
              }
            },*/
            dateTypeSelect(){
              let Vue = this;
              if(Vue.dateType){
                if(Vue.dateType == 'DateByMonth'){
                  Vue.monthShow = true;
                  Vue.dayShow = false;   
                  Vue.defineShow = false;         
                } 
                if(Vue.dateType == 'DateByDay'){
                  Vue.dayShow = true;
                  Vue.monthShow = false;            
                  Vue.defineShow = false; 
                }  
                if(Vue.dateType == 'DateByUser'){
                  Vue.defineShow = true; 
                  Vue.dayShow = false;
                  Vue.monthShow = false;            
                }              
              }
/*              if(Vue.cmpContent){
                if(Vue.cmpContent.content.paramType == 'date' && Vue.cmpContent.content.defaultDate.format == "yyyy-MM-dd"){
                  Vue.dayShow = true;
                  Vue.monthShow = false;
                  Vue.defaultDate = Vue.cmpContent.content.defaultDate.date;
                  Vue.selectedDate = Vue.cmpContent.content.defaultDate.date;
                }
                if(Vue.cmpContent.content.paramType == 'date' && Vue.cmpContent.content.defaultDate.format == "yyyy-MM"){
                  Vue.monthShow = true;
                  Vue.dayShow = false;
                  Vue.defaultDate = Vue.cmpContent.content.defaultDate.date;
                  Vue.selectedDate = Vue.cmpContent.content.defaultDate.date;
                }                            
              } */   

            }
        },
        beforeMount(){
           let Vue = this;
           Vue.dateTypeSelect();    
        },
    }
</script>