
<template>
    <Select class="form-control" v-model='selectedValue' filterable @on-change="handleChange">               
        <Option v-for="item in filterStandBy" :key="item" :value="item">{{item}}</Option>
    </Select>
</template>
<script>
export default {
    props:['value','bizViewId','field','mark'],
    computed: {
    },
    watch:{
     'value':'setSelectedValue',
     'field':'getStandByValue'
　  },
    data () {
        return {
            selectedValue:'',
            filterStandBy:[]
            }
    },
    methods: {
        setSelectedValue:function(){
            this.selectedValue = this.value?this.value:'';
        },
        handleChange:function(selected){
            this.$emit('input',selected)
        },
        getStandByValue:function(){
            let Vue = this;
            if(Vue.bizViewId && Vue.field){
                if(Vue.mark == '=' || Vue.mark== '!='){
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
    },
    created(){
    let Vue = this;
    Vue.getStandByValue();
    Vue.setSelectedValue();
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