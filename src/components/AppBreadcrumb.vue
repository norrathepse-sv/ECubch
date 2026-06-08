<template>
  <nav class="w-full max-w-6xl mx-auto mb-4 px-2 lg:px-0 z-20 relative" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-3 text-sm md:text-base font-medium">
      
      <li class="inline-flex items-center">
        <router-link to="/" class="inline-flex items-center text-slate-500 hover:text-purple-600 transition-colors">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
          </svg>
          หน้าแรก
        </router-link>
      </li>

      <li v-for="(item, index) in items" :key="index" :aria-current="index === items.length - 1 ? 'page' : undefined">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>

          <span v-if="index === items.length - 1" class="ml-1 md:ml-2 text-gray-600 font-semibold drop-shadow-sm">
            {{ item.name }}
          </span>

          <router-link v-else-if="item.path" :to="item.path" class="ml-1 md:ml-2 text-slate-500 hover:text-purple-600 transition-colors">
            {{ item.name }}
          </router-link>

          <span v-else class="ml-1 md:ml-2 text-slate-500 cursor-default">
            {{ item.name }}
          </span>
        </div>
      </li>
      
    </ol>
  </nav>
</template>

<script setup lang="ts">
// รับข้อมูล (Props) จากหน้าต่างๆ
defineProps({
  items: {
    type: Array as () => { name: string; path?: string }[],
    required: true,
    default: () => []
  }
})
</script>