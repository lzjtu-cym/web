/**
 *  全局路由
 */
const homeWeb_routes = require('./pages/home/routes');

let routes = [
  ...homeWeb_routes,
  // 404、403、500 路由必须保持在最后
  {
    name: "404页面",
    path: "/404",
    component: '../pages/404.js'
  },
  {
    name: "403页面",
    path: "/403",
    component: '../pages/403.js'
  },
  {
    name: "500页面",
    path: "/500",
    component: '../pages/500.js'
  }
]

module.exports = [
  {
    path: '/',
    component: '../layouts/index.js',
    routes: routes
  }
]
