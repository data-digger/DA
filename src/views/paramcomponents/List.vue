<template>
    <div>
        <Select class='select'v-model = "defaultDefine" style="width:200px" placeholder="Select ..." >
            <Option :value='cmpContent.defaultListValue.key'>{{cmpContent.defaultListValue.key}}</Option>
        </Select>
    </div>
</template>
<script>
    export default {
        props:['cmpContent'],
        data () {
           return {
            defaultDefine:''
           }
        },
        created(){
            this.defaultDefine = this.cmpContent.defaultListValue.key;
        }
    }
</script>
<style scoped>
    .select{
        display: inline-block;
        margin: 10px auto;
    }
</style>
