<template>
  <div class="bg-white font-sans text-[#1d1d1f] min-h-screen pb-24">
    
    <!-- <div class="max-w-[980px] mx-auto px-4 md:px-6 pt-6 pb-2">
      <nav class="text-sm text-[#86868b] flex items-center gap-2">
        <router-link to="/" class="hover:text-[#1d1d1f] transition-colors">หน้าหลัก</router-link>
        <span class="text-xs">›</span>
        <span class="text-[#1d1d1f] font-medium">เอกสารดาวน์โหลด</span>
      </nav>
    </div> -->

    <div class="max-w-[980px] mx-auto px-4 md:px-6 pt-12 pb-14 border-b border-[#d2d2d7]">
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">เอกสารดาวน์โหลด</h1>
      <p class="text-xl text-[#86868b] font-normal max-w-2xl leading-relaxed">
        ดาวน์โหลดแบบฟอร์ม 
      </p>
    </div>

    <div class="max-w-[980px] mx-auto px-4 md:px-6 pt-6">
      <div class="flex flex-col">
        
        <a 
          v-for="(doc, index) in documents" 
          :key="doc.id" 
          :href="doc.fileUrl" 
          target="_blank"
          class="group flex items-start md:items-center py-6 border-b border-[#d2d2d7] last:border-0 hover:bg-[#f5f5f7] -mx-4 px-4 md:rounded-2xl transition-all duration-300 cursor-pointer"
        >
          <div class="flex-shrink-0 mt-1 md:mt-0 mr-6 text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </div>
          
          <div class="flex-grow pr-4">
            <h3 class="text-lg md:text-[19px] font-medium text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors leading-snug">
              {{ doc.title }}
            </h3>
            <p class="text-sm text-[#86868b] mt-1.5 font-normal">
              เอกสาร PDF • ขนาด 245 KB
            </p>
          </div>

          <div class="hidden md:flex flex-shrink-0 items-center text-[#0071e3] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span class="text-sm font-medium mr-1">ดาวน์โหลด</span>
            <span class="text-lg leading-none">›</span>
          </div>
        </a>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface DocumentItem {
  id: number;
  title: string;
  fileUrl: string;
}

// Mock Data
const documents = ref<DocumentItem[]>([
  {
    id: 1,
    title: 'UBCH EC 012/2022 ขอยกเว้นค่าธรรมเนียมการพิจารณารับรองจริยธรรมการวิจัยในมนุษย์',
    fileUrl: '#'
  },
  {
    id: 2,
    title: 'UBCH EC 011/2022 ขอต่ออายุโครงการวิจัย',
    fileUrl: '#'
  },
  {
    id: 3,
    title: 'UBCH EC 010/2022 ขอปรับปรุงแก้ไขโครงการวิจัยที่ผ่านการรับรองจากคณะกรรมการจริยธรรมการวิจัยในมนุษย์',
    fileUrl: '#'
  },
  {
    id: 4,
    title: 'UBCH EC 009/2022 ขอเสนอโครงการวิจัยเพื่อขอรับการพิจารณาจริยธรรมการวิจัยในมนุษย์ ฉบับแก้ไข',
    fileUrl: '#'
  },
  {
    id: 5,
    title: 'UBCH EC 008/2022 ขอเสนอโครงการวิจัยเพื่อขอรับการพิจารณาจริยธรรมการวิจัยในมนุษย์ (สำหรับหน่วยงานภายใน)',
    fileUrl: '#'
  },
  {
    id: 6,
    title: 'UBCH EC 007/2022 ขอเสนอโครงการวิจัยเพื่อขอรับการพิจารณาจริยธรรมการวิจัยในมนุษย์ (สำหรับหน่วยงานภายนอก)',
    fileUrl: '#'
  },
  {
    id: 7,
    title: 'UBCH EC 006/2022 แบบเสนอโครงการวิจัยเพื่อขอรับการพิจารณาจริยธรรมการวิจัย จากคณะกรรมการจริยธรรมการวิจัยในมนุษย์ โรงพยาบาลมะเร็งอุบลราชธานี',
    fileUrl: '#'
  }
]);
</script>

<style scoped>
/* นำเข้าฟอนต์ Kanit */
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap');

.font-sans {
  font-family: 'Kanit', sans-serif !important;
}
</style>