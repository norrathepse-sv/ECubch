<template>
  <nav class="w-full z-50 bg-black backdrop-blur-md border-b border-white/10 text-white">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center relative">
      <div class="flex items-center gap-3 z-20"></div>

      <button
        @click="toggleMenu"
        class="lg:hidden text-white hover:text-gold focus:outline-none transition z-20"
      >
        <svg
          v-if="!isMenuOpen"
          class="w-7 h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
        <svg v-else class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      <div
        class="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-md font-semibold z-10 w-max"
      >
        <router-link
          to="/"
          class="text-gold border-b-2 border-gold pb-1 hover:text-gold transition"
        >
          หน้าแรก
        </router-link>

        <div class="relative group cursor-pointer py-2">
          <div class="flex items-center gap-1 hover:text-gold transition">
            เกี่ยวกับหน่วยงาน
            <svg
              class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
          <div
            class="absolute left-0 top-full mt-0 w-max bg-white text-slate-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all duration-300 overflow-hidden"
          >
            <router-link
              to="/about/app-org-chart"
              class="block px-4 py-2 whitespace-nowrap hover:bg-slate-100 hover:text-gold transition border-t border-slate-100"
            >
              โครงสร้างการบริหารภายในโรงพยาบาลมะเร็งอุบลราชธานี
            </router-link>
            <router-link
              to="/about/app-object-second"
              class="block px-4 py-2 whitespace-nowrap hover:bg-slate-100 hover:text-gold transition border-t border-slate-100"
            >
              โครงสร้างการบริหารภายในคณะกรรมการจริยธรรมการวิจัยในมนุษย์
            </router-link>
          </div>
        </div>

        <!-- <div class="relative group cursor-pointer py-2">
          <div class="flex items-center gap-1 hover:text-gold transition">
            มาตรฐานงานวิจัย
            <svg
              class="w-4 h-4 transition-transform duration-200 group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
          <div
            class="absolute left-0 top-full mt-0 w-max bg-white text-slate-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:mt-2 transition-all duration-300 overflow-hidden"
          >
            <router-link
              to="/meeting/app-meeting-list"
              class="block px-4 py-2 whitespace-nowrap hover:bg-slate-100 hover:text-gold transition border-t border-slate-100"
            >
              กำหนดการประชุมคณะกรรมการฯ
            </router-link>
          </div>
        </div> -->

        <router-link to="/app-contact-view" class="hover:text-gold transition">
          ติดต่อเรา
        </router-link>
      </div>

      <div class="hidden lg:block z-20">
        <router-link
          v-if="!isLoggedIn"
          to="/login"
          class="bg-gold hover:bg-gold-hover text-navy px-5 py-2 rounded font-bold transition shadow-md"
        >
          Login
        </router-link>

        <div v-else class="flex items-center gap-3">
          <div v-if="userData" class="flex items-center gap-2">
            <img
              :src="userData.avatar_url"
              alt="Profile"
              class="w-8 h-8 rounded-full border border-gold object-cover"
            />
            <span class="text-sm font-medium">{{ userData.name }}</span>
          </div>

          <router-link
            to="/dashboard"
            class="bg-gold hover:bg-white text-navy px-4 py-1.5 rounded text-sm font-bold transition shadow-sm"
          >
            แดชบอร์ด
          </router-link>

          <button
            @click="handleLogout"
            class="border border-white/30 hover:bg-white/10 text-white px-3 py-1.5 rounded text-sm transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>

    <div
      v-show="isMenuOpen"
      class="lg:hidden absolute top-full left-0 w-full bg-navy/95 backdrop-blur-md border-b border-white/10 shadow-lg"
    >
      <div class="flex flex-col px-6 py-4 gap-4 text-md font-medium">
        <router-link to="/" @click="closeMenu" class="hover:text-gold transition">
          หน้าแรก
        </router-link>

        <div class="flex flex-col gap-2">
          <button
            @click="toggleMobileAbout"
            class="flex items-center justify-between w-full hover:text-gold transition text-left"
          >
            เกี่ยวกับหน่วยงาน
            <svg
              :class="{ 'rotate-180': isMobileAboutOpen }"
              class="w-4 h-4 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <div
            v-show="isMobileAboutOpen"
            class="flex flex-col gap-3 pl-4 mt-2 border-l-2 border-white/20 text-[14px]"
          >
            <router-link
              to="/about/app-org-chart"
              @click="closeMenu"
              class="hover:text-gold transition"
            >
              โครงสร้างการบริหารภายในฯ
            </router-link>
            <router-link
              to="/about/app-object-second"
              @click="closeMenu"
              class="hover:text-gold transition"
            >
              โครงสร้างการบริหารภายในคณะกรรมการฯ
            </router-link>
          </div>
        </div>

        <!-- <router-link to="/standards" @click="closeMenu" class="hover:text-gold transition">
          มาตรฐานงานวิจัย
        </router-link>
        <router-link to="/procedures" @click="closeMenu" class="hover:text-gold transition">
          ขั้นตอนการดำเนินงาน
        </router-link> -->
        <router-link to="/app-contact-view" @click="closeMenu" class="hover:text-gold transition">
          ติดต่อเรา
        </router-link>

        <div class="pt-4 mt-2 border-t border-white/10">
          <router-link
            v-if="!isLoggedIn"
            to="/login"
            @click="closeMenu"
            class="block w-full bg-gold text-navy py-2 rounded font-bold text-center shadow-md"
          >
            Login
          </router-link>

          <div v-else class="flex flex-col gap-3">
            <div v-if="userData" class="flex items-center gap-3">
              <img
                :src="userData.avatar_url"
                alt="Profile"
                class="w-10 h-10 rounded-full border-2 border-gold object-cover"
              />
              <span class="text-white">{{ userData.name }}</span>
            </div>

            <router-link
              to="/dashboard"
              @click="closeMenu"
              class="w-full bg-gold hover:bg-white text-navy py-2 rounded font-bold text-center transition"
            >
              เข้าสู่หน้าแดชบอร์ด
            </router-link>

            <button
              @click="handleLogout"
              class="w-full bg-red-500/80 hover:bg-red-500 text-white py-2 rounded font-bold transition"
            >
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const router = useRouter();
const route = useRoute();

// 1. ตัวแปรจัดการ UI ของเมนู
const isMenuOpen = ref(false);
const isMobileAboutOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const toggleMobileAbout = () => {
  isMobileAboutOpen.value = !isMobileAboutOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
  isMobileAboutOpen.value = false;
};

// 2. ตัวแปรและระบบจัดการ Authentication
const isLoggedIn = ref(false);
const userData = ref<any>(null);

const checkAuthStatus = async () => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    isLoggedIn.value = true;

    // ดึงข้อมูล User (ถ้ายังไม่มีในตัวแปร)
    if (!userData.value) {
      try {
        const response = await axios.get("http://10.180.10.71:8000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        userData.value = response.data;
      } catch (error) {
        // ถ้า Token หมดอายุ หรือมีปัญหา ให้ล้างค่าทิ้ง
        handleLogout(false); // ส่ง false เพื่อไม่ให้เด้งไปหน้า login อัตโนมัติ (ให้ยูสเซอร์ดูหน้าเว็บปกติได้)
      }
    }
  } else {
    isLoggedIn.value = false;
    userData.value = null;
  }
};

const handleLogout = (redirect = true) => {
  localStorage.removeItem("auth_token");
  isLoggedIn.value = false;
  userData.value = null;
  closeMenu();
  if (redirect) {
    router.push("/login");
  }
};

// เช็คสถานะตอนโหลด Component
onMounted(() => {
  checkAuthStatus();
});

// คอยเช็คสถานะใหม่เสมอเมื่อมีการเปลี่ยน URL (Route)
watch(
  () => route.path,
  () => {
    checkAuthStatus();
  },
);
</script>
