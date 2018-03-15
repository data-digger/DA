<template>
   <div class="previewCard">
        <infoCard
              v-if="cardShow" 
              :id-name="chartbox.id"
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
import infoCard from './../home/components/inforCard'
export default {
    props:["chartbox",'option'],
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