<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router"; // นำเข้า useRoute
import axios from "axios";

const route = useRoute();
const isLoading = ref(true);

const selectedImage = ref<string | null>(null);

const openLightbox = (url: string) => {
  selectedImage.value = url;
};

const closeLightbox = () => {
  selectedImage.value = null;
};

const article = ref<any>({
  category: "กิจกรรมของเรา",
  title: "",
  content: "",
  date: "",
  time: "",
  views: 0,
  coverImage: "", // จะเป็น URL รูปปก
  galleries: [], // จะเป็น Array ของรูปประกอบ
  tags: ["UBCH", "กิจกรรมองค์กร"],
});

const fetchArticleDetail = async () => {
  try {
    isLoading.value = true;

    // ตรงนี้สำคัญ: ID ที่ได้มาต้องเป็น ID ของข่าว (news_id) ไม่ใช่ ID ของรูปสไลด์
    // ต้องตรวจสอบว่า Vue Router ของคุณส่ง ID ข่าวมาที่หน้านี้หรือไม่
    const newsId = route.params.id;

    // ยิง API ไปที่ NewsController ที่เราเพิ่งสร้าง
    const response = await axios.get(`http://10.180.10.71:8000/api/slides/${newsId}`);
    const data = response.data;

    // นำข้อมูลจากฐานข้อมูลมาลงในตัวแปร article ให้ถูกต้อง
    article.value = {
      ...article.value, // รักษาค่าเดิมไว้ (category, tags)
      title: data.title,
      coverImage: data.cover_image_url, // URL รูปปกที่ Laravel ส่งมา
      content: data.content, // เนื้อหาข่าว (v-html)
      galleries: data.galleries, // Array ของรูปประกอบที่พร้อมวนลูปโชว์
      views: data.views || 0,
      // จัดฟอร์แมตวันที่เหมือนเดิม
      date: new Date(data.created_at).toLocaleDateString("th-TH", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      time:
        new Date(data.created_at).toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
        }) + " น.",
    };
  } catch (error) {
    console.error("โหลดรายละเอียดไม่สำเร็จ:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchArticleDetail();
});
</script>

<template>
  <div class="main-wrapper">
    <div v-if="isLoading" class="min-h-screen flex justify-center items-center bg-slate-50">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-gold"></div>
    </div>
    <div class="bg-slate-50 min-h-screen py-8 font-sans">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav class="flex text-sm text-slate-500 mb-6 font-medium">
          <router-link to="/" class="hover:text-navy transition"> หน้าแรก </router-link>
          <span class="mx-2">/</span>
          <a href="#" class="text-gold hover:text-yellow-600 transition">{{ article.category }}</a>
        </nav>

        <div class="grid grid-cols-1 gap-10">
          <article
            class="lg:col-span-8 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-slate-100"
          >
            <h1
              class="text-3xl md:text-4xl font-bold text-navy leading-tight mb-6"
              style="font-family: &quot;Kanit&quot;, sans-serif"
            >
              {{ article.title }}
            </h1>

            <div
              class="flex flex-wrap items-center justify-between border-y border-slate-100 py-4 mb-8"
            >
              <div class="flex items-center gap-4 text-sm text-slate-500">
                <span class="flex items-center gap-1"
                  ><i class="fa-regular fa-calendar"></i> {{ article.date }}</span
                >
                <span class="flex items-center gap-1"
                  ><i class="fa-regular fa-clock"></i> {{ article.time }}</span
                >
                <span class="flex items-center gap-1"
                  ><i class="fa-regular fa-eye"></i> {{ article.views }} อ่าน</span
                >
              </div>

              <div class="flex gap-2 mt-4 sm:mt-0">
                <button
                  class="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-80 transition"
                >
                  <i class="fa-brands fa-facebook-f"></i>
                </button>
                <button
                  class="w-8 h-8 rounded-full bg-[#00B900] text-white flex items-center justify-center hover:opacity-80 transition"
                >
                  <i class="fa-brands fa-line"></i>
                </button>
                <button
                  class="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-300 transition"
                >
                  <i class="fa-solid fa-link"></i>
                </button>
              </div>
            </div>

            <figure class="mb-10">
              <img
                :src="article.coverImage"
                alt="Cover"
                class="w-full h-auto rounded-xl shadow-md object-cover"
              />
              <figcaption class="text-center text-sm text-slate-400 mt-3">
                ภาพประกอบ: {{ article.title }}
              </figcaption>
            </figure>

            <div
              class="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed mb-12"
              style="font-family: &quot;Sarabun&quot;, sans-serif"
              v-html="article.content"
            ></div>

            <div v-if="article.galleries?.length > 0" class="border-t border-slate-200 pt-8 mb-10">
              <h3 class="text-2xl font-bold text-navy mb-6 flex items-center gap-2">
                <i class="fa-solid fa-images text-gold"></i> ประมวลภาพกิจกรรม
              </h3>

              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div
                  v-for="(img, index) in article.galleries"
                  :key="img.id"
                  class="relative group cursor-pointer overflow-hidden rounded-xl bg-slate-100 aspect-[4/3]"
                  @click="openLightbox(img.url)"
                >
                  <img
                    :src="img.url"
                    :alt="img.caption"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div
                    class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3"
                  >
                    <div
                      class="flex items-center justify-center absolute inset-0 text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity delay-100"
                    >
                      <i class="fa-solid fa-magnifying-glass-plus"></i>
                    </div>
                    <p class="text-white text-sm font-medium truncate relative z-10 drop-shadow-md">
                      {{ img.caption }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
              <span class="text-sm font-bold text-slate-800">แท็กที่เกี่ยวข้อง:</span>
              <a
                href="#"
                v-for="tag in article.tags"
                :key="tag"
                class="text-sm bg-slate-100 text-slate-600 px-3 py-1 rounded-full hover:bg-gold hover:text-navy transition"
              >
                #{{ tag }}
              </a>
            </div>
          </article>

          <!-- <aside class="lg:col-span-4 space-y-8">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 class="text-xl font-bold text-navy mb-4 pb-2 border-b-2 border-gold inline-block">
                ข่าวที่น่าสนใจ
              </h3>
              <div class="space-y-4 mt-4">
                <a href="#" class="group flex gap-4 items-start" v-for="i in 4" :key="i">
                  <div class="w-24 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-200">
                    <img
                      :src="`https://placehold.co/200x150?text=News+${i}`"
                      class="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <div>
                    <h4
                      class="text-sm font-bold text-slate-800 group-hover:text-gold transition line-clamp-2"
                    >
                      เตรียมความพร้อมรับการตรวจประเมินคุณภาพโรงพยาบาล (HA) รอบใหม่
                    </h4>
                    <p class="text-xs text-slate-400 mt-2">
                      <i class="fa-regular fa-clock"></i> 2 ชั่วโมงที่แล้ว
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </aside> -->
        </div>
      </div>

      <div
        v-if="selectedImage"
        class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="closeLightbox"
      >
        <button
          @click="closeLightbox"
          class="absolute top-6 right-6 text-white text-4xl hover:text-gold transition"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
        <img
          :src="selectedImage"
          class="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-fade-in"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* นำเข้าฟอนต์เพื่อให้ดูคล้ายเว็บข่าว */
@import url("https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;700&family=Sarabun:wght@300;400;500;700&display=swap");

.text-navy {
  color: #002d5b;
}
.text-gold {
  color: #b8860b;
}
.bg-gold {
  background-color: #b8860b;
}

/* ทำให้ HTML Content ที่รับมาจาก v-html มีระยะห่างที่สวยงาม */
:deep(.prose p) {
  margin-bottom: 1.5em;
  text-indent: 2em; /* ย่อหน้าบรรทัดแรก */
  font-size: 1.125rem; /* 18px อ่านง่ายสบายตา */
}
:deep(.prose strong) {
  color: #002d5b;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
