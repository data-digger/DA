<template>
    <Row>
        <Col span="12">
            <DatePicker v-if='monthShow' type="month" placeholder="Select month" style="width: 200px"@on-open-change='save' @on-change="handleChange" :value='defaultDate'></DatePicker>
        </Col>
        <Col span="12">
            <DatePicker v-if='DaterangeShow' type="date" :options="options1" placement="bottom-start" placeholder="Select date" style="width: 200px"  @on-open-change='save' @on-change="handleChange" :value='defaultDate'></DatePicker>
        </Col>
    </Row>
</template>
<script>
    export default {
        props:["dateType",'cmpContent'],
        data () {
            return {
                selectedDate:null,
                defaultDate:null,
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
            save(DatePicker){
               let Vue = this;
               if(DatePicker == false){
                  Vue.$emit("sentDate",Vue.selectedDate);
               }
            }
        },
        beforeMount(){
           let Vue = this;
           if(Vue.cmpContent){
               if(Vue.cmpContent.paramType == 'date' && Vue.cmpContent.defaultDate.format == "yyyy-MM-dd"){
                  Vue.DaterangeShow = true;
                  Vue.monthShow = false;
                  Vue.defaultDate = Vue.cmpContent.defaultDate.date;
               }
               if(Vue.cmpContent.paramType == 'date' && Vue.cmpContent.defaultDate.format == "yyyy-MM"){
                  Vue.monthShow = true;
                  Vue.DaterangeShow = false;
                  Vue.defaultDate = Vue.cmpContent.defaultDate.date;
               }            
           }
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

        },
    }
</script>