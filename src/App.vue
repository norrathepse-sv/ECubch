<template>
  <div class="min-h-screen bg-slate-50 font-sans flex flex-col">
    
    <header class="sticky top-0 z-50 w-full flex flex-col">
      <AppNavbar />
      <AppTopBar />
    </header>
    
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <AppFooter />
  </div>
</template>
<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';
import AppTopBar from '@/components/AppTopBar.vue';
</script>

<style>
/* คลาสแอนิเมชัน Page Fade-in เดิมของคุณ */
.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.5s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>