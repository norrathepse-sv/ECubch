<template>
  <div class="bg-gray-100 font-sans text-[#1d1d1f] selection:bg-[#0071e3] selection:text-white">
    
    <section class="pt-28 pb-16 px-4 flex flex-col items-center text-center max-w-5xl mx-auto">
      <!-- <h2 class="text-sm font-semibold tracking-widest text-[#0071e3] uppercase mb-4">
        เกี่ยวกับหน่วยงาน
      </h2> -->
      <!-- <section class="max-w-xl mx-auto px-4 pb-12 relative">
        <div class="flex items-center justify-center gap-6 w-full h-auto py-6"> 
          
          <img src="/images/Seal_of_the_Department_of_Medical_services.svg.png" alt="Department of Medical Services" class="w-1/2 max-h-56 object-contain" />
          <img src="/images/logoUBCH.png" alt="UBCH Hospital" class="w-1/2 max-h-62 object-contain" />
          
        </div>
      </section> -->
      <h1 class="text-5xl md:text-7xl font-semibold text-navy tracking-tight mb-6 leading-tight">
       " เราจะทำดีที่สุด เพื่อทุกชีวิต "
      </h1>
      <p class="text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
        ดำเนินการพิจารณาตามมาตรฐานสากล พร้อมทีมผู้เชี่ยวชาญให้คำปรึกษาและคำแนะนำตลอดกระบวนการ
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 items-center">
        <AppUbchEC001/>
        <ProjectStatusView/>
      </div>
    </section>
    

  </div>
</template>

<script setup lang="ts">

import ProjectStatusView from '@/components/ProjectStatusView.vue';
import AppUbchEC001 from './AppUbchEC001.vue';
</script>
