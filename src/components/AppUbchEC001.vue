<template>
  <button 
    @click="isPdfOpen = true"
    class="bg-[#0071e3] hover:bg-[#0077ED] text-white text-base  md:text-xl font-light py-3 px-8 rounded-full transition-colors hover:cursor-pointer group flex items-center"
  >
    ขั้นตอนการขอจริยธรรมการวิจัยในมนุษย์
  </button>

  <Teleport to="body">
    <div v-if="isPdfOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/50 backdrop-blur-sm transition-opacity">
      <div class="bg-white rounded-[2rem] shadow-2xl w-full max-w-5xl h-[85vh] overflow-hidden relative flex flex-col">
        
        <div class="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 class="text-lg font-semibold text-[#1d1d1f]">ขั้นตอนการขอรับรอง (PDF)</h3>
          <button 
            @click="isPdfOpen = false" 
            class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>

        <div class="flex-grow w-full h-full bg-gray-100">
          <iframe 
            :src="pdfUrl" 
            class="w-full h-full" 
            type="application/pdf"
          ></iframe>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isPdfOpen = ref(false);

// ใส่ URL ของไฟล์ PDF ของคุณที่นี่
const pdfUrl = '/docs/UBCHEC0012022a.pdf'; 
</script>