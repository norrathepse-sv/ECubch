<template>
  <div 
    :class="['rounded-[0rem] p-10 md:p-16 flex flex-col items-center text-center overflow-hidden transition-all duration-500 hover:scale-[1.01]', bgColor, textColor]"
  >
    <div class="z-10 mb-8">
      <h2 class="text-3xl md:text-5xl font-bold tracking-tight mb-3">{{ title }}</h2>
      <p class="text-lg md:text-xl font-normal opacity-80">{{ subtitle }}</p>
    </div>

    <div class="flex gap-3 z-10 mb-10">
      <button class="bg-[#0071e3] hover:bg-[#0077ED] text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
        ดูเพิ่มเติม
      </button>
      <button v-if="hasSecondaryBtn" class="bg-transparent border border-[#0071e3] text-[#0071e3] hover:bg-[#0071e3] hover:text-white px-6 py-2 rounded-full text-sm font-medium transition-colors">
        ดาวน์โหลด
      </button>
    </div>

    <div class="w-full mt-auto relative">
      <slot name="visual"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle: string;
  bgColor: string;
  textColor: string;
  hasSecondaryBtn?: boolean;
}>();
</script>