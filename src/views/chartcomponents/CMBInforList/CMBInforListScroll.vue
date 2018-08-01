<template>
    <div class='infor-list-con'>
        <swiper :options="swiperOption">
        <!-- <swiper-slide data-swiper-autoplay="100"></swiper-slide> -->
        <!-- <swiper-slide v-for="(slidData,index) in splitDataList" :key="index">
            <CMBInforList :dataList="slidData"/>
        </swiper-slide> -->
        <swiper-slide>
            <CMBInforList :dataList="splitDataList[0]"/>
        </swiper-slide>
        <swiper-slide>
            <CMBInforList :dataList="splitDataList[1]"/>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
         <!--<CMBInforList :dataList="dataList[1]" v-if="isShow"/>-->
      </swiper>
    </div>
</template>
<script>
    import CMBInforList from './CMBInforList'
    import util from './../util.js'
    
    export default {
        props: {
        dataList :{
            type:Array,
            default:[]
        }
    },
    components:{
        CMBInforList
    },
    computed: {
        splitDataList:function(){
            if(this.dataList && this.dataList.length>0){
                let re = util.splitArray(this.dataList,3);
                return re;
            } else {
                return []
            }
        }
    },
    data () {
        return {
            notNextTick: true,
            swiperOption: {
                direction: 'vertical',
                slidesPerView: 1,
                //spaceBetween: 30,
                //mousewheel: true,
                loop:true,
                loopAdditionalSlides:1,
                 autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false,
                },
                 effect : 'fade',
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            }
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