<script setup lang="ts">
import { ref } from 'vue';

const isLoading = ref(false);

const loginWithLine = () => {
  isLoading.value = true;
  
  // ให้ Browser วิ่งไปหา Laravel ทันที โดยไม่ต้องรอโหลดข้อมูล!
  // วิธีนี้ Tablet จะไม่บล็อกแน่นอนครับ
  window.location.href = 'http://10.180.10.71:8000/api/auth/line/redirect';
};
</script>

<style>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh; /* ให้กินพื้นที่เต็มความสูงหน้าจอ */
    gap: 20px;
}
.btn-line-login {
    display: block;
    padding: 20px;
    background-color: #06c755;
    color: white;
    border-radius: 10px;
    font-size: 20px;
}
</style>

<template>
  <div class="login-container">
    <h1>ยินดีต้อนรับสู่ UBCH REC</h1>
    
    <button @click="loginWithLine" :disabled="isLoading" class="btn-line-login">
      {{ isLoading ? 'กำลังเชื่อมต่อ...' : 'Login with LINE' }}
    </button>
  </div>
</template>