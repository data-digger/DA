<template>
  <div>
    <Carousel 
      v-model="step" 
      :dots="carouselSetting.dots" 
      :arrow="carouselSetting.arrow" 
      ref='slide'
    >
      <!-- 选择布局-->
      <CarouselItem>
        <div class="demo-carousel">
          <ReportGrid v-show='step==0?true:false'></ReportGrid>
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
            <component 
              v-show='step==1?true:false' 
              :is="report.defineJSON.content.currentReportGridLayout"
              ref='currentReportGridLayout'
            ></component>
          </keep-alive>
        </div>
      </CarouselItem>
      <!-- 过滤器-->
      <CarouselItem>
        <div class="demo-carousel">
          <ReportFilterEdit 
            v-show='step==2?true:false' 
            ref='ReportFilterEdit'
          ></ReportFilterEdit>
        </div>
      </CarouselItem>
      <!-- 预览报表-->
      <CarouselItem class='carousel-repor'>
        <div class="demo-carousel">
          <ReportPreview 
            v-if='step==3?true:false' 
            ref='ReportPreview'
          ></ReportPreview>
        </div>
      </CarouselItem>
      <!-- 报表信息-->
      <CarouselItem>
        <div class="demo-carousel">
          <ReportInfoEdit 
            v-show='step==4?true:false' 
            ref='ReportInfoEdit'
            :reportInfo='reportInfo'
            isCreat='true'
          ></ReportInfoEdit>
        </div>
      </CarouselItem>
    </Carousel>
    <Row class='button'>
      <Button 
        type="primary" 
        @click='pre()'
      >上一步</Button>
      <Button
        v-if="step!=4?true:false" 
        type="primary" 
        @click='next()'
      >下一步</Button>
      <Button 
        v-if="step==4?true:false" 
        type="primary" 
        @click='createReport()'
      >保存</Button>
    </Row> 
  </div>
</template>

<script>
import ReportGrid from "./ReportGridsSelect"
import ReportInfoEdit from "./ReportInfoEdit"
import GridLayoutPredefine1 from "./gridcomponents/GridLayoutPredefine1"
import GridLayoutPredefine2 from "./gridcomponents/GridLayoutPredefine2"
import GridLayoutPredefine3 from "./gridcomponents/GridLayoutPredefine3"
import GridLayoutCustomDefine from "./gridcomponents/GridLayoutCustomDefine"
import ReportFilterEdit from "./ReportFilterEdit"
import ReportPreview from "./ReportPreview"
import {mapGetters} from 'vuex'
export default {
  components:{
    ReportGrid,
    ReportInfoEdit,
    GridLayoutPredefine1,
    GridLayoutPredefine2,
    GridLayoutPredefine3,
    GridLayoutCustomDefine,
    ReportFilterEdit,
    ReportPreview
  },

  data () {
    return {
      step: 0,//走马灯步数
      reportInfo:{
        name:"",
        alias:"",
        desc:""
      },
      carouselSetting: {//走马灯设置
        height:"200",
        dots:"none",
        arrow:"never"
      }
    }
  },

  computed: {
    ...mapGetters({
      report:'report'
    })
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
        Vue.$refs.ReportFilterEdit.saveGlobalFilterData(); 
      }        
    },

    /**
     * 上一步操作
     */
    pre() {
      let Vue = this;
      if(Vue.step !=0){
        Vue.$refs.slide.arrowEvent(-1); //Slide后退一步  
        
      }
    },

    /**
     * 新建报表
     */
    createReport(){
      let Vue = this;
      Vue.$refs.ReportInfoEdit.saveReportBaseInfo();//保存报表信息
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