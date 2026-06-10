<template>
  <div class="max-w-5xl mx-auto p-6 font-sans">
    <!-- <AppBreadcrumb :items="breadcrumbList" class="mb-6" /> -->

    <section class="py-8 md:py-24 relative overflow-hidden flex flex-col items-center text-center">
      <div class="max-w-2xl space-y-6 animate-fade-in-up mb-10">
        <div>
          <span
            class="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-bold uppercase tracking-widest rounded-full mb-3"
          >
            SOPs Documentation
          </span>
          <h3 class="text-3xl md:text-4xl font-extrabold text-navy leading-tight">
            มาตรฐานการปฏิบัติงาน <br />
            <span class="text-navy/60 text-2xl md:text-3xl mt-1 block">ฉบับปรับปรุงใหม่</span>
          </h3>
        </div>

        <div class="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
          <p class="text-slate-600 leading-relaxed text-sm md:text-base">
            คณะกรรมการฯ ได้จัดทำเอกสารคู่มือมาตรฐานการปฏิบัติงาน (Standard Operating Procedures)
            เพื่อให้การพิจารณาจริยธรรมการวิจัยเป็นไปอย่างมีประสิทธิภาพ
          </p>
        </div>
      </div>

      <div class="w-full max-w-xl animate-fade-in-up" style="animation-delay: 150ms">
        <div
          class="w-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden group hover:-translate-y-2 transition-all duration-500 text-left"
        >
          <div
            class="h-auto bg-gradient-to-tr from-navy to-navy-light p-8 text-white flex flex-col justify-between relative cursor-pointer group/card"
            @click="isModalOpen = true"
          >
            <div class="absolute top-0 right-0 p-4 opacity-20">
              <svg class="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
              </svg>
            </div>

            <span
              class="text-[10px] font-bold uppercase tracking-widest bg-gold/20 text-gold px-3 py-1 rounded-full self-start mb-6"
            >
              Official File
            </span>

            <div class="relative mb-6">
              <img
                src="/images/sops/SOPs.png"
                alt="SOP Thumbnail"
                class="w-full h-auto object-cover rounded-xl shadow-lg border border-white/10 group-hover/card:scale-[1.02] transition-transform duration-300"
              />

              <div
                class="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity"
              >
                <div class="bg-black/40 p-3 rounded-full backdrop-blur-sm text-white shadow-lg">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h4 class="font-bold text-xl leading-tight">
                Standard Operating Procedures ( ฉบับที่ 3 )
              </h4>
              <p
                class="text-[11px] text-slate-300 group-hover/card:text-white transition-colors mt-1"
              >
                คลิกเพื่อดูตัวอย่างเอกสารฉบับเต็ม
              </p>
            </div>
          </div>

          <div class="p-8 text-center bg-slate-50/50">
            <div class="flex justify-center gap-2 mb-6">
              <span class="w-2 h-2 rounded-full bg-slate-300"></span>
              <span class="w-2 h-2 rounded-full bg-slate-300"></span>
              <span class="w-2 h-2 rounded-full bg-slate-300"></span>
            </div>

            <p class="text-xs text-slate-500 mb-6 font-medium">
              ไฟล์ PDF (ขนาด 30 MB) | ปรับปรุงล่าสุด พ.ค. 2568
            </p>

            <a
              href="/docs/SOPsฉบับที่3.pdf"
              download="SOPs_Version3.pdf"
              class="secondary-btn-class"
            >
              ดาวน์โหลดไฟล์
            </a>
          </div>
        </div>
      </div>
    </section>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-navy/95 backdrop-blur-md animate-fade-in"
      @click="isModalOpen = false"
    >
      <div
        class="relative max-w-3xl w-full bg-transparent flex justify-center animate-scale-up"
        @click.stop
      >
        <button
          @click="isModalOpen = false"
          class="absolute -top-12 right-0 md:-right-12 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full backdrop-blur-sm transition-colors border border-white/20"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <img
          src="/images/sops/SOPs.png"
          alt="SOP Full View"
          class="w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isModalOpen = ref(false);
</script>
