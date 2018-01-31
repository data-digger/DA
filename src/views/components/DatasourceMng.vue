<template>
    <Transfer
        :data="data1"
        :render-format="render"
        ></Transfer>
</template>
<script>
import {mapGetters} from 'vuex'
    export default {
        computed: {
          ...mapGetters({
            datasourceList: 'datasourceList'
          })
        },
        data () {
            return {
                data1: this.getMockData(),
            }
        },
        methods: {
          getMockData () {
                
          },
          render(datasourceList){
            return datasourceList.name
          }
        }
    }
</script>