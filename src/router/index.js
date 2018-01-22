import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/loginpages/login'
import home from '@/pages/homepages/Home'
import create from '@/pages/createpages/Create'
import createdatasource from '@/pages/createpages/CreateDatasource'
import resource from '@/pages/resourcepages/Resource'
import datasourcemng from '@/pages/resourcepages/DatasourceMng'
import createquery from '@/pages/createpages/CreateQuery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: login
    },
    {
      path: '/Home',
      name: 'Home',
      component: home,
      children:[
      {    	
	      path: 'Create',
	      name: 'Create',
	      component: create    
      },
      {
      	path: 'Resource',
	      name: 'Resource',
	      component: resource  
      },
      {
        path: 'CreateDatasource',
        name: 'CreateDatasource',
        component: createdatasource  
      },
      {
        path: 'DatasourceMng',
        name: 'DatasourceMng',
        component: datasourcemng  
      },
      {
        path: 'CreateQuery',
        name: 'CreateQuery',
        component: createquery  
      }]
    }

  ]
})
