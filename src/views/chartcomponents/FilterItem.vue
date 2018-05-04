
<template>
     <Row>
        <Col span="12">
            <Select class="form-control" v-model='field' @on-change="getStandByValue">               
                <Option v-for="(item,i) in filterableList" :key="item.columnName" :value="item.columnName">{{item.columnAlias}}</Option>
            </Select>
        </Col>
        <Col span="9" offset="1">
            <Select class="form-control" v-model='mark' @on-change="changePlaceHolder">                   
                <Option v-for="item in CONTENTFILTERMARK" :key="item" :value="item">{{item}}</Option>
            </Select>
        </Col>
        <Col span="22">
            <Select v-if="ftype=='select'" class="form-control" v-model='selectedValue' filterable @on-change="updateValue">               
                <Option v-for="item in filterStandBy" :key="item" :value="item">{{item}}</Option>
            </Select>
            <Select v-if="ftype=='multiple'" multiple filterable v-model='selectedValue' @on-change="updateValue">               
                <Option v-for="item in filterStandBy" :key="item" :value="item">{{item}}</Option>
            </Select>
            <Input v-if="ftype=='input'"  v-model='selectedValue' @input="updateValue"></Input>
        </Col>
        
        <Col span="1" offset="1">
            <Button id='removeContent' type="ghost" icon="ios-minus-empty" shape="circle" size='small' @click="removeContentFilter"></Button>
        </Col>
</Row>
</template>
<script>
export default {
    props:['value','bizViewId','filterableList','CONTENTFILTERMARK','index'],
    computed: {
    },
    data () {
        return {
            field:'',
            mark:'',
            selectedValue:'',
            ftype:'',
            filterStandBy:[]
            }
    },
    watch:{
　  },
    methods: {
        setSelectedValue:function(){
            this.field = this.value.field;
            this.mark = this.value.mark;
            this.ftype = this.value.type;
            if(this.ftype == 'multiple'){
                this.selectedValue = this.value.value?this.value.value:[];
            } else {
                this.selectedValue = this.value.value?this.value.value:'';
            }
        },
        changePlaceHolder:function(mark){
            if(mark=='IN' || mark=='NOT IN'){
                this.ftype = 'multiple';
                this.getStandByValue();
            } else if(mark == '=' || mark == '!='){
                this.ftype  = 'select';
                this.getStandByValue();
            }else {
                this.ftype  = 'input'
            }
            this.updateValue();
        },
        getStandByValue:function(){
            let Vue = this;
            this.updateValue();
            if(Vue.bizViewId && Vue.field){
                if(Vue.mark == '=' || Vue.mark== '!=' || Vue.mark == 'IN' || Vue.mark == 'NOT IN'){
                Vue.AxiosPost("getFilterStandByValue",{bizViewId:Vue.bizViewId,columnName:Vue.field},
                function(response){
                    if(response.data.success){
                        let data = response.data.content;
                        Vue.filterStandBy = data;
                        //Vue.filterStandBy = data;
                    } else {
                        Vue.$Message.error('获取数据错误'+response.data.content);
                    }
                });
                }
            }
            
        },
        updateValue(){
            let newFilter = {field:this.field,mark:this.mark,value:this.selectedValue,type:this.ftype}
            this.$emit('input',newFilter);
        },
        removeContentFilter(){
            this.$emit('removeItem',this.index);
        }
    },
    created(){
    let Vue = this;
    Vue.setSelectedValue();
    Vue.getStandByValue();
    
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