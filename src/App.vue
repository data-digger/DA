<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                theme: this.$store.state.app.themeColor
            };
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {

        }
    };
</script>

<style>
html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 100%;
}
.ivu-notice {
    width: 366px;
    top: 132px !important;
    margin-right: 65px;
    position: fixed;
    z-index: 1010;
}
.ivu-checkbox-indeterminate .ivu-checkbox-inner {
   background-color: #fff;
   border-color:1px solid #dddee1;
}
.ivu-collapse-content-box{
    overflow: visible;
}
.ivu-collapse-content{
    overflow: visible !important; 
}
.CodeMirror{
  height: 395px !important;
}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu){
    border-right:0;
}
</style>
