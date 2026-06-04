<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Организованные Props
interface Slide {
  image: string;
  title?: string;
  subtitle?: string;
  altText?: string; // เพิ่ม altText เพื่อการเข้าถึงที่ดีขึ้น
}

const props = withDefaults(defineProps<{
  slides: Slide[];
  autoPlayInterval?: number; // ระยะเวลาเปลี่ยนสไลด์ (มิลลิวินาที)
}>(), {
  autoPlayInterval: 5000 // ค่าเริ่มต้น 5 วินาที
});

const currentIndex = ref(0);
// TypeScript type safety for timer
let autoPlayTimer: ReturnType<typeof setInterval> | null = null;

// --- COMPUTED UI CLASSES (Distilled from Template) ---

// Main Container
const containerClasses = 'relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-black group';

// Slider Flex Container (with dynamic transform)
const sliderFlexClasses = 'flex w-full h-full transition-transform duration-700 ease-out';

// Individual Slide
const slideItemClasses = 'w-full h-full flex-shrink-0 relative';

// Simplified Overlay Gradient (Navy to Transparent)
const overlayGradientClasses = 'absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent';

// Text Content Container
const textContentClasses = 'absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6 z-20';

// Unified Title Styles (Kanit font implied by prior setup)
const titleClasses = 'text-xl md:text-2xl lg:text-3xl font-bold tracking-tight drop-shadow-md mb-3 leading-tight';

// Unified Subtitle Styles
const subtitleClasses = 'text-lg md:text-xl font-light drop-shadow max-w-xl opacity-90';

// Navigation Buttons Base
const navButtonBaseClasses = 'absolute top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-gold text-white hover:text-navy rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-30 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2';

// Left/Prev Button
const prevButtonClasses = `${navButtonBaseClasses} left-4`;

// Right/Next Button
const nextButtonClasses = `${navButtonBaseClasses} right-4`;

// Indicators (Dots) Container
const dotsContainerClasses = 'absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30';

// Individual Dot Base
const dotBaseClasses = 'w-3 h-3 rounded-full transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-1';

// Get dot class based on active status
const getDotClasses = (index: number) => {
  return currentIndex.value === index 
    ? `${dotBaseClasses} bg-gold w-8` // Active/Active expanding
    : `${dotBaseClasses} bg-white/40 hover:bg-white`; // Inactive/Hover
};

// --- LOGIC FUNCTIONS (Simplified) ---

const pauseAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
};

const startAutoPlay = () => {
  // Ensure we don't start multiple timers and slides exist
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

// Simplified Dot Interaction
const goToSlide = (index: number) => {
  currentIndex.value = index;
};

// Handle all interactions to reset autoplay efficiently
const handleInteraction = (action: () => void) => {
  action();
  pauseAutoPlay();
  startAutoPlay();
};

// --- Lifecycle Hooks (Organized) ---

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  pauseAutoPlay();
});
</script>

<template>
  <div 
    :class="containerClasses"
    @mouseenter="pauseAutoPlay"
    @mouseleave="startAutoPlay"
    aria-roledescription="carousel"
  >
    <div 
      :class="sliderFlexClasses"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div 
        v-for="(slide, index) in slides" 
        :key="index" 
        :class="slideItemClasses"
        role="group"
        aria-roledescription="slide"
        :aria-hidden="currentIndex !== index"
      >
        <!-- <img 
          :src="slide.image" 
          :alt="slide.altText || slide.title || 'Slide Image'" 
          class="w-full h-full object-cover object-center"
        > -->
        
        <div :class="overlayGradientClasses"></div>

        <div v-if="slide.title || slide.subtitle" :class="textContentClasses">
          <h2 v-if="slide.title" :class="titleClasses" v-html="slide.title"></h2>
          <p v-if="slide.subtitle" :class="subtitleClasses">
            {{ slide.subtitle }}
          </p>
        </div>
      </div>
    </div>

    <button 
      @click="() => handleInteraction(prevSlide)" 
      :class="prevButtonClasses"
      aria-label="Previous slide"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>

    <button 
      @click="() => handleInteraction(nextSlide)" 
      :class="nextButtonClasses"
      aria-label="Next slide"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>

    <div :class="dotsContainerClasses" role="tablist">
      <button 
        v-for="(_, index) in slides" 
        :key="index"
        @click="() => handleInteraction(() => goToSlide(index))"
        :class="getDotClasses(index)"
        role="tab"
        :aria-selected="currentIndex === index"
        :aria-controls="`slide-${index}`"
        :aria-label="'Go to slide ' + (index + 1)"
      ></button>
    </div>
  </div>
</template>

<style scoped>
/* Safelist for dynamically generated color classes (to prevent Tailwind purging issues)
  Note: This list is inferred based on user theme navy/gold/purple/orange etc.
*/
/*
border-purple-200 border-green-200 border-blue-200 border-orange-200
bg-purple-100/30 bg-green-100/30 bg-blue-100/30 bg-orange-100/30
bg-purple-50/80 bg-green-50/80 bg-blue-50/80 bg-orange-50/80
text-purple-900 text-green-900 text-blue-900 text-orange-900
text-purple-800 text-green-800 text-blue-800 text-orange-800
text-purple-700 text-green-700 text-blue-700 text-orange-700
bg-purple-300 bg-green-300 bg-blue-300 bg-orange-300
bg-purple-400 bg-green-400 bg-blue-400 bg-orange-400
bg-purple-500 bg-green-500 bg-blue-500 bg-orange-500
bg-purple-600 bg-green-600 bg-blue-600 bg-orange-600
*/
/* Google Kanit font import - usually handled in index.html or styles.css but 
  kept here for component completeness if needed 
*/
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap');
</style>