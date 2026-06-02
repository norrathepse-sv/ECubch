<template>
  <div 
    class="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-navy group"
    @mouseenter="pauseAutoPlay"
    @mouseleave="startAutoPlay"
  >
    <div 
      class="flex w-full h-full transition-transform duration-700 ease-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div 
        v-for="(slide, index) in slides" 
        :key="index" 
        class="w-full h-full flex-shrink-0 relative"
      >
        <img 
          :src="slide.image" 
          :alt="slide.title || 'Slide Image'" 
          class="w-full h-full object-cover object-center"
        >
        
        <div class="absolute inset-0 bg-black/40 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>

        <div v-if="slide.title || slide.subtitle" class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <h2 class="text-3xl md:text-5xl font-bold tracking-wide drop-shadow-lg mb-4" v-html="slide.title"></h2>
          <p v-if="slide.subtitle" class="text-lg md:text-xl font-light drop-shadow-md max-w-2xl">
            {{ slide.subtitle }}
          </p>
        </div>
      </div>
    </div>

    <button 
      @click="prevSlide" 
      class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-gold text-white hover:text-navy rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>

    <button 
      @click="nextSlide" 
      class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-gold text-white hover:text-navy rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>

    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
      <button 
        v-for="(_, index) in slides" 
        :key="index"
        @click="goToSlide(index)"
        class="w-3 h-3 rounded-full transition-all duration-300 shadow-sm"
        :class="currentIndex === index ? 'bg-gold w-8' : 'bg-white/50 hover:bg-white'"
        :aria-label="'Go to slide ' + (index + 1)"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// โครงสร้างข้อมูลของแต่ละสไลด์
interface Slide {
  image: string;
  title?: string;
  subtitle?: string;
}

const props = withDefaults(defineProps<{
  slides: Slide[];
  autoPlayInterval?: number; // ระยะเวลาเปลี่ยนสไลด์ (มิลลิวินาที)
}>(), {
  autoPlayInterval: 5000 // ค่าเริ่มต้น 5 วินาที
});

const currentIndex = ref(0);
let autoPlayTimer: number | null = null;

// ฟังก์ชันเลื่อนไปสไลด์ถัดไป
const nextSlide = () => {
  currentIndex.value = currentIndex.value === props.slides.length - 1 ? 0 : currentIndex.value + 1;
  resetAutoPlay();
};

// ฟังก์ชันเลื่อนกลับสไลด์ก่อนหน้า
const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? props.slides.length - 1 : currentIndex.value - 1;
  resetAutoPlay();
};

// ฟังก์ชันกดเลือกสไลด์จากจุด (Dots)
const goToSlide = (index: number) => {
  currentIndex.value = index;
  resetAutoPlay();
};

// ระบบเลื่อนอัตโนมัติ
const startAutoPlay = () => {
  if (props.slides.length > 1) {
    autoPlayTimer = window.setInterval(nextSlide, props.autoPlayInterval);
  }
};

const pauseAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
};

const resetAutoPlay = () => {
  pauseAutoPlay();
  startAutoPlay();
};

// เริ่มต้นและทำลาย Timer เมื่อเปิด/ปิด Component
onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  pauseAutoPlay();
});
</script>