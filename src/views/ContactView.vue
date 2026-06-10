<template>
  <div class="bg-white font-sans text-[#1d1d1f] p-6">
    <!-- <AppBreadcrumb :items="breadcrumbList" /> -->
    <div class="max-w-[980px] mx-auto px-4 md:px-6 py-12 flex flex-col text-center">
      <div class="relative inline-block mb-8">
        <h1 class="text-4xl md:text-6xl font-bold tracking-tight leading-tight">ติดต่อเรา</h1>
        <span
          class="absolute -bottom-2 left-0 w-full h-2 bg-gold rounded-full transform scale-x-0 animate-expand-gold block"
        ></span>
      </div>

      <p
        class="text-xl md:text-2xl text-[#86868b] font-normal max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
      >
        ทีมงานของเราพร้อมให้คำปรึกษาและช่วยเหลือคุณ
        <br class="hidden md:block" />ในทุกขั้นตอนการขอพิจารณาจริยธรรมการวิจัย
      </p>
    </div>

    <div class="max-w-[980px] mx-auto px-4 md:px-6 my-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div
          v-for="(item, index) in contactMethods"
          :key="index"
          class="bg-[#f5f5f7] rounded-[2rem] p-8 flex flex-col items-center text-center hover:bg-[#ebebeb] transition-colors duration-300"
        >
          <div class="w-12 h-12 mb-6 text-[#1d1d1f]">
            <component :is="item.icon" class="w-full h-full" stroke-width="1.5" />
          </div>

          <h3 class="text-lg font-semibold mb-3">{{ item.title }}</h3>

          <div
            class="text-[15px] text-[#86868b] leading-relaxed mb-6 flex-grow"
            v-html="item.detail"
          ></div>

          <a
            v-if="item.actionUrl"
            :href="item.actionUrl"
            class="text-[#0071e3] hover:underline text-sm font-medium flex items-center mt-auto"
          >
            {{ item.actionText }} <span class="ml-1 leading-none text-lg">›</span>
          </a>
        </div>
      </div>
    </div>

    <div class="max-w-[980px] mx-auto px-4 md:px-6 mb-32">
      <div
        class="bg-[#fbfbfd] rounded-[2.5rem] overflow-hidden border border-[#d2d2d7]/50 flex flex-col md:flex-row items-center"
      >
        <div class="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <h2 class="text-3xl font-bold tracking-tight mb-4">
            ห้องงานวิจัยฯ ชั้น 7<br />อาคารอำนวยการผู้ป่วยนอกและรังสีวินิจฉัย
          </h2>
          <p class="text-lg text-[#86868b] mb-8">
            โรงพยาบาลมะเร็งอุบลราชธานี<br />
            405 ถนนคลังอาวุธ ตำบลขามใหญ่<br />
            อำเภอเมือง จังหวัดอุบลราชธานี 34000
          </p>
          <div>
            <a
              href="https://maps.app.goo.gl/3iiPgicRWbJ5nxGD6"
              rel="noopener noreferrer"
              target="_blank"
              class="bg-[#1d1d1f] hover:bg-black text-white text-sm font-medium py-3 px-6 rounded-full transition-colors inline-block"
            >
              เปิดแผนที่ Google Maps
            </a>
          </div>
        </div>

        <div class="w-full md:w-1/2 h-64 md:h-full min-h-[400px] bg-[#e5e5ea] relative">
          <img
            src="/images/S__61792260.jpg"
            alt="UBCH Location"
            class="w-full h-full object-cover object-center absolute inset-0"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h } from "vue";
import { ref } from "vue";

// --- สร้าง SVG Icons แบบ Minimalist (ใช้ Render Function เพื่อความคลีนของโค้ด) ---
const PhoneIcon = () =>
  h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
      }),
    ],
  );

const MailIcon = () =>
  h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      }),
    ],
  );

const ClockIcon = () =>
  h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      }),
    ],
  );

// const ChatIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
//   h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' })
// ]);

// --- ข้อมูลการติดต่อ (เปลี่ยนข้อมูลจริงได้ที่นี่) ---
interface ContactMethod {
  title: string;
  detail: string;
  icon: any;
  actionText?: string;
  actionUrl?: string;
}

const contactMethods: ContactMethod[] = [
  {
    title: "โทรศัพท์",
    detail: "045-319671 ถึง 3<br/>ต่อ 7720", // ใส่เบอร์จริงที่นี่
    icon: PhoneIcon,
    actionText: "โทรทันที",
    actionUrl: "tel:045319671",
  },
  {
    title: "อีเมล",
    detail: "สอบถามข้อมูลทั่วไป หรือ<br/>ส่งเอกสารเพิ่มเติม",
    icon: MailIcon,
    actionText: "Research.ubcc@gmail.com", // ใส่อีเมลจริง
    actionUrl: "mailto:research.ubcc@gmail.com",
  },
  {
    title: "เวลาทำการ",
    detail: "วันจันทร์ - ศุกร์<br/>08:00 น. - 16:00 น.<br/>(ปิดทำการวันหยุดนักขัตฤกษ์)",
    icon: ClockIcon,
  },
  //   {
  //     title: 'Line Official',
  //     detail: 'รับคำปรึกษาและ<br/>อัปเดตข้อมูลข่าวสาร',
  //     icon: ChatIcon,
  //     actionText: 'เพิ่มเพื่อน',
  //     actionUrl: '#' // ใส่ลิงก์ Line OA
  //   }
];
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap");

.font-sans {
  font-family: "Kanit", sans-serif !important;
}

/* แอนิเมชันเส้นใต้สีทอง: เริ่มจาก 0 และขยายไป 100% */
@keyframes expand-gold {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.animate-expand-gold {
  animation: expand-gold 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards !important;
  animation-delay: 0.5s;
  /* เพิ่ม display block เพื่อให้เส้นแสดงผล */
  display: block !important;
  transform-origin: left; /* ให้เส้นขยายจากซ้ายไปขวา */
}

/* แอนิเมชันสำหรับข้อความ (ถ้าคุณใช้ Tailwind จะมี animate-fade-in-up อยู่แล้ว) */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-up {
  animation: fade-in-up 1s ease-out forwards;
  animation-delay: 0.8s;
}
</style>
