<template>
  <Form id="createReport"  :model="report" :label-width="80">
        <FormItem label="名称" prop="name">
            <Input v-model="report.name" placeholder="输入名称"></Input>
        </FormItem>
        <FormItem label="别名" prop="alias">
            <Input v-model="report.alias" placeholder="输入别名"></Input>
        </FormItem>
        <FormItem label="描述" prop="desc">
            <Input v-model="report.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter report descript..."></Input>
        </FormItem>
   </Form>
</template>

<script>
import {mapGetters} from 'vuex'
 export default {
    computed: {
    ...mapGetters({
      report: 'report'
    })
    },
    data(){
       return {
          name:""
       }
    },
    methods:{

    }
}
</script>

<style scoped>
</style>
