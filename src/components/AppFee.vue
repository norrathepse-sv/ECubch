<template>
  <section class="py-24 bg-slate-50 relative overflow-hidden font-sans">
    
    <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-navy/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="container mx-auto px-6 max-w-6xl relative z-10">
      
      <div class="text-center mb-16 animate-fade-in-up">
        <span class="inline-block px-4 py-1 bg-navy/10 text-navy font-bold uppercase tracking-widest rounded-full mb-4 text-xs">
          Fee & Payment
        </span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-navy mb-4">หลักเกณฑ์และอัตราการเก็บค่าธรรมเนียม</h2>
        <p class="text-slate-500">การพิจารณารับรองจริยธรรมวิจัยในมนุษย์ โรงพยาบาลมะเร็งอุบลราชธานี</p>
      </div>

      <div class="space-y-16">
        
        <div class="animate-fade-in-up" style="animation-delay: 0.1s;">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-2 h-8 bg-gold rounded-full"></div>
            <h3 class="text-2xl font-bold text-navy">การพิจารณาโครงการใหม่</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col justify-center h-full group">
              <div class="text-navy font-black text-xl mb-3 group-hover:text-gold transition-colors">ยกเว้นค่าธรรมเนียม</div>
              <p class="text-sm text-slate-500">ทุนภายใน รพ. หรือมีบุคลากร รพ. ร่วมวิจัย</p>
            </div>

            <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col justify-center h-full group">
              <div class="text-navy font-black text-2xl mb-1 group-hover:text-gold transition-colors">1,000 <span class="text-base font-normal">บาท</span></div>
              <p class="text-sm text-slate-500 mt-2">ทุนจากหน่วยงานรัฐบาลภายนอก</p>
            </div>

            <div class="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col justify-center h-full group">
              <div class="text-navy font-black text-2xl mb-1 group-hover:text-gold transition-colors">1,000 <span class="text-base font-normal">บาท</span></div>
              <p class="text-sm text-slate-500 mt-2">โครงการประเภท Exemption Review</p>
            </div>

            <div class="bg-gradient-to-br from-navy to-navy-light p-8 rounded-2xl shadow-md border border-navy hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center flex flex-col justify-center h-full relative overflow-hidden group">
              <div class="absolute top-0 right-0 w-16 h-16 bg-gold/10 rounded-bl-full pointer-events-none"></div>
              <div class="text-gold font-black text-3xl mb-1 group-hover:scale-110 transition-transform">10,000 <span class="text-base font-normal text-white">บาท</span></div>
              <p class="text-sm text-slate-300 mt-2">ทุนบริษัทเอกชน <br>(ใน/ต่างประเทศ)</p>
            </div>
          </div>

          <div class="mt-6 bg-yellow-50 border-l-4 border-gold p-4 rounded-r-lg flex gap-3 items-start">
            <svg class="w-5 h-5 text-gold shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p class="text-sm text-slate-700"><span class="font-bold text-navy">หมายเหตุ:</span> กรณีไม่ได้รับทุนสนับสนุน ให้ทำหนังสือขออนุมัติยกเว้นค่าธรรมเนียมต่อผู้อำนวยการฯ</p>
          </div>
        </div>

        <div class="animate-fade-in-up" style="animation-delay: 0.2s;">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-2 h-8 bg-slate-300 rounded-full"></div>
            <h3 class="text-2xl font-bold text-navy">การพิจารณาโครงการต่อเนื่อง</h3>
          </div>
          
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <p class="text-slate-600 font-medium">การต่ออายุการรับรอง, ปรับเปลี่ยนโครงการ หรือรายงานไม่พึงประสงค์ (SAE)</p>
            <span class="bg-green-100 text-green-700 px-6 py-2 rounded-full font-bold text-sm whitespace-nowrap border border-green-200">ไม่มีค่าธรรมเนียม</span>
          </div>
        </div>

        <div class="animate-fade-in-up" style="animation-delay: 0.3s;">
          <div class="flex items-center gap-4 mb-8">
            <div class="w-2 h-8 bg-navy rounded-full"></div>
            <h3 class="text-2xl font-bold text-navy">ช่องทางการชำระเงิน</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-gold/50 transition-colors">
              <div class="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg class="w-32 h-32 text-navy" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.64-2.25 1.64-1.74 0-2.1-.96-2.17-1.92H8c.07 1.69.98 2.91 2.9 3.29V19h2.33v-1.64c1.64-.32 2.88-1.22 2.88-2.93 0-2.02-1.71-2.68-3.8-3.29z"/></svg>
              </div>
              <h4 class="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <span class="bg-navy text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                ชำระด้วยตนเอง
              </h4>
              <p class="text-slate-600 text-sm leading-relaxed">
                งานการเงิน กลุ่มงานการเงิน บัญชี และพัสดุ <br>
                ชั้น 6 อาคารอำนวยการผู้ป่วยนอกฯ
              </p>
            </div>

            <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-gold/50 transition-colors">
              <div class="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg class="w-32 h-32 text-navy" fill="currentColor" viewBox="0 0 24 24"><path d="M4 10h3v7H4zM10.5 10h3v7h-3zM2 19h20v3H2zM17 10h3v7h-3zM12 1L2 6v2h20V6z"/></svg>
              </div>
              <h4 class="text-lg font-bold text-navy mb-4 flex items-center gap-2">
                <span class="bg-gold text-navy w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                โอนผ่านธนาคาร
              </h4>
              <p class="text-slate-600 text-sm mb-4">ธนาคารกรุงไทย สาขาถนนชยางกูร</p>
              
              <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div class="text-xs text-slate-500 mb-1">เลขที่บัญชี:</div>
                <div class="text-xl font-black text-navy tracking-wider mb-2">321-0-25471-0</div>
                <div class="text-xs text-slate-500 mb-1">ชื่อบัญชี:</div>
                <div class="text-sm font-bold text-navy">กองทุนสวัสดิการกรมการแพทย์</div>
              </div>
            </div>

          </div>
          
          <div class="mt-8 text-center">
            <p class="inline-block bg-white px-6 py-3 rounded-full shadow-sm border border-slate-200 text-sm font-medium text-slate-600">
              <span class="text-red-500 mr-2">*</span>แนบใบเสร็จหรือหลักฐานการโอนเงินส่งให้คณะกรรมการฯ เพื่อดำเนินการ <span class="font-bold text-navy">(ไม่คืนเงินทุกกรณี)</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>