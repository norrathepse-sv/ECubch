<template>
  <div class="min-h-screen bg-slate-50 py-32 px-4">
     <AppBreadcrumb :items="breadcrumbList" />
    <div class="max-w-4xl mx-auto mb-6">
      <h1 class="text-2xl font-bold text-navy border-l-4 border-gold pl-4">
        ตารางการประชุมประจำปี
      </h1>
    </div>

    <MeetingSchedule 
      year="2568" 
      frequencyText="ทุก ๆ 2 เดือน"
      :schedule-data="myMeetings" 
    />

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MeetingSchedule from '@/components/MeetingSchedule.vue';
import AppBreadcrumb from '@/components/AppBreadcrumb.vue';

// 3. กำหนดชื่อเมนูที่จะให้แสดงใน Breadcrumb
const breadcrumbList = ref([
  { name: 'มาตรฐานงานวิจัย' }, // ไม่มี path แปลว่ากดไม่ได้ (แค่โชว์เฉยๆ)
  { name: 'ตารางการประชุมคณะกรรมการฯ' } // ตัวสุดท้ายจะเป็นสีเข้มอัตโนมัติ
]);

// คุณสามารถเพิ่ม แก้ไข หรือลบข้อมูล วัน เดือน ปี ตรงนี้ได้เลย
const myMeetings = ref([
  { round: '1', date: '14 มีนาคม 2568' },
  { round: '2', date: '9 เมษายน 2568' },
  { round: '3', date: '17 เมษายน 2568' },
  { round: '4', date: '22 เมษายน 2568' },
  { round: '5', date: '9 มิถุนายน 2568' },
  { round: '6', date: '30 กรกฎาคม 2568' },
  { round: '7', date: '17 กันยายน 2568' },
  { round: '8', date: '19 พฤศจิกายน 2568' },
  { round: '9', date: '' },  // ถ้ายังไม่กำหนดวัน สามารถปล่อยว่างไว้ได้ จะแสดงเป็น '-'
  { round: '10', date: '' },
  { round: '11', date: '' },
  { round: '12', date: '' },
]);
</script>