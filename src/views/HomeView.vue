<template>
  <div class="w-full">
    <AppHero />
    <AppAbout />

    <div class="space-y-4 md:space-y-6 lg:space-y-8 mb-16">
      <AppExperts />
      <AppFee />
    </div>

    <!-- <AppSop /> -->
    <!-- <AppDownload /> -->
    <ImageSlider v-if="isDataLoaded" :slides="heroSlides" :auto-play-interval="6000" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"; // 1. เพิ่ม onMounted เข้ามา
import axios from "axios"; // 2. เพิ่ม axios เข้ามาเพื่อดึง API
import AppHero from "@/components/AppHero.vue";
import AppAbout from "@/components/AppAbout.vue";
// import AppSop from '@/components/AppSop.vue';
import AppFee from "@/components/AppFee.vue";
import AppExperts from "@/components/AppExperts.vue";
// import AppDownload from '@/components/AppDownload.vue';
import ImageSlider from "@/components/ImageSlider.vue";

// 3. ตั้งค่าเริ่มต้นของสไลด์ให้เป็น Array ว่าง เพื่อรอรับข้อมูลจากฐานข้อมูล
const heroSlides = ref<any[]>([]);
const isDataLoaded = ref(false);

// 4. สร้างฟังก์ชันยิง API ไปดึงข้อมูลสไลด์ที่แอดมินอัปโหลดไว้
const fetchHeroSlides = async () => {
  try {
    const response = await axios.get("http://10.180.10.71:8000/api/slides");

    // ทำการจับคู่ข้อมูล (Map) จาก API ให้เข้ากับฟิลด์ที่ <ImageSlider /> ต้องการ
    heroSlides.value = response.data.map((slide: any) => ({
      id: slide.id,
      image: slide.image_url, // ดึง Path รูปภาพเต็มจาก Laravel สื่อสารผ่านพอร์ต 8000
      title: slide.title,
      subtitle: slide.subtitle,
      link: slide.link || "", // ลิงก์เฟสบุ๊คหรือรายละเอียด
    }));
    isDataLoaded.value = true;
  } catch (error) {
    console.error("ไม่สามารถดึงข้อมูลภาพสไลด์หน้าแรกได้:", error);
  }
};

// 5. สั่งให้ฟังก์ชันทำงานทันทีเมื่อหน้าเว็บโหลดเสร็จ
onMounted(() => {
  fetchHeroSlides();
});
</script>
