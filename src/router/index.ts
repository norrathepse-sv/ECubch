import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about/app-object-second',
      name: 'app-object-second',
      component: () => import('@/views/about/AppOjectSecond.vue')
    },
    {
      path: '/about/app-org-chart',
      name: 'app-org-chart',
      component: () => import('@/views/about/AppOrgChart.vue')
    },
    {
      path: '/meeting/app-meeting-list',
      name: 'app-meeting-list',
      component: () => import('@/views/meeting/AppMeeting.vue')
    },
    // เพิ่มหน้า Login ไว้ตรงนี้
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('@/views/LoginView.vue') 
    // }
  ],
})

export default router