<template>
  <div>
    <Carousel v-model="value" :height='setting.height' :dots="setting.dots" :arrow="setting.arrow" ref='slide'>
        <CarouselItem>
            <div class="demo-carousel"><SelectLayout></SelectLayout>
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel"><component :is="layout.component" v-for="layout in layouts" :key='layout.id'></component></div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">3</div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">4</div>
        </CarouselItem>
    </Carousel>
     <Row  class='button'>
      <Button type="primary" @click='pre()'>上一步</Button>
      <Button type="primary" @click='next()'>下一步</Button>
    </Row> 
 </div>
</template>
<script>
import SelectLayout from "./../report/SelectLayout"
import Layout1 from "./../report/Layout1"
import Layout2 from "./../report/Layout2"
import Layout3 from "./../report/Layout3"
import Layout4 from "./../report/Layout4"
import {mapGetters} from 'vuex'
    export default {
        components:{
          SelectLayout,
          Layout1,
          Layout2,
          Layout3,
          Layout4
        },
        computed: {
          ...mapGetters({
            layoutSelected: 'layoutSelected'
          })
        },
        data () {
            return {
                value: 0,
                setting: {
                    dots:"none",
                    arrow:"none",
                    height:"450px"
                },
                layouts:[]
            }
        },
        methods:{
          next() {
            if(this.value <3){
              this.$refs.slide.arrowEvent(1);
              if(this.value == 1){//根据选择的布局
                this.layouts =[];
                if(this.layoutSelected == "布局1"){ this.layouts.push({component: Layout1,id:1})}
                if(this.layoutSelected == "布局2"){ this.layouts.push({component: Layout2,id:2})}
                if(this.layoutSelected == "布局3"){ this.layouts.push({component: Layout3,id:3})}
                if(this.layoutSelected == "自定义"){ this.layouts.push({component: Layout4,id:4})} 
              }
            }

          },
          pre() {
            if(this.value !=0){
              this.$refs.slide.arrowEvent(-1);
            }
          }
        }
    }
</script>
<style scope>
  .button {
    text-align: center;
  }
</style>