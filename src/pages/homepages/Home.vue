<template>
  <div id='home'>
     <div class="header">Data-Digger</div>
     <div class="content">
      <div id='menu'>
        <div class="menu selected" @click='link("/Home/Create")'> <span></span>新建 </div>
        <div class="menu" @click='link("/Home/Resource")'> 资源 </div> 
        <div class="menu" @click='link("/Home/Create")'> 其他 </div> 
      </div>
      <router-view></router-view>
     </div>
     <!-- <div class="footer"></div> -->
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    
    }
  },
  methods:{
    link:function(route){
      this.$router.push({
        path:route
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#home{
  width:100%;
  height:100%; 
}
.header{
  width:100%;
  height: 10%;
  top: 0;
  position: absolute;
  background-color:#2b3643;    
  text-align: left;
  color: #c64348;
  line-height: 60px;
  font-size: 20px;
  padding: 0px 14px;
}
.content{
  width:100%;
  height: 90%;
  top: 10%;
  position: absolute;
}
.footer{
   width:100%;
   height: 3%;
   bottom: 0;
   position: absolute;
   background-color: #2b3643;
}
  #menu{
    width:13%;;
    height: 100%;
    float: left;
    background-color:#364150;
  }
  .menu{
    width:100%;;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color:#b2bdcc;
    background-color:#364150;
    border-bottom: 1px solid #3d4857;
    position: relative;
  }
  .menu.selected{
    background-color:#3e4b5c;
  }
  .menu.selected span{
    display: block;
    float: right;
    position: absolute;
    right: 0px;
    top: 8px;
    background: none;
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-right: 12px solid #ffffff;
  }
  .menu:hover{
    background-color:#3e4b5c;
    opacity: 0.8;
    cursor: pointer;
  }
</style>
