<template>   
   <Form id="createParam" ref="param" :model="param" :rules="ruleValidate" :label-width="90">
      <Row>
            <Col span="24"> 
             <FormItem label="参数名称" prop="name">
                <Input v-model="param.name" placeholder="输入名称"></Input>
             </FormItem>
             <FormItem label="参数别名" prop="alias">
                <Input v-model="param.alias" placeholder="输入别名"></Input>
             </FormItem>
             <FormItem label="参数描述" prop="desc">
                <Input v-model="param.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
             </FormItem>
             <FormItem label="控件类型" prop="componenttype">
                <Select v-model="param.defineJSON.componenttype" placeholder="Select ...">
                   <Option value="date">日期</Option>
                   <Option value="list">列表</Option>
                   <Option value="Tree">树</Option>
                </Select>
             </FormItem>
            </Col>
            <Col span="24" v-if = 'param.defineJSON.componenttype == "date"?true:false'>
                <FormItem label="数据类型" prop="valuetype">
                    <Input v-model="param.defineJSON.valuetype" size="small"disabled>param.defineJSON.valuetype</Input>
                </FormItem>
                <FormItem label="format类型" prop="formattype">
                    <Select v-model="param.defineJSON.formattype" placeholder="Select ...">
                       <Option value="yyyy-MM-dd">yyyy-MM-dd</Option>
                       <Option value="yyyy-MM">yyyy-MM</Option>
                    </Select>
                 </FormItem>                 
                 <FormItem v-if = "param.defineJSON.formattype =='yyyy-MM-dd'?true:false" >
                    <datePicker :DaterangeShow = 'true'@sentDate = 'getDate'></datePicker>
                 </FormItem>
                 <FormItem v-if = "param.defineJSON.formattype =='yyyy-MM'?true:false"  >
                    <datePicker :monthShow = 'true'@sentDate = 'getDate'></datePicker>
                 </FormItem>                   
            </Col>
            <Col span="24" v-if = 'param.defineJSON.componenttype == "list"?true:false'>
                <FormItem label="参数源类型" prop="valueSource">
                    <Select v-model="param.defineJSON.valueSource" placeholder="Select ...">
                       <Option value="static">static</Option>
                       <Option value="SQL ">SQL </Option>
                    </Select>
                </FormItem>
                <FormItem label="数据类型" prop="valuetype">
                    <Select v-model="param.defineJSON.valuetype" placeholder="Select ...">
                       <Option value="String">String</Option>
                       <Option value="Integer ">Integer </Option>
                       <Option value="Double ">Double </Option>
                    </Select>
                 </FormItem>
                <FormItem label="候选值" prop="standbyDefine">
                    <Col><Tag v-for='el in param.defineJSON.standbyDefine' checkable closable type='dot'color="green" :key='el.key'>{{el.value}}/{{el.key}}</Tag></Col>
                    <Col span='10'><Input size="small" v-model = 'standbyData.value'><span slot="prepend">值</span>standbyData.standbyValue</Input></Col>
                    <Col span='10'><Input size="small" v-model = 'standbyData.key'><span slot="prepend">码值</span>standbyData.standbyKey</Input></Col>
                    <Col span='4' style='padding-bottom:3px'><Button type="primary" size="small" @click='addStandByValue()'>添加</Button></Col>
                </FormItem>
                <FormItem label="缺省值" prop="defalutDefine">
                  <Col span='12'>
                   <!--    <Select v-model = 'defaultData.value' placeholder="Select ..." label-in-value>
                          <Option v-for ='el in param.defineJSON.standbyDefine' :key='el.value' :value ='el.value'>
                              {{el.value}}
                          </Option>
                      </Select> -->
                      <Input size="small" v-model = 'param.defineJSON.defalutDefine.value'><span slot="prepend">值</span></Input>
                      <Input size="small" v-model = 'param.defineJSON.defalutDefine.key'><span slot="prepend">码值</span></Input>
                  </Col> 
                </FormItem>
            </Col>
            <Col span="24" v-if = 'param.defineJSON.componenttype == "tree"?true:false'>
                   tree
            </Col>            
        </Row>
        <Row>
            <Col span="24" style='text-align:center'>
                <FormItem>
                    <Button type="primary" @click="createParam('param')">Submit</Button>
                    <Button type="ghost" @click="handleReset('param')" style="margin-left: 8px">Reset</Button>
                </FormItem>                
            </Col>
        </Row>     
  </Form>
</template>
<script>
import DatePicker from "./../components/DatePicker"
export default {
     name:'createDatasource',
     components:{
       "datePicker":DatePicker
     },
    data () {
        return {
        param:{   
            name:'',
            alias:'',
            desc:'This is param describe for creating param',
            defineJSON:{
              componenttype:'',
              valueSource:'',
              defalutDefine:{key:"",value:""},
              standbyDefine:[],
              formattype:'',
              valuetype:'date',
              date:''
            }
        },
        standbyData:{
            value:null,
            key:null
        },
       /* defaultData:{
            value:null,
            key:null
        },*/
        ruleValidate:{
            name: [
                { required: true, message: 'The name cannot be empty', trigger: 'blur' }
            ],
            alias: [
                { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' }
            ],
            desc: [
                {required: true, message: 'The name cannot be empty', trigger: 'blur' }
            ]
        }
    }
  },
  methods: {      
    createParam(param){
      let Vue = this;
      console.log(Vue.defaultData);
      var ClonedParam = JSON.parse(JSON.stringify(Vue.param));
      var defineJSON = JSON.stringify(ClonedParam.defineJSON);
      ClonedParam.defineJSON = defineJSON;
      Vue.$refs[param].validate((valid) => {
        if (valid) {
             Vue.AxiosPost("createParam",
              ClonedParam,
               function(){
                  Vue.$Message.success('新建成功!');
                  console.log(Vue.param);
               });
        } else {
            Vue.$Message.error('Fail!');
        }
      })   
    },
    handleReset (param) {
         let Vue = this;
         Vue.$refs[param].resetFields();
    },
    getDate(date){
        let Vue = this;
        Vue.param.defineJSON.date = date;
    },
    addStandByValue(){
        let Vue = this;
        let sdbData = {};
        sdbData.key = Vue.standbyData.key;
        sdbData.value = Vue.standbyData.value;
        Vue.param.defineJSON.standbyDefine.push(sdbData);
        Vue.standbyData.key = null;
        Vue.standbyData.value = null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
