<template>
  <div class="bg-gray-100 font-sans text-[#1d1d1f] selection:bg-[#0071e3] selection:text-white">
    
    <section class="pt-28 pb-16 px-4 flex flex-col items-center text-center max-w-5xl mx-auto">
      <!-- <h2 class="text-sm font-semibold tracking-widest text-[#0071e3] uppercase mb-4">
        เกี่ยวกับหน่วยงาน
      </h2> -->
      <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
        ทำดีที่สุด <br class="hidden md:block" />เพื่อทุกชีวิต.
      </h1>
      <p class="text-xl md:text-2xl text-slate-600 font-normal max-w-2xl mx-auto mb-10 leading-relaxed">
        ดำเนินการพิจารณาตามมาตรฐานสากล พร้อมทีมผู้เชี่ยวชาญให้คำปรึกษาและคำแนะนำตลอดกระบวนการ
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 items-center">
        <AppUbchEC001/>
         <ProjectStatusView/>
      </div>
    </section>

    <!-- <section class="max-w-4xl mx-auto px-4 pb-24 relative">
      <div class="relative w-full aspect-video rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 bg-white">
        <img src="/images/S__61792260.jpg" alt="UBCH Hospital" class="w-full h-full object-cover" />
      </div>
    </section> -->

  </div>
</template>

<script setup lang="ts">

import ProjectStatusView from '@/components/ProjectStatusView.vue';
import AppUbchEC001 from './AppUbchEC001.vue';
</script>
