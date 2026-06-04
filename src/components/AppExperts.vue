<template>
  <div class=" py-6 px-4 md:px-6">
    <div class="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      
      <GridCard 
        title="ผลงานวิจัย"
        subtitle="รวมผลงานจากงานวิจัยที่ผ่านการรับรองจริยธรรมจากคณะกรรมการจริยธรรมการวิจัยในมนุษย์ โรงพยาบาลมะเร็งอุบลราชธานี"
        bg-color="bg-[#f5f5f7]"
        text-color="text-[#1d1d1f]"
      >
        <template #visual>
          <!-- <img src="/images/your-mac-ipad.png" class="mx-auto w-[80%] hover:translate-y-[-10px] transition-transform duration-500" /> -->
        </template>
      </GridCard>

      <GridCard 
        title="ดาวน์โหลดเอกสาร"
        subtitle="เอกสารที่เกี่ยวข้องกับการรับรองจริยธรรมการวิจัยในมนุษย์ โรงพยาบาลมะเร็งอุบลราชธานี"
        bg-color="bg-[#f5f5f7]"
        text-color="text-[#1d1d1f]"
       
      >
        <template #visual>
          <!-- <img src="/images/macbook-neo.png" class="mx-auto w-[80%]" /> -->
        </template>
      </GridCard>

      <GridCard 
        title="มาตรฐานการปฏิบัติงาน"
        subtitle="(Standard Operating Procedures) ฉบับที่ 3"
        bg-color="bg-gradient-to-br from-[#d1e7f3] to-[#b3d7ee]"
        text-color="text-[#1d1d1f]"
        :has-secondary-btn="true"
      >
        <template #visual>
          <img src="/images/sops/SOPs.png" class="mx-auto w-[25%]" />
        </template>
      </GridCard>

      <GridCard 
        title="MacBook Pro"
        subtitle="วันนี้มาพร้อมชิป M5, M5 Pro และ M5 Max"
        bg-color="bg-[#000000]"
        text-color="text-[#ffffff]"
        :has-secondary-btn="true"
      >
        <template #visual>
          <!-- <img src="/images/macbook-pro.png" class="mx-auto w-[80%]" /> -->
        </template>
      </GridCard>

    </div>
  </div>
</template>

<script setup lang="ts">
import GridCard from '@/components/GridCard.vue';
</script>