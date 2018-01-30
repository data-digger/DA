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
                let mockData = [];
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: 'Content ' + i,
                        description: 'The desc of content  ' + i,
                        disabled: Math.random() * 3 < 1
                    });
                }
                return mockData;
          },
          render(datasourceList){
            return datasourceList.name
          }
        }
    }
</script>