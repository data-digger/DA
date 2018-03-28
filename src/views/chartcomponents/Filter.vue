<style lang="less">
    @import "./chart.less";
</style>
<template>
   <Row>
       <Tag type="dot" closable color="blue" v-for="(item,index) in filters" :key="'filter'+index">{{item.name}}</Tag>
        <Modal
            width ="600px"
            v-model="editFilter"
            title="编辑筛选器"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>{{filter.name}}</P>
            <Tabs type="card">
                <TabPane label="列表筛选">标签一的内容</TabPane>
                <TabPane label="文本筛选">标签二的内容</TabPane>
                <TabPane label="顶部筛选">
                    <RadioGroup vertical>
                        <Radio label="无">
                        </Radio>
                        <Radio label="顶部">
                        </Radio>
                        <Radio label="底部">
                        </Radio>
                    </RadioGroup>
                </TabPane>
                <TabPane label="排序">
                     <RadioGroup vertical>
                        <Radio label="无">
                        </Radio>
                        <Radio label="升序">
                        </Radio>
                        <Radio label="降序">
                        </Radio>
                    </RadioGroup>
                </TabPane>
            </Tabs>
        </Modal>
    </Row>
</template>
<script>
import bus from './../../libs/bus.js'
export default {
    props:['filters'],
    computed: {
    },
    data () {
        return {
            editFilter:false,
            filter:{
                name:'',
                defineJSON:'',
                }
            }
    },
    methods: {
        newFilter(filde){
            let Vue = this;
            Vue.editFilter = true;
            Vue.filter.name = filde;
        },
        deleteFild(index){
            let Vue = this;
            Vue.filters.splice(index,1);
        },
        ok(){
            let Vue = this;
            Vue.filters.push({name:Vue.filter.name,defineJSON:Vue.filter.defineJSON});
        },
        cancel(){

        }
    },
    mounted:function(){
        let Vue = this;
        bus.$on('filterEditShow',function(filde){
            Vue.newFilter(filde);
        }); 
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->