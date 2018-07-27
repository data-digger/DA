<template>
      <Row>
        <FormItem prop="ListStyle">
            <Col span='7'>
                circleSize
                <Input v-model="option.circleSize"></Input>                    
            </Col>
             <Col span='8' offset='1'>
                circleTextSize
                <Input v-model="option.circleTextSize"></Input>                    
            </Col>
            <Col span='7' offset='1'>
                textSize
                <Input v-model="option.textSize"></Input>                    
            </Col> 
        </FormItem>          
    </Row>
</template>
<script>
import util from './../util.js'
import {mapGetters} from 'vuex'
export default {
    computed: {
      ...mapGetters({

      }),
    },
    data () {
        return {
                option:{
                        key:'',
                        circleText:'',
                        title:'',
                        subTitle:'',
                        detail:'',
                        dayTime:'',
                        circleSize:'40px',
                        circleTextSize:'20px',
                        textSize:'12px'
                    }              
            }
    },
    methods: {
         setData:function(eoption,theme){
            this.option = $.extend(true, {}, eoption);;
                
        },
        getOption:function(dataOption){
            this.option.circleText = dataOption.selected.circleText;
            this.option.title = dataOption.selected.title;
            this.option.subTitle = dataOption.selected.subTitle;
            this.option.detail = dataOption.selected.detail;
            this.option.dayTime = dataOption.selected.dayTime;
            return this.option;          
       },
       attachData:function(eoption,data){
            util.attachData(eoption,data,'InforList',1);
        },

        reset:function(){
            let Vue = this;
            Vue.circleSize = '35px';
            Vue.circleTextSize = '20px';
            Vue.textSize = '12px';
       },
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->