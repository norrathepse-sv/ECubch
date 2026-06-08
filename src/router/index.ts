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
    
    // ==========================================
    // เพิ่ม Routes ใหม่สำหรับ GridCard ด้านล่างนี้
    // ==========================================
    {
      path: '/research',
      name: 'research-directory',
      // อย่าลืมสร้างไฟล์ ResearchView.vue (หรือชื่ออื่นที่คุณตั้งไว้) ในโฟลเดอร์ views
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
}

    
      
  ],
})

export default router