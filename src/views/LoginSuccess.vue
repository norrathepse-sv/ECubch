<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

onMounted(() => {
  // 1. ดึง Token จาก URL (?token=...)
  const token = route.query.token;
  
  if (token) {
    // 2. ถ้ามี Token ให้เซฟลงในเครื่อง (localStorage)
    localStorage.setItem('auth_token', token as string);
    // 3. พาไปหน้า Dashboard
    router.push('/dashboard');
  } else {
    // ถ้าไม่มีให้กลับไปหน้า Login
    router.push('/login');
  }
});
</script>

<template>
  <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-size: 1.5rem;">
    กำลังพาคุณเข้าสู่ระบบ...
  </div>
</template>