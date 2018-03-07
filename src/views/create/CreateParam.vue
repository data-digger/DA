<template>   
   <Form id="createParam" ref="param" :model="param" :rules="ruleValidate" :label-width="90">
      <Row>
            <Col span="24"> 
             <FormItem label="参数ID" prop="id">
                <Input v-model="param.id" placeholder="输入id"></Input>
             </FormItem>
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
                <FormItem label="format类型" prop="formattype">
                    <Select v-model="param.defineJSON.formattype" placeholder="Select ...">
                       <Option value="yyyy-MM-dd">yyyy-MM-dd</Option>
                       <Option value="yyyy-MM">yyyy-MM</Option>
                    </Select>
                 </FormItem>
                 <FormItem v-if = "param.defineJSON.formattype =='yyyy-MM-dd'?true:false">
                    <datePicker :DaterangeShow = 'true'></datePicker>
                 </FormItem>
                 <FormItem v-if = "param.defineJSON.formattype =='yyyy-MM'?true:false">
                    <datePicker :monthShow = 'true'></datePicker>
                 </FormItem>                   
            </Col>
            <Col span="24" v-if = 'param.defineJSON.componenttype == "list"?true:false'>
                <FormItem label="数据类型" prop="valuetype">
                    <Select v-model="param.defineJSON.valuetype" placeholder="Select ...">
                       <Option value="String">String</Option>
                       <Option value="Integer ">Integer </Option>
                       <Option value="Double ">Double </Option>
                    </Select>
                 </FormItem>
                 <FormItem label="参数源类型" prop="valueSource">
                    <Select v-model="param.defineJSON.valueSource" placeholder="Select ...">
                       <Option value="static">static</Option>
                       <Option value="SQL ">SQL </Option>
                    </Select>
                 </FormItem>
                <FormItem label="缺省值" prop="defalutDefinedefine">
                  <Col span='12'><Input v-model="param.defineJSON.defalutDefinedefine.key" size="small"disabled><span slot="prepend">值</span>param.defineJSON.defalutDefinedefine.key</Input></Col>
                  <Col span='12'><Input v-model="param.defineJSON.defalutDefinedefine.value" size="small"disabled><span slot="prepend">码值</span>param.defineJSON.defalutDefinedefine.value</Input></Col>    
                </FormItem>
                <FormItem label="候选值" prop="standbyDefinedefine">
                    <Select v-model="param.standbyDefinedefine" placeholder="Select ...">
                       <Option v-for='(item,index) in standby' :value='item.key' :key='item.key'>{{item.key}}</Option>
                    </Select>
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
                id:'',     
                name:'',
                alias:'',
                desc:'This is param describe for create param',
                defineJSON:{
                  componenttype:'',
                  valueSource:'',
                  defalutDefinedefine:{key:"boy",value:"1"},
                  standbyDefinedefine:"",
                  formattype:'',
                  valuetype:'',
                  date:''
            }
        },
        standby:[{key:"girl",value:"2"},{key:"boy",value:"1"}],
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
      Vue.$refs[param].validate((valid) => {
        if (valid) {
             Vue.AxiosPost("createParam",
              Vue.param,
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
