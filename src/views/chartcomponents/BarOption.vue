<template>
   <Row>
        <FormItem label="xAxis" prop="xAxis">
            <Select class="form-control" v-model='selectdOption.xAxis.data'>               
                <Option v-for='item in data' :key='item' :value="item" >{{item}}</Option>
            </Select>
        </FormItem>
        <FormItem label="yAxis" prop="xAxis">
            <Select v-model="selectdOption.series" multiple>
                <Option v-for='item in data' :key='item' :value="item">{{item}}</Option>
            </Select>
        </FormItem>       
    </Row>
</template>
<script>
export default {
    props:['data'],
    data () {
        return {
                selectdOption:{
                    color:['#006699','#1e90ff','#4770d8','#4bafe9','#24c9f2','#66e5f4'],
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        show:true
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : {
                            type : 'category',
                            data : '',
                        },
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                    ]
                },
            }
    },
    methods:{
       sentOption:function(){
           let Vue = this;
           Vue.$emit('getSelectedOption',Vue.selectdOption);
       }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>