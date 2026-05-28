<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    <AppNavbar />
    <AppHero />
    <AppAbout />
    <AppSop />
    
    <AppFee />

    <AppExperts />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue';
import AppHero from '@/components/AppHero.vue';
import AppAbout from '@/components/AppAbout.vue';
import AppFee from '@/components/AppFee.vue';
import AppSop from '@/components/AppSop.vue';
import AppExperts from '@/components/AppExperts.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>