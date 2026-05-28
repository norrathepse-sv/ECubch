<template>
  <nav class="absolute top-0 left-0 w-full z-50 bg-navy/80 backdrop-blur-md border-b border-white/10 text-white">
    <div class="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center">
      <div class="flex items-center gap-3">
        <!-- <div class="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center text-[10px]">  <img src="/images/Seal_of_the_Department_of_Medical_services.svg.png" alt="Logo" class="w-full h-full object-contain"></div> -->
        <div class="w-12 h-12 bg-white/20 rounded-md flex items-center justify-center text-[10px]"><img src="/images/logoUBCH.png" alt="UBCH Logo" class="w-full h-full object-contain"></div>
        <div class="leading-tight hidden sm:block">
          <h1 class="text-md font-bold tracking-wide">คณะกรรมการจริยธรรมการวิจัยในมนุษย์</h1>
          <p class="text-[14px] text-slate-300">โรงพยาบาลมะเร็งอุบลราชธานี</p>
        </div>
      </div>
      
      <div class="flex items-center gap-6 text-md font-medium">
        <a href="#" class="text-gold border-b-2 border-gold pb-1">หน้าแรก</a>
        <a href="#" class="hover:text-gold transition">เกี่ยวกับหน่วยงาน</a>
        <a href="#" class="hover:text-gold transition hidden md:inline">มาตรฐานงานวิจัย</a>
        <a href="#" class="hover:text-gold transition">ขั้นตอนการดำเนินงาน</a>
        <a href="#" class="hover:text-gold transition hidden lg:inline">ติดต่อเรา</a>
        
        <a href="/login" class="bg-gold hover:bg-gold-hover text-navy px-5 py-2 rounded font-bold transition shadow-md">
          Login
        </a>
      </div>
    </div>
  </nav>
</template>