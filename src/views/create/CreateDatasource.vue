<template>
    <Form id="createDatasource" ref="datasource" :model="datasource" :rules="ruleValidate" :label-width="120">
        <FormItem label="名称" prop="name">
            <Input v-model="datasource.name" placeholder="输入名称"></Input>
        </FormItem>
        <FormItem label="别名" prop="alias">
            <Input v-model="datasource.alias" placeholder="输入别名"></Input>
        </FormItem>
        <FormItem label="驱动程序类型" prop="driverType">
            <Select v-model="datasource.driverType" placeholder="Select ...">
               <Option value="MySQL">MySQL</Option>
               <Option value="DB2">DB2</Option>
            </Select>
        </FormItem>
        <FormItem label="驱动程序类" prop="driver">
            <Input v-model="datasource.driver" placeholder="输入驱动程序类"></Input>
        </FormItem>
        <FormItem label="连接字符串" prop="alias">
            <Input v-model="datasource.url" placeholder="输入连接字符串"></Input>
        </FormItem>
        <FormItem label="数据库字符集" prop="dbCharset">
            <Select v-model="datasource.dbCharset" placeholder="Select ...">
               <Option value="UTF-8">UTF-8</Option>
               <Option value="GBK">GBK</Option>
            </Select>
        </FormItem>
        <FormItem label="最大连接数" prop="maxConnection">
            <Input v-model="datasource.maxConnection" placeholder="输入最大连接数"></Input>
        </FormItem>
         <FormItem label="校验语句" prop="validationQuery">
            <Input v-model="datasource.validationQuery" placeholder="输入校验语句"></Input>
        </FormItem>
         <FormItem label="用户名" prop="user">
            <Input v-model="datasource.user" placeholder="输入用户名"></Input>
        </FormItem>
         <FormItem label="密码" prop="password">
            <Input v-model="datasource.password" placeholder="输入密码"></Input>
        </FormItem>
        <FormItem label="事物隔离级别" prop="transactionIsolation">
            <Select v-model="datasource.transactionIsolation" placeholder="Select ...">
               <Option value="-1">-1</Option>
            </Select>
        </FormItem>  
        <FormItem label="描述" prop="desc">
            <Input v-model="datasource.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="createDatasource('datasource')">Submit</Button>
            <Button type="ghost" @click="handleReset('datasource')" style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        name:'createDatasource',
        data () {
            return {
                datasource:{     
                  name:'',
                  alias:'',
                  driverType:'MySQL',
                  driver:'com.mysql.jdbc.Driver',
                  url:'jdbc:mysql://localhost:3306/datadigger?useUnicode=true&characterEncoding=GBK&useSSL=false',
                  dbCharset:'UTF-8',
                  maxConnection:100,
                  validationQuery:'SELECT 1 FROM DUAL',
                  user:'root',
                  password:'admin',
                  transactionIsolation:"-1",
                  desc:'This is DataSource for create Business View Query'
                },
                ruleValidate:{
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    alias: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' }
                    ],
                    driverType: [
                        { required: true, message: 'Please select the driverType', trigger: 'change' }
                    ],
                    driver: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    url: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    dbCharset: [
                        { required: true, message: 'Please select the dbCharset', trigger: 'change'}
                    ],
                    maxConnection: [
                        { required: true, type:"number", message: 'The name cannot be empty', trigger: 'blur'}
                    ],
                    validationQuery: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    user: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    transactionIsolation: [
                        { required: true,message: 'Please select the transactionIsolation', trigger: 'change' }
                    ],
                    desc: [
                        {required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            createDatasource(datasource){
               let Vue = this;
               Vue.$refs[datasource].validate((valid) => {
                    if (valid) {
                        Vue.AxiosPost("createDatasource",Vue.datasource,
                          function(){
                             alert("新建数据源成功!")
                        })
                    } else {
                        Vue.$Message.error('Fail!');
                    }
                })
            },          
            handleReset (datasource) {
                let Vue = this;
                Vue.$refs[datasource].resetFields();
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
