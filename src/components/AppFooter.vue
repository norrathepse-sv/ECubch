<template>
  <footer class="bg-navy-dark text-slate-400 pt-16 pb-8 border-t border-white/5 text-xs">
    <div class="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
      <div class="md:col-span-1">
        <div class="flex items-center gap-2 text-white font-bold text-sm mb-4">
          <div
            class="w-20 h-20 text-navy font-black rounded flex items-center justify-center text-[10px]"
          >
            <img src="/images/logoUBCH.png" alt="UBCH Logo" class="w-full h-full object-contain" />
          </div>
          <span>UBCH RESEARCH</span>
        </div>
        <p class="leading-relaxed text-slate-500">
          คณะกรรมการจริยธรรมการวิจัยในมนุษย์ โรงพยาบาลมะเร็งอุบลราชธานี กรมการแพทย์ กระทรวงสาธารณสุข
        </p>
      </div>

      <div>
        <h4 class="text-white font-bold mb-4 text-sm border-l-2 border-gold pl-2">Quick Links</h4>
        <ul class="space-y-2.5">
          <li><a href="/downloads" class="hover:text-white transition">ดาวน์โหลดเอกสาร</a></li>
          <li>
            <a href="/meeting/app-meeting-list" class="hover:text-white transition"
              >ตารางการประชุมประจำปี</a
            >
          </li>
          <li>
            <a href="/Review" class="hover:text-white transition">ขั้นตอนการดำเนินงาน</a>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="text-white font-bold mb-4 text-sm border-l-2 border-gold pl-2">
          ที่อยู่หน่วยงาน
        </h4>
        <p class="leading-relaxed text-slate-500">
          โรงพยาบาลมะเร็งอุบลราชธานี <br />
          405 ถนนคลังอาวุธ ตำบลขามใหญ่ <br />
          อำเภอเมือง จังหวัดอุบลราชธานี 34000<br />
          โทรศัพท์: 045-319671 ถึง 3 ต่อ 7702
        </p>
      </div>

      <div>
        <h4 class="text-white font-bold mb-4 text-sm border-l-2 border-gold pl-2">วัน-เวลาทำการ</h4>
        <p class="leading-relaxed text-slate-500">
          วันจันทร์ - วันศุกร์ <br />
          เวลา 08:00 น. - 16:00 น. <br />
          (ยกเว้นวันหยุดนักขัตฤกษ์)
        </p>
      </div>
    </div>

    <div
      class="container mx-auto px-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-slate-600 gap-4"
    >
      <p>© 2026 Research UBCH. All rights reserved.</p>
      <!-- <div class="flex gap-4">
        <span class="hover:text-slate-400 cursor-pointer">Facebook</span>
        <span class="hover:text-slate-400 cursor-pointer">Line OA</span>
      </div> -->
    </div>
  </footer>
</template>
