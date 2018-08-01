<template>
<div class="infor-list-con" :style="containStyle" v-if="isShow" @mouseover="stopScroll" @mouseout="reScroll">
  <ul id="con1" ref="con1" :class="{anim:animate==true}">
    <li v-for="(item,index) in dataList" :key='index' :class="{scroll:animate==true && index==0}">
        <CMBInforListItem 
            :circleText='item.circleText' 
            :title="item.title"
            :subTitle="item.subTitle"
            :detail="item.detail"
            :dayTime="item.dayTime"
            :circleSize="item.circleSize"
            :circleTextSize="item.circleTextSize"
            :textSize="item.textSize"/>
        </li>
  </ul>
</div>
</template>
<script>
import CMBInforList from './CMBInforList/CMBInforList'
import CMBInforListItem from './CMBInforList/CMBInforListItem'
//import _Swiper from 'swiper/dist/js/swiper.js'
export default {
    props:["chartId","option","styles"],
    components:{
        CMBInforList,
        CMBInforListItem
    },
    data () {
        return {
            isShow:false,
            isScroll:false,
            animate:false,
            dataList:[],
            timeout:null,
            contentHeight:169.5,
            marginTop:56.5,
            delay:3000,
            scollPerView:3,
            
        }
    },
    computed: {
       containStyle:function(){
           let heightStyle = {height:this.contentHeight};
           let result = {};
           Object.assign(result, this.styles, heightStyle);
           return result;
       }
    },

    methods:{
        show(eoption){
            let Vue = this;
            this.isShow = true;
            this.buildDataList(eoption);
            this.$nextTick(() => {
                this.adjustHeight();
                this.reScroll(); 
            })
            //this.adjustHeight();
             
        },
        buildDataList(eoption){
            this.stopScroll();
            let rowCnt = eoption.dayTime.length;
            if(rowCnt > eoption.scollPerView){
                this.isScroll = true;
            } else {
                this.isScroll = false;
            }
            this.dataList = [];
            this.scollPerView = Number(eoption.scollPerView);
            this.delay = Number(eoption.delay);

            for(let i=0; i< rowCnt; i++){
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
            };
            //this.dataList = this.splitArray(allDataList,split_len);
        },
        scroll(){
            //alert('1');
            let con1 = this.$refs.con1;
            con1.style.marginTop=this.marginTop*(-1)+'px';
            this.animate=!this.animate;
            var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
            setTimeout(function(){
                that.dataList.push(that.dataList[0]);
                that.dataList.shift();
                con1.style.marginTop='0px';
                that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
            },500)
        },
        stopScroll(){
            if(this.timeout){
                clearInterval(this.timeout);
            }
        },
        reScroll(){
            if(this.isShow && this.isScroll){
                this.timeout = setInterval(this.scroll,this.delay);
            }  
        },
        adjustHeight(){
            let listDoms = $('#con1 li');
                if (listDoms.length>0){
                    this.marginTop = listDoms.outerHeight();
                };
                this.contentHeight = this.marginTop * this.scollPerView+'px';
        },
        

        splitArray(arr,len){
            let arr_length = arr.length;
            let newArr = [];
            for(let i=0;i<arr_length;i+=len){
                newArr.push(arr.slice(i,i+len));
            }
            return newArr;
        },

        reset(){
            this.isShow = false;
            this.isScroll = false;
            this.dataList = [];
            this.stopScroll();
            
        },
    },
    destroyed: function () {
        this.stopScroll();
     },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.anim{
    transition: all 0.5s;

}
.infor-list-con{
    width: 350px;
    height: 169.5px;
    overflow: hidden;
    padding-left: 30px;
    transition: all 0.5s;
}
@keyframes anim1
{
    0% {opacity: 1}
    50% {opacity: 0.5}
    100%{opacity: 0}
}
@-webkit-keyframes anim1{
     0% {opacity: 1}
    50% {opacity: 0.5}
    100%{opacity: 0}
}
.scroll{
     animation: anim1 0.5s;
     -webkit-animation: anim1 0.5s;
}


</style>