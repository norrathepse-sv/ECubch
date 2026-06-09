<template>
  <div class="max-w-5xl mx-auto bg-white shadow-lg border border-slate-200 my-8 overflow-hidden text-slate-800 font-sans">
    
    <div class="bg-gray-800 text-white px-4 py-1.5 text-[12px] sm:text-[14px] font-semibold">
      UBCH EC 005/2022 ตารางการประชุมคณะกรรมการจริยธรรมการวิจัยในมนุษย์ โรงพยาบาลมะเร็งอุบลราชธานี
    </div>

    <div class="p-8 sm:p-12">
      
      <div class="text-right text-[14px] mb-6 flex flex-col items-end">
        <span>กำหนดการประชุมคณะกรรมการจริยธรรมการวิจัยในมนุษย์</span>
        <span>UBCH EC 005/2022</span>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-8 text-center">
        <div class="flex items-center gap-4">
          <img src="/images/Seal_of_the_Department_of_Medical_services.svg.png" alt="กระทรวงสาธารณสุข" class="w-20 h-20 object-contain">
          <img src="/images/logoUBCH.png" alt="UBCH" class="w-25 h-24 object-contain">
        </div>
        
        <div class="font-bold text-lg leading-relaxed">
          <h2>กำหนดการประชุมคณะกรรมการจริยธรรมการวิจัยในมนุษย์</h2>
          <h2>โรงพยาบาลมะเร็งอุบลราชธานี กรมการแพทย์</h2>
        </div>
      </div>

      <div class="text-center mb-6 text-[15px]">
        การประชุมของคณะกรรมการจริยธรรมการวิจัยในมนุษย์ โรงพยาบาลมะเร็งอุบลราชธานี 
        มีกำหนดการจัดประชุมคณะกรรมการฯ {{ frequencyText }}
      </div>

      <div class="overflow-x-auto">
        <table class="w-full border-collapse border border-slate-800 text-center">
          <thead>
            <tr class="bg-slate-50 font-bold">
              <th class="border border-slate-800 py-3 px-4 w-1/3">ประชุมครั้งที่</th>
              <th class="border border-slate-800 py-3 px-4 w-2/3">วันประชุม</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(meeting, index) in scheduleData" :key="index" class="hover:bg-slate-50 transition-colors">
              <td class="border border-slate-800 py-2.5 px-4 font-medium">
                {{ meeting.round }}/{{ year }}
              </td>
              <td class="border border-slate-800 py-2.5 px-4">
                {{ meeting.date || '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 text-[14px] font-semibold">
        หมายเหตุ: กำหนดการประชุมอาจมีการเปลี่ยนแปลงได้
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
interface Meeting {
  round: string | number; // ครั้งที่ (เช่น 1, 2, 3)
  date: string;           // วันที่ (เช่น '14 มีนาคม 2568')
}

interface Props {
  year?: string | number;        // ปี พ.ศ. ที่นำไปต่อท้ายครั้งที่ประชุม
  frequencyText?: string;        // ข้อความความถี่ เช่น 'ทุก ๆ 2 เดือน' หรือ 'ทุกเดือน'
  scheduleData: Meeting[];       // ข้อมูลตารางการประชุม
}


// กำหนดค่าเริ่มต้น (Default Props) ในกรณีที่ไม่ได้ส่งค่ามา
withDefaults(defineProps<Props>(), {
  year: 'currentYear', // ใช้ปีปัจจุบันเป็นค่าเริ่มต้น
  frequencyText: 'ทุก ๆ 2 เดือน',
  scheduleData: () => []
});
</script>