import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'

Vue.use(Router)

const constantRouter = [
  {
    path: '/index',
    name: '首页',
    component: Index,
    children: [
      {
        path: '/system',
        name: '系统管理',
        component: () => import('../components/Main/system.vue')
      },
      {
        path: '/user',
        name: '用户管理',
        component: () => import('../components/Main/user.vue')
      },
      {
        path: '/organize',
        name: '组织管理',
        component: () => import('../components/Main/organize.vue')
      },
      {
        path: '/student',
        name: '学生管理',
        component: () => import('../components/Main/student.vue')
      },
      {
        path: '/policy',
        name: '权限管理',
        component: () => import('../components/Main/policy.vue')
      },
      {
        path: '/notice',
        name: '通知管理',
        component: () => import('../components/Main/notice.vue')
      },
      {
        path: '/subject',
        name: '课程管理',
        component: () => import('../components/Main/subject.vue')
      },
      {
        path: '/book',
        name: '图书管理',
        component: () => import('../components/Main/book.vue')
      }
    ]
  }, {
    path: '/',
    name: '登陆',
    component: Login
  }
]

export default new Router({
  routes: constantRouter
})
