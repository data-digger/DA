<template>
  <div>
    <Carousel v-model="step" :dots="carouselSetting.dots" :arrow="carouselSetting.arrow" ref='slide'>
        <CarouselItem>
          <div class="demo-carousel"><SelectLayout></SelectLayout></div>
        </CarouselItem>
        <CarouselItem  style='background-color: #071432;'>
          <div class="header">
            <div class='left_logo'></div>
            <div class='right_logo'></div>
          </div>
          <div class="demo-carousel"><component :is="currentLayout" ref='currentLayout'></component></div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel"><globalFilter ref='globalFilter'></globalFilter></div>
        </CarouselItem>
        <CarouselItem style='background-color: #071432;'>
          <div class="demo-carousel"><reportForm ref='reportForm'></reportForm></div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel"><BaseInfo ref='baseInfo'></BaseInfo></div>
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
import reportForm from "./../components/ReportForm"
import {mapGetters} from 'vuex'
export default {
    components:{
      SelectLayout,
      BaseInfo,
      Layout1,
      Layout2,
      Layout3,
      Layout4,
      globalFilter,
      reportForm
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
        currentLayout:Layout1,
        currentReport:null
      }
    },
    methods:{

      /*下一步操作*/
      next() {
        let Vue = this;
        if (Vue.step >=4) return ;
        Vue.$refs.slide.arrowEvent(1); //Slide向前移一步       
        if(Vue.step == 1){//根据选择的布局
          if(Vue.layoutSelected == "布局1"){ Vue.currentLayout = Layout1};
          if(Vue.layoutSelected == "布局2"){ Vue.currentLayout = Layout2};
          if(Vue.layoutSelected == "布局3"){ Vue.currentLayout = Layout3};
          if(Vue.layoutSelected == "自定义"){ Vue.currentLayout = Layout4};
        }
        if(Vue.step == 3){
          Vue.$refs.globalFilter.saveGlobalFilterData();//向store中存储全局过滤器
          Vue.$refs.reportForm.initChartComponent();//初始化图形组件
        }
        if(Vue.step == 4){    
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
       Vue.$refs.baseInfo.initBaseInfo();
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
.header{
  width: 100%;
  height: 90px;
  margin-bottom: 25px;
  background: url('./../../assets/img/report_header.png');
}
.header .left_logo,
.header .right_logo{
  width:400px;
}
.left_logo{
  float: left;
  height: 50px;
  margin: 22px;
  background: url('./../../assets/img/left_logo.png') no-repeat;
}
.right_logo{
  float: right;
  height: 90px;
  margin:5px 10px;
  background: url('./../../assets/img/right_logo.png') no-repeat;
}
.button {
  text-align: center;
  position: fixed;
  bottom: 0px;
  left: 50%;
}

</style>