<template>
   <Row>
            <FormItem prop="introText">
                <Col span='13'>
                    DescriptText
                    <Input v-model="selectdOption.introText" placeholder="输入卡片描述"></Input>
                </Col>
                <Col span='2' offset='1'>
                    TextColor
                    <ColorPicker v-model="selectdOption.introColor"/>
                </Col>
                <Col span='4' offset='4'>
                    TextSize
                    <Input v-model="selectdOption.introSize"></Input>                    
                </Col>
            </FormItem>
            <FormItem prop="data">
                <Col span='13'>
                    Data
                    <Select class="form-control" v-model='selectdData'>               
                        <Option v-for='(item,index) in metrics' :key="item.columnName" :value="index" >{{item.columnAlias}}</Option>
                    </Select>
                </Col>
                 <Col span='2' offset='1'>
                    Color
                    <ColorPicker v-model="selectdOption.color" placement='top'/>
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
import {mapGetters} from 'vuex'
export default {
    props:['data'],
    computed: {
    ...mapGetters({
        //dimensions:'dimensions',
        metrics:'metrics',
        //groupbyList:'groupbyList',
        //aggregationFun:'aggregationFun'
      }),
      COLORS : function(){
          return Object.keys(ChartTemplate.COLORS)
      }
    },
    data () {
        return {
                selectdOption:{
                    introText:"",
                    data:0,
                    iconType:"person-add",
                    color:"#2d8cf0",
                    countSize: '30px',
                    countWeight: 700,
                    iconSize: 40,
                    introColor: '#C8C8C8',
                    introSize: '15px',
                    introWeight: 500,
                    dataName:'',
                },
                ICONS : ChartTemplate.ICONS,
                iconSearch:false,
                selectdData:-1,
                params:{value:[],groupby:null,isgroupby:false}
            }
    },
    methods:{
        setData:function(eoption,filters){
            let Vue = this;
            Vue.selectdOption = eoption;
            Vue.selectdData = Vue.findIndex(Vue.metrics,Vue.selectdOption.dataName);
            Vue.params.value = filters.value;
            Vue.params.groupby = filters.groupby;
            Vue.params.isgroupby = filters.isgroupby;
            Vue.iconSearch = false
           // Vue.$store.commit('getInitOption',Vue.selectdOption);
        },
        findIndex:function(list,name){
            var re = -1;
            for(let i=0; i<list.length; i++){
                if(list[i].columnName == name){
                    re = i;
                    break;
                }
            }
            return re;
        },
       sentOption:function(){
           let Vue = this;
            if (Vue.selectdData != -1) {
                    Vue.params.value = [];
                    let dataName = Vue.metrics[Vue.selectdData].columnName;
                    Vue.selectdOption.dataName = dataName;
                    //Vue.params.value.push(Vue.metrics[Vue.selectdData]);
                    Vue.params.value.push(dataName);
                    Vue.$emit('getSelectedOption',{option:Vue.selectdOption,filter:Vue.params,isvalid:true});
            } else {
                Vue.$emit('getSelectedOption',{isvalid:false});
                Vue.$Message.error('数据字段');
            }
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
            Vue.selectdOption.introColor = '#C8C8C8';
            Vue.selectdOption.introSize= '15px';
            Vue.selectdOption.data = 0;
            Vue.selectdOption.color = "#2d8cf0";
            Vue.selectdOption.countSize='30px';
            Vue.selectdOption.iconType="person-add";
            Vue.selectdOption.dataName = '';
            Vue.selectdData = -1;
            Vue.params = {value:[],groupby:null,isgroupby:false}
       }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>