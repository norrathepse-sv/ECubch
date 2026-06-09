<template>
  <div class="bg-white shadow-lg border border-slate-200 rounded-xl overflow-hidden font-sans">
    
    <div class="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2 m-0">
        📄 เอกสารดาวน์โหลดที่เกี่ยวข้อง
      </h3>
      
      <button 
        @click="$emit('add')" 
        class="bg-[#004d40] hover:bg-[#00332a] text-white px-4 py-2 rounded-lg text-sm font-bold transition shadow-sm flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        เพิ่มเอกสาร
      </button>
    </div>

    <div class="p-6">
      
      <div v-if="!documents || documents.length === 0" class="text-center py-10 bg-slate-50 rounded-lg border border-dashed border-slate-300 text-slate-500 italic">
        ยังไม่มีเอกสารในระบบ
      </div>

      <div v-else class="flex flex-col gap-3">
        <div 
          v-for="doc in documents" 
          :key="doc.id" 
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-slate-200 rounded-lg hover:border-[#004d40] hover:bg-teal-50/30 transition duration-200 group"
        >
          <div class="flex items-center gap-4 mb-4 sm:mb-0 w-full sm:w-auto overflow-hidden">
            <div class="w-12 h-12 bg-teal-100 text-[#004d40] flex items-center justify-center rounded-lg shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="truncate">
              <h4 class="text-slate-800 font-bold text-base truncate">{{ doc.name }}</h4>
              <p class="text-slate-500 text-sm mt-0.5">ขนาดไฟล์: {{ doc.size }}</p>
            </div>
          </div>

          <div class="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
            <a 
              :href="doc.url" 
              download 
              class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-md text-sm font-semibold transition flex items-center gap-1"
              title="ดาวน์โหลด"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              <span class="hidden md:inline">โหลด</span>
            </a>
            
            <button 
              @click="$emit('edit', doc)" 
              class="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-md text-sm font-semibold transition"
            >
              แก้ไข
            </button>
            
            <button 
              @click="$emit('delete', doc.id)" 
              class="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-md text-sm font-semibold transition"
            >
              ลบ
            </button>
          </div>

        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
// 1. กำหนดโครงสร้างข้อมูลของเอกสาร
interface DocumentItem {
  id: number;
  name: string;
  size: string;
  url: string;
}

// 2. รับค่ารายชื่อเอกสารมาจากหน้า Dashboard
defineProps<{
  documents: DocumentItem[]
}>();

// 3. กำหนด Events ที่จะส่งกลับไปให้หน้า Dashboard เพื่อทำ CRUD
defineEmits<{
  (e: 'add'): void
  (e: 'edit', doc: DocumentItem): void
  (e: 'delete', id: number): void
}>();
</script>