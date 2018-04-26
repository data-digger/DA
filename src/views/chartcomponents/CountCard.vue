<template>
   <div class="previewCard">
        <infoCard
              v-if="cardShow" 
              :id-name="chartId"
              :end-val="option.data"
              :iconType="option.iconType"
              :icon-size="option.iconSize"
              :color="option.color"
              :count-size="option.countSize"
              :count-weight="option.countWeight"
              :intro-text="option.introText"
              :intro-color='option.introColor'
              :intro-size='option.introSize'
              :intro-weight='option.introWeight'                         
          ></infoCard>
    </div>
</template>
<script>
import infoCard from './inforCard.vue'
import {mapGetters} from 'vuex'
export default {
    props:["chartId",'option'],
    components:{
        infoCard
    },
    data () {
        return {
            cardShow:false
        }
    },
    methods:{
        show(){
            let Vue = this;
            Vue.cardShow = true;
        },
        reset(){
            
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .previewCard{
    width: 400px;
    height: 150px;
    margin: auto;
  }
  </style>