/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    icon: 'smile',
    component: './Home',
  },
  {
    name: '权限演示',
    path: '/admin',
    icon: 'crown',
    component: './Access',
    access: 'canSeeAdmin',
  },
  {
    name: '表格',
    path: '/table',
    icon: 'table',
    component: './Table',
  },
  {
    name: '图表',
    path: '/charts',
    icon: 'PieChartOutlined',
    routes: [
      {
        path: '/charts',
        redirect: '/charts/single-line',
      },
      {
        path: '/charts/single-line',
        name: 'SingleLine',
        component: '@/pages/Charts/SingleLine',
      },
      {
        path: '/charts/multi-line',
        name: 'MultiLine',
        component: '@/pages/Charts/MultiLine',
      },
    ],
  },
  {
    name: '图片编辑器',
    path: '/imageEdit',
    icon: 'PieChartOutlined',
    routes: [
      {
        path: '/imageEdit',
        redirect: '/imageEdit/index',
      },
      {
        path: '/imageEdit/index',
        name: '首页',
        component: '@/pages/ImageEdit/index',
      },
      {
        path: '/imageEdit/intro',
        name: '简介',
        component: '@/pages/ImageEdit/Intro',
      },
      {
        path: '/imageEdit/BasicShape',
        name: '基础图形',
        component: '@/pages/ImageEdit/BasicShape',
      },
      {
        path: '/imageEdit/CustomShape',
        name: '自定义图形',
        component: '@/pages/ImageEdit/CustomShape',
      },
      {
        path: '/imageEdit/Image',
        name: '图片',
        component: '@/pages/ImageEdit/Image',
      },
      {
        path: '/imageEdit/ImageZoom',
        name: '图片-缩放',
        component: '@/pages/ImageEdit/ImageZoom',
      },
      {
        path: '/imageEdit/ImageRotation',
        name: '图片-旋转',
        component: '@/pages/ImageEdit/ImageRotation',
      },
      {
        
        path: '/imageEdit/ImageExport',
        name: '图片-导出',
        component: '@/pages/ImageEdit/ImageExport',
      },
      {
        path: '/imageEdit/Drag',
        name: '拖拽',
        component: '@/pages/ImageEdit/Drag',
      },
      {
        path: '/imageEdit/KonvaNode',
        name: 'KonvaNode',
        component: '@/pages/ImageEdit/KonvaNode',
      },
      {
        path: '/imageEdit/Transformer',
        name: 'Transformer',
        component: '@/pages/ImageEdit/Transformer',
      },
      {
        path: '/imageEdit/DomNode',
        name: 'DomNode',
        component: '@/pages/ImageEdit/DomNode',
      },
      {
        path: '/imageEdit/UndoRedo',
        name: '撤销重做',
        component: '@/pages/ImageEdit/UndoRedo',
      },
      {
        path: '/imageEdit/ChangeZindex',
        name: '修改z-index',
        component: '@/pages/ImageEdit/ChangeZindex',
      },
      {
        path: '/imageEdit/DropImageIntoCanvas',
        name: 'DropImageIntoCanvas',
        component: '@/pages/ImageEdit/DropImageIntoCanvas',
      },
      {
        path: '/imageEdit/Drawing',
        name: '画板',
        component: '@/pages/ImageEdit/Drawing',
      },
    ],
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
