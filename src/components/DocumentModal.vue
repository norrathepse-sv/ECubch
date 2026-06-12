<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex justify-center items-center p-4"
    >
      <Transition name="slide-up">
        <div
          v-if="isOpen"
          class="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col"
        >
          <div class="bg-[#004d40] px-6 py-4 flex justify-between items-center text-white">
            <h3 class="font-bold text-lg m-0 flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  v-if="isEditMode"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
              {{ isEditMode ? "แก้ไขข้อมูลเอกสาร" : "เพิ่มเอกสารดาวน์โหลดใหม่" }}
            </h3>
            <button @click="closeModal" class="text-white/70 hover:text-white transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div class="p-6 flex flex-col gap-4">
            <div>
              <label class="block text-slate-700 text-sm font-bold mb-2"
                >ชื่อเอกสาร <span class="text-red-500">*</span></label
              >
              <input
                v-model="form.name"
                type="text"
                placeholder="เช่น แบบฟอร์มเสนอโครงการวิจัย"
                class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#004d40] focus:ring-1 focus:ring-[#004d40] transition"
              />
            </div>

            <div>
              <label class="block text-slate-700 text-sm font-bold mb-2"
                >เลือกไฟล์เอกสาร <span class="text-red-500">*</span></label
              >
              <input
                type="file"
                @change="handleFileChange"
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#004d40] transition"
              />
              <p class="text-xs text-slate-500 mt-1">
                * รองรับไฟล์ PDF, Word, Excel (ขนาดไม่เกิน 10MB)
              </p>

              <p v-if="isEditMode && form.url" class="text-xs text-teal-600 mt-1 font-medium">
                ไฟล์ปัจจุบัน:
                <a :href="form.url" target="_blank" class="underline">เปิดดูไฟล์เดิม</a>
              </p>
            </div>
          </div>

          <div class="p-6 flex flex-col gap-4">
            <div v-if="isUploading" class="mt-2">
              <div class="flex justify-between text-xs mb-1">
                <span class="font-bold text-[#004d40]">กำลังอัปโหลดไฟล์...</span>
                <span class="font-bold text-[#004d40]">{{ uploadProgress }}%</span>
              </div>
              <div class="w-full bg-slate-200 rounded-full h-2.5">
                <div
                  class="bg-[#004d40] h-2.5 rounded-full transition-all duration-300"
                  :style="{ width: uploadProgress + '%' }"
                ></div>
              </div>
            </div>
          </div>

          <div class="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              @click="closeModal"
              class="px-5 py-2 rounded-lg text-slate-600 font-bold hover:bg-slate-200 transition"
            >
              ยกเลิก
            </button>
            <button
              @click="submitForm"
              :disabled="!form.name || (!isEditMode && !selectedFile)"
              class="px-5 py-2 rounded-lg bg-[#004d40] text-white font-bold hover:bg-[#00332a] disabled:bg-slate-400 disabled:cursor-not-allowed transition"
            >
              บันทึกข้อมูล
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";

interface DocumentItem {
  id?: number | null;
  name: string;
  size: string;
  url: string;
  [key: string]: unknown;
}

const props = defineProps<{
  isOpen: boolean;
  documentData?: DocumentItem | null; // ถ้าส่งมา = โหมดแก้, ถ้าไม่ส่ง = โหมดเพิ่ม
  uploadProgress?: number; // รับค่า %
  isUploading?: boolean; // รับสถานะว่ากำลังโหลดอยู่ไหม
}>();

const emit = defineEmits(["close", "save"]);
const selectedFile = ref<File | undefined>();
// สร้างตัวแปรเก็บข้อมูลฟอร์ม
const form = ref<DocumentItem>({
  id: null,
  name: "",
  size: "",
  url: "",
});

const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;

  if (target.files && target.files.length > 0) {
    // ใช้ 'as File' เพื่อยืนยันคำขาดกับ TypeScript ว่าดึงค่ามาได้แน่นอน
    const file = target.files[0] as File;

    // หรืออีกวิธีที่ใช้ได้เหมือนกันคือเติมเครื่องหมายตกใจ (!)
    // const file = target.files[0]!;

    selectedFile.value = file;

    if (!form.value.name) {
      form.value.name = file.name.split(".").slice(0, -1).join(".");
    }
  }
};

// เช็คว่าเป็นโหมดแก้ไขหรือไม่ (ดูว่ามี id ส่งมาไหม)
const isEditMode = computed(() => !!form.value.id);

// ใช้ Watcher คอยดูว่าถ้า Modal เปิดขึ้นมา ให้ดึงข้อมูลเก่ามาใส่ฟอร์ม (ถ้ามี)
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      if (props.documentData) {
        // โหมดแก้ไข: ก๊อปปี้ข้อมูลเก่ามาใส่ฟอร์ม
        form.value = { ...props.documentData };
      } else {
        // โหมดเพิ่ม: ล้างฟอร์มให้ว่างเปล่า
        form.value = { id: null, name: "", size: "", url: "" };
      }
    }
  },
);

const closeModal = () => {
  emit("close");
};

const submitForm = () => {
  // ส่งข้อมูลที่กรอกกลับไปให้หน้า Dashboard จัดการต่อ
  emit("save", {
    ...form.value,
    file: selectedFile.value, // แนบก้อนไฟล์ดิบส่งไปด้วย
  });
};
</script>

<style scoped>
/* อนิเมชั่นให้หน้าต่างเด้งขึ้นมาสวยๆ */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px) scale(0.95);
  opacity: 0;
}
</style>
