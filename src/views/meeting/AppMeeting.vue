<template>
  <div class="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-10 animate-fade-in-up">
        <span
          class="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest rounded-full mb-4"
        >
          Annual meeting schedule
        </span>
        <h1 class="text-3xl md:text-4xl font-extrabold text-navy mb-4">
          ตารางการประชุมคณะกรรมการฯ
        </h1>
        <p class="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
          กำหนดการพิจารณาจริยธรรมการวิจัยในมนุษย์ ประจำปี {{ currentYear }}
          <br
            class="hidden md:block"
          />เพื่อความสะดวกในการเตรียมเอกสารและวางแผนการยื่นขอรับการพิจารณา
        </p>
      </div>

      <div
        class="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 p-6 md:p-10 animate-fade-in-up"
        style="animation-delay: 150ms"
      >
        <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-navy mb-4"></div>
          <p class="text-slate-500 font-medium">กำลังโหลดตารางการประชุม...</p>
        </div>

        <div v-else class="animate-fade-in">
          <MeetingSchedule
            :year="currentYear"
            frequencyText="ทุก ๆ 2 เดือน"
            :schedule-data="myMeetings"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import MeetingSchedule from "@/components/MeetingSchedule.vue";
// import AppBreadcrumb from "@/components/AppBreadcrumb.vue";

interface Meeting {
  round: string;
  date: string;
}

// const breadcrumbList = ref([{ name: "ตารางการประชุมคณะกรรมการฯ" }]);
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
