import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
       title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: '首页', name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'createDatasource', title: '新建数据源', name: 'createDatasource', component: () => import('@/views/create/CreateDatasource.vue') },
        { path: 'createParam',title: '新建参数', name: 'createParam',component: () => import('@/views/create/CreateParam.vue')},        
        { path: 'createChart',title: '新建图表', name: 'createChart', component: () => import('@/views/create/CreateChart.vue')},
        { path: 'createQuery', title: '新建查询器', name: 'createQuery', component: () => import('@/views/create/CreateQuery.vue')},
        { path: 'createReport',title: '新建报表', name: 'createReport',component: () => import('@/views/report/ReportCreate.vue')},
        { path: 'editReport',title: '编辑报表', name: 'editReport',component: () => import('@/views/report/ReportEdit.vue')},
        { path: 'createTable',title: '新建表格', name: 'createTable',component: () => import('@/views/create/CreateTable.vue')},      
        { path: 'viewReport',title: '查看报表', name: 'viewReport',component: () => import('@/views/report/ReportPreview.vue')},
       /* { path: ''}*/
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/resource',
        icon: 'android-sad',
        title: '资源',
        name: 'resource',
        component: Main,
        children: [
            { path: 'index', title: '资源页面', name: 'resource_index', component: () => import('@/views/resource/Resource.vue') }
        ]
    },
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
