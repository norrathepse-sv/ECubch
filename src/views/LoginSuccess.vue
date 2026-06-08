<template>
  <div class="p-10">กำลังเข้าสู่ระบบ...</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const token = route.query.token; // รับค่า ?token=... จาก URL
  
  if (token) {
    // บันทึก Token ลง Browser
    localStorage.setItem('auth_token', token);
    
    // นำทางไปหน้า Dashboard
    router.push('/dashboard');
  } else {
    router.push('/login?error=no_token');
  }
});
</script>