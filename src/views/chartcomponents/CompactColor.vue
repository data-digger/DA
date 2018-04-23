<template>
<div id='compactColor'>
    <Dropdown trigger="click">
        <div class='compact-div' :style="styles">
            {{color}}
        </div>
        <DropdownMenu slot="list">
            <Compact v-model="selectedColor" @changeColor='setColor'/>
        </DropdownMenu>
    </Dropdown>
</div>
</template>
<script>
import Compact from 'vue-color/src/components/Compact.vue'
export default {
    props:['color'],
    components: {
        Compact
    },
    watch:{
        //'value':'resetColor'
     //'myChart.bizViewId': 'getFieldList',
　},
    data () {
        return {
                styles:{height: '32px',
                        width: '45px',
                        backgroundColor: this.color,
                        borderRadius: '4px',
                        cursor:'pointer'},
                //selectedColor:{hex:this.value},
                selectedColor:{hex:this.color}
            }
    },
    methods:{
        setColor:function(color){
           //this.selectedColor.hex = color.hex;
           //this.$emit('input',this.selectedColor.hex)
           this.$emit('changeColor',this.selectedColor.hex)
        },
        resetColor:function(){
            this.styles.backgroundColor = this.value;
            this.selectedColor.hex = this.value;
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
   #compactColor .ivu-select-dropdown{
       padding:0
   }
   .compact-div{
       height: '32px';
       width: '45px';
       border-radius: '4px';
       cursor:'pointer'}
</style>