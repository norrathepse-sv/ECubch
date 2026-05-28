<template>
  <section class="py-24 relative overflow-hidden bg-slate-50">
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 overflow-hidden py-10">
      
      <div class="lg:col-span-5 relative flex flex-col sm:flex-row gap-4 opacity-0 animate-slide-in-left">
        
        <div class="w-full sm:w-2/3 aspect-[4/5] bg-slate-100 rounded-2xl overflow-hidden shadow-2xl relative group cursor-pointer">
          <div class="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition duration-500 z-10"></div>
          <img src="/images/sops/SOPs.png" 
               class="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out" alt="Lab">
        </div>
        
        <div class="w-full sm:w-1/2 aspect-square bg-slate-200 rounded-2xl overflow-hidden shadow-2xl sm:absolute sm:-right-6 sm:bottom-12 border-[6px] border-white group cursor-pointer z-20">
          <img src="/images/S__61792260.jpg" 
               class="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-in-out" alt="Hospital">
        </div>
        
        <div class="absolute -left-6 -bottom-6 bg-gradient-to-br from-gold to-yellow-500 text-navy p-5 rounded-2xl shadow-[0_10px_30px_rgba(234,179,8,0.3)] text-center min-w-[140px] z-30 animate-[bounce_3s_infinite]">
          <div class="text-4xl font-black tracking-tighter">ดาวน์โหลด</div>
          <div class="text-[10px] font-extrabold tracking-widest uppercase mt-1 opacity-90">เอกสาร SOPs (ฉบับที่3)</div>
        </div>
      </div>

      <div class="lg:col-span-7 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white p-8 md:p-14 rounded-3xl shadow-2xl relative overflow-hidden border border-white/10 z-10 opacity-0 animate-slide-in-right" style="animation-delay: 0.2s;">
        
        <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 24px 24px;"></div>
        
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-gold/20 rounded-full blur-3xl pointer-events-none"></div>

        <div class="relative z-10">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-8 h-[2px] bg-gold block shadow-[0_0_8px_rgba(234,179,8,0.8)]"></span>
            <span class="text-xs font-bold uppercase tracking-widest text-gold drop-shadow-md">เกี่ยวกับหน่วยงาน</span>
          </div>
          
          <h3 class="text-3xl md:text-4xl font-extrabold mb-8 leading-tight">
            เราจะ <span class="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">"ทำดีที่สุด เพื่อทุกชีวิต"</span>
          </h3>
          
          <ul class="space-y-5 text-sm md:text-base text-slate-300 mb-10">
            <li v-for="(item, index) in listItems" :key="index" class="flex items-start gap-4 group cursor-default hover:text-white transition-colors duration-300">
              <div class="w-6 h-6 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-gold group-hover:text-navy group-hover:shadow-[0_0_15px_rgba(234,179,8,0.5)] transition-all duration-300 mt-0.5">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <span class="group-hover:translate-x-2 transition-transform duration-300">{{ item }}</span>
            </li>
          </ul>

          <button class="relative overflow-hidden group bg-gold text-navy font-bold py-3.5 px-8 rounded-full text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:-translate-y-1">
            <span class="relative z-10 flex items-center gap-2">
              ขั้นตอนการขอรับรอง
              <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <div class="absolute inset-0 bg-yellow-400 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">

const listItems = [
  'ดำเนินการพิจารณาตามมาตรฐานสากล',
  'ทีมผู้เชี่ยวชาญให้คำปรึกษาและคำแนะนำตลอดกระบวนการ'
];
</script>