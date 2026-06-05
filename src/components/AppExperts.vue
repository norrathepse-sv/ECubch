<template>
  <div class=" py-6 px-4 md:px-6">
    <div class="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 hover:cursor-pointer">
      
      <GridCard 
        title="ผลงานวิจัย"
        subtitle="รวมผลงานจากงานวิจัยที่ผ่านการรับรอง"
        bg-color="bg-[#f5f5f7]"
        text-color="text-[#1d1d1f]"
      >
        <template #visual>

          <img src="/images/Experts/books-library.jpg" class="mx-auto w-[80%] hover:translate-y-[-10px] transition-transform duration-500" />
        </template>
      </GridCard>

      <GridCard 
        title="ดาวน์โหลดเอกสาร"
        subtitle="เอกสารที่เกี่ยวข้องกับการรับรองจริยธรรมการวิจัยในมนุษย์"
        bg-color="bg-[#f5f5f7]"
        text-color="text-[#1d1d1f]"
       
      >
      
        <template #visual>
          
          <img src="/images/Experts/documents-references.jpg" class="mx-auto w-[80%]" />
          
        </template>
      </GridCard>

      <GridCard 
        title="มาตรฐานการปฏิบัติงาน"
        subtitle="(Standard Operating Procedures) ฉบับที่ 3"
        bg-color="bg-gradient-to-br from-[#b3d7ee] to-[#fffff]"
        text-color="text-[#1d1d1f]"
        :has-secondary-btn="true"
      >
        <template #visual>
   
          <!-- <img src="/images/sops/SOPS-cover.png" class="mx-auto w-[80%] object-cover " /> -->
        </template>
      </GridCard>

      <GridCard 
        title="ขั้นตอนการดำเนินงาน"
        subtitle="Examption, Expedited And Full board Review"
        bg-color="bg-[#000000]"
        text-color="text-[#ffffff]"
      >
        <template #visual>
          <!-- <div class="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] pointer-events-none"></div>

<div class="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none"></div>

<div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none"></div>
          <img src="/images/Experts/people-drawn.jpg" class="mx-auto w-[80%]" /> -->
        </template>
      </GridCard>

    </div>
  </div>
</template>

<script setup lang="ts">
import GridCard from '@/components/GridCard.vue';
</script>