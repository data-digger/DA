<template>
    <div class='infor-list-con'>
        <CMBInforListItem v-for="(item,index) in dataList" 
        :key='index' 
        :circleText='item.circleText' 
        :title="item.title"
        :subTitle="item.subTitle"
        :detail="item.detail"
        :dayTime="item.dayTime"
        :circleSize="item.circleSize"
        :circleTextSize="item.circleTextSize"
        :textSize="item.textSize"/>
    </div>
</template>
<script>
    import CMBInforListItem from './CMBInforListItem'
    
    export default {
        props: {
        dataList :{
            type:Array,
            default:[]
        }
    },
    components:{
        CMBInforListItem
    },
    computed: {
    },
    data () {
        return {
        }
    },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 .infor-list-con{
     padding: 5px;
     background-color: #141f56;
 }
</style>