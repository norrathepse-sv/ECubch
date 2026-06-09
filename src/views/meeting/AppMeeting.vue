<template>
  <div class="min-h-screen bg-slate-50 p-4">
    <AppBreadcrumb :items="breadcrumbList" />

    <div class="max-w-5xl mx-auto mb-6 mt-10">
      <h1 class="text-2xl font-bold text-navy border-l-4 border-gold pl-4">
        ตารางการประชุมประจำปี
      </h1>
    </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
      <p class="text-gray-500 font-medium">กำลังโหลดเอกสาร...</p>
    </div>

    <MeetingSchedule
      v-else
      :year="currentYear"
      frequencyText="ทุก ๆ 2 เดือน"
      :schedule-data="myMeetings"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import MeetingSchedule from "@/components/MeetingSchedule.vue";
import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

interface Meeting {
  round: string;
  date: string;
}

const breadcrumbList = ref([{ name: "ตารางการประชุมคณะกรรมการฯ" }]);
const myMeetings = ref<Meeting[]>([]);
const isLoading = ref(true); // 1. กำหนดสถานะเริ่มต้นเป็น true

const currentYear = (new Date().getFullYear() + 543).toString();

const fetchMeetingsData = async () => {
  isLoading.value = true; // 2. เริ่มโหลด
  try {
    const response = await axios.get("http://10.180.10.71:8000/api/meetings");
    myMeetings.value = response.data;
  } catch (error) {
    console.error("ไม่สามารถดึงข้อมูลการประชุมได้:", error);
  } finally {
    isLoading.value = false; // 3. โหลดเสร็จแล้วปิดสถานะ
  }
};

onMounted(() => {
  fetchMeetingsData();
});
</script>
