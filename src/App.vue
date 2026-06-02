<template>
  <div class="min-h-screen bg-slate-50 font-sans flex flex-col">
    <AppNavbar />
    


  <router-view />

  
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>