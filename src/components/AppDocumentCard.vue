<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-gold/50 transition-all duration-300 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 group">
    
    <div class="flex-shrink-0">
      <div v-if="fileType === 'pdf'" class="w-12 h-12 bg-red-50 text-red-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 9h1.5m1.5 0H15m-4.5 4h.01M9 17h6"></path>
        </svg>
      </div>
      <div v-else-if="fileType === 'word'" class="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
      <div v-else class="w-12 h-12 bg-slate-100 text-slate-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
        <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      </div>
    </div>

    <div class="flex-grow">
      <h3 class="text-navy font-semibold text-lg leading-tight group-hover:text-gold-hover transition-colors">
        {{ title }}
      </h3>
      <p v-if="description" class="text-slate-500 text-[14px] mt-1">
        {{ description }}
      </p>
      
      <div class="flex items-center gap-4 mt-2 text-[13px] text-slate-400 font-medium">
        <span class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
          {{ fileSize }}
        </span>
        <span v-if="updatedAt" class="flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          อัปเดต: {{ updatedAt }}
        </span>
      </div>
    </div>

    <div class="flex-shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
      <a 
        :href="fileUrl" 
        download 
        class="flex items-center justify-center gap-2 w-full sm:w-auto bg-navy hover:bg-navy-light text-white px-5 py-2.5 rounded-lg font-medium transition shadow-sm hover:shadow active:scale-95"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
        </svg>
        ดาวน์โหลด
      </a>
    </div>

  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
  fileUrl: string;
  fileType?: 'pdf' | 'word' | 'excel' | 'other';
  fileSize?: string;
  updatedAt?: string;
}

withDefaults(defineProps<Props>(), {
  description: '',
  fileType: 'pdf',
  fileSize: 'ไม่ระบุขนาด',
  updatedAt: ''
});
</script>