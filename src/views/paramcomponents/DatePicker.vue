<template>
    <Row>
        <Col span="12">
            <DatePicker v-if='monthShow' type="month" placeholder="Select month" style="width: 200px" @on-change="handleChange" :value='defaultDate' @on-open-change ='closeDatePicker'></DatePicker>
        </Col>
        <Col span="12">
            <DatePicker v-if='DaterangeShow' type="date" :options="options1" placement="bottom-start" placeholder="Select date" style="width: 200px"  @on-change="handleChange" @on-open-change ='closeDatePicker' :value='defaultDate'></DatePicker>
        </Col>
    </Row>
</template>
<script>
    export default {
        props:["dateType",'cmpContent'],
        watch:{
          'defaultDate':'sentDateParam',
          'dateType':'dateTypeSelect',
          'cmpContent':'dateTypeSelect'
        },
        data () {
            return {
                selectedDate:'2018-3-14',
                defaultDate:'2018-3-14',
                monthShow:false,
                DaterangeShow:false,
                options1: {
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
                },             
            }
        },
        methods:{
            handleChange(dateData){
              this.selectedDate = dateData;
            },
            closeDatePicker(DatePicker){
              let Vue = this;
              if(DatePicker == false){
                Vue.sentDateParam();
              }
            },
            sentDateParam(){
              let Vue = this;
              Vue.$emit("sentDate",Vue.selectedDate);
              if(Vue.cmpContent){
                let paramSelected = {};
                if(Vue.cmpContent.content.paramType == 'date'){
                  paramSelected[Vue.cmpContent.content.paramId] = Vue.selectedDate;  
                }
                Vue.$emit("sentParam",paramSelected);                
              }
            },
            dateTypeSelect(){
              let Vue = this;
              if(Vue.dateType){
                if(Vue.dateType == 'DaterangeShow'){
                  Vue.DaterangeShow = true;
                  Vue.monthShow = false;
                } 
                if(Vue.dateType == 'monthShow'){
                  Vue.monthShow = true;
                  Vue.DaterangeShow = false;            
                }             
              }
              if(Vue.cmpContent){
                if(Vue.cmpContent.content.paramType == 'date' && Vue.cmpContent.content.defaultDate.format == "yyyy-MM-dd"){
                  Vue.DaterangeShow = true;
                  Vue.monthShow = false;
                  Vue.defaultDate = Vue.cmpContent.content.defaultDate.date;
                  Vue.selectedDate = Vue.cmpContent.content.defaultDate.date;
                }
                if(Vue.cmpContent.content.paramType == 'date' && Vue.cmpContent.content.defaultDate.format == "yyyy-MM"){
                  Vue.monthShow = true;
                  Vue.DaterangeShow = false;
                  Vue.defaultDate = Vue.cmpContent.content.defaultDate.date;
                  Vue.selectedDate = Vue.cmpContent.content.defaultDate.date;
                }                            
              }    

            }
        },

        beforeMount(){
           let Vue = this;
           Vue.dateTypeSelect();    
        },
    }
</script>