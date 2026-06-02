
<template>
  <div class="w-full max-w-5xl mx-auto py-12 px-6">
    <div class="mb-8 border-b-2 border-gold inline-block pb-2">
      <h2 class="text-2xl font-bold text-navy">ดาวน์โหลดแบบฟอร์มที่เกี่ยวข้อง</h2>
    </div>

    <div class="flex flex-col gap-4">
      <AppDocumentCard 
        v-for="(doc, index) in documents" 
        :key="index"
        :title="doc.title"
        :description="doc.description"
        :file-url="doc.url"
        :file-type="doc.type"
        :file-size="doc.size"
        :updated-at="doc.date"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import AppDocumentCard from './AppDocumentCard.vue';

// ตัวอย่างจำลองข้อมูลเอกสาร
const documents = [
  {
    title: 'แบบฟอร์มเสนอโครงการวิจัยเพื่อขอรับการพิจารณาจริยธรรม',
    description: 'สำหรับผู้วิจัยที่ต้องการยื่นขอพิจารณาจริยธรรมการวิจัยในมนุษย์ (Submission Form)',
    url: '/downloads/submission-form.docx',
    type: 'word',
    size: '125 KB',
    date: '15 พ.ค. 2567'
  },
  {
    title: 'คู่มือมาตรฐานการปฏิบัติงาน (SOP) ฉบับล่าสุด',
    description: 'เอกสารแนวทางปฏิบัติสำหรับคณะกรรมการและผู้วิจัย',
    url: '/downloads/sop-manual.pdf',
    type: 'pdf',
    size: '2.4 MB',
    date: '10 ม.ค. 2567'
  }
];
</script>