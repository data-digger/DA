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
              <Cascader :data="filterTypeSelections" v-model="filterType_bak" trigger="hover" @on-change='selectFilterType'></Cascader>
           </FormItem> 
         </Col>
          <Col span='8' v-if='filterType_bak[1] == "DateByUser"'>
           <!--  <FormItem label="日期" v-if ='filterType_bak[1] == "DateByDay" || filterType_bak[1] == "DateByMonth" || filterType_bak[1] == "DateByUser" ' >
              <DatePicker :dateType = 'filterType_bak[1]' @sendDate='getDefaultDate' ref='DatePicker'></DatePicker> 
            </FormItem> -->
             <FormItem label="时间" prop="date" >
              <Input v-model="filter.value"  disabled v-if='false'></Input>
              <Input v-model="filter.value"  disabled v-if='false'>></Input>
              <Input v-model="filter.value"  placeholder="请输入" v-if='filterType_bak[1] == "DateByUser"'></Input>
            </FormItem>            
         </Col>
         <Col span='15'>
            <FormItem label="关联过滤器">
              <Cascader :data='relatedFilterSelections' trigger="hover" @on-change='selectRelatedFilter' @on-visible-change='initRelatedFilterSelections'></Cascader>
            </FormItem>          
         </Col>
        <Col span='24' style='padding-left:90px'>
          <Tag  
            @on-close="deleteRelatedFilter"
            v-for='(el,index) in relatedFilterTagList'
            checkable
            closable 
            type='dot'
            color="green" 
            :name='el.chartName'
            :key='index'
          >
            {{el.chartName}}.{{el.field}}({{el.mark}})
          </Tag></Col>
        </Form>
        <Col span='10'>
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
      relatedFilterTagList:[],//关联过滤器Tag列表
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
        type:[],
        value:null,
        related:[]
      }
    }
  },
  methods:{
    //过滤器类型参数处理
    filterType(){
      let Vue = this;
      if(Vue.filterType_bak.length == 2){
        Vue.filter.type = Vue.filterType_bak[1];
      }else{
        Vue.filter.type = Vue.filterType_bak[0]
      }
    },

    //选择过滤器类型
    selectFilterType(filterType){
      let Vue = this;
      let DATE = new Date();
      let Y = DATE.getFullYear() + '-';
      let M = (DATE.getMonth()+1 < 10 ? '0'+(DATE.getMonth()+1) : DATE.getMonth()+1);
      let D = '-'+DATE.getDate() + ' ';
      if(filterType[1] == 'DateByDay'){
        /*Vue.filter.value = Y+M+D; */
        Vue.filter.value = '2011-05-19';
      }
      if(filterType[1] == 'DateByMonth'){
        Vue.filter.value = Y+M; 
      }
      if(filterType[1] == 'DateByUser'){
        Vue.filter.value = ''; 
      }
    },

    //初始化关联过滤器层连选项
    initRelatedFilterSelections(isOpen){
      let Vue = this;
      if(isOpen){
        var aRelatedFilter = [];
        for(let i in Vue.chartList){
          let oChartDefineJSON = JSON.parse(Vue.chartList[i].defineJSON);
          let oRelatedFilter = {};
          oRelatedFilter.value = Vue.chartList[i];
          oRelatedFilter.label = Vue.chartList[i].alias;
          oRelatedFilter.children = [];
          for(let c in oChartDefineJSON.filters.where){
            let oRelatedFilterChild = {};
            oRelatedFilterChild.value = oChartDefineJSON.filters.where[c];
            oRelatedFilterChild.label = oChartDefineJSON.filters.where[c].field;
            oRelatedFilter.children.push(oRelatedFilterChild);
          }
          aRelatedFilter.push(oRelatedFilter);
        }  
        Vue.relatedFilterSelections = aRelatedFilter;        
      }
      if(!isOpen){

      }
    },

    //选择关联过滤器,生成关联查询器tag
    selectRelatedFilter(relatedFilter){
      let Vue = this;
      if(relatedFilter.length == 0){
        return;
      };
      for(let i in Vue.relatedFilterTagList){
        if(Vue.relatedFilterTagList[i].chartName == relatedFilter[0].name && Vue.relatedFilterTagList[i].field == relatedFilter[1].field){
          return;
        }
      };
      Vue.relatedFilterTagList.push({
        chartName:relatedFilter[0].name,
        field:relatedFilter[1].field,
        mark:relatedFilter[1].mark,
        chartId:relatedFilter[0].id}
      );
    },

    //添加全局过滤器描述列表
    addGlobalFilter(globalFilter){
      let Vue = this;
      var relatedDESC = '';
      for(let i in Vue.relatedFilterTagList){
        relatedDESC = relatedDESC+Vue.relatedFilterTagList[i].chartName+"."+Vue.relatedFilterTagList[i].field +"("+Vue.relatedFilterTagList[i].mark+")"+ ",";
      }
      Vue.$refs[globalFilter].validate((valid) => {
        if (valid) {
          Vue.globalFilterList.push({
            filterName:Vue.filter.name,
            filterDESC:relatedDESC,
            globalFilterCells:Vue.relatedFilterTagList
          });
        }
      })

    },

    //存储全局过滤器数据
    saveGlobalFilterData(){
      let Vue = this;
      Vue.filter.related = [];
      Vue.filterType();
      for(let i in Vue.globalFilterList){
        Vue.filter.related = Vue.filter.related.concat(Vue.globalFilterList[i].globalFilterCells);
      }
      this.$store.commit("saveReportGlobalFilter",Vue.filter);
    },

    //获取默认的时间
    getDefaultDate(defaultDate){
      let Vue = this;
      Vue.filter.value = defaultDate;
    },

    //删除关联过滤器tag
    deleteRelatedFilter(event, name){
      let Vue = this;
      for(let i in Vue.relatedFilterTagList){
        if(Vue.relatedFilterTagList[i].chartName== name){
          Vue.relatedFilterTagList.splice(i,1);
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