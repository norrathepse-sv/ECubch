<template>
  <div class="py-6 px-4 md:px-6">
    <div class="max-w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <GridCard
        title="ประชุมคณะกรรมการฯ"
        subtitle="กำหนดการประชุมคณะกรรมการจริยธรรมการวิจัยในมนุษย์"
        bg-color="bg-[#f5f5f7]"
        text-color="text-[#1d1d1f]"
        primary-link="/meeting/app-meeting-list"
      >
        <!-- <template #visual>
          <img
            src="/images/Experts/books-library.jpg"
            class="mx-auto w-[50%] hover:translate-y-[-10px] transition-transform duration-500"
          />
        </template> -->
      </GridCard>

      <GridCard
        title="ดาวน์โหลดเอกสาร"
        subtitle="เอกสารที่เกี่ยวข้องกับการรับรองจริยธรรมการวิจัยในมนุษย์"
        bg-color="bg-[#f5f5f7]"
        text-color="text-[#1d1d1f]"
        primary-link="/downloads"
      >
        <!-- <template #visual>
          <img src="/images/Experts/user-group.jpg" class="mx-auto w-[50%]" />
        </template> -->
      </GridCard>

      <GridCard
        title="มาตรฐานการปฏิบัติงาน"
        subtitle="(Standard Operating Procedures) ฉบับที่ 3"
        bg-color="bg-gradient-to-br from-[#b3d7ee] to-[#ffffff]"
        text-color="text-[#1d1d1f]"
        :has-secondary-btn="false"
        primary-link="/sops"
        secondary-link="/docs/SOPsฉบับที่3.pdf"
      >
        <template #visual> </template>
      </GridCard>

      <GridCard
        title="ขั้นตอนการดำเนินงาน"
        subtitle="Examption, Expedited And Full board Review"
        bg-color="bg-[#000000]"
        text-color="text-[#ffffff]"
        primary-link="/Review"
      >
        <template #visual> </template>
      </GridCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import GridCard from "@/components/GridCard.vue";
</script>
