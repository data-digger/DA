<template>
  <div>
    <Carousel 
      v-model="step" 
      :dots="carouselSetting.dots" 
      :arrow="carouselSetting.arrow" 
      ref='slide'
    >
      <!-- 画图编辑-->
      <CarouselItem class='carousel-repor'>
        <div class="demo-carousel">
           <div class="toolbar"><Button @click="addPortlet()">添加模块</Button></div>
           <Grid        
             :portlets='report.defineJSON.content.portlets'
             ref='Grid'
           ></Grid>
        </div>
      </CarouselItem>
      <!-- 报表信息-->
      <CarouselItem>
        <div class="demo-carousel">
          <ReportInfoEdit 
            :reportInfo='report'
            isCreat='false'
            ref='ReportInfoEdit'
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
        v-if="step!=1?true:false" 
        type="primary" 
        @click='next()'
      >下一步</Button>
      <Button 
        v-if="step==1?true:false" 
        type="primary" 
        @click='createReport()'
      >保存</Button>
    </Row> 
  </div>
</template>

<script>
import Grid from "./gridcomponents/Grid"
import ReportInfoEdit from "./ReportInfoEdit"
import {mapGetters} from 'vuex'
export default {
  components:{
    Grid,
    ReportInfoEdit
  },

  data () {
    return {
      step: 0,//走马灯步数
      carouselSetting: {//走马灯设置
        height:"200",
        dots:"none",
        arrow:"never"
      },
      index:0
    }
  },

  computed:{
    ...mapGetters({
      report:'report'
    })
  },

  mounted(){
    let Vue = this;
    Vue.initReport();
  },

  methods:{
    indexFilter(){
      let portlets = this.report.defineJSON.content.portlets;
      let max = portlets[0].portletID;
      for(let i in portlets){
        let portletID = portlets[i].portletID;
        portletID>max ? max=portletID : null;
      }
      return parseInt(max);
    },
    /**
     * 初始化报表
     */
    initReport(){
      let Vue =this;
      if(!$.isEmptyObject(Vue.$route.params)){
        Vue.report.name= Vue.$route.params.name;
        Vue.report.id= Vue.$route.params.id;
        Vue.report.desc= Vue.$route.params.desc;
        Vue.report.defineJSON= Vue.$route.params.defineJSON;
        Vue.report.alias= Vue.$route.params.alias;
      }
      Vue.getReportData();
    },

    /**
     * 获取报表数据
     */
    getReportData(){
      let Vue = this;   
      Vue.AxiosPost("getReportDataById",{'reportID':Vue.report.id},
      function(response){
        Vue.drawReport(response.data.content);
      })          
    },

    /**
     * 绘制报表
     */
    drawReport(response){
      let Vue = this;
      let chartDataArray = response.chartData;
      if(chartDataArray.length != 0){//chart图形
        for (let i in chartDataArray){
          let chartData = chartDataArray[i];
          let portlets = Vue.report.defineJSON.content.portlets;
          let gridItemContentCmps = Vue.$refs.Grid.$refs.gridItemContent;
          for(let p in portlets){
            if(portlets[p].portletID == chartData.portletID && chartData.portletID == gridItemContentCmps[p].portletID){
              let gridItemContent = {
                  gridItemTitle:"",
                  gridItemTitleBackgroundImg:portlets[p].tabs[0].gridItemTitleBackgroundImg,//选中title的背景图
                  gridItemChartBoxBackgroundImg:portlets[p].tabs[0].gridItemChartBoxBackgroundImg,//选中chart容器的背景图
                  chartBoxBackgroundStyles:portlets[p].tabs[0].chartBoxBackgroundStyles,
                  chartId:chartData.id,
                  chartType:chartData.type,
                  chartComponent:"Chart",
                  chartOption:'',
                  chartData:chartData      
                }
              gridItemContentCmps[p].initGridItemContent(gridItemContent);              
            }
          }
        }        
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
     * 下一步操作
     */
    next() {
      let Vue = this;
      if (Vue.step >=1) return ;
      Vue.$refs.slide.arrowEvent(1); //Slide向前移一步  
    },

    /**
     * 上一步操作
     */
    pre() {
      let Vue = this;
      Vue.$refs.slide.arrowEvent(-1); //Slide后退一步 
    },

    addPortlet(){
      let Vue = this;
      let layout = Vue.report.defineJSON.content.portlets;
      let y = Vue._getBottom(layout);
      Vue.index = Vue.indexFilter()+1;
      let portlet = { 
        "portletID":""+Vue.index,
        "name":"portleName",
        "x":0,"y":y,"w":6,"h":4,"i":""+Vue.index,
        "tabs":[{
        "id":""+Vue.index,
        "title":"",
        'titleBackgroundImg':"",
        'chartBoxBackgroundImg':"",
        'chartBackgroundStyles':"",
        "objtype":"",
        "objid":""}]
      };
      portlet = Vue._compactItem(layout,portlet,true);
      Vue.report.defineJSON.content.portlets.push(portlet);
      Vue.$store.commit("saveCurrentReportGridItem",Vue.report.defineJSON.content.portlets);
        
    },
  _isCollides(layoutItem1, layoutItem2) {
        let Vue = this;
        if (layoutItem1 === layoutItem2) return false; // same element
        if (layoutItem1.x + layoutItem1.w <= layoutItem2.x) return false; // layoutItem1 is left of layoutItem2
        if (layoutItem1.x >= layoutItem2.x + layoutItem2.w) return false; // layoutItem1 is right of layoutItem2
        if (layoutItem1.y + layoutItem1.h <= layoutItem2.y) return false; // layoutItem1 is above layoutItem2
        if (layoutItem1.y >= layoutItem2.y + layoutItem2.h) return false; // layoutItem1 is below layoutItem2
        return true; // boxes overlap
    },
    _getFirstCollision(layout, layoutItem) {
      let Vue = this;
      for (let i = 0, len = layout.length; i < len; i++) {
        if (Vue._isCollides(layout[i], layoutItem)) return layout[i];
      }
    },
    _compactItem(layout, layoutItem,verticalCompact ) {
          let Vue = this;
          if (verticalCompact) {
            // Move the element up as far as it can go without colliding.
            while (layoutItem.y > 0 && !Vue._getFirstCollision(layout, layoutItem)) {
              layoutItem.y--;
            }
          }
          // Move it down, and keep moving it down if it's colliding.
          let collides;
          while((collides = Vue._getFirstCollision(layout, layoutItem))) {
            layoutItem.x = collides.x + collides.w;
            if(layoutItem.x >= 12){
              layoutItem.y = collides.y + collides.h;
              layoutItem.x = 0 ;
            }
          }
          return layoutItem;
    },
    _getBottom(layouts) {
          let max = 0, bottomY;
          for (let i = 0, len = layouts.length; i < len; i++) {
              bottomY = layouts[i]. y + layouts[i].h;
              if (bottomY > max) max = bottomY;
          }
          return max;
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
.toolbar{
   padding: 3px;
   margin: 3px;
}
.toolbar Button{
   background-color:#2d8cf0;
   color:white;
}
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