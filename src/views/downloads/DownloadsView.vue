<template>
  <div class="max-w-6xl mx-auto p-6 font-sans">
    <AppBreadcrumb :items="breadcrumbList" class="mb-6" />

    <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-800">ดาวน์โหลดเอกสาร</h1>
        <p class="text-gray-500 mt-1">
          เอกสารและแบบฟอร์มที่เกี่ยวข้องกับการรับรองจริยธรรมการวิจัยในมนุษย์
        </p>
      </div>

      <div class="relative w-full md:w-80">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          placeholder="ค้นหาชื่อเอกสาร..."
          class="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
        />
      </div>
    </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
      <p class="text-gray-500 font-medium">กำลังโหลดเอกสาร...</p>
    </div>

    <div
      v-if="filteredDocuments.length > 0"
      class="border border-gray-200 rounded-xl shadow-sm overflow-hidden bg-white mb-16"
    >
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50/50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-7/12"
              >
                ชื่อเอกสาร
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-2/12"
              >
                ประเภท / ขนาด
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/12"
              >
                อัปเดตล่าสุด
              </th>
              <th
                class="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-2/12"
              >
                ดาวน์โหลด
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="doc in filteredDocuments"
              :key="doc.id"
              class="hover:bg-slate-50 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-start gap-3">
                  <span
                    :class="[
                      'p-2 rounded-lg text-white mt-0.5 shrink-0 text-xs font-bold uppercase',
                      doc.type === 'pdf' ? 'bg-red-500' : 'bg-blue-500',
                    ]"
                  >
                    {{ doc.type }}
                  </span>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ doc.title }}</p>
                    <p class="text-xs text-gray-400 mt-0.5" v-if="doc.code">
                      รหัสเอกสาร: {{ doc.code }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                <span class="uppercase font-medium">{{ doc.type }}</span> ({{ doc.size }})
              </td>
              <td class="px-6 py-4 text-sm text-gray-400">{{ doc.updatedAt }}</td>
              <td class="px-6 py-4 text-center">
                <a
                  :href="doc.downloadUrl"
                  download
                  class="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-xs font-semibold transition-colors"
                >
                  ดาวน์โหลด
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-else-if="searchQuery.length > 0"
      class="text-center py-16 bg-white border border-gray-200 rounded-xl shadow-sm text-gray-500"
    >
      ไม่พบเอกสารที่ตรงกับคำว่า "{{ searchQuery }}"
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
