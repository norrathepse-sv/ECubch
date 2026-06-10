<template>
  <div
    class="min-h-screen flex items-center justify-center bg-slate-50 p-6 relative overflow-hidden"
  >
    <div class="absolute inset-0 z-0 opacity-5">
      <div class="absolute top-0 right-0 w-96 h-96 bg-navy rounded-full blur-[100px]"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-[100px]"></div>
    </div>

    <div
      class="relative z-10 w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 p-10 text-center"
    >
      <div class="mb-8">
        <div
          class="w-20 h-20 mx-auto bg-navy rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-navy/20"
        >
          <img src="/images/logoUBCH.png" alt="Logo" class="w-12 h-12 object-contain" />
        </div>
        <h1 class="text-2xl font-bold text-navy mb-2">เข้าสู่ระบบ</h1>
        <p class="text-slate-500 text-sm">ระบบจริยธรรมการวิจัยในมนุษย์ (UBCH EC)</p>
      </div>

      <button
        @click="loginWithLine"
        :disabled="isLoading"
        class="w-full group relative flex items-center justify-center gap-3 bg-[#06c755] hover:bg-[#05b34d] text-white py-4 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] shadow-lg shadow-green-500/20"
      >
        <span
          v-if="isLoading"
          class="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
        ></span>
        <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="white">
          <path
            d="M19.365 9.863c.349.03.629.26.699.61.07.35-.04.709-.319.929l-4.509 3.539c-.27.21-.659.21-.929 0l-4.509-3.539c-.28-.22-.39-.579-.319-.929.07-.35.349-.58.699-.61.35-.03.709.08.929.319l3.189 2.499 3.199-2.499c.22-.24.58-.35.929-.319zM20.5 2H3.5C2.12 2 1 3.12 1 4.5v15c0 1.38 1.12 2.5 2.5 2.5h17c1.38 0 2.5-1.12 2.5-2.5v-15C23 3.12 21.88 2 20.5 2z"
          />
        </svg>
        {{ isLoading ? "กำลังเชื่อมต่อ..." : "เข้าสู่ระบบด้วย LINE" }}
      </button>

      <p class="mt-8 text-xs text-slate-400">
        หากมีปัญหาในการเข้าสู่ระบบ กรุณาติดต่อ<br />เจ้าหน้าที่งานIT
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isLoading = ref(false);

const loginWithLine = () => {
  isLoading.value = true;
  window.location.href = "http://10.180.10.71:8000/api/auth/line/redirect";
};
</script>
