<template>
  <div class="font-sans">
    <button 
      @click="isModalOpen = true"
      class="group inline-flex items-center text-[17px] text-[#0071e3] font-medium bg-[#f2f6f9] py-2 px-4 rounded-lg hover:bg-[#e6f0f7] transition-colors"
    >
      ตรวจสอบสถานะโครงการที่ยื่นรับรอง
      <span class="ml-1.5 text-xl leading-none group-hover:translate-x-0.5 transition-transform">›</span>
    </button>

    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm transition-opacity">
        <div class="bg-white rounded-[1.5rem] shadow-2xl w-full max-w-md overflow-hidden relative" @click.stop>
          
          <button @click="closeModal" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors">
            ✕
          </button>

          <div class="p-8">
            <h3 class="text-2xl font-bold text-[#1d1d1f] mb-2 tracking-tight">ตรวจสอบสถานะ</h3>
            <p class="text-sm text-[#86868b] mb-6">กรอกรหัสโครงการวิจัยของคุณเพื่อตรวจสอบสถานะล่าสุด</p>

            <form @submit.prevent="fetchStatus" class="flex gap-2 mb-6">
              <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="เช่น UBCH-001" 
                class="flex-1 bg-[#f5f5f7] text-[#1d1d1f] px-4 py-3 rounded-xl border border-transparent focus:border-[#0071e3] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0071e3]/10 transition-all text-sm"
                required
              />
              <button 
                type="submit" 
                :disabled="isLoading"
                class="bg-[#0071e3] hover:bg-[#0077ED] disabled:bg-[#86868b] text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-center min-w-[80px]"
              >
                <span v-if="!isLoading">ค้นหา</span>
                <svg v-else class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              </button>
            </form>

            <div v-if="searchResult" class="bg-[#f5f5f7] p-5 rounded-xl border border-[#d2d2d7]/50">
              <div v-if="searchResult.found">
                <div class="text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-1">รหัสโครงการ: {{ searchResult.data.id }}</div>
                <div class="text-[#1d1d1f] font-medium mb-3 leading-snug">{{ searchResult.data.name }}</div>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium text-slate-500">สถานะปัจจุบัน:</span>
                  <span class="px-2.5 py-1 text-xs font-bold rounded-md" :class="statusColorClass(searchResult.data.status)">
                    {{ searchResult.data.status }}
                  </span>
                </div>
              </div>
              <div v-else class="text-center text-[#ff3b30] text-sm font-medium py-2">
                ไม่พบข้อมูลโครงการนี้ในระบบ กรุณาตรวจสอบรหัสอีกครั้ง
              </div>
            </div>

          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// ตัวแปร State
const isModalOpen = ref(false);
const searchQuery = ref('');
const isLoading = ref(false);
const searchResult = ref<any>(null);

// ==========================================
// MOCK DATA (ฐานข้อมูลจำลอง)
// ==========================================
const mockDatabase = [
  { id: 'UBCH-001', name: 'การศึกษาผลกระทบของการรักษาด้วยรังสีในผู้ป่วยมะเร็งปอดระยะเริ่มต้น', status: 'อนุมัติ' },
  { id: 'UBCH-002', name: 'การพัฒนาระบบ AI เพื่อช่วยวินิจฉัยภาพถ่ายรังสีทางพยาธิวิทยา', status: 'รอพิจารณา' },
  { id: 'UBCH-003', name: 'การประเมินคุณภาพชีวิตผู้ป่วยมะเร็งเต้านมที่ได้รับเคมีบำบัดสูตรใหม่', status: 'รอแก้ไข (Major)' },
  { id: 'UBCH-004', name: 'การศึกษาพฤติกรรมการบริโภคอาหารที่มีผลต่อการเกิดมะเร็งลำไส้ใหญ่', status: 'ปิดโครงการ' }
];

const closeModal = () => {
  isModalOpen.value = false;
  searchQuery.value = '';
  searchResult.value = null;
};

// ฟังก์ชันจำลองการดึงข้อมูล (Mock Fetch)
const fetchStatus = async () => {
  if (!searchQuery.value.trim()) return;
  
  isLoading.value = true;
  searchResult.value = null;

  try {
    // 1. จำลองเวลาโหลด API (ดีเลย์ 1.5 วินาที เพื่อให้เห็น Loader หมุน)
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    // 2. ค้นหาข้อมูลจาก Mock Data
    const foundProject = mockDatabase.find(
      project => project.id.toLowerCase() === searchQuery.value.trim().toLowerCase()
    );

    // 3. กำหนดผลลัพธ์
    if (foundProject) {
      searchResult.value = { found: true, data: foundProject };
    } else {
      searchResult.value = { found: false };
    }

    /* // *** โค้ดสำหรับต่อ API จริง (ให้เอาคอมเมนต์ออกเมื่อพร้อมต่อกับ Google Sheets) ***
      // const GOOGLE_SHEET_API_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
      // const response = await fetch(`${GOOGLE_SHEET_API_URL}?id=${searchQuery.value}`);
      // const result = await response.json();
      // searchResult.value = result;
    */

  } catch (error) {
    console.error('Error fetching data:', error);
    searchResult.value = { found: false, error: true };
  } finally {
    isLoading.value = false;
  }
};

// ฟังก์ชันกำหนดสีป้ายสถานะแบบมินิมอล
const statusColorClass = (status: string) => {
  const s = status.trim().toLowerCase();
  if (s.includes('อนุมัติ') || s.includes('ผ่าน')) return 'bg-[#e3f5eb] text-[#147a42]'; // สีเขียว Apple
  if (s.includes('รอ') || s.includes('พิจารณา')) return 'bg-[#fff5d6] text-[#b87c00]';   // สีเหลืองทอง
  if (s.includes('แก้ไข')) return 'bg-[#fceeee] text-[#cc292b]';                         // สีแดง
  return 'bg-[#e5e5ea] text-[#1d1d1f]';                                                // สีเทา Default
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap');
.font-sans {
  font-family: 'Kanit', sans-serif !important;
}
</style>