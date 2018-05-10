<template>
  <div>
    <Card style='margin:10px'>
      <p slot="title">添加全局过滤器</p>
      <Row>
        <Form id="createGlobalFilter" :label-width="120"  :rules="ruleValidate" ref="globalFilter" :model='filter'>
         <Col span='12'>
            <FormItem label="全局过滤器名称" prop="name">
              <Input v-model="filter.name" placeholder="输入名称"></Input>
            </FormItem>
          </Col>
          <Col span='12'>
            <FormItem label="全局过滤器别名" prop="alias">
              <Input v-model="filter.alias" placeholder="输入别名"></Input>
            </FormItem>
          </Col> 
          <Col span='12'>
            <FormItem label="全局过滤器类型" prop="filterTypeSelections">
              <Cascader :data="filterTypeSelections"  v-model="filterType_bak" trigger="hover" @on-change='selectFilterType'></Cascader>
           </FormItem> 
          </Col>
          <Col span='24'>
            <FormItem label="关联过滤器">
              <Select v-model = 'relatedFilterList' multiple>
                  <Option v-for="item in relatedFilterSelections" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>       
            </FormItem>          
          </Col>
          <Col span='8'>
             <FormItem label="时间默认值" prop="date" v-if='filterType_bak[1] == "DateByUser"'>
              <Input v-model="filter.value"  v-if='false'></Input>
              <Input v-model="filter.value"  v-if='false'>></Input>
              <Input v-model="filter.value"  placeholder="请输入" v-if='filterType_bak[1] == "DateByUser"'></Input>
            </FormItem>           
          </Col>
          <Col span='8'>
            <FormItem label="默认值" v-if='filterType_bak[0] == "singleSelect" || filterType_bak[0] == "multiSelect" || filterType_bak[0] == "input"'>
               <Select v-model="filter.value" style="width:200px" v-if='filterType_bak[0] == "singleSelect"' @click.native='test()'>
                  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select> 
              <Input v-model="filter.value"  placeholder="请输入" v-if='filterType_bak[0] == "multiSelect"'></Input>
              <Input v-model="filter.value"  placeholder="请输入" v-if='filterType_bak[0] == "input"'></Input>
            </FormItem> 
          </Col>
        </Form>
        <Col span='18'>
          <Button type="primary" size="small" @click='addGlobalFilter("globalFilter")'>添加</Button> 
        </Col>
      </Row>
    </Card>    
    <Card style='margin:10px'>
      <p slot="title">全局过滤器列表</p>
      <Col>
        <Table :columns="globalFilterColumns" :data="globalFilterList" :border='true'></Table>
      </Col>
    </Card>
 </div>
</template>

<script>
import {mapGetters} from 'vuex'
import DatePicker from "./../paramcomponents/DatePicker"
export default {
  components:{
    DatePicker
  },
  computed: {
    ...mapGetters({
      chartList:'chartList'
    })
  },
  data () {
    return {
      ruleValidate:{
        name: [
          { required: true, message: '名称不能为空'}
        ],
        alias: [
          { required: true, message: '别名不能为空'}
        ]
      },
      globalFilterColumns:[
        {
          width:250,
          title: '全局过滤器名称',
          key: 'filterName'
        },
        {
          title: '全局过滤器包含',
          key: 'filterDESC'
        },
        {
          width:150,
          align:'center',
          title:'操作',
          render: (h, params) => {
            return h('Icon',{
              props: {
                type: "trash-a"
              },
              style:{
                cursor:'pointer'
              },
              nativeOn:{
                'click':(event)=>{
                   this.deleteGlobalFilter(event,params);
                }
              }
            })
          }
      }

      ],
      globalFilterList:[],//全局过滤器列表
      relatedFilterList:[],//关联过滤器Tag列表
      relatedFilterSelections:[],//关联过滤器层级框选项
      filterTypeSelections:[//过滤器类型层级框选项
        { value: 'date',
          label: '时间',
          children: [{value: 'DateByMonth',label: '月'},
            {value: 'DateByDay',label: '日'},
            {value: 'DateByUser',label: '自定义'}]
        },
        { value: 'singleSelect',
          label: '单选'
        },
        { value: 'multiSelect',
          label: '多选'
        },
        { value: 'input',
          label: '输入框'
        },
      ],
      filterType_bak:[],
      filter:{
        name:null,
        alias:null,
        type:null,
        value:null,
        related:[]
      },
      cityList: [  
        {
            value: 'New York',
            label: 'New York'
        },
        {
            value: 'London',
            label: 'London'
        }],
      globalFilter:[]
    }
  },
  methods:{
    //初始化默认值
    test(){
      let Vue = this;
      /*Vue.filterRelated();*/
      Vue.AxiosPost("getReportRelatedStandBy",{"relatedJSON":JSON.stringify(Vue.filter.related)},
        function(response){
          console.log(response);
      });  
     },

    //过滤器类型处理
    filterType(){
      let Vue = this;
      if(Vue.filterType_bak.length == 2){
        Vue.filter.type = Vue.filterType_bak[1];
      }
      if(Vue.filterType_bak.length == 1){
        Vue.filter.type = Vue.filterType_bak[0]
      }
      if(Vue.filterType_bak.length == 0){
        Vue.filter.type = null;
      }
    },

    //过滤器默认值处理
    filterValue(filterType){
      let Vue = this;
      let DATE = new Date();
      let Y = DATE.getFullYear() + '-';
      let M = (DATE.getMonth()+1 < 10 ? '0'+(DATE.getMonth()+1) : DATE.getMonth()+1);
      let D = '-'+DATE.getDate() + ' ';
      if(filterType[0] == 'date' && filterType[1] == 'DateByDay'){
        /*Vue.filter.value = Y+M+D; */
        Vue.filter.value = '2011-05-19';
      }
      if(filterType[0] == 'date' && filterType[1] == 'DateByMonth'){
        Vue.filter.value = Y+M; 
      }
      if(filterType[0] == 'date' && filterType[1] == 'DateByUser'){
        Vue.filter.value = ''; 
      }
      if(filterType[0] == 'singleSelect' || filterType[0] == 'multiSelect' || filterType[0] == 'input'){
        Vue.filter.value = ''; 
      }    
    },
     
    //过滤器related参数处理
    filterRelated(){
      let Vue = this;
      let _aRelated = [];
      for(let i in Vue.relatedFilterList){
        let _orelated ={};
        _orelated.chartId = "CR."+Vue.relatedFilterList[i].split(".")[0];
        for(let r in Vue.relatedFilterSelections){
          if(Vue.relatedFilterSelections[r].chartId = _orelated.chartId){
            _orelated.field = Vue.relatedFilterSelections[r].field;
            _orelated.mark = Vue.relatedFilterSelections[r].mark;
          }
        }
       _aRelated.push(_orelated);
      }
      Vue.filter.related = _aRelated;
      Vue._filter = $.extend(true,{},Vue.filter);
      Vue.globalFilter.push(Vue._filter);
    },

    //选择过滤器类型
    selectFilterType(filterType){
      let Vue = this;
      Vue.filterValue(filterType);
      Vue.initRelatedFilterSelections();
    },
    
    //初始化关联过滤器层连选项
    initRelatedFilterSelections(){
      let Vue = this;
      var aRelatedFilter = [];
      for(let i in Vue.chartList){
        let oChartDefineJSON = JSON.parse(Vue.chartList[i].defineJSON);
        for(let c in oChartDefineJSON.filters.where){
          let oRelatedFilter = {};
          oRelatedFilter.value = Vue.chartList[i].name+"."+oChartDefineJSON.filters.where[c].field+"("+oChartDefineJSON.filters.where[c].mark+")";
          oRelatedFilter.label = oRelatedFilter.value;
          oRelatedFilter.field = oChartDefineJSON.filters.where[c].field;
          oRelatedFilter.mark = oChartDefineJSON.filters.where[c].mark;
          oRelatedFilter.chartId = Vue.chartList[i].id;
          aRelatedFilter.push(oRelatedFilter);
        }    
      }  
      Vue.relatedFilterSelections = aRelatedFilter;        
    },

    //选择关联过滤器,生成关联查询器tag
    // selectRelatedFilter(relatedFilter){
    //   let Vue = this;
    //   if(relatedFilter.length == 0){
    //     return;
    //   };
    //   for(let i in Vue.relatedFilterList){
    //     if(Vue.relatedFilterList[i].chartName == relatedFilter[0].name && Vue.relatedFilterList[i].field == relatedFilter[1].field){
    //       return;
    //     }
    //   };
    //   Vue.relatedFilterList.push({
    //     chartName:relatedFilter[0].name,
    //     field:relatedFilter[1].field,
    //     mark:relatedFilter[1].mark,
    //     chartId:relatedFilter[0].id}
    //   );
    // },

    //添加全局过滤器描述表格
    addGlobalFilter(globalFilter){
      let Vue = this;
      let _filter = [];
      var relatedDESC = '';
      //生成表格列
      for(let i in Vue.relatedFilterList){
        relatedDESC = relatedDESC+Vue.relatedFilterList[i]+ ",";
      }
      Vue.$refs[globalFilter].validate((valid) => {
        if (valid) {
          Vue.globalFilterList.push({
            filterName:Vue.filter.name,
            filterDESC:relatedDESC,
          });
        }
      });
      Vue.filterType();
      Vue.filterRelated();
    },

    //存储全局过滤器数据
    saveGlobalFilterData(){
      let Vue = this;
      this.$store.commit("saveReportGlobalFilter",Vue.globalFilter);
    },

    //删除关联过滤器tag
    deleteRelatedFilter(event, name){
      let Vue = this;
      for(let i in Vue.relatedFilterList){
        if(Vue.relatedFilterList[i].chartName== name){
          Vue.relatedFilterList.splice(i,1);
          break;   
        }
      }
    },
    
    //删除全局过滤器列表选项
    deleteGlobalFilter(event, params){
      let Vue = this;
      for(let i in Vue.globalFilterList){
        if(Vue.globalFilterList[i].filterName== params.row.filterName){
          Vue.globalFilterList.splice(i,1);
          Vue.globalFilter.splice(i,1);
          break;   
        }
      }     
    },
    //重置表单
    handleReset (name) {
      let Vue = this;
      this.$refs[name].resetFields();
    }
  },
  mounted(){
     
  }
}
</script>
<style scope>
</style>