<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

interface Slide {
  image: string;
  title?: string;
  subtitle?: string;
  altText?: string;
  link?: string; // เพิ่มฟิลด์ link
}

const props = withDefaults(defineProps<{
  slides: Slide[];
  autoPlayInterval?: number;
}>(), {
  autoPlayInterval: 5000
});

const currentIndex = ref(0);
let autoPlayTimer: ReturnType<typeof setInterval> | null = null;

// --- COMPUTED STYLES สำหรับ CENTERED CAROUSEL ---

// คำนวณตำแหน่ง Transform:
// 10% แรกคือการดันให้ภาพ (ซึ่งกว้าง 80%) มาอยู่ตรงกลาง (เหลือขอบซ้ายขวาฝั่งละ 10%)
// - (currentIndex * 80%) คือการเลื่อนไปยังภาพถัดไป
const sliderTransform = computed(() => {
 return `translateX(calc(20% - ${currentIndex.value * 60}%))`;

});

// --- LOGIC FUNCTIONS ---

const pauseAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
};

const startAutoPlay = () => {
  if (!autoPlayTimer && props.slides.length > 1) {
    autoPlayTimer = setInterval(nextSlide, props.autoPlayInterval);
  }
};

const nextSlide = () => {
  if (props.slides.length === 0) return;
  currentIndex.value = (currentIndex.value + 1) % props.slides.length;
};

const prevSlide = () => {
  if (props.slides.length === 0) return;
  currentIndex.value = (currentIndex.value - 1 + props.slides.length) % props.slides.length;
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
};

const handleInteraction = (action: () => void) => {
  action();
  pauseAutoPlay();
  startAutoPlay();
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  pauseAutoPlay();
});
</script>

<template>
  <div 
    class="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-transparent space-y-4 mb-16 group flex items-center"
    @mouseenter="pauseAutoPlay"
    @mouseleave="startAutoPlay"
    aria-roledescription="carousel"
  >
    <div 
      class="flex w-full h-full transition-transform duration-700 ease-out"
      :style="{ transform: sliderTransform }"
    >
      <div 
        v-for="(slide, index) in slides" 
        :key="index" 
        class="w-[60%] h-full flex-shrink-0 px-2 md:px-4 transition-all duration-700 ease-in-out"
        :class="currentIndex === index ? 'opacity-100 scale-100' : 'opacity-40 scale-95'"
        role="group"
        :aria-hidden="currentIndex !== index"
      >
     

          <img 
            src="/images/logoUBCH.png" 
            alt="Logo" 
            class="absolute top-4 right-4 w-18 h-auto z-30 object-contain drop-shadow-md"
          >
        <div class="relative w-full h-full  overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
          <img 
            :src="slide.image" 
            :alt="slide.altText || slide.title || 'Slide Image'" 
            class="w-full h-full object-cover object-center"
          >
          
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

 <div class="absolute inset-0 flex flex-col justify-end text-left p-8 md:p-12 z-20 overflow-hidden">
  
  <h2 
    v-if="slide.title" 
    class="text-2xl md:text-4xl font-bold text-white mb-4 transform transition-all duration-700 ease-out"
    :class="currentIndex === index ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-10 opacity-0'"
    v-html="slide.title"
  ></h2>
  
  <div 
    v-if="slide.subtitle" 
    class="flex flex-col items-start gap-3 transform transition-all duration-700 ease-out"
    :class="currentIndex === index ? 'translate-y-0 opacity-100 delay-500' : 'translate-y-10 opacity-0'"
  >
    <p class="text-base md:text-lg font-light text-gray-200 leading-relaxed line-clamp-2 max-w-xl opacity-90">
      {{ slide.subtitle }}
    </p>
    
    <a 
      v-if="slide.link" 
      :href="slide.link"
      target="_blank" 
      rel="noopener noreferrer"
      class="mt-1 text-xs md:text-sm font-medium text-white hover:text-[#0071e3] border border-white hover:bg-white px-4 py-1.5 rounded-full transition-colors drop-shadow-sm w-fit"
    >
      อ่านเพิ่มเติม
    </a>
  </div>
  
</div>
        </div>
      </div>
    </div>

    <button 
      @click="() => handleInteraction(prevSlide)" 
      class="absolute top-1/2 -translate-y-1/2 left-4 w-12 h-12 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-30"
      aria-label="Previous slide"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
    </button>

    <button 
      @click="() => handleInteraction(nextSlide)" 
      class="absolute top-1/2 -translate-y-1/2 right-4 w-12 h-12 bg-black/30 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 z-30"
      aria-label="Next slide"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
    </button>

    <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-30" role="tablist">
      <button 
        v-for="(_, index) in slides" 
        :key="index"
        @click="() => handleInteraction(() => goToSlide(index))"
        class="h-2 rounded-full transition-all duration-300 shadow-sm"
        :class="currentIndex === index ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'"
        role="tab"
      ></button>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap');
</style>