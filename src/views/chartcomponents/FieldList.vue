<style lang="less">
    @import "./chart.less";
</style>
<template>
   <Row>
        <Card>
            <p slot="title">
                维度
            </p>
            <a href="#" slot="extra" @click.prevent="newField">
                <Icon type="plus-circled"></Icon>
            </a>
            <ul>
                <li v-for="(item,index) in colNames" :key="item">
                    <Col span='16'>
                        <span>
                            <Icon type="ios-pricetags"></Icon>
                            {{ item}}
                        </span>
                    </Col>
                    <Col> 
                        <span>
                            <Icon type="edit" @click.native="editField(item)"></Icon>   
                        </span>
                        <span>
                            <Icon type="ios-cog" @click.native="handleEvent(item)"></Icon>   
                        </span>                       
                        <span>
                            <Icon type="close" @click.native="deleteFild(index)"></Icon>   
                        </span>
                    </Col>
                </li>
            </ul>
        </Card> 
        <Modal
            width ="600px"
            v-model="editFieldShow"
            title="编辑计算字段"
            @on-ok="ok"
            @on-cancel="cancel">
            <Form id="editField" :label-width="80">
              <FormItem label="名称" prop="name">
                  <Input v-model="field.name" placeholder="输入名称"></Input>
              </FormItem>
              <FormItem label="定义" prop="desc">
                  <Input id='fildDefine' v-model="field.defineJSON" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter define of new field"></Input>
              </FormItem>
            </Form>
            <Row>
                <Col span='10' offset='3'>
                    <Card>
                        <p slot="title">
                            函数
                        </p>                       
                        <ul>
                            <li v-for="item in FUNCTION" :key="item">
                                <a href="#" slot="extra" @click.prevent="addDefine(item)">
                                    <span>
                                        <Icon type="ios-compose"></Icon>
                                        {{ item}}
                                    </span>
                                </a>   
                            </li>
                        </ul>
                    </Card>
                </Col>
                <Col span='10' offset='1'>
                    <Card>
                        <p slot="title">
                            字段
                        </p>                       
                        <ul>
                            <li v-for="item in colNames" :key="item+'forselect'">
                                <a href="#" slot="extra" @click.prevent="addDefine(item)">
                                    <span>
                                        <Icon type="ios-pricetags"></Icon>
                                        {{ item}}
                                    </span>
                                </a>   
                            </li>
                        </ul>
                    </Card>
                </Col>
            </Row>
        </Modal>
    </Row>
</template>
<script>
import bus from './../../libs/bus.js'
export default {
    props:['colNames'],
    computed: {
    },
    data () {
        return {
            FUNCTION:['AND','OR','NOT','DISTINCT','SUM','COUNT','AVG'],
            editFieldShow:false,
            field:{
                name:'',
                defineJSON:'',
            }
            }
    },
    methods: {
        newField(){
            let Vue = this;
            Vue.editFieldShow = true;
        },
        editField(item){
            let Vue = this;
            Vue.editFieldShow = true;
            Vue.field.name = item;
        },
        addDefine(item){
            let Vue = this;
            Vue.field.defineJSON = Vue.field.defineJSON+' '+item
        },
        deleteFild(index){
            let Vue = this;
            Vue.colNames.splice(index,1);
        },
        handleEvent(item){
            bus.$emit('filterEditShow',item); 
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

<!-- Add "scoped" attribute to limit CSS to this component only -->