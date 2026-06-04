<template>
  <div class="w-full">
    <AppHero />
    <ImageSlider :slides="heroSlides" :auto-play-interval="6000" />
    <AppAbout />

    <AppExperts />
    <!-- <AppSop /> -->
    <AppFee />
    <!-- <AppDownload /> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppHero from '@/components/AppHero.vue';
import AppAbout from '@/components/AppAbout.vue';
// import AppSop from '@/components/AppSop.vue';
import AppFee from '@/components/AppFee.vue';
import AppExperts from '@/components/AppExperts.vue';
// import AppDownload from '@/components/AppDownload.vue';

import ImageSlider from '@/components/ImageSlider.vue';

// ข้อมูลจำลองสำหรับภาพสไลด์
const heroSlides = ref([
  {
    image: '/images/slider/head.jpg', // เปลี่ยนเป็นพาร์ทรูปตึกโรงพยาบาลของคุณ
    title: '',
    subtitle: 'คณะกรรมการจริยธรรมการวิจัยในมนุษย์ โรงพยาบาลมะเร็งอุบลราชธานี'
  },
  {
    image: '/images/slider/a1.jpg', // เปลี่ยนเป็นพาร์ทรูปการประชุมของคุณ
    title: 'คณะกรรมการจริยธรรมฯ <span class="text-gold">"พร้อมให้คำปรึกษา"</span> แก่ผู้วิจัยทุกท่าน',
    subtitle: 'เพื่อส่งเสริมงานวิจัยที่มีคุณภาพและมีจริยธรรม'
  }
]);

</script>