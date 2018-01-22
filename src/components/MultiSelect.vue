<template>
  <div id="multiselect">
    <div class="select selection">
      <div class="select-title"> 可选 </div>
      <div class="selection-list">
          <div v-for='(selection,index) in selections[0]'class='selection-item' @click='selectedAdd($event,index)'> <img src=""><div class='itemName'>{{selection.selectionName}}</div></div>
      </div>
    </div>
    <span class="glyphicon glyphicon-sort exchange" aria-hidden="true"></span>
    <div class="select selected">
      <div class="select-title"> 已选 </div>
      <div class="selection-list selection-list-right">
         <div class="selection-list">
            <div v-for='(selection,index) in selections[1]'class='selected-item' @click='selectedDelete($event,index)'> <img src=""><div class='itemName'>{{selection.selectionName}}</div></div>
         </div>
      </div>
    </div>
    <div class="col-md-offset-3 col-md-6">
      <button type="submit" class="btn btn-green">确认</button>
      <button type="button" class="btn ">返回</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'multiselect',
  data(){
    return {
      selections:[
        [{selectionName:"可选1"},{selectionName:"可选2"},{selectionName:"可选3"}],
        []
      ]
    }
  },
  methods:{
    selectedAdd:function(event,index){    
      var isExist = false;
      $(".selection-list-right .itemName").each(function(i,domele){
         if($(domele).html() == $(event.target).html()){
            isExist = true;
         }
      });
      if(!isExist){
        this.selections[1].push(this.selections[0][index]);
      }
    },
    selectedDelete:function(event,index){
      $(event.currentTarget).remove()
    }
  },
  beforeMount:function(){
 
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#multiselect{
  width: 100%;
  height: 395px;
  padding:10px;
}
.select{
  width: 40%;
  height: 300px;
  display: inline-block;
  border: 1px solid #bbdba1;
  margin:0px 45px 35px 50px;
  float: left;
}
.select-title{
  width: 100%;
  height: 40px;
  background-color:#bbdba1;
  text-align: left;
  color: white;
  line-height: 40px;
  padding-left: 3px;
}
.exchange{
  float: left;
  width: 0%;
  top: 40%;
}
.selection-item,.selected-item  {
  text-align: left;
  height: 30px;
  padding-left: 5px;
  line-height: 30px;
}
.selection-item img,.selected-item img{
  float: left;
}
.selection-item:hover,.selected-item:hover {
  background-color:#daf1c7;
}
.btn-green{
 background-color:#bbdba1;
}

</style>
