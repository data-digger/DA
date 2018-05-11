<template>
  <div>
    <Card style='margin:10px'>
      <p slot="title">添加全局过滤器</p>
      <Row>
        <Form id="createGlobalFilter" :label-width="120"  :rules="ruleValidate" ref="globalFilter" :model='filter'>
         <Col span='15'>
            <FormItem label="全局过滤器名称" prop="name">
              <Input v-model="filter.name" placeholder="输入名称"></Input>
            </FormItem>
          </Col>
          <Col span='8'>
            <FormItem label="全局过滤器别名" prop="alias">
              <Input v-model="filter.alias" placeholder="输入别名"></Input>
            </FormItem>
          </Col> 
          <Col span='15'>
            <FormItem label="全局过滤器类型" prop="filterTypeSelections">
              <Cascader 
                :data="filterTypeSelections" 
                trigger="hover" 
                @on-change='selectFilterType' 
                ></Cascader>
           </FormItem> 
          </Col>
          <Col span='24'>
            <FormItem label="关联过滤器" >
              <Select v-model = 'relatedFilterSelectedList' multiple @click.native='initRelatedFilterSelections()'>
                  <Option v-for="(item,index) in relatedFilterSelections" :value="index" :key="index">{{ item.label }}</Option>
              </Select>       
            </FormItem>          
          </Col>
          <Col span='24'>
            <FormItem label="默认值" v-if='filter.type == "singleSelect" || filter.type == "multiSelect" || filter.type == "input"' prop="dafaultValue">
               <Select 
                  :multiple='filter.type == "multiSelect" ? true:false'
                  v-model="filter.value" 
                  v-if='filter.type == "singleSelect" || filter.type == "multiSelect"'>
                  <Option v-for="(standByValue,index) in standByValues" 
                    :value="standByValue.value" 
                    :key="index">{{ standByValue.label }}
                  </Option>
              </Select> 
              <Input v-model="filter.value"  placeholder="请输入" v-if='filter.type == "input"'></Input>
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
        <Table :columns="globalFilterColumns" :data="globalFilterTabledata" :border='true'></Table>
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
      report:'report',
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
      filter:{//过滤器结构
        name:null,
        alias:null,
        type:null,
        value:[],
        related:[]
      },
      test:[],
      globalFilters:[],//全局过滤器
      filterTypeSelections:[//过滤器类型层级框选项       
        { value: 'date',
          label: '时间',
          children: [{value: 'DateByMonth',label: '月'},
            {value: 'DateByDay',label: '日'}]
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
      relatedFilterSelections:[],//关联过滤器选项
      relatedFilterSelectedList:[],//关联过滤器被选中的列表
      globalFilterTabledata:[],//全局过滤器表格数据
      globalFilterColumns:[//全局过滤器表格列
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
      }],
      standByValues: [], 
    }
  },
  methods:{

    //初始化单选，多选候选值
    initStandByValue(){
      let Vue = this;
      let aRelated = Vue.handleFilterRelated();
      Vue.AxiosPost("getReportRelatedStandBy",{"relatedJSON":JSON.stringify(aRelated)},
        function(response){
          let aStandByValue = [];
          for(let i in response.data.content){
            let oStandByValue = {};
            oStandByValue.value = response.data.content[i];
            oStandByValue.label = response.data.content[i];
            aStandByValue.push(oStandByValue);      
          }
          Vue.standByValues  = aStandByValue;
      });  
     },

    //设置过滤器类型
    setFilterTypeValue(filterType){
      let Vue = this;
      if(filterType.length == 2){
        Vue.filter.type = filterType[1];
      }
      if(filterType.length == 1){
        Vue.filter.type = filterType[0]
      }
      if(filterType.length == 0){
        Vue.filter.type = null;
      }        
    },

    //初始化过滤器默认值
    initFilterValue(filterType){
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
      if(filterType[0] == 'singleSelect' ||filterType[0] == 'input'){
        Vue.filter.value = ''; 
       
      }
      if(filterType[0] == 'multiSelect' ){
        Vue.filter.value = []; 
        
      };
      
     
    },
     
    //过滤器related参数处理
    handleFilterRelated(){
      let Vue = this;
      let aRelated = [];
      for(let i in Vue.relatedFilterSelectedList){
        let valueIndex = Vue.relatedFilterSelectedList[i];
        let _orelated ={};
        _orelated.chartId= Vue.relatedFilterSelections[valueIndex].chartId;
        _orelated.field = Vue.relatedFilterSelections[valueIndex].field;
        _orelated.mark = Vue.relatedFilterSelections[valueIndex].mark;
       aRelated.push(_orelated);
      }
      return aRelated;
    },

    //选择过滤器类型
    selectFilterType(filterType){
      let Vue = this;
      Vue.setFilterTypeValue(filterType);
      Vue.initFilterValue(filterType);
      if(Vue.$refs.multiSelectComp){
        Vue.$refs.multiSelectComp.selectedMultiple = [];
      }    
    },
    
    //初始化关联过滤器层连选项
    initRelatedFilterSelections(){
      let Vue = this;
      let aRelatedFilter = [];
      let aPortlets = Vue.report.defineJSON.content.portlets;
      for(let i in aPortlets){
        for(let c in Vue.chartList){
          if(aPortlets[i].tabs[0].objid == Vue.chartList[c].id){
            let oChartDefineJSON = JSON.parse(Vue.chartList[c].defineJSON);
            for(let r in oChartDefineJSON.filters.where){
              let oRelatedFilter = {};
              oRelatedFilter.value = Vue.chartList[c].name+"."+oChartDefineJSON.filters.where[r].field+"("+oChartDefineJSON.filters.where[r].mark+")";
              oRelatedFilter.label = oRelatedFilter.value;
              oRelatedFilter.field = oChartDefineJSON.filters.where[r].field;
              oRelatedFilter.mark = oChartDefineJSON.filters.where[r].mark;
              oRelatedFilter.chartId = Vue.chartList[c].id;
              aRelatedFilter.push(oRelatedFilter);              
            }
            
          }
        }
      } 
      Vue.relatedFilterSelections = aRelatedFilter;       
    },

    //添加全局过滤器描述表格
    addGlobalFilter(globalFilter){
      let Vue = this;
      let _filter = [];
      var relatedDESC = '';
      //生成表格列
      for(let i in Vue.relatedFilterSelectedList){
        let valueIndex = Vue.relatedFilterSelectedList[i];
        relatedDESC += Vue.relatedFilterSelections[valueIndex].label+", ";
      }
      Vue.$refs[globalFilter].validate((valid) => {
        if (valid) {
          Vue.globalFilterTabledata.push({
            filterName:Vue.filter.name,
            filterDESC:relatedDESC,
          });
        }
      });
     Vue.filter.related = Vue.handleFilterRelated();
     Vue._filter = $.extend(true,{},Vue.filter);
     Vue.globalFilters.push(Vue._filter);
     /*Vue.handleReset(globalFilter);*/
    },

    //存储全局过滤器数据
    saveGlobalFilterData(){
      let Vue = this;
      this.$store.commit("saveReportGlobalFilter",Vue.globalFilters);
    },

    //删除关联过滤器tag
    deleteRelatedFilter(event, name){
      let Vue = this;
      for(let i in Vue.relatedFilterSelectedList){
        if(Vue.relatedFilterSelectedList[i].chartName== name){
          Vue.relatedFilterSelectedList.splice(i,1);
          break;   
        }
      }
    },
    
    //删除全局过滤器列表选项
    deleteGlobalFilter(event, params){
      let Vue = this;
      for(let i in Vue.globalFilterTabledata){
        if(Vue.globalFilterTabledata[i].filterName== params.row.filterName){
          Vue.globalFilterTabledata.splice(i,1);
          Vue.globalFilters.splice(i,1);
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