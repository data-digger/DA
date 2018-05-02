
<template>
    <div id='fieldList'>
        <Collapse  v-model="activedPanel">
            <Panel name="1">
                维度
                <Tooltip content="添加计算字段" placement="right">
                    <Icon type="plus-round"></Icon>
                </Tooltip>               
                <div slot="content">
                    <ul>
                        <li v-for="(item,index) in dimensions" :key="item.columnName" :class="{'computed-field':isComputed(item.category)}"> 
                            <span>
                                <Icon type="ios-pricetags-outline" size='15'></Icon>
                                {{ item.columnAlias}}
                            </span>
                        </li>
                    </ul>
                </div>
            </Panel>
            <Panel name="2">
                    度量
                    <Tooltip content="添加计算字段" placement="right">
                        <Icon type="plus-round"></Icon>
                    </Tooltip>
                    <div slot="content">
                        <ul>
                           <li v-for="(item,index) in metrics" :key="item.columnName" :class="{'computed-field':isComputed(item.category)}">
                                <span>
                                    <Icon type="ios-calculator-outline" size='15'></Icon>
                                    {{item.columnAlias}}
                                </span>
                            </li>
                        </ul>
                    </div>
            </Panel>

            <Panel name="3">
                排序
                <Row slot="content">
                    <Col span='13'>
                        <Select class="form-control" v-model='filter.orderby.field' clearable>               
                            <Option v-for="item in columns" :key="item.columnName" :value="item.columnName">{{item.columnAlias}}</Option>
                        </Select>
                    </Col>
                    <Col span='9' offset='1'>
                        <Select class="form-control" v-model='filter.orderby.type'>               
                            <Option v-for='item in ORDERTYPE' :key='item' :value="item" >{{item}}</Option>
                        </Select>
                    </Col>
                </Row>
            </Panel>
            <Panel name="4">
                顶部
                <Row slot="content">
                    <Row>
                        <Col span='3'><label class='filter-label'>top:</label></Col>
                        <Col span='20'>
                            <Input v-model="filter.limit" placeholder="10"></Input>
                        </Col>
                    </Row>
                    <Row>
                        <Col span='21' offset='3'><span class='notice-span'><I>最大个数为200</I></span></Col>
                    </Row>
                </Row>
            </Panel>
            <Panel name="5">
                过滤
                <div slot="content">
                    <Form ref="contentFilter" :label-width="0">
                        <FormItem
                                v-for="(item, index) in filter.where"
                                :key="index"
                                :prop="'items.' + index + '.value'">
                            <Row>
                                    <Col span="12">
                                        <Select class="form-control" v-model='filter.where[index].field'>               
                                            <Option v-for="(item,i) in filterableList" :key="item.columnName" :value="item.columnName">{{item.columnAlias}}</Option>
                                        </Select>
                                    </Col>
                                    <Col span="9" offset="1">
                                        <Select class="form-control" v-model='filter.where[index].mark' @on-change="changePlaceHolder">                   
                                            <Option v-for="item in CONTENTFILTERMARK" :key="item" :value="item">{{item}}</Option>
                                        </Select>
                                    </Col>
                                    <Col span="22">
                                        <Input v-model="filter.where[index].value" :placeholder="placeholder"></Input>
                                    </Col>
                                    
                                    <Col span="1" offset="1">
                                        <Button id='removeContent' type="ghost" icon="ios-minus-empty" shape="circle" size='small' @click="removeContentFilter(index)"></Button>
                                    </Col>
                            </Row>
                        </FormItem>
                        <FormItem>
                            <Row>
                                <Col span="12">
                                    <Button type="dashed" long @click="addContentFilter" icon="plus-round">添加过滤</Button>
                                </Col>
                            </Row>
                        </FormItem>
                    </Form>
                </div>
            </Panel>
    </Collapse>
</div>
</template>
<script>
import bus from './../../libs/bus.js'
import { parse } from 'babylon';
export default {
    props:['columns'],
    computed: {
    },
    watch:{
     'columns': 'classify',
　  },
    data () {
        return {
            FUNCTION:['AND','OR','NOT','DISTINCT','SUM','COUNT','AVG'],
            ORDERTYPE:['ASC','DESC'],
            CONTENTFILTERMARK:['IN','NOT IN','=','>','<','>=','<=','!=','==','LIKE'],
            activedPanel:[],
            activedFilterPanel:[],
            dimensions:[],
            metrics:[],
            aggregationFun:[],
            filterableList:[],
            groupbyList:[],
            placeholder:"'1',使用英文半角引号",  
            whereIndex:[],         
            filter:{
                orderby:{field:'',type:'ASC'},
                limit:200,
                where:[]
                }
            }
    },
    methods: {
        classify(){
            let Vue = this;
            Vue.metrics = [];
            Vue.aggregationFun = [];
            Vue.dimensions = [];
            Vue.filterableList = [];
            Vue.groupbyList = [];
            for(var i in Vue.columns){
                let type = Vue.columns[i].columnType;
                let filterable = Vue.columns[i].filterable;
                let groupby = Vue.columns[i].groupby;
                let category = Vue.columns[i].category;
                switch(type)
                    {
                        case "BIT":
						case "BIGINT":
						case "TINYINT":
						case "SMALLINT":
                        case "INTEGER":
                        case "INT":
                        case "FLOAT":
						case "DOUBLE":
                        case "REAL":
                        case "DECIMAL":
						case "NUMERIC":
                            Vue.metrics.push(Vue.columns[i]);
                            if(category == 2){
                                Vue.aggregationFun.push(Vue.columns[i]);
                            }
                        break;
                        // case "CHAR":
						// case "LONGVARCHAR":
                        // case "VARCHAR":
                        // case "DATE":
						// case "TIME":
						// case "TIMESTAMP":
                        //     Vue.dimensions.push(Vue.columns[i]);
                        //     if(category == 2){
                        //         Vue.aggregationFun.push(Vue.columns[i]);
                        //     }
                        // break;
                        default:
                            if(category == 2){
                                Vue.metrics.push(Vue.columns[i]);
                                Vue.aggregationFun.push(Vue.columns[i]);
                            } else {
                                Vue.dimensions.push(Vue.columns[i]);
                            }       
                    }

                if(filterable == 1){
                    Vue.filterableList.push(Vue.columns[i])
                }
                if(groupby == 1){
                    Vue.groupbyList.push(Vue.columns[i])
                }
            }
            
            Vue.$store.commit('setdimensions', Vue.dimensions);
            Vue.$store.commit('setmetrics',Vue.metrics);
            Vue.$store.commit('setfilterableList',Vue.filterableList);
            Vue.$store.commit('setgroupbyList',Vue.groupbyList);
            Vue.$store.commit('setaggregationFun',Vue.aggregationFun);

            Vue.activedPanel = ["1","2"];
        },
        setData(filters){
            let Vue = this;
            Vue.filter.where = filters.where;
            Vue.filter.orderby = filters.orderby;
            Vue.filter.limit = filters.limit;
            // Vue.whereIndex = [];
            // for(var i in Vue.filter.where){
            //     Vue.whereIndex.push(Vue.findWhereIndex(Vue.filter.where[i].field))
            // }
            Vue.activedPanel = ["3","4","5"];  
        },
        findWhereIndex(filed){
            let Vue = this;
            var index=-1;
            if(filed!=null ){
                for(var i=0; i<Vue.filterableList.length; i++){
                    if(whereObject.columnName == Vue.filterableList[i].columnName){
                        index = i;
                        break;
                    }
                }
            }
            return index;
        },
        emptyOrderBy(){
            let Vue = this;
            Vue.filter.orderby.field = '';
            Vue.filter.orderby.type = 'ASC';
        },
        addContentFilter(){
            let Vue = this;
            Vue.filter.where.push({field:'',mark:'',value:''});
            Vue.whereIndex.push(-1);
        },
        removeContentFilter(index){
            let Vue = this;
            Vue.filter.where.splice(index,1);
            Vue.whereIndex.splice(index,1);
        },
        isComputed(category){
            if(category == 0){
                return false
            } else {
                return true
            }
        },
         changePlaceHolder:function(value){
            if(value=='IN' || value=='NOT IN'){
                this.placeholder =  "('1','2','3'...)";
            } else {
                this.placeholder = "'1',使用英文半角引号"
            }
        },
        sentFilter:function(){
            let Vue = this;
            // for(let i in Vue.whereIndex){
            //     let fieldIndex = Vue.whereIndex[i];
            //     if(fieldIndex != -1){
            //         Vue.filter.where[i].field = Vue.filterableList[fieldIndex].columnName;
            //     }else{
            //         Vue.filter.where[i].field = null;
            //     }
            // }
            Vue.$emit('getFilter',Vue.filter);
        },
        reset(){
            this.activedPanel=[];
            this.activedFilterPanel=[]
            this.dimensions=[];
            this.metrics=[];
            this.aggregationFun=[];
            this.filterableList = [];
            this.groupbyList = [];
            this.whereIndex = [];         
            this.filter={
                    orderby:{field:'',type:'ASC'},
                    limit:200,
                    where:[]
                };

            this.$store.commit('setdimensions', this.dimensions);
            this.$store.commit('setmetrics',this.metrics);
            this.$store.commit('setfilterableList',this.filterableList);
            this.$store.commit('setgroupbyList',this.groupbyList);
            this.$store.commit('setaggregationFun',this.aggregationFun);
            }
        }

}
</script>

<style>
#fieldList .ivu-card-body {
    padding: 11px;
    height: 157px;
    overflow-y: auto;
}
#fieldList .ivu-card{
    margin-bottom: 6px
}
#fieldList .ivu-card-head{
    padding: 7px 8px;
}
#fieldList .ivu-card-extra {
    right: 5%;
    top: 5%;
}
.filter-label{
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 12px;
    color: #495060;
    line-height: 1;
    padding: 10px 12px 1px 0;
    box-sizing: border-box;
}
#fieldList .ivu-collapse-content{
    padding: 0 10px;
}
#fieldList .ivu-collapse-header{
    padding-left:19px
}
#fieldList .ivu-collapse{
    max-height: 580px;
    overflow-y: auto;
}
.computed-field{
    cursor: pointer;
    color:#008aff;
}
.notice-span{
    line-height: 2;
    color: #d2d3d3;
}
#removeContent.ivu-btn-small, #orderEmpty.ivu-btn-small{
    width: 17px;
    height: 17px;
    padding: 0;
    font-size: 8px;
    border-radius: 50%;
}

</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->