<template>
  <div class="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-10 animate-fade-in-up">
        <span
          class="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest rounded-full mb-4"
        >
          Document Center
        </span>
        <h1 class="text-3xl md:text-4xl font-extrabold text-navy mb-4">ดาวน์โหลดเอกสาร</h1>
        <p class="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
          เอกสารและแบบฟอร์มที่เกี่ยวข้องกับการรับรองจริยธรรมการวิจัยในมนุษย์
          <br class="hidden md:block" />
          ฉบับปรับปรุงล่าสุด สำหรับนักวิจัยและผู้ที่เกี่ยวข้อง
        </p>
      </div>

      <div
        class="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden animate-fade-in-up"
        style="animation-delay: 150ms"
      >
        <div
          class="p-6 md:px-8 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <h3 class="text-lg font-bold text-navy hidden md:block">รายการเอกสารทั้งหมด</h3>

          <div class="relative w-full md:w-80">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="ค้นหาชื่อ หรือรหัสเอกสาร..."
              class="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-navy focus:border-transparent focus:outline-none text-sm transition-shadow"
            />
          </div>
        </div>

        <div class="min-h-[300px]">
          <div v-if="isLoading" class="flex flex-col items-center justify-center py-24">
            <div class="animate-spin rounded-full h-10 w-10 border-b-4 border-navy mb-4"></div>
            <p class="text-slate-500 font-medium">กำลังโหลดเอกสาร...</p>
          </div>

          <div v-else-if="filteredDocuments.length > 0" class="flex flex-col">
            <div
              v-for="doc in filteredDocuments"
              :key="doc.id"
              class="group flex flex-col md:flex-row md:items-center justify-between gap-5 p-6 md:px-8 border-b border-slate-100 hover:bg-slate-50/80 transition-all duration-200 last:border-0"
            >
              <div class="flex items-start gap-4 md:gap-5 w-full md:w-8/12">
                <div
                  :class="[
                    'flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 text-white shadow-sm',
                    doc.type === 'pdf' ? 'bg-rose-500' : 'bg-navy',
                  ]"
                >
                  <span class="text-[11px] font-black uppercase tracking-widest">{{
                    doc.type
                  }}</span>
                </div>

                <div>
                  <h4
                    class="text-base font-bold text-navy group-hover:text-gold transition-colors leading-snug"
                  >
                    {{ doc.title }}
                  </h4>

                  <div
                    class="flex flex-wrap items-center gap-3 mt-2.5 text-xs text-slate-500 font-medium"
                  >
                    <span
                      v-if="doc.code"
                      class="bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase"
                    >
                      {{ doc.code }}
                    </span>

                    <span class="flex items-center gap-1.5">
                      <svg
                        class="w-3.5 h-3.5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                        />
                      </svg>
                      {{ doc.size }}
                    </span>

                    <span class="hidden sm:inline text-slate-300">•</span>

                    <span class="flex items-center gap-1.5">
                      <svg
                        class="w-3.5 h-3.5 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      อัปเดต {{ doc.updatedAt }}
                    </span>
                  </div>
                </div>
              </div>

              <div class="shrink-0 w-full md:w-auto mt-2 md:mt-0 pl-16 md:pl-0">
                <a
                  :href="doc.downloadUrl"
                  download
                  class="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white border-2 border-navy/10 hover:border-navy hover:bg-navy text-navy hover:text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2.5"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  ดาวน์โหลด
                </a>
              </div>
            </div>
          </div>

          <div
            v-else-if="searchQuery.length > 0"
            class="flex flex-col items-center justify-center py-24 text-center px-6"
          >
            <div
              class="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4"
            >
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-navy mb-1">ไม่พบเอกสารที่คุณค้นหา</h3>
            <p class="text-slate-500 text-sm">
              ไม่มีเอกสารที่ตรงกับคำว่า <span class="font-bold text-navy">"{{ searchQuery }}"</span>
            </p>
            <button
              @click="searchQuery = ''"
              class="mt-4 text-gold hover:text-navy font-bold text-sm underline underline-offset-4 transition-colors"
            >
              ล้างการค้นหา
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const breadcrumbList = ref([{ name: "ดาวน์โหลดเอกสาร" }]);
const searchQuery = ref("");
const documents = ref<any[]>([]);
const isLoading = ref(true);

const fetchDocuments = async () => {
  try {
    const response = await axios.get("http://10.180.10.71:8000/api/documents-all");
    documents.value = response.data;
  } catch (error) {
    console.error("โหลดเอกสารไม่สำเร็จ:", error);
  } finally {
    isLoading.value = false; // ปิด Loading เสมอไม่ว่าจะสำเร็จหรือล้มเหลว
  }
};

const filteredDocuments = computed(() => {
  if (!searchQuery.value) return documents.value;
  return documents.value.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

onMounted(() => {
  fetchDocuments();
});
</script>
