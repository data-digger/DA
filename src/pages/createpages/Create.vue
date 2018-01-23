<template>
  <div id='create'>
     <div class="row">
        <CreatorBox v-for="box in createboxList" :key='box.id' :name='box.name' :desc='box.desc' :subpath='box.subpath'></CreatorBox>
  </div>
</div>
</template>

<script>
import CreatorBox from './../../components/CreatorBox'
import * as types from '../../store/mutation-types'
import {mapGetters} from 'vuex'
export default {
  name: 'Create',
  components:{
    CreatorBox
  },
  data(){
    return {
        createboxList:[{id:1,name:"数据源",desc:"DataSource",subpath:'/Home/CreateDatasource'},
          {id:2,name:"报表",desc:"Report",subpath:'/Home/Datasource'},
          {id:3,name:"图表",desc:"Chart",subpath:'/Home/CreateChart'},
          {id:4,name:"查询器",desc:"query",subpath:'/Home/CreateQuery'}],
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#create{
  width: 87%;
  height: 100%;
  float: left;
}
#create .row{
  width: 100%;
  margin:20px;
}
</style>
