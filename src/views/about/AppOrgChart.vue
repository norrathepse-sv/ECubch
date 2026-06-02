<template>
  <div class="min-h-screen bg-slate-50 p-4 pt- md:p-8 md:py-32 font-sans relative overflow-hidden">

    <AppBreadcrumb :items="breadcrumbList" />
    
    <div class="absolute inset-0 opacity-[0.03] z-0">
      <svg width="100%" height="100%"><defs><pattern id="hexagons" width="50" height="43.3" patternUnits="userSpaceOnMap" patternTransform="scale(2)"><path d="M25 0 L50 14.4 L50 43.3 L25 57.7 L0 43.3 L0 14.4 Z" fill="none" stroke="currentColor" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#hexagons)"/></svg>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto">
      
      <header class="flex items-center justify-between pb-8 border-b border-slate-200 mb-10 relative z-30">
        <div class="flex items-center gap-4">
          <img src="/images/logoUBCH.png" alt="Hospital Logo" class="h-16 w-auto object-contain" @error="handleImageError">
          <div>
            <h1 class="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              โครงสร้างหน่วยงานโรงพยาบาลมะเร็งอุบลราชธานี
            </h1>
            <p class="text-slate-600 mt-1">Ubon Ratchathani Cancer Hospital</p>
          </div>
        </div>
        <div class="flex items-center gap-2 bg-white/50 p-2 rounded-full shadow-inner border border-slate-100">
          <div class="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold shadow">D</div>
          <div class="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold shadow">M</div>
          <div class="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold shadow">S</div>
        </div>
      </header>

      <div class="flex flex-col items-center">
        
        <div class="relative flex flex-col items-center mb-16 relative z-20">
          <div class="relative w-40 h-52 mb-5 group">
            <div class="absolute inset-0 rounded-2xl bg-gradient-to-b from-teal-400 to-teal-600 opacity-20 blur-xl group-hover:opacity-40 transition-opacity"></div>
            <img :src="`/images/portraits/${directorData.imageUrl}`" :alt="directorData.name" class="relative z-10 w-full h-full object-cover rounded-2xl border-4 border-white shadow-2xl" @error="handlePortraitError">
          </div>
          
          <div class="bg-gradient-to-r from-teal-600 to-teal-500 rounded-xl px-10 py-4 text-center shadow-lg border border-teal-400 relative z-20">
            <h3 class="text-sm font-medium text-teal-100 uppercase tracking-wide">ผู้อำนวยการโรงพยาบาลมะเร็งอุบลราชธานี</h3>
            <p class="text-xl font-bold text-white mt-1">{{ directorData.name }}</p>
          </div>

          <div class="absolute top-full left-1/2 -translate-x-1/2 h-16 w-1 bg-teal-400/40 z-0"></div>
        </div>

        <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
          
          <div class="hidden lg:block absolute -top-16 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] h-1 bg-gradient-to-r from-purple-300 via-teal-300 to-orange-300 rounded-full opacity-50 z-0"></div>

          <div v-for="mission in missions" :key="mission.id" 
               class="relative flex flex-col items-center"
               :class="mission.columnClass">
            
            <div class="relative flex flex-col items-center mb-10 w-full relative z-10">
              <div class="relative w-32 h-44 mb-4 group">
                <div class="absolute inset-0 rounded-2xl opacity-15 blur-lg transition-opacity group-hover:opacity-30" :class="`bg-${mission.color}-500`"></div>
                <img :src="`/images/portraits/${mission.deputy.imageUrl}`" :alt="mission.deputy.name" class="relative z-10 w-full h-full object-cover rounded-2xl border-4 border-white shadow-xl" @error="handlePortraitError">
              </div>

              <div class="w-full rounded-2xl shadow-lg border p-5 text-center transition-transform hover:scale-[1.02] relative z-10"
                   :class="`bg-${mission.color}-100/30 border-${mission.color}-200`">
                <p class="text-base font-semibold" :class="`text-${mission.color}-900`">{{ mission.deputy.name }}</p>
                <p class="text-sm mt-1" :class="`text-${mission.color}-800`">{{ mission.deputy.title }}</p>
              </div>

              <div class="absolute top-full left-1/2 -translate-x-1/2 h-10 w-1 opacity-50 z-0" :class="`bg-${mission.color}-400`"></div>
            </div>

            <div class="w-full rounded-2xl shadow-inner p-6 flex-grow border relative z-10"
                 :class="`bg-${mission.color}-50 border-${mission.color}-100`">
              
              <div v-if="mission.subHeader" class="text-center mb-6 py-2 px-4 rounded-lg bg-white/70 border" :class="`border-${mission.color}-200`">
                <p class="text-sm font-medium text-slate-700">{{ mission.subHeader.line1 }}</p>
                <p v-if="mission.subHeader.line2" class="text-sm text-slate-600">{{ mission.subHeader.line2 }}</p>
              </div>

              <div v-for="(group, gIndex) in mission.groups" :key="gIndex" class="mb-5 last:mb-0">
                <h4 class="text-sm font-semibold text-slate-900 border-b pb-2 mb-3" :class="`border-${mission.color}-200`">
                  {{ group.header }}
                </h4>
                
                <ul class="space-y-2.5 custom-scrollbar h-auto max-h-[350px] overflow-y-auto pr-1">
                  <li v-for="(item, iIndex) in group.items" :key="iIndex" class="text-xs text-slate-700">
                    
                    <div class="flex items-start gap-1.5 leading-relaxed hover:bg-white/50 p-1 rounded transition-colors">
                      <span class="font-medium text-slate-400 text-[10px] mt-0.5">•</span>
                      <span>{{ item.title }}</span>
                    </div>

                    <ul v-if="item.subs && item.subs.length > 0" class="pl-7 mt-1.5 space-y-1 relative">
                      <div class="absolute left-[7px] top-1 bottom-1 w-px border-l border-dotted" :class="`border-${mission.color}-200`"></div>
                      
                      <li v-for="(sub, sIndex) in item.subs" :key="sIndex" class="text-[11px] text-slate-600 flex items-center gap-1.5">
                        <span class="w-2 h-px opacity-70" :class="`bg-${mission.color}-300`"></span>
                        {{ sub }}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div class="hidden lg:block absolute -top-16 left-1/2 -translate-x-1/2 w-1 h-16 opacity-30 z-0" :class="`bg-${mission.color}-400`"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import AppBreadcrumb from '@/components/AppBreadcrumb.vue';

// 3. กำหนดชื่อเมนูที่จะให้แสดงใน Breadcrumb
const breadcrumbList = ref([
  { name: 'เกี่ยวกับหน่วยงาน' }, // ไม่มี path แปลว่ากดไม่ได้ (แค่โชว์เฉยๆ)
  { name: 'โครงสร้างการบริหารภายในคณะกรรมการ' } // ตัวสุดท้ายจะเป็นสีเข้มอัตโนมัติ
]);
// จัดการเมื่อโหลดรูปภาพไม่สำเร็จ
const imageError = ref(false);
const handleImageError = (event) => {
    imageError.value = true;
    event.target.style.display = 'none';
};

const handlePortraitError = (event) => {
    // แสดงรูป placeholder หากโหลดรูปจริงไม่สำเร็จ
    event.target.src = '/images/portraits/placeholder.jpg'; // ตรวจสอบว่ามีไฟล์นี้จริง
};

// --- DATA STRUCTURES (แก้ไขข้อมูลตรงนี้ได้เลย) ---

// 1. ข้อมูลผู้อำนวยการ (Tier 1)
const directorData = {
  name: 'นายแพทย์สิทธิชัย อาชายินดี',
  imageUrl: 'director.png', // public/images/portraits/director.png
};

// 2. ข้อมูลภารกิจ (Tier 2 & 3)
const missions = ref([
  {
    id: 'medical',
    color: 'purple',
    deputy: { name: 'พญ.ชุติวรรณ วิวัฒนาสิทธิพงศ์', title: 'รองผู้อำนวยการภารกิจด้านวิชาการและการแพทย์', imageUrl: 'deputy-1.png' },
    groups: [
      {
        header: '1. กลุ่มงานมะเร็งนรีเวช',
        items: [
        
        ]
      },
      {
        header: '2. กลุ่มงานศัลยศาสตร์',
        items: [
        
        ]
      },
      {
        header: '3. กลุ่มงานวิสัญญี',
        items: [
        
        ]
      },
      {
        header: '4. กลุ่มงานอายุรศาสตร์',
        items: [
        
        ]
      },
      {
        header: '5. กลุ่มงานเคมีบำบัด',
        items: [
        
        ]
      },
      {
        header: '6. กลุ่มงานโสต ศอ นาสิก',
        items: [
        
        ]
      },
      {
        header: '7. กลุ่มงานรังสีรักษา',
        items: [
        
        ]
      },
      {
        header: '8. กลุ่มงานรังสีวินิจฉัยและเวชศาสตร์นิวเคลียร์',
        items: [
        { title: '8.1 งานด้านรังสีร่วมรักษา', subs: [] },
        ]
      },
      {
        header: '9. กลุ่มงานพยาธิวิทยา',
        items: [
          { title: '9.1 งานบริการด่านหน้า', subs: [] },
          { title: '9.2 งานเซลล์วิทยาและชิ้นเนื้อ', subs: [] },
          { title: '9.3 งานโลหิตวิทยาและจุลทรรศนศาสตร์', subs: [] },
          { title: '9.4 งานธนาคารเลือด', subs: [] },
          { title: '9.5 งานเคมีคลินิกและภูมิคุ้มกันวิทยา', subs: [] },
          { title: '9.6 งานจุลชีววิทยา', subs: [] }
        ]
      },
      { header: '10. กลุ่มงานเวชศาสตร์ประคับประคอง', items: [] },
      { header: '11. กลุ่มงานทันตกรรม', items: [] },
      { header: '12. กลุ่มงานเภสัชกรรม', items: [] },
      { header: '13. กลุ่มงานโภชนศาสตร์', items: [] },
      { header: '14. องค์กรแพทย์', items: [] },
    ]
  },
  {
    id: 'nursing',
    color: 'green',
    deputy: { name: 'ดร.ชลิยา วามะลุน', title: 'รองผู้อำนวยการภารกิจด้านการพยาบาล', imageUrl: 'deputy-2.png' },
    // subHeader: { line1: '1. สำนักงานรองผู้อำนวยการด้านการพยาบาล' },
    groups: [
      {
        header: '1. สำนักงานรองผู้อำนวยการด้านการพยาบาล',
        items: [
          { title: '1.1 งานธุรการ', subs: [] },
          { title: '1.2 งานแผนงานและประเมินผล', subs: [] },
          { title: '1.3 งานพัฒนาคุณภาพ', subs: [] },
         
        ]
      },
      {
        header: '2. กลุ่มงานพยาบาลผู้ป่วยนอก',
        items: [
          { title: '2.1 งานการพยาบาลผู้ป่วยนอก', subs: [] },
          { title: '2.2 งานการพยาบาลผู้ป่วยนอกรังสีรักษา', subs: [] },
          { title: '2.3 งานการพยาบาลผู้ป่วยนอกเคมีบำบัด', subs: [] },
          { title: '2.4 งานการพยาบาลตรวจรักษาพิเศษ', subs: [] },
          { title: '2.5 งานการพยาบาลผู้ป่วยนอกศัลยกรรม', subs: [] },
          { title: '2.6 งานการพยาบาลรังสีร่วมรักษา', subs: [] },
          { title: '2.7 ศูนย์ประสานงานเครือข่ายการดูแลรักษาผู้ป่วยมะเร็งและรับ-ส่งต่อ', subs: [] },
          { title: '2.8 งานรับผู้ป่วยใน', subs: [] },
        ]
      },
      {
        header: '3. กลุ่มงานพยาบาลผู้ป่วยใน',
        items: [
          { title: '3.1 งานการพยาบาลหอผู้ป่วยบุษบัน', subs: [] },
          { title: '3.2 งานการพยาบาลหอผู้ป่วยบุษบง', subs: [] },
          { title: '3.3 งานการพยาบาลหอผู้ป่วยสโรชา', subs: [] },
          { title: '3.4 งานการพยาบาลหอผู้ป่วยสัตตบงกช', subs: [] },
          { title: '3.5 งานการพยาบาลหอผู้ป่วยปัทมา', subs: [] },
          { title: '3.6 งานการพยาบาลหอผู้ป่วยปทุมมาลย์', subs: [] },
          { title: '3.7 งานการพยาบาลผู้ป่วยหนัก', subs: [] },
          { title: '3.8 งานการพยาบาลผู้ป่วยผ่าตัด', subs: [] },
          { title: '3.9 งานการพยาบาลผู้ป่วยวิสัญญี', subs: [] },
          { title: '3.10 งานการพยาบาลคลินิกระงับปวด', subs: [] },
        ]
      }
      ,
      {
        header: '4. กลุ่มงานวิชาการพยาบาล',
        items: [
          { title: '4.1 งานพยาบาลป้องกันและควบคุมการติดเชื้อ', subs: [] },
          { title: '4.2 งานวิจัยและพัฒนาการพยาบาล', subs: [] },
          { title: '4.3 งานถ่ายทอดการพยาบาล', subs: [] },
          { title: '4.4 งานการพยาบาลส่งเสริมคุณภาพชีวิต', subs: [] },
          { title: '4.5 งานพยาบาลออสโตมีและแผล', subs: [] },
          { title: '4.6 งานพยาบาลประคับประคอง', subs: [] },
          { title: '4.7 งานพยาบาลดูแลต่อเนื่องที่บ้าน', subs: [] },
          { title: '4.8 งานพัฒนาคุณภาพการพยาบาล', subs: [] },
          { title: '4.9 งานพยาบาลโภชนคลินิก', subs: [] },
          { title: '4.10 งานพยาบาลให้คำปรึกษา', subs: [] },
          { title: '4.11 งานสารสนเทศและการจัดการเรียนรู้', subs: [] },
          { title: '4.12 ศูนย์ส่งเสริมมิตรภาพบำบัด', subs: [] },
          { title: '4.13 งานจ่ายกลาง', subs: [] },
        ]
      }
    ]
  },
  {
    id: 'admin',
    color: 'blue',
    deputy: { name: 'นายอรรถวิทย์ ภักดี', title: 'รองผู้อำนวยการภารกิจด้านอำนวยการ', imageUrl: 'deputy-3.png' },
    subHeader: { line1: 'สำนักงานผู้อำนวยการ', line2: 'สำนักงานรองผู้อำนวยการ' },
    groups: [
      {
        header: '1. กลุ่มงานบริหารทั่วไป',
        // *** ตัวอย่าง: ภารกิจด้านอำนวยการ ที่มีรายการย่อยซ้อนย่อย ***
        items: [
          { 
            title: '1.1 งานบริหารทั่วไป', // หัวข้อหลัก
            // รายการย่อยย่อย (Subs)
            subs: ['หมวดธุรการ', 'หมวดโทรศัพท์', 'หมวดยานยนต์', 'หมวดศูนย์เวรเปล','หมวดรักษาศพ', 'หมวดบำบัดน้ำเสีย', 'หมวดสุขาภิบาลและสิ่งแวดล้อม', 'หมวดเคหะบริการ', 'หมวดรักษาความปลอดภัย','หมวดรักษาความสะอาด'] 
          },
          { title: '1.2 งานทรัพยากรบุคคล', subs: [] },
          { title: '1.3 งานยุทธศาสตร์และแผนงาน', subs: [] }
        ]
      },
      {
        header: '2. กลุ่มงานการเงิน บัญชีและพัสดุ',
        items: [
          { title: '2.1 งานการเงิน', subs: ['หมวดสวัสดิการสังคมฯ',] },
          { title: '2.2 งานบัญชี', subs: [] },
          { title: '2.3 งานพัสดุและงานบำรุงรักษา', subs: ['หมวดพัสดุ', 'หมวดคลัง','หมวดซ่อมบำรุง','ศูนย์เครื่องมือแพทย์','หมวดซักฟอก','หมวดตัดเย็บ'] }
        ]
      }
    ]
  },
  {
    id: 'health_system',
    color: 'orange',
    deputy: { name: 'พญ.ดาริกา ดาโรจน์', title: 'รองผู้อำนวยการภารกิจด้านพัฒนาระบบสุขภาพ', imageUrl: 'darika.png' },
    groups: [
      {
        header: '1. กลุ่มงานดิจิทัลการแพทย์',
        items: [
          { title: '1.1 งานเทคโนโลยีสารสนเทศ', subs: [] }, // ตัวอย่างย่อยย่อย
          { title: '1.2 งานพัฒนาการให้รหัสโรคฯ', subs: [] },
          { title: '1.3 งานเวชระเบียนและสถิติ', subs: [] },
          { title: '1.4 งานทะเบียนมะเร็ง', subs: [] }
        ]
      },
      {
        header: '2. กลุ่มงานวิจัย ถ่ายทอดฯ',
        items: [
          { title: '2.1 งานวิจัยและประเมินเทคโนโลยี', subs: [] },
          { title: '2.2 งานโสตทัศนศึกษา', subs: [] },
          { title: '2.3 งานสนับสนุนวิชาการ', subs: [] },
          { title: '2.4 งานห้องสมุด', subs: [] },
        ]
      },
        {
        header: '3. กลุ่มงานพัฒนานโยบายฯ',
        items: [
          { title: '3.1 งานสำนักงานการแพทย์เขตสุขภาพ', subs: [] },
       
        ]
      },
        {
        header: '4. กลุ่มงานพพัฒนาคุณภาพ',
        items: [
          { title: '4.1 งานพัฒนาคุณภาพ', subs: [] },
       
        ]
      }
    ]
  }
]);
</script>

<style scoped>
/* Safelist for dynamically generated color classes (เพื่อป้องกันปัญหา Tailwind ไม่โหลดสีตอน Build)
*/
/*
bg-purple-50 bg-purple-100 bg-purple-100/30 bg-purple-300 bg-purple-400 bg-purple-500 bg-purple-600 bg-purple-900 
border-purple-100 border-purple-200 text-purple-700 text-purple-800 text-purple-900

bg-green-50 bg-green-100 bg-green-100/30 bg-green-300 bg-green-400 bg-green-500 bg-green-600 bg-green-900 
border-green-100 border-green-200 text-green-700 text-green-800 text-green-900

bg-blue-50 bg-blue-100 bg-blue-100/30 bg-blue-300 bg-blue-400 bg-blue-500 bg-blue-600 bg-blue-900 
border-blue-100 border-blue-200 text-blue-700 text-blue-800 text-blue-900

bg-orange-50 bg-orange-100 bg-orange-100/30 bg-orange-300 bg-orange-400 bg-orange-500 bg-orange-600 bg-orange-900 
border-orange-100 border-orange-200 text-orange-700 text-orange-800 text-orange-900
*/

@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap');

.font-sans {
    font-family: 'Kanit', sans-serif !important;
}

/* Custom scrollbar style */
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1; /* slate-300 */
    border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8; /* slate-400 */
}
</style>