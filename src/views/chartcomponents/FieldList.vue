
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
                    过滤
                    <div slot="content">
                        <Collapse>
                            <Panel name="3-1">
                                排序
                                <Row slot="content">
                                    <Col span='15'>
                                        <Select class="form-control" v-model='filter.orderby.field'>               
                                            <Option v-for="item in columns" :key="item.columnName" :value="item.columnName">{{item.columnAlias}}</Option>
                                        </Select>
                                    </Col>
                                    <Col span='8' offset='1'>
                                        <Select class="form-control" v-model='filter.orderby.type'>               
                                            <Option v-for='item in ORDERTYPE' :key='item' :value="item" >{{item}}</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </Panel>
                            <Panel name="3-2">
                                顶部
                                <Row slot="content">
                                    <Col span='3'><label class='filter-label'>top:</label></Col>
                                    <Col span='20'>
                                        <Input v-model="filter.top" placeholder="10"></Input>
                                    </Col>
                                </Row>
                            </Panel>
                            <Panel name="3-3">
                                内容
                                <div slot="content">
                                    <Form ref="contentFilter" :label-width="0">
                                        <FormItem
                                                v-for="(item, index) in filter.where"
                                                :key="index"
                                                :prop="'items.' + index + '.value'">
                                            <Row>
                                                <Col span="7">
                                                    <Select class="form-control" v-model='filter.where[index].field'>               
                                                        <Option v-for="item in filterableList" :key="item.columnName" :value="item.columnName">{{item.columnAlias}}</Option>
                                                    </Select>
                                                </Col>
                                                <Col span="8" offset="1">
                                                    <Select class="form-control" v-model='filter.where[index].mark'>                   
                                                        <Option v-for="item in CONTENTFILTERMARK" :key="item" :value="item">{{item}}</Option>
                                                    </Select>
                                                </Col>
                                                <Col span="5" offset="1">
                                                    <Input v-model="filter.where[index].value" placeholder="过滤值"></Input>
                                                </Col>
                                                
                                                <Col span="1" offset="1">
                                                    <Icon type="ios-minus-outline" size='18' @click.native="removeContentFilter(index)" ></Icon>
                                                </Col>
                                            </Row>
                                        </FormItem>
                                        <FormItem>
                                            <Row>
                                                <Col span="12">
                                                    <Button type="dashed" long @click="addContentFilter" icon="plus-round">添加内容过滤</Button>
                                                </Col>
                                            </Row>
                                        </FormItem>
                                    </Form>
                                </div>
                            </Panel>
                    </Collapse>
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
            CONTENTFILTERMARK:['IN','NOT IN','=','>','<','>=','<='],
            activedPanel:[],
            dimensions:[],
            metrics:[],
            filterableList:[],
            groupbyList:[],           
            filter:{
                orderby:{field:'',type:'ASC'},
                limit:10,
                where:[]
                }
            }
    },
    methods: {
        classify(){
            let Vue = this;
            Vue.metrics = [];
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
                        case "FLOAT":
						case "DOUBLE":
                        case "REAL":
                        case "DECIMAL":
						case "NUMERIC":
                            Vue.metrics.push(Vue.columns[i]);
                        break;
                        case "CHAR":
						case "LONGVARCHAR":
                        case "VARCHAR":
                        case "DATE":
						case "TIME":
						case "TIMESTAMP":
                            Vue.dimensions.push(Vue.columns[i]);
                        break;
                        default:
                            if(category == 2){
                                Vue.metrics.push(Vue.columns[i])
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

            Vue.activedPanel = ["1","2"];
        },
        addContentFilter(){
            let Vue = this;
            Vue.filter.where.push({field:'',mark:'',value:''})
        },
        removeContentFilter(index){
            let Vue = this;
            Vue.filter.where.splice(index,1);
        },
        isComputed(category){
            if(category == 0){
                return false
            } else {
                return true
            }
        },
        ok(){
            let Vue = this;
            Vue.colNames.push(Vue.field.name);
        },
        cancel(){

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

</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->