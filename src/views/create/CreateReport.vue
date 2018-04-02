<template>
  <div>
    <Carousel  v-model="value" :dots="setting.dots" :arrow="setting.arrow" ref='slide'>
        <CarouselItem>
            <div class="demo-carousel"><BaseInfo ref='initBaseInfo'></BaseInfo>
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><SelectLayout></SelectLayout>
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><component :is="layouts"></component></div>
        </CarouselItem>
    </Carousel>
     <Row  class='button'>
      <Button type="primary" @click='pre()'>上一步</Button>
      <Button v-if="!finished" type="primary" @click='next()'>下一步</Button>
      <Button v-if="finished" type="primary" @click='save()'>保存</Button>
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
import {mapGetters} from 'vuex'
export default {
    components:{
      SelectLayout,
      BaseInfo,
      Layout1,
      Layout2,
      Layout3,
      Layout4
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
            value: 0,
            setting: {
                height:"200",
                dots:"none",
                arrow:"never",
            },
            layouts:Layout1
        }
    },
    methods:{
      next() {
        if(this.value <3){
          this.$refs.slide.arrowEvent(1);
          if(this.value == 1){
            this.$refs.initBaseInfo.initBaseInfo();
          }
          if(this.value == 2){//根据选择的布局
            //this.layouts =[];
            if(this.layoutSelected == "布局1"){ this.layouts=Layout1};
            if(this.layoutSelected == "布局2"){ this.layouts=Layout2};
            if(this.layoutSelected == "布局3"){ this.layouts=Layout3};
            if(this.layoutSelected == "自定义"){ this.layouts=Layout4};
            this.finished = true;
          }         
        }
      },
      pre() {
        if(this.value !=0){
          this.$refs.slide.arrowEvent(-1);
          this.finished = false;
        }
      },
      save() {
           this.createReport();
      },
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
      closePage(event, name){
        let pageOpenedList = this.$store.state.app.pageOpenedList;
        let lastPageObj = pageOpenedList[1];
        this.$store.commit('removeTag', name);
        this.$store.commit('closePage', name);
        pageOpenedList = this.$store.state.app.pageOpenedList;
        localStorage.pageOpenedList = JSON.stringify(pageOpenedList);    
        this.linkTo(lastPageObj);          
      },
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