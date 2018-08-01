<template>
<Row>
   <Row>
        <Col span='11'>
            <FormItem prop="circleText">
                circleText
                <Select class="form-control" v-model='dataSelected.circleText'>               
                    <Option v-for='(item,index) in standByList' :key="item.columnName" :value="item.columnName" >{{item.columnAlias}}</Option>
                </Select>
            </FormItem>
        </Col>
        <Col span='11' offset='2'>
            <FormItem prop="title">
                title
                <Select class="form-control" v-model='dataSelected.title'>               
                    <Option v-for='(item,index) in standByList' :key="item.columnName" :value="item.columnName" >{{item.columnAlias}}</Option>
                </Select>
            </FormItem>
        </Col>
    </Row>
    <Row>
        <Col span='11'>
            <FormItem prop="subTitle">
                subTitle
                <Select class="form-control" v-model='dataSelected.subTitle'>               
                    <Option v-for='(item,index) in standByList' :key="item.columnName" :value="item.columnName" >{{item.columnAlias}}</Option>
                </Select>
            </FormItem>
        </Col>
        <Col span='11' offset='2'>
            <FormItem prop="detail">
                detail
                <Select class="form-control" v-model='dataSelected.detail'>               
                    <Option v-for='(item,index) in standByList' :key="item.columnName" :value="item.columnName" >{{item.columnAlias}}</Option>
                </Select>
            </FormItem>
        </Col>
    </Row>
    <FormItem prop="dayTime">
        dayTime
        <Select class="form-control" v-model='dataSelected.dayTime'>               
            <Option v-for='(item,index) in standByList' :key="item.columnName" :value="item.columnName" >{{item.columnAlias}}</Option>
        </Select>
    </FormItem>
   </Row>
</Row>
</template>
<script>

import {mapGetters} from 'vuex'
import util from './../util.js'

export default {
    computed: {
      ...mapGetters({
        metrics:'metrics',
        groupbyList:'groupbyList'
      }),
      metricNoFun : function(){
          return this.metrics.filter(m => m.category != 2);
      },
      standByList : function(){
          return this.groupbyList.concat(this.metricNoFun)
      }
    },
    data () {
        return {
                dataSelected:{
                    circleText:'',
                    title:'',
                    subTitle:'',
                    detail:'',
                    dayTime:''
                },              
                params:{value:[],groupby:null,isgroupby:false}
            }
    },
    methods: {
        setData:function(eoption,filters){
            let Vue = this;
            Vue.params.value = filters.value;
            Vue.params.groupby = filters.groupby;
            Vue.params.isgroupby = filters.isgroupby;
            Vue.dataSelected.circleText = eoption.circleText;
            Vue.dataSelected.title = eoption.title;
            Vue.dataSelected.subTitle = eoption.subTitle;
            Vue.dataSelected.detail = eoption.detail;
            Vue.dataSelected.dayTime = eoption.dayTime;
                
        },

        getOption:function(){
            let Vue = this;
            Vue.params.value = [Vue.dataSelected.circleText,Vue.dataSelected.title,Vue.dataSelected.subTitle,
                                Vue.dataSelected.detail,Vue.dataSelected.dayTime]
            return {selected:this.dataSelected,params:this.params,isvalid:true};  
        },

        reset:function(){
            this.dataSelected = {
                    circleText:'',
                    title:'',
                    subTitle:'',
                    detail:'',
                    dayTime:''
                },                 
            this.params = {value:[],groupby:null,isgroupby:true};
        }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->