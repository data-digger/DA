<template>
   <Row>
            <FormItem prop="introText">
                <Col span='13'>
                    DescriptText
                    <Input v-model="selectdOption.introText" placeholder="输入卡片描述"></Input>
                </Col>
                <Col span='2' offset='1'>
                    TextColor
                    <ColorPicker v-model="selectdOption.introColor" />
                </Col>
                <Col span='4' offset='4'>
                    TextSize
                    <Input v-model="selectdOption.introSize"></Input>                    
                </Col>
            </FormItem>
            <FormItem prop="data">
                <Col span='13'>
                    Data
                    <Select class="form-control" v-model='selectdOption.data'>               
                        <Option v-for='item in data' :key='item' :value="item" >{{item}}</Option>
                    </Select>
                </Col>
                 <Col span='2' offset='1'>
                    Color
                    <ColorPicker v-model="selectdOption.color" />
                </Col>
                <Col span='4' offset='4'>
                    DataSize
                    <Input v-model="selectdOption.countSize"></Input>                    
                </Col>
            </FormItem>
            <FormItem prop="icon">
                Icon
                <Input v-model="selectdOption.iconType">
                    <Button slot="append" icon="ios-search" @click="showIconSearch"></Button>
                </Input>
            </FormItem>
            <Modal
                v-model="iconSearch"
                width ="800px"
                title="IConType"
                @on-ok="iconOk"
                @on-cancel="cancel">
                <RadioGroup v-model="selectdOption.iconType">
                    <Radio size='large' v-for="icon in ICONS" :key="icon" :label="icon">
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
        setData:function(JSONOption){
            let Vue = this;
            Vue.selectdOption = JSON.parse(JSONOption);
            Vue.iconSearch = false
           // Vue.$store.commit('getInitOption',Vue.selectdOption);
        },
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
       cancel:function(){},
       reset:function(){
           let Vue = this;
           Vue.selectdOption.introText = '';
           Vue.selectdOption.introColor = '#C8C8C8',
           Vue.selectdOption.introSize= '12px',
           Vue.selectdOption.data = '',
           Vue.selectdOption.color = "#2d8cf0"
           Vue.selectdOption.countSize='30px',
           Vue.selectdOption.iconType="android-person-add"
       }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>