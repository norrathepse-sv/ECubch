<template>
  <div class="w-full font-sans">
    <div class="bg-[#f0f4f7] py-12 px-4 md:px-8 relative">
      <AppBreadcrumb :items="breadcrumbList" class="mb-8" />

      <div class="max-w-5xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between gap-8">
          <div
            class="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
          >
            <h1 class="text-3xl md:text-4xl font-bold text-[#627a8f] mb-8">คลังข้อมูลงานวิจัย</h1>

            <div class="relative bg-white w-full max-w-lg mb-4 shadow-sm rounded-md">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
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
                placeholder="ค้นหาโครงการวิจัย, ผลงานวิจัย, นักวิจัย ฯลฯ"
                class="block w-full pl-10 pr-3 py-3 border-none rounded-md focus:ring-2 focus:ring-[#779eb8] focus:outline-none"
                v-model="searchQuery"
              />
            </div>

            <button
              class="bg-[#779eb8] hover:bg-[#5f849c] text-white font-medium px-10 py-2 rounded-md shadow-sm transition-colors mt-2"
            >
              ค้นหา
            </button>
          </div>

          <div class="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src="/images/research/research.png"
              alt="Research Illustration"
              class="max-w-full h-auto max-h-64 object-contain"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-br from-[#d1e7f3] to-[#fffff] py-12 px-4 md:px-8">
      <div class="max-w-5xl mx-auto flex flex-col gap-6">
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div
            v-for="(cat, index) in topCategories"
            :key="index"
            class="bg-white rounded-xl p-4 flex flex-col justify-between h-36 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <h3 class="text-sm font-bold text-[#374151] z-10 leading-tight w-2/3">
              {{ cat.title }}
            </h3>
            <img :src="cat.image" class="absolute bottom-0 right-0 w-20 h-20 object-contain" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- <div v-for="(cat, index) in bottomCategories" :key="index" 
               class="bg-white rounded-xl p-6 flex justify-between items-center h-32 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <h3 class="text-base font-bold text-[#374151] z-10">{{ cat.title }}</h3>
            <img :src="cat.image" class="absolute bottom-0 right-0 h-full w-auto object-contain p-2" />
          </div> -->
        </div>
      </div>
    </div>

    <div v-if="searchQuery" class="max-w-6xl mx-auto p-6 mt-8">
      <h2 class="text-xl font-bold mb-4 text-gray-800">ผลการค้นหาสำหรับ: "{{ searchQuery }}"</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

const breadcrumbList = ref([{ name: "คลังข้อมูลงานวิจัย" }]);

const searchQuery = ref("");

// ข้อมูลหมวดหมู่สำหรับแถวบน (5 กล่อง)
const topCategories = ref([
  { title: "โครงการวิจัยที่อยู่ระหว่างดำเนินการ", image: "/images/research/round-icons.png" },
  { title: "ข้อมูลผลงานวิจัย", image: "/images/research/free-to-dive.png" },
  //   { title: 'ข้อมูลนักวิจัย/ผู้เชี่ยวชาญ', image: '/images/cat-3.png' },
  //   { title: 'องค์ความรู้ด้านการวิจัยและนวัตกรรม', image: '/images/cat-4.png' },
  //   { title: 'วิทยานิพนธ์', image: '/images/cat-5.png' },
]);
</script>
