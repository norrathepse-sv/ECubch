<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

// 1. กำหนด Interface ให้ถูกต้อง (news_id ต้องรองรับ null)
interface SlideForm {
  title: string;
  subtitle: string;
  link: string;
  display_order: number;
  image: File | null;
  news_id: number | null;
  is_cover: boolean;
}

interface StatusMessage {
  text: string;
  type: "success" | "error" | "";
}

interface News {
  id: number;
  title: string;
  subtitle?: string;
  content: string;
  views?: number;
}

// 2. กำหนดสถานะเริ่มต้น
const form = ref<SlideForm>({
  title: "",
  subtitle: "",
  link: "",
  display_order: 0,
  image: null,
  news_id: null, // เริ่มต้นเป็น null (ไม่ระบุข่าว)
  is_cover: false,
});

const newsList = ref<News[]>([]);
const selectedFiles = ref<File[]>([]);
const previewImages = ref<string[]>([]);
const isLoading = ref<boolean>(false);
const message = ref<StatusMessage>({ text: "", type: "" });

const slideList = ref<any[]>([]);
const isFetching = ref(true);
const coverIndex = ref<number>(0); // เริ่มต้นตั้งรูปแรก (index 0) เป็นปกเสมอ

const currentView = ref("upload"); // จัดการการสลับหน้า
const newsForm = ref({
  // เก็บข้อมูลฟอร์มข่าว
  title: "",
  subtitle: "",
  content: "",
});
// ดึงรายชื่อข่าว
const fetchNews = async () => {
  try {
    const res = await axios.get("http://10.180.10.71:8000/api/news");
    newsList.value = res.data;
  } catch (e) {
    console.error("ดึงข่าวไม่สำเร็จ");
  }
};

// ตั้งค่ารูปปก
const setCover = (index: number) => {
  coverIndex.value = index;
  form.value.is_cover = true;
};

// ดึงสไลด์
const fetchSlides = async () => {
  try {
    isFetching.value = true;
    const response = await axios.get("http://10.180.10.71:8000/api/slides");
    slideList.value = response.data;
  } catch (error) {
    console.error("ดึงข้อมูลสไลด์ไม่สำเร็จ:", error);
  } finally {
    isFetching.value = false;
  }
};

// ลบสไลด์
const deleteSlide = async (id: number) => {
  if (!confirm("คุณแน่ใจหรือไม่ที่จะลบสไลด์นี้? (ไฟล์รูปจะถูกลบออกจากเซิร์ฟเวอร์ด้วย)")) return;

  try {
    const token = localStorage.getItem("auth_token");
    await axios.delete(`http://10.180.10.71:8000/api/slides/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    await fetchSlides();
  } catch (error) {
    alert("ลบไม่สำเร็จ กรุณาลองใหม่");
  }
};

// เลือกไฟล์
const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (!target.files) return;

  const files = Array.from(target.files);
  selectedFiles.value = files;
  previewImages.value = [];
  coverIndex.value = 0; // รีเซ็ตให้กลับมาเป็นรูปแรกเสมอเมื่อเลือกไฟล์ใหม่

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      previewImages.value.push(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  });
};

// ลบรูปภาพใน Preview
const removePreview = (index: number) => {
  previewImages.value.splice(index, 1);
  selectedFiles.value.splice(index, 1);

  // Logic: ถ้าลบรูปที่ตั้งเป็นปกอยู่ ให้ดันรูปแรก (0) มาเป็นปกแทน
  if (coverIndex.value === index) {
    coverIndex.value = 0;
  } else if (coverIndex.value > index) {
    // ถ้าลบรูปที่อยู่ก่อนหน้ารูปปก ต้องขยับ index ของรูปลงมา
    coverIndex.value--;
  }
};

const saveNews = async () => {
  try {
    // ดึง Token จากที่เก็บไว้
    const token = localStorage.getItem("auth_token");

    await axios.post("http://10.180.10.71:8000/api/admin/news", newsForm.value, {
      headers: {
        Authorization: `Bearer ${token}`, // แนบ Token ไปที่นี่
        Accept: "application/json",
      },
    });

    alert("บันทึกข่าวสารสำเร็จ!");
    newsForm.value = { title: "", subtitle: "", content: "" };
    await fetchNews();
  } catch (e) {
    console.error(e);
    alert("เกิดข้อผิดพลาด: คุณอาจไม่มีสิทธิ์เข้าถึงหรือ Token หมดอายุ");
  }
};

// ส่งข้อมูล
const submitForm = async () => {
  if (selectedFiles.value.length === 0) {
    message.value = { text: "กรุณาเลือกรูปภาพอย่างน้อย 1 รูป", type: "error" };
    return;
  }

  isLoading.value = true;
  message.value = { text: "", type: "" };

  const formData = new FormData();

  // 1. แนบไฟล์ภาพทั้งหมด
  selectedFiles.value.forEach((file) => {
    formData.append("images[]", file);
  });

  // 2. แนบข้อมูลพื้นฐาน
  formData.append("title", form.value.title);
  formData.append("subtitle", form.value.subtitle);
  formData.append("link", form.value.link);

  // 3. แนบข่าว (ส่งเฉพาะเมื่อมีการเลือกข่าวจริงๆ)
  if (form.value.news_id !== null && form.value.news_id > 0) {
    formData.append("news_id", form.value.news_id.toString());
  }

  // 4. แนบข้อมูลปก
  formData.append("cover_index", coverIndex.value.toString());

  try {
    const token = localStorage.getItem("auth_token");
    await axios.post("http://10.180.10.71:8000/api/slides", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    message.value = { text: "อัปโหลดสำเร็จ!", type: "success" };

    // ล้างฟอร์มให้สะอาด
    form.value = {
      title: "",
      subtitle: "",
      link: "",
      display_order: 0,
      image: null,
      news_id: null,
      is_cover: false,
    };
    selectedFiles.value = [];
    previewImages.value = [];
    coverIndex.value = 0;

    // ดึงข้อมูลใหม่
    fetchSlides();
  } catch (e: any) {
    message.value = {
      text: e.response?.data?.message || "เกิดข้อผิดพลาดในการอัปโหลด",
      type: "error",
    };
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchSlides();
  fetchNews();
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl border border-slate-100">
    <h2 class="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
      <i class="fa-solid fa-images text-gold"></i> จัดการเนื้อหาหน้าเว็บ
    </h2>

    <div class="flex gap-4 mb-8 border-b pb-4">
      <button
        @click="currentView = 'upload'"
        :class="currentView === 'upload' ? 'bg-navy text-white' : 'bg-slate-100 text-slate-600'"
        class="px-6 py-2 rounded-full font-bold transition flex items-center gap-2"
      >
        <i class="fa-solid fa-cloud-arrow-up"></i> อัปโหลดรูปภาพ
      </button>
      <button
        @click="currentView = 'news'"
        :class="currentView === 'news' ? 'bg-gold text-white' : 'bg-slate-100 text-slate-600'"
        class="px-6 py-2 rounded-full font-bold transition flex items-center gap-2"
      >
        <i class="fa-solid fa-newspaper"></i> สร้างหัวข้อข่าว
      </button>
    </div>

    <div v-if="currentView === 'upload'">
      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <label class="block text-sm font-semibold text-slate-700"
            >รูปภาพสไลด์ (แนะนำขนาด 1920x1080)</label
          >
          <div
            class="relative border-2 border-dashed border-slate-300 rounded-xl p-4 hover:border-gold transition cursor-pointer bg-slate-50"
          >
            <input
              type="file"
              @change="onFileChange"
              multiple
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              :required="previewImages.length === 0"
            />
            <div
              v-if="previewImages.length === 0"
              class="text-center py-10 border-2 border-dashed border-slate-300 rounded-xl"
            >
              <i class="fa-solid fa-cloud-arrow-up text-4xl text-slate-400 mb-2"></i>
              <p class="text-slate-500">คลิกหรือลากไฟล์ภาพมาวางที่นี่</p>
            </div>
            <div v-else class="flex flex-wrap gap-4 mt-4 relative z-10">
              <div v-for="(src, index) in previewImages" :key="index" class="relative group">
                <img
                  :src="src"
                  class="w-24 h-24 object-cover rounded-lg shadow-sm border border-slate-200"
                />
                <label class="block mt-1 text-xs cursor-pointer text-center">
                  <input
                    type="radio"
                    name="cover_selection"
                    :checked="coverIndex === index"
                    @change="setCover(index)"
                  />
                  รูปปก
                </label>
                <button
                  type="button"
                  @click="removePreview(index)"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-semibold text-slate-700"
              >เชื่อมโยงกับข่าว (ถ้ามี)</label
            >
            <select
              v-model="form.news_id"
              class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none"
            >
              <option :value="null">-- ไม่ระบุข่าว (ภาพสไลด์ทั่วไป) --</option>
              <option v-for="news in newsList" :key="news.id" :value="news.id">
                {{ news.title }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700">หัวข้อ (Title)</label>
            <input
              v-model="form.title"
              type="text"
              class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none"
              placeholder="เช่น บริการคลินิกพรีเมียม"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700">คำอธิบาย (Subtitle)</label>
            <textarea
              v-model="form.subtitle"
              class="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold outline-none"
              rows="3"
              placeholder="รายละเอียดสั้นๆ"
            ></textarea>
          </div>
        </div>

        <div class="md:col-span-2 flex items-center justify-between pt-4 border-t">
          <p
            v-if="message.text"
            :class="message.type === 'success' ? 'text-green-600' : 'text-red-600'"
            class="font-medium"
          >
            {{ message.text }}
          </p>
          <button
            type="submit"
            :disabled="isLoading"
            class="bg-navy hover:bg-slate-800 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition disabled:opacity-50"
          >
            <span v-if="isLoading">กำลังบันทึก...</span>
            <span v-else>บันทึกภาพสไลด์</span>
          </button>
        </div>
      </form>
    </div>

    <div v-else class="space-y-4">
      <h3 class="text-lg font-bold text-navy">สร้างหัวข้อข่าวสารใหม่</h3>
      <input v-model="newsForm.title" placeholder="ชื่อข่าว" class="w-full p-3 border rounded-xl" />
      <input
        v-model="newsForm.subtitle"
        placeholder="คำอธิบายสั้น"
        class="w-full p-3 border rounded-xl"
      />
      <textarea
        v-model="newsForm.content"
        placeholder="เนื้อหาข่าว..."
        rows="5"
        class="w-full p-3 border rounded-xl"
      ></textarea>
      <button
        @click="saveNews"
        class="bg-gold text-white px-8 py-3 rounded-full font-bold hover:bg-yellow-600 transition"
      >
        บันทึกข่าวใหม่
      </button>
    </div>

    <div class="mt-12 pt-8 border-t border-slate-200">
      <h3 class="text-xl font-bold text-navy mb-6">📸 รายการภาพสไลด์ปัจจุบัน</h3>
      <div v-if="isFetching" class="flex justify-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
      </div>
      <div v-else-if="slideList.length > 0" class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 text-slate-500 text-sm border-b">
              <th class="py-3 px-4">ภาพตัวอย่าง</th>
              <th class="py-3 px-4">ข้อมูล / หัวข้อ</th>
              <th class="py-3 px-4">สถานะภาพ</th>
              <th class="py-3 px-4 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="slide in slideList" :key="slide.id" class="border-b hover:bg-slate-50">
              <td class="py-3 px-4">
                <img :src="slide.image_url" class="w-32 h-16 object-cover rounded border" />
              </td>
              <td class="py-3 px-4">
                <p class="font-bold text-navy text-sm">{{ slide.title || "ไม่มีหัวข้อ" }}</p>
                <p v-if="slide.news_id" class="text-xs text-blue-600 font-medium">
                  ผูกกับข่าว ID: {{ slide.news_id }}
                </p>
              </td>
              <td class="py-3 px-4">
                <span
                  v-if="slide.is_cover"
                  class="bg-amber-500 text-white text-xs px-3 py-1 rounded-full font-bold"
                  >รูปปก</span
                >
                <span v-else class="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full"
                  >ภาพประกอบ</span
                >
              </td>
              <td class="py-3 px-4 text-center">
                <button
                  @click="deleteSlide(slide.id)"
                  class="text-red-500 bg-red-50 px-3 py-1 rounded-lg text-sm font-medium"
                >
                  ลบ
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-navy {
  color: #002d5b;
}
.bg-navy {
  background-color: #002d5b;
}
.border-gold {
  border-color: #b8860b;
}
.text-gold {
  color: #b8860b;
}
/* ป้องกันปุ่ม x ถูกบังเวลา hover */
.relative.z-10 {
  z-index: 10;
}
</style>
