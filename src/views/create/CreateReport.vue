<template>
  <div>
    <Carousel v-model="step" :dots="carouselSetting.dots" :arrow="carouselSetting.arrow" ref='slide'>
      <!-- 选择布局-->
      <CarouselItem>
        <div class="demo-carousel">
          <SelectLayout v-show='step==0?true:false'></SelectLayout>
        </div>
      </CarouselItem>
      <!-- 绘制报表-->
      <CarouselItem class='carousel-repor'>
        <div class="header">
          <div class='left_logo'></div>
          <div class='right_logo'></div>
        </div>
        <div class="demo-carousel">
          <keep-alive>
            <component v-show='step==1?true:false' :is="currentReportLayout"></component>
          </keep-alive>
        </div>
      </CarouselItem>
      <!-- 过滤器-->
      <CarouselItem>
        <div class="demo-carousel">
          <globalFilter v-show='step==2?true:false' ref='globalFilter'></globalFilter>
        </div>
      </CarouselItem>
      <!-- 预览报表-->
      <CarouselItem class='carousel-repor'>
        <div class="demo-carousel">
          <reportPreview v-if='step==3?true:false' ref='reportPreview'></reportPreview>
        </div>
      </CarouselItem>
      <!-- 报表信息-->
      <CarouselItem>
        <div class="demo-carousel">
          <BaseInfo v-show='step==4?true:false' ref='baseInfo'></BaseInfo>
        </div>
      </CarouselItem>
    </Carousel>
    <Row  class='button'>
      <Button type="primary" @click='pre()'>上一步</Button>
      <Button v-if="step!=4?true:false" type="primary" @click='next()'>下一步</Button>
      <Button v-if="step==4?true:false" type="primary" @click='createReport()'>保存</Button>
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
import reportPreview from "./../components/ReportPreview"
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
    reportPreview
  },
  computed: {
    ...mapGetters({
      currentReportLayout:'currentReportLayout',
      report:'report'
    })
  },
  data () {
    return {
      step: 0,//走马灯步数
      carouselSetting: {//走马灯设置
        height:"200",
        dots:"none",
        arrow:"never"
      }
    }
  },
  methods:{

    /**
     * 下一步操作
     */
    next() {
      let Vue = this;
      if (Vue.step >=4) return ;
      Vue.$refs.slide.arrowEvent(1); //Slide向前移一步       
      if(Vue.step == 3){
        Vue.previewReport();  
      }        
    },

    /**
     * 上一步操作
     */
    pre() {
      let Vue = this;
      if(Vue.step !=0){
        Vue.$refs.slide.arrowEvent(-1); //Slide后退一步  
        if(Vue.step == 3){
          Vue.previewReport(); 
        } 
      }
    },

    /**
     * 预览报表
     */
    previewReport(){
      let Vue = this;
      Vue.$refs.globalFilter.saveGlobalFilterData(); //向store中存储全局过滤器
      Vue.$nextTick(function(){
        Vue.$refs.reportPreview.initChartComponent(); //初始化图形组件 
      });        
    },  

    /**
     * 新建报表
     */
    createReport(){
      let Vue = this;
      Vue.$refs.baseInfo.saveReportBaseInfo();//保存报表信息
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

    /**
     * 新建完成后关闭当前页面
     */
    closePage(event, name){
      let pageOpenedList = this.$store.state.app.pageOpenedList;
      let lastPageObj = pageOpenedList[1];
      this.$store.commit('removeTag', name);
      this.$store.commit('closePage', name);
      pageOpenedList = this.$store.state.app.pageOpenedList;
      localStorage.pageOpenedList = JSON.stringify(pageOpenedList);    
      this.linkTo(lastPageObj);          
    },

    /**
     * 连接到上一个页面
     */
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
    }
  }
}
</script>
<style scope>
.header{
  width: 100%;
  height: 90px;
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
.carousel-repor{
  background-color: #071432;
}
.button {
  text-align: center;
  position: fixed;
  bottom: 0px;
  left: 50%;
}
</style>