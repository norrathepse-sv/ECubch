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
    {
      path: '/app-contact-view',
      name: 'app-contact-view',
      component: () => import('@/views/ContactView.vue')
    },
    {
      path: '/app-project-status',
      name: 'app-project-status',
      component: () => import('@/components/ProjectStatusView.vue')
    },
    

    {
      path: '/research',
      name: 'research-directory',
      
      component: () => import('@/views/research/researchData.vue') 
    },
    {
      path: '/downloads',
      name: 'document-downloads',
      component: () => import('@/views/downloads/DownloadsView.vue')
    },
   {
  path: '/login',
  name: 'login',
  component: () => import('@/views/LoginView.vue')
}
  ,
   {
  path: '/login/success',
  name: 'login-success',
  component: () => import('@/views/LoginSuccess.vue')
},
{
  path:'/dashboard',
  name:'dashboard',
  component: () => import('@/views/DashboardView.vue'),
  meta: { requiresAuth: true }
},
{
  path:'/sops',
  name:'sops',
  component: () => import('@/components/AppSop.vue'),
  meta: { requiresAuth: true }
},
{
  path:'/Review',
  name:'review',
  component: () => import('@/components/ReviewProcess.vue'),
  meta: { requiresAuth: true }
}
,
{
  path: '/slide-image', // หรือ '/admin/slides' จะดูสื่อความหมายกว่าครับ
  name: 'slideImage',
  component: () => import('@/components/SlideUpload.vue'),
  meta: { requiresAuth: true }
},
{
  path: '/news/:id',
  name: 'NewsDetail',
  // ปรับ Path ไปยังตำแหน่งไฟล์ NewsDetail.vue ของคุณให้ถูกต้อง
  component: () => import('@/views/NewsDetail.vue') 
},
{
  path: '/admin/users',
  name: 'UserManagement',
  component: () => import('../views/Admin/UserManagement.vue')
}
  
      
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }; // บังคับให้เริ่มที่ด้านบนเสมอ
  },
  
})

export default router