<template>
    <Row>
        <Col span="12">
            <DatePicker v-if='monthShow' type="month" placeholder="Select month" style="width: 200px"@on-open-change='save' @on-change="handleChange"></DatePicker>
        </Col>
        <Col span="12">
            <DatePicker v-if='DaterangeShow' type="date" :options="options1" placement="bottom-start" placeholder="Select date" style="width: 200px"  @on-open-change='save' @on-change="handleChange"></DatePicker>
        </Col>
    </Row>
</template>
<script>
    export default {
        props:["DaterangeShow","monthShow",'cmpContent'],
        data () {
            return {
                dataValue:null,
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
              this.dataValue = dateData;
            },
            save(DatePicker){
               let Vue = this;
               if(DatePicker == false){
                  /*Vue.$store.commit("saveParamDate",Vue.dataValue); */
                  Vue.$emit("sentDate",Vue.dataValue);
               }
            }
        },
        beforeMount(){
           let Vue = this;
           if(Vue.cmpContent.paramType == 'date' && Vue.cmpContent.defaultDate.format == "yyyy-MM-dd"){
              Vue.DaterangeShow = true;
              Vue.monthShow = false;
           }
           if(Vue.cmpContent.paramType == 'date' && Vue.cmpContent.defaultDate.format == "yyyy-MM"){
              Vue.monthShow = true;
              Vue.DaterangeShow = false;
           }           
        }
    }
</script>