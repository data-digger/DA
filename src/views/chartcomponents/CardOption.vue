<template>
   <Row>
            <FormItem prop="introText">
                DescriptText
               <Input v-model="selectdOption.introText" placeholder="输入卡片描述"></Input>
            </FormItem>
            <FormItem prop="data">
                Data
                <Select class="form-control" v-model='selectdOption.data'>               
                    <Option v-for='item in data' :key='item' :value="item" >{{item}}</Option>
                </Select>
            </FormItem>
            <Col span='6'>
                <FormItem prop="color">
                    Color
                <ColorPicker v-model="selectdOption.color" />
                </FormItem>
            </Col> 
            <Col span='17' offset='1'>
                <FormItem prop="icon">
                    Icon
                    <Input v-model="selectdOption.iconType">
                        <Button slot="append" icon="ios-search" @click="showIconSearch"></Button>
                    </Input>
                </FormItem>
            </Col>
            <Modal
                v-model="iconSearch"
                width ="800px"
                title="IConType"
                @on-ok="iconOk"
                @on-cancel="cancel">
                <RadioGroup v-model="selectdOption.iconType">
                    <Radio v-for="icon in ICONS" :key="icon" :label="icon">
                        <Icon :type="icon"></Icon>
                        <span>{{icon}}</span>
                    </Radio>
                </RadioGroup>      
        </Modal>        
    </Row>
</template>
<script>
import ChartTemplate from './../../libs/ChartTemplate.js'
export default {
    props:['data'],
    computed: {
      COLORS : function(){
          return Object.keys(ChartTemplate.COLORS)
      }
    },
    data () {
        return {
                selectdOption:{
                    introText:"",
                    data:"",
                    iconType:"android-person-add",
                    color:"#2d8cf0",
                    countSize: '30px',
                    countWeight: 700,
                    iconSize: 40,
                    introColor: '#C8C8C8',
                    introSize: '12px',
                    introWeight: 500
                },
                ICONS : ChartTemplate.ICONS,
                iconSearch:false,
            }
    },
    methods:{
       sentOption:function(){
           let Vue = this;
           Vue.$emit('getSelectedOption',Vue.selectdOption);
       },
       showIconSearch:function(){
           let Vue = this;
           Vue.iconSearch = true;
       },
       iconOk:function(){

       },
       cancel:function(){}
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>