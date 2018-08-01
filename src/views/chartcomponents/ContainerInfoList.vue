<template>
   <div :style="styles" :id="'inforList'+chartId" class="infor-list-con">
       <CMBInforList :dataList="dataList" v-if="isShow" >
       </CMBInforList>
   </div>
</template>
<script>
import CMBInforList from './CMBInforList/CMBInforList'
export default {
    props:["chartId","option","styles"],
    components:{
        CMBInforList
    },
    data () {
        return {
            isShow:false,
            dataList:[],
        }
    },
    methods:{
        show(eoption){
            let Vue = this;
            this.buildDataList(eoption);
            this.isShow = true;
        },
        buildDataList(eoption){
            let rowCnt = eoption.dayTime.length;
            this.dataList = [];
            for(let i=0; i<rowCnt; i++){
                let data = {key:i,
                            circleText:eoption.circleText[i],
                            title:eoption.title[i],
                            subTitle:eoption.subTitle[i],
                            detail:eoption.detail[i],
                            dayTime:eoption.dayTime[i],
                            circleSize:eoption.circleSize,
                            circleTextSize:eoption.circleTextSize,
                            textSize:eoption.textSize};
                this.dataList.push(data);           
            }
        },
        reset(){
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.infor-list-con{
    width:350px
}
</style>