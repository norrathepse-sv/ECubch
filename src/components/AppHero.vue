<template>
  <div class="relative w-full">
    <div
      class="relative bg-navy text-white min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-hidden pt-0"
    >
      <!-- <video
        autoplay
        loop
        muted
        playsinline
        class="absolute w-full h-full object-cover object-center z-0 animate-fade-in"
      >
        <source src="/Videos/footage5.mp4" type="video/mp4" />
      </video> -->

      <div class="absolute inset-0 bg-black-900/50 mix-blend-multiply z-10"></div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-black z-10"
      ></div>

      <div class="relative z-20 container mx-auto px-4 w-full">
        <div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <div
            class="w-32 md:w-56 flex-shrink-0 animate-slide-from-left opacity-0"
            style="animation-fill-mode: forwards"
          >
            <img
              src="/images/logoUBCH.png"
              alt="UBCH Logo"
              class="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div class="text-center md:text-left space-y-2 md:space-y-4">
            <!-- <h1 class="text-2xl md:text-5xl font-bold leading-tight text-gray-400 drop-shadow-lg">
              คณะกรรมการจริยธรรมการวิจัยในมนุษย์
              <br />
              <span class="text-xl md:text-4xl text-gray-400 font-semibold drop-shadow-md">
                โรงพยาบาลมะเร็งอุบลราชธานี
              </span>
            </h1> -->

            <div class="pt-2 md:pt-4">
              <h2
                class="relative text-sm md:text-5xl font-medium tracking-wide text-gray-100 drop-shadow-md pb-2 inline-block overflow-hidden whitespace-nowrap animate-typing border-r-2 border-teal-400"
              >
                RESEARCH UBONCANCER HOSPITAL
                <span class="absolute bottom-0 left-0 h-[2px] bg-white animate-progress"></span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 1. พื้นหลัง Video */
.animate-fade-in {
  animation: fadeIn 1.5s ease-in-out;
}

/* 2. โลโก้เลื่อนจากซ้าย (ปรับระยะให้ไกลขึ้น -150px) */
.animate-slide-from-left {
  animation: slideFromLeft 1.2s cubic-bezier(0.25, 1, 0.5, 1);
}

/* 3. ข้อความเลื่อนจากล่างขึ้นบน */
.animate-slide-up {
  animation: slideUp 1s ease-out;
}

/* 4. แสงวิ่งผ่านข้อความ */
.animate-text-shine {
  animation: textShine 4s linear infinite;
}

/* 5. เอฟเฟกต์พิมพ์ดีด */
.animate-typing {
  width: 0;
  animation:
    typing 2s steps(30, end) 0.8s forwards,
    blink-caret 0.75s step-end infinite;
}

/* 6. แถบ Progress Bar */
.animate-progress {
  width: 0;
  animation: fillProgress 2s ease-out 5s forwards;
}

/* --- กำหนด Keyframes --- */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* เพิ่ม Keyframe ใหม่สำหรับการเลื่อนจากซ้าย */
@keyframes slideFromLeft {
  from {
    opacity: 0;
    transform: translateX(-150px); /* เริ่มต้นจากตำแหน่งซ้าย 150px */
  }
  to {
    opacity: 1;
    transform: translateX(0); /* กลับมาจุดกึ่งกลางปกติ */
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes textShine {
  to {
    background-position: 200% center;
  }
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #2dd4bf;
  }
}

@keyframes fillProgress {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
</style>
