<template>
  <div>
    <Carousel v-model="step" :dots="carouselSetting.dots" :arrow="carouselSetting.arrow" ref='slide'>
        <CarouselItem>
          <div class="demo-carousel"><SelectLayout></SelectLayout></div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel"><component :is="layouts"></component></div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel"><globalFilter ref='saveGlobalFilterData'></globalFilter></div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel"><BaseInfo ref='initBaseInfo'></BaseInfo></div>
        </CarouselItem>
    </Carousel>
     <Row  class='button'>
      <Button type="primary" @click='pre()'>上一步</Button>
      <Button v-if="!finished" type="primary" @click='next()'>下一步</Button>
      <Button v-if="finished" type="primary" @click='createReport()'>保存</Button>
    </Row> 
 </div>
</template>

<script>
import SelectLayout from "./../report/SelectLayout"
import BaseInfo from "./../report/BaseInfo"
import Layout1 from "./../report/Layout1"
import Layout2 from "./../report/Layout2"
import Layout3 from "./../report/Layout3"
import Layout4 from "./../report/Layout4"
import globalFilter from "./../report/GlobalFilter"
import {mapGetters} from 'vuex'
export default {
    components:{
      SelectLayout,
      BaseInfo,
      Layout1,
      Layout2,
      Layout3,
      Layout4,
      globalFilter
    },
    computed: {
      ...mapGetters({
        layoutSelected:'layoutSelected',
        report:'report'
      })
    },
    data () {
      return {
        finished:false,
        step: 0,
        carouselSetting: {
            height:"200",
            dots:"none",
            arrow:"never",
        },
        layouts:Layout1
      }
    },
    methods:{

      /*下一步操作*/
      next() {
        let Vue = this;
        if (Vue.step >=3) return ;
        //Slide向前移一步
        Vue.$refs.slide.arrowEvent(1);        
        if(Vue.step == 1){//根据选择的布局
          if(Vue.layoutSelected == "布局1"){ Vue.layouts=Layout1};
          if(Vue.layoutSelected == "布局2"){ Vue.layouts=Layout2};
          if(Vue.layoutSelected == "布局3"){ Vue.layouts=Layout3};
          if(Vue.layoutSelected == "自定义"){ Vue.layouts=Layout4};
        }
        if(Vue.step == 3){
          Vue.$refs.saveGlobalFilterData.saveGlobalFilterData();
        }
        if(Vue.step == 4){
          Vue.$refs.initBaseInfo.initBaseInfo();
          Vue.finished = true;
        }         
      },

      /*上一步操作*/
      pre() {
        let Vue = this;
        if(Vue.step !=0){
          Vue.$refs.slide.arrowEvent(-1);
          Vue.finished = false;
        }
      },

      /*新建报表*/
      createReport(){
       let Vue = this;
       var ClonedReport = JSON.parse(JSON.stringify(Vue.report));
       var defineJSON = JSON.stringify(ClonedReport.defineJSON);
       ClonedReport.defineJSON = defineJSON;
       Vue.AxiosPost("createReport",
         ClonedReport,
         function(){
            Vue.$Message.success('新建成功!');
            Vue.closePage(event,'createReport');
         });
      },

      /*新建完成后关闭当前页面*/
      closePage(event, name){
        let pageOpenedList = this.$store.state.app.pageOpenedList;
        let lastPageObj = pageOpenedList[1];
        this.$store.commit('removeTag', name);
        this.$store.commit('closePage', name);
        pageOpenedList = this.$store.state.app.pageOpenedList;
        localStorage.pageOpenedList = JSON.stringify(pageOpenedList);    
        this.linkTo(lastPageObj);          
      },

      /*连接到上一个页面*/
      linkTo (item) {
        let routerObj = {};
        routerObj.name = item.name;
        if (item.argu) {
            routerObj.params = item.argu;
        }
        if (item.query) {
            routerObj.query = item.query;
        }
        this.$router.push(routerObj);
      },
    },
    mounted(){
       
    }
}
</script>
<style scope>
  .button {
    text-align: center;
    margin-top: 0;
  }

</style>