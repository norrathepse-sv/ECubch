<template>
  <section class="py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 font-sans">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16 animate-fade-in">
        <h2 class="text-3xl md:text-4xl font-black text-navy mb-6 relative inline-block">
          ดาวน์โหลดขั้นตอนการดำเนินงาน
          <span class="absolute -bottom-2 left-1/4 right-1/4 h-1 bg-gold rounded-full"></span>
        </h2>
        <p class="text-slate-500 text-sm md:text-base">
          เลือกรายการเอกสารที่ต้องการดาวน์โหลด เพื่อดำเนินการตามมาตรฐานจริยธรรมการวิจัย
        </p>
      </div>

      <div class="space-y-6">
        <div
          v-for="(item, index) in documents"
          :key="index"
          :class="[
            'bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all relative overflow-hidden',
            index % 2 === 0 ? 'animate-slide-left' : 'animate-slide-right',
          ]"
        >
          <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-gold rounded-l-3xl"></div>

          <div class="space-y-2 pl-4">
            <span class="text-[10px] font-bold text-gold uppercase tracking-widest">{{
              item.code
            }}</span>
            <h3 class="text-xl md:text-2xl font-bold text-navy">{{ item.title }}</h3>
            <p class="text-slate-500 text-sm">{{ item.desc }}</p>
          </div>

          <a
            href="#"
            download
            class="inline-flex items-center justify-center bg-navy hover:bg-gold hover:text-navy text-white px-8 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 active:scale-95 shrink-0 shadow-lg shadow-navy/10"
          >
            ดาวน์โหลด PDF
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const documents = [
  {
    code: "UBCH EC 002/2022",
    title: "Exemption Review",
    desc: "การยกเว้นการพิจารณาจริยธรรมการวิจัย",
  },
  { code: "UBCH EC 003/2022", title: "Expedited Review", desc: "การยื่นขอรับการพิจารณาแบบเร็ว" },
  {
    code: "UBCH EC 004/2022",
    title: "Full Board Review",
    desc: "การยื่นขอรับการพิจารณาแบบเต็มชุด",
  },
];
</script>

<style scoped>
/* เพิ่มสไตล์เล็กน้อยสำหรับเอฟเฟกต์สีทอง */
@keyframes slide-left {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-slide-left {
  animation: slide-left 0.8s ease-out forwards;
}

@keyframes slide-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
.animate-slide-right {
  animation: slide-right 0.8s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
