<template>
  <nav class="absolute top-0 left-0 w-full z-50 bg-navy backdrop-blur-md border-b border-white/10 text-white">
    <div class="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center">
      
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-white/20 rounded-md flex items-center justify-center text-[10px]">
          <img src="/images/logoUBCH.png" alt="UBCH Logo" class="w-full h-full object-contain">
        </div>
        <div class="leading-tight hidden sm:block">
          <h1 class="text-md font-bold tracking-wide">คณะกรรมการจริยธรรมการวิจัยในมนุษย์</h1>
          <p class="text-[14px] text-slate-300">โรงพยาบาลมะเร็งอุบลราชธานี</p>
        </div>
      </div>
      
      <button 
        @click="toggleMenu" 
        class="lg:hidden text-white hover:text-gold focus:outline-none transition"
      >
        <svg v-if="!isMenuOpen" class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <svg v-else class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <div class="hidden lg:flex items-center gap-6 text-md font-medium">
        <router-link to="/" class="text-gold border-b-2 border-gold pb-1 hover:text-gold transition">
          หน้าแรก
        </router-link>
        
        <div class="relative group cursor-pointer py-2">
          <div class="flex items-center gap-1 hover:text-gold transition">
            เกี่ยวกับหน่วยงาน
            <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          <div class="absolute left-0 top-full mt-0 w-max bg-white text-slate-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all duration-300 overflow-hidden">
            <!-- <router-link to="/about/history" class="block px-4 py-2 whitespace-nowrap hover:bg-slate-100 hover:text-gold transition">
              ประวัติความเป็นมา
            </router-link> -->
            <router-link to="/about/app-org-chart" class="block px-4 py-2 whitespace-nowrap hover:bg-slate-100 hover:text-gold transition border-t border-slate-100">
              โครงสร้างการบริหารภายในโรงพยาบาลมะเร็งอุบลราชธานี
            </router-link>
            <router-link to="/about/app-object-second" class="block px-4 py-2 whitespace-nowrap hover:bg-slate-100 hover:text-gold transition border-t border-slate-100">
              โครงสร้างการบริหารภายในคณะกรรมการจริยธรรมการวิจัยในมนุษย์
            </router-link>
          </div>
        </div>
        
               <div class="relative group cursor-pointer py-2">
          <div class="flex items-center gap-1 hover:text-gold transition">
            มาตรฐานงานวิจัย
            <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          <div class="absolute left-0 top-full mt-0 w-max bg-white text-slate-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all duration-300 overflow-hidden">
            <!-- <router-link to="/about/history" class="block px-4 py-2 whitespace-nowrap hover:bg-slate-100 hover:text-gold transition">
              ประวัติความเป็นมา
            </router-link> -->
            <router-link to="/about/app-org-chart" class="block px-4 py-2 whitespace-nowrap hover:bg-slate-100 hover:text-gold transition border-t border-slate-100">
              SOPs
            </router-link>
            <router-link to="/meeting/app-meeting-list" class="block px-4 py-2 whitespace-nowrap hover:bg-slate-100 hover:text-gold transition border-t border-slate-100">
              กำหนดการประชุมคณะกรรมการฯ
            </router-link>
          </div>
        </div>
        <router-link to="/procedures" class="hover:text-gold transition">
          ขั้นตอนการดำเนินงาน
        </router-link>
        <router-link to="/contact" class="hover:text-gold transition">
          ติดต่อเรา
        </router-link>
        <router-link to="/login" class="bg-gold hover:bg-gold-hover text-navy px-5 py-2 rounded font-bold transition shadow-md">
          Login
        </router-link>
      </div>
    </div>

    <div 
      v-show="isMenuOpen" 
      class="lg:hidden absolute top-full left-0 w-full bg-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg"
    >
      <div class="flex flex-col px-6 py-4 gap-4 text-md font-medium">
        <router-link to="/" @click="closeMenu" class="hover:text-gold transition">
          หน้าแรก
        </router-link>
        
        <div class="flex flex-col gap-2">
          <button @click="toggleMobileAbout" class="flex items-center justify-between w-full hover:text-gold transition text-left">
            เกี่ยวกับหน่วยงาน
            <svg :class="{'rotate-180': isMobileAboutOpen}" class="w-4 h-4 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <div v-show="isMobileAboutOpen" class="flex flex-col gap-3 pl-4 mt-2 border-l-2 border-white/20 text-[14px]">
            <!-- <router-link to="/about/history" @click="closeMenu" class="hover:text-gold transition">
              ประวัติความเป็นมา
            </router-link> -->
            <router-link to="/about/app-org-chart" @click="closeMenu" class="hover:text-gold transition">
              โครงสร้างการบริหารภายในฯ
            </router-link>
            <router-link to="/about/app-object-second" @click="closeMenu" class="hover:text-gold transition">
              โครงสร้างการบริหารภายในคณะกรรมการฯ
            </router-link>
          </div>
        </div>

        <router-link to="/standards" @click="closeMenu" class="hover:text-gold transition">
          มาตรฐานงานวิจัย
        </router-link>
        <router-link to="/procedures" @click="closeMenu" class="hover:text-gold transition">
          ขั้นตอนการดำเนินงาน
        </router-link>
        <router-link to="/contact" @click="closeMenu" class="hover:text-gold transition">
          ติดต่อเรา
        </router-link>
        <router-link to="/login" @click="closeMenu" class="bg-gold text-navy py-2 rounded font-bold text-center mt-2 shadow-md">
          Login
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// State สำหรับควบคุมการเปิด/ปิดเมนูหลักบนมือถือ
const isMenuOpen = ref(false)

// State สำหรับควบคุมเมนูย่อย (Dropdown) "เกี่ยวกับหน่วยงาน" บนมือถือ
const isMobileAboutOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleMobileAbout = () => {
  isMobileAboutOpen.value = !isMobileAboutOpen.value
}

// ฟังก์ชันปิดเมนูทั้งหมดเมื่อกดเลือกลิงก์ (เพิ่ม UX ที่ดีบนมือถือ)
const closeMenu = () => {
  isMenuOpen.value = false
  isMobileAboutOpen.value = false
}
</script>