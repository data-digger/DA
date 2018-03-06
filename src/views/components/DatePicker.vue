<template>
    <Row>
        <Col span="12">
            <DatePicker v-if='monthShow' type="date" :options="options1" placeholder="Select date" style="width: 200px" @on-open-change='save' @on-change="handleChange"></DatePicker>
        </Col>
        <Col span="12">
            <DatePicker v-if='DaterangeShow' type="daterange" :options="options2" placement="bottom-start" placeholder="Select date" style="width: 200px"  @on-open-change='save' @on-change="handleChange"></DatePicker>
        </Col>
    </Row>
</template>
<script>
    export default {
        props:["DaterangeShow","monthShow"],
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
                options2: {
                    shortcuts: [
                        {
                            text: 'A week',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                return [start, end];
                            }
                        },
                        {
                            text: 'A month',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                return [start, end];
                            }
                        },
                        {
                            text: '3 month',
                            value () {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                return [start, end];
                            }
                        }
                    ]
                }
            }
        },
        methods:{
            handleChange(dateData){
              this.dataValue = dateData;
            },
            save(DatePicker){
               let Vue = this;
               if(DatePicker == false){
                  Vue.$store.commit("saveParamDate",Vue.dataValue); 
               }
            }
        }
    }
</script>