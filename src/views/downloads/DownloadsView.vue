<template>
  <div class="max-w-6xl mx-auto p-6 font-sans">
    <AppBreadcrumb :items="breadcrumbList" class="mb-6" />
    
    <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">ดาวน์โหลดเอกสาร</h1>
        <p class="text-gray-500 mt-1">เอกสารและแบบฟอร์มที่เกี่ยวข้องกับการรับรองจริยธรรมการวิจัยในมนุษย์</p>
      </div>

      <div class="relative w-full md:w-80">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="ค้นหาชื่อเอกสาร..."
          class="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none text-sm"
          v-model="searchQuery"
        />
      </div>
    </div>

    <div v-if="filteredCategories.length > 0" class="flex flex-col gap-8">
      <div 
        v-for="category in filteredCategories" 
        :key="category.id" 
        class=" border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-gradient-to-br from-[#d1e7f3] to-[#fffff]"
      >
        <div class="bg-slate-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <h2 class="text-lg font-bold text-gray-700">{{ category.name }}</h2>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50/50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-7/12">ชื่อเอกสาร</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-2/12">ประเภท / ขนาด</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/12">อัปเดตล่าสุด</th>
                <th scope="col" class="px-6 py-3 class text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-2/12">ดาวน์โหลด</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="doc in category.documents" 
                :key="doc.id"
                class="hover:bg-slate-50/80 transition-colors"
              >
                <td class="px-6 py-4">
                  <div class="flex items-start gap-3">
                    <span :class="['p-2 rounded-lg text-white mt-0.5 shrink-0', doc.type === 'pdf' ? 'bg-red-500' : 'bg-blue-500']">
                      <span v-if="doc.type === 'pdf'" class="text-xs font-bold uppercase">PDF</span>
                      <span v-else class="text-xs font-bold uppercase">DOC</span>
                    </span>
                    <div>
                      <p class="text-sm font-medium text-gray-900 leading-snug">{{ doc.title }}</p>
                      <p class="text-xs text-gray-400 mt-0.5" v-if="doc.code">รหัสเอกสาร: {{ doc.code }}</p>
                    </div>
                  </div>
                </td>
                
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span class="uppercase font-medium">{{ doc.type }}</span> ({{ doc.size }})
                </td>
                
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {{ doc.updatedAt }}
                </td>
                
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <a 
                    :href="doc.downloadUrl" 
                    download
                    class="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-xs font-semibold transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    ดาวน์โหลด
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-16 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-500">
      <svg class="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
       ไม่พบเอกสารที่ตรงกับคำว่า "{{ searchQuery }}"
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AppBreadcrumb from '@/components/AppBreadcrumb.vue';

// ข้อมูลเมนูสำหรับ Breadcrumb
const breadcrumbList = ref([
//   { name: 'หน้าแรก', path: '/' },
  { name: 'ดาวน์โหลดเอกสาร' }
]);

const searchQuery = ref('')

// ข้อมูลสมมติของกลุ่มเอกสารจริยธรรมวิจัยในมนุษย์
const documentCategories = ref([
  {
    id: 1,
    name: '',
    documents: [
      { id: 101, title: 'แบบเสนอโครงการวิจัยเพื่อขอรับการพิจารณาจริยธรรมในมนุษย์ (AF 01-01)', code: 'AF 01-01/V3', type: 'docx', size: '124 KB', updatedAt: '12 ม.ค. 2026', downloadUrl: '/files/af-01-01.docx' },
      { id: 102, title: 'เอกสารชี้แจงผู้เข้าร่วมการวิจัย / ผู้ให้ข้อมูล (Participant Information Sheet)', code: 'AF 02-01/V2', type: 'docx', size: '98 KB', updatedAt: '20 ก.พ. 2026', downloadUrl: '/files/af-02-01.docx' },
      { id: 103, title: 'หนังสือแสดงเจตนายินยอมเข้าร่วมการวิจัย (Informed Consent Form)', code: 'AF 03-01/V2', type: 'pdf', size: '1.2 MB', updatedAt: '20 ก.พ. 2026', downloadUrl: '/files/af-03-01.pdf' },
    ]
   },
//   {
//     id: 2,
//     name: '2. แบบฟอร์มระหว่างการดำเนินการวิจัย (Progress / Amendment)',
//     documents: [
//       { id: 201, title: 'แบบรายงานความก้าวหน้าโครงการวิจัยประจำปี (Progress Report Form)', code: 'AF 04-02', type: 'docx', size: '85 KB', updatedAt: '05 มี.ค. 2026', downloadUrl: '/files/af-04-02.docx' },
//       { id: 202, title: 'แบบขอแก้ไขเพิ่มเติมโครงการวิจัย (Amendment Request Form)', code: 'AF 05-02', type: 'docx', size: '110 KB', updatedAt: '15 มี.ค. 2026', downloadUrl: '/files/af-05-02.docx' },
//     ]
//   },
//   {
//     id: 3,
//     name: '3. คู่มือและแนวทางปฏิบัติ (Guidelines)',
//     documents: [
//       { id: 301, title: 'คู่มือการยื่นขอรับการพิจารณาจริยธรรมการวิจัยในมนุษย์ สำหรับนักวิจัย', code: 'GUIDE-01', type: 'pdf', size: '3.4 MB', updatedAt: '01 ม.ค. 2026', downloadUrl: '/files/guide-01.pdf' },
//     ]
//   }
])

// ฟังก์ชันค้นหาและกรองเอกสาร (กรองจากชื่อ และ รหัสเอกสาร)
const filteredCategories = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  
  if (!query) return documentCategories.value

  return documentCategories.value
    .map(category => {
      // ค้นหาเอกสารข้างในที่ตรงกับคำค้นหา
      const matchedDocs = category.documents.filter(doc => 
        doc.title.toLowerCase().includes(query) || 
        (doc.code && doc.code.toLowerCase().includes(query))
      )
      // คืนค่าหมวดหมู่ที่มีเฉพาะเอกสารที่ค้นหาเจอ
      return {
        ...category,
        documents: matchedDocs
      }
    })
    // กรองเอาหมวดหมู่ที่มีเอกสารหลงเหลืออยู่เท่านั้น (หมวดหมู่ไหนไม่มีเอกสารที่ตรงเลย ให้ซ่อนไป)
    .filter(category => category.documents.length > 0)
})
</script>