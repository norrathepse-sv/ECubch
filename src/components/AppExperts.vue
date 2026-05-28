<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-6 text-center">
      <span class="text-xs font-bold uppercase tracking-widest text-gold bg-navy px-3 py-1 rounded-full">Meet The Experts</span>
      <h3 class="text-3xl font-extrabold text-navy mt-4 mb-12">คณะกรรมการจริยธรรมของเรา</h3>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div v-for="member in members" :key="member.id" class="group">
          <div class="aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden mb-3 border border-slate-200 group-hover:shadow-md transition">
            <div class="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">👤 ภาพถ่าย</div>
          </div>
          <h4 class="font-bold text-navy text-sm">{{ member.name }}</h4>
          <p class="text-xs text-slate-500 mt-0.5">{{ member.role }}</p>
        </div>
      </div>

      <div class="mt-12 bg-navy text-white p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 text-left">
        <div>
          <h4 class="text-xl font-bold">เริ่มต้นโครงการวิจัยของคุณวันนี้</h4>
          <p class="text-xs text-slate-400 mt-1">ยื่นคำขอรับรองทางระบบจริยธรรมออนไลน์ได้ทันที ตลอด 24 ชั่วโมง</p>
        </div>
        <button class="bg-gold hover:bg-gold-hover text-navy font-bold py-3 px-6 rounded text-sm transition shrink-0 shadow-md">
          ส่งโครงการวิจัยเพื่อพิจารณา
        </button>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import type { CommitteeMember } from '@/types';

const members: CommitteeMember[] = [
  { id: 1, name: 'ศ.ดร.นพ. สมชาย รักดี', role: 'ประธานคณะกรรมการ' },
  { id: 2, name: 'ดร.ญ. สมศรี เรียนรู้', role: 'รองประธานคณะกรรมการ' },
  { id: 3, name: 'นพ. วิชัย เก่งกาจ', role: 'กรรมการผู้ทรงคุณวุฒิ' },
  { id: 4, name: 'ภญ. พรทิพย์ สุขใจ', role: 'เลขานุการคณะกรรมการ' },
];
</script>