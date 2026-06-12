<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import axios, { isAxiosError } from "axios";
import { useRouter } from "vue-router";

// (หากไม่ได้ใช้ Component หรือ Interface ไหน แนะนำให้คอมเมนต์หรือลบออกตอน Build ครับ)
import DocumentList from "@/components/DocumentList.vue";
import DocumentModal from "@/components/DocumentModal.vue";
import SlideUpload from "@/components/SlideUpload.vue";
import UserManagement from "./Admin/UserManagement.vue";

// --- การสร้าง Interface เพื่อเลี่ยงการใช้ any ---
interface UserData {
  id: number;
  name: string;
  email: string;
}

interface Activity {
  action: string;
  time: string;
  text: string;
  uid?: string;
}

interface MeetingData {
  id?: number;
  date?: string;
  [key: string]: unknown; // อนุญาตให้มี key อื่นๆ ได้
}

interface DocData {
  id: number;
  name: string;
  size: string;
  url: string;
}

interface DocFormData {
  id?: number;
  name: string;
  file?: File;
}

const router = useRouter();

// 💡 แนะนำ: ใน Production ควรเปลี่ยน API_BASE_URL ไปดึงจาก .env แทนการฝัง IP ตรงๆ
const API_BASE_URL = "http://10.180.10.71:8000/api";

const meetings = ref<MeetingData[]>([]);
const uploadProgress = ref(0);
const isUploading = ref(false);
const isLoading = ref(true);

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    alert("คัดลอก UID เรียบร้อยแล้ว");
  });
};

// --- ระบบเมนู ---
const activeMenu = ref("dashboard");

const menuItems = [
  { id: "dashboard", label: "ภาพรวมระบบ", icon: "" },
  { id: "meetings", label: "ตารางการประชุม", icon: "" },
  { id: "documents", label: "จัดการเอกสาร", icon: "" },
  { id: "slides", label: "ภาพสไลด์", icon: "" },
  { id: "UserManagement", label: "ผู้ใช้ระบบ", icon: "" },
];

const dashboardStats = ref([
  {
    title: "โครงการรอพิจารณา",
    value: "0",
    unit: "โครงการ",
    icon: "⏳",
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "วันประชุมรอบถัดไป",
    value: "กำลังโหลด...",
    unit: "",
    icon: "📅",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "เอกสารในระบบ",
    value: "0",
    unit: "รายการ",
    icon: "📄",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "ผู้ใช้งานทั้งหมด",
    value: "0",
    unit: "คน",
    icon: "👥",
    color: "bg-purple-100 text-purple-600",
  },
]);

const recentActivities = ref<Activity[]>([]);

const currentMenuLabel = computed(() => {
  return menuItems.find((i) => i.id === activeMenu.value)?.label;
});

// --- ข้อมูลจำลอง/Data ---
// const slides = ref([
//   {
//     id: 1,
//     title: "วาระที่ 1: รายงานการประชุมครั้งที่แล้ว",
//     url: "https://placehold.co/600x400?text=Slide+1",
//   },
//   {
//     id: 2,
//     title: "วาระที่ 2: เรื่องเสนอเพื่อพิจารณา",
//     url: "https://placehold.co/600x400?text=Slide+2",
//   },
//   { id: 3, title: "วาระที่ 3: เรื่องอื่นๆ", url: "https://placehold.co/600x400?text=Slide+3" },
// ]);

const documents = ref<DocData[]>([]);
const isDocModalOpen = ref(false);
const editingDoc = ref<DocData | null>(null);

// --- Functions ---
const handleAddDoc = () => {
  editingDoc.value = null;
  isDocModalOpen.value = true;
};

const handleEditDoc = (doc: DocData) => {
  editingDoc.value = doc;
  isDocModalOpen.value = true;
};

const handleDeleteDoc = async (id: number) => {
  if (confirm("คุณแน่ใจหรือไม่ที่จะลบเอกสารนี้?")) {
    try {
      const token = localStorage.getItem("auth_token");
      await axios.delete(`${API_BASE_URL}/documents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDocuments();
    } catch (error) {
      console.error(error);
      alert("ลบไม่สำเร็จ");
    }
  }
};

const saveDocument = async (formData: DocFormData) => {
  const token = localStorage.getItem("auth_token");
  const data = new FormData();
  data.append("name", formData.name);
  if (formData.file) data.append("file", formData.file);

  let url = `${API_BASE_URL}/documents`;
  if (formData.id) {
    data.append("_method", "PUT");
    url = `${API_BASE_URL}/documents/${formData.id}`;
  }

  try {
    isUploading.value = true;
    await axios.post(url, data, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      onUploadProgress: (p) => {
        if (p.total) uploadProgress.value = Math.round((p.loaded * 100) / p.total);
      },
    });
    await fetchDocuments();
    isDocModalOpen.value = false;
  } catch (error) {
    alert("บันทึกไม่สำเร็จ");
  } finally {
    isUploading.value = false;
  }
};

const fetchDocuments = async () => {
  const token = localStorage.getItem("auth_token");
  try {
    const response = await axios.get(`${API_BASE_URL}/documents`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    documents.value = response.data.map((doc: any) => ({
      id: Number(doc.id),
      name: String(doc.name),
      size: String(doc.size ?? ""),
      url: String(doc.url ?? ""),
    }));

    if (dashboardStats.value && dashboardStats.value[2]) {
      dashboardStats.value[2].value = response.data.length.toString();
    }
  } catch (e: unknown) {
    // ใช้งาน isAxiosError เพื่อป้องกัน Error จาก Type 'unknown'
    if (isAxiosError(e) && e.response?.status === 401) {
      router.push("/login");
    }
    console.error("โหลดเอกสารไม่สำเร็จ:", e);
  }
};

const fetchData = async () => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    router.push("/login");
    return;
  }

  try {
    const meetingsResponse = await axios.get(`${API_BASE_URL}/meetings`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    meetings.value = meetingsResponse.data;

    if (meetings.value.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let upcomingMeeting = null;

      for (const m of meetings.value) {
        if (!m.date) continue;

        const parts = m.date.split("/");
        if (parts.length === 3) {
          const day = parseInt(parts[0] ?? "0", 10);
          const month = parseInt(parts[1] ?? "0", 10) - 1;
          const yearAD = parseInt(parts[2] ?? "0", 10) - 543;
          const meetingDate = new Date(yearAD, month, day);

          if (meetingDate >= today) {
            upcomingMeeting = m;
            break;
          }
        }
      }

      if (upcomingMeeting) {
        const thaiMonths = [
          "",
          "ม.ค.",
          "ก.พ.",
          "มี.ค.",
          "เม.ย.",
          "พ.ค.",
          "มิ.ย.",
          "ก.ค.",
          "ส.ค.",
          "ก.ย.",
          "ต.ค.",
          "พ.ย.",
          "ธ.ค.",
        ];
        const dateParts = upcomingMeeting.date!.split("/");
        const day = dateParts[0];
        const monthIndex = parseInt(dateParts[1]?.slice(0, 2) ?? "0");
        const year = dateParts[2];
        const monthName = thaiMonths[monthIndex] || "";

        dashboardStats.value[1]!.value = `${day} ${monthName}`;
        dashboardStats.value[1]!.unit = year ?? "";
      } else {
        dashboardStats.value[1]!.value = "-";
        dashboardStats.value[1]!.unit = "สิ้นสุดรอบการประชุม";
      }
    } else {
      dashboardStats.value[1]!.value = "-";
      dashboardStats.value[1]!.unit = "ไม่มีข้อมูล";
    }
  } catch (error) {
    console.error("ไม่สามารถดึงข้อมูลระบบได้:", error);
    localStorage.removeItem("auth_token");
    router.push("/login");
  } finally {
    isLoading.value = false;
  }
};

const fetchActivities = async () => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    router.push("/login");
    return;
  }

  try {
    const res = await axios.get(`${API_BASE_URL}/activities`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    recentActivities.value = res.data;
  } catch (e) {
    console.error("ดึงข้อมูลไม่สำเร็จ:", e);
  }
};

onMounted(() => {
  fetchData();
  fetchDocuments();
  fetchActivities();
});
</script>

<template>
  <div class="dashboard-layout-top">
    <header class="top-navbar font-sans">
      <div class="nav-container">
        <div class="nav-brand">
          <img src="/images/logoUBCH.png" alt="Logo" class="brand-logo" />
          <div class="brand-text">
            <span class="brand-name">UBCH EC</span>
            <span class="brand-sub">Admin Mode</span>
          </div>
        </div>

        <nav class="nav-menu">
          <button
            v-for="item in menuItems"
            :key="item.id"
            @click="activeMenu = item.id"
            :class="['nav-item', { active: activeMenu === item.id }]"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            <span class="nav-label">{{ item.label }}</span>
          </button>
        </nav>

        <!-- <div class="nav-actions">
          <div class="user-badge">Admin Mode</div>
          <button @click="router.push('/login')" class="logout-btn" title="ออกจากระบบ">🚪</button>
        </div> -->
      </div>
    </header>

    <main class="main-container">
      <header class="content-header font-sans">
        <h1>{{ currentMenuLabel }}</h1>
      </header>

      <div class="content-body font-sans">
        <transition name="fade" mode="out-in">
          <section v-if="activeMenu === 'dashboard'" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                v-for="(stat, index) in dashboardStats"
                :key="index"
                class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div
                  :class="[
                    'w-14 h-14 rounded-2xl flex items-center justify-center text-2xl',
                    stat.color,
                  ]"
                >
                  {{ stat.icon }}
                </div>
                <div>
                  <p class="text-sm text-slate-500 font-medium">{{ stat.title }}</p>
                  <h4 class="text-2xl font-black text-navy leading-none mt-1">
                    {{ stat.value }}
                    <span class="text-sm font-normal text-slate-400">{{ stat.unit }}</span>
                  </h4>
                </div>
              </div>
            </div>

            <article class="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 w-full">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-bold text-navy">ความเคลื่อนไหวล่าสุด</h3>
                <button
                  @click="fetchActivities"
                  class="text-sm text-blue-500 hover:text-blue-700 transition"
                >
                  🔄 รีเฟรช
                </button>
              </div>

              <div v-if="isLoading" class="flex justify-center items-center py-10">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
              </div>

              <div
                v-else-if="recentActivities.length > 0"
                class="max-h-[400px] overflow-y-auto pr-2 space-y-6"
              >
                <div v-for="(act, index) in recentActivities" :key="index" class="flex gap-4">
                  <div class="flex flex-col items-center">
                    <div
                      class="w-3 h-3 rounded-full"
                      :class="{
                        'bg-green-500': act.action === 'login_success',
                        'bg-red-500': act.action === 'login_failed',
                        'bg-gold': !['login_success', 'login_failed'].includes(act.action),
                      }"
                    ></div>
                    <div
                      class="w-px h-full bg-slate-200 my-1"
                      v-if="index !== recentActivities.length - 1"
                    ></div>
                  </div>
                  <div class="pb-2">
                    <p class="text-sm font-bold text-slate-400">{{ act.time }}</p>
                    <p class="text-navy font-medium mt-1">{{ act.text }}</p>

                    <button
                      v-if="act.action === 'login_failed' && act.uid"
                      @click="copyToClipboard(act.uid)"
                      class="mt-2 text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-full border border-red-100 hover:bg-red-100 transition-colors flex items-center gap-1"
                    >
                      <span>📋 คัดลอก UID เพื่อเพิ่มสิทธิ์</span>
                    </button>
                  </div>
                </div>
              </div>

              <div v-else class="text-center py-10 text-slate-400">ยังไม่มีประวัติกิจกรรม</div>
            </article>

            <!-- <aside class="bg-navy rounded-3xl shadow-lg p-8 text-white relative overflow-hidden">
  <div class="absolute -top-10 -right-10 w-32 h-32 bg-gold/20 rounded-full blur-2xl"></div>
  
  <h3 class="text-lg font-bold text-gold mb-6 relative z-10">เมนูด่วน</h3>
  
  <nav class="space-y-3 relative z-10">
    <button
      @click="activeMenu = 'documents'"
      class="w-full flex items-center justify-between bg-white/10 hover:bg-gold hover:text-navy px-4 py-3 rounded-xl transition-colors font-medium"
    >
      <span>📤 อัปโหลดเอกสารใหม่</span><span>→</span>
    </button>
    
    <button
      @click="activeMenu = 'meetings'"
      class="w-full flex items-center justify-between bg-white/10 hover:bg-gold hover:text-navy px-4 py-3 rounded-xl transition-colors font-medium"
    >
      <span>📅 จัดตารางประชุม</span><span>→</span>
    </button>
    
    <button
      @click="activeMenu = 'slides'"
      class="w-full flex items-center justify-between bg-white/10 hover:bg-gold hover:text-navy px-4 py-3 rounded-xl transition-colors font-medium"
    >
      <span>📽️ จัดการสไลด์</span><span>→</span>
    </button>
  </nav>
</aside> -->
          </section>

          <section v-else-if="activeMenu === 'meetings'" class="content-card">
            <div v-if="isLoading" class="loading">กำลังโหลด...</div>
            <div v-else class="table-container">
              <table class="modern-table">
                <thead>
                  <tr>
                    <th>ประชุมครั้งที่</th>
                    <th>วันประชุม</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="m in meetings" :key="m.id">
                    <td class="text-center">
                      <strong>{{ m.round }}</strong>
                    </td>
                    <td class="text-center">{{ m.date || "-" }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section v-else-if="activeMenu === 'documents'" class="content-card">
            <DocumentList
              :documents="documents"
              @add="handleAddDoc"
              @edit="handleEditDoc"
              @delete="handleDeleteDoc"
            />
          </section>

          <section v-else-if="activeMenu === 'slides'">
            <SlideUpload />
          </section>

          <section v-else-if="activeMenu === 'UserManagement'">
            <UserManagement />
          </section>
        </transition>
      </div>
    </main>

    <DocumentModal
      :is-open="isDocModalOpen"
      :document-data="editingDoc"
      :upload-progress="uploadProgress"
      :is-uploading="isUploading"
      @close="isDocModalOpen = false"
      @save="saveDocument"
    />
  </div>
</template>

<style scoped>
/* Layout Structure */
.dashboard-layout-top {
  min-height: 100vh;
  background-color: #f4f7f6;
  font-family: "Sarabun", sans-serif;
  display: flex;
  flex-direction: column;
}

/* ================= Top Navbar ================= */
.top-navbar {
  background-color: #1a1a1a; /* Navy Dark */
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 50;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand-logo {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 8px;
  padding: 2px;
}
.brand-name {
  display: block;
  font-weight: bold;
  font-size: 1.1rem;
  color: #c5a059; /* Gold */
}
.brand-sub {
  display: block;
  font-size: 0.7rem;
  color: #aaa;
}

.nav-menu {
  display: flex;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  color: #bbb;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-item:hover {
  color: white;
  background: rgba(255, 255, 255, 0.05);
}

.nav-item.active {
  background: #c5a059;
  color: #1a1a1a;
  font-weight: bold;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-badge {
  background: rgba(197, 160, 89, 0.2);
  color: #c5a059;
  border: 1px solid #c5a059;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}
.logout-btn:hover {
  background: #ff4757;
}

/* ================= Main Content ================= */
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 2rem 1.5rem;
  flex-grow: 1;
}

.content-header {
  margin-bottom: 2rem;
}
.content-header h1 {
  font-size: 1.8rem;
  color: #1a1a1a;
  margin: 0;
  font-weight: 800;
}

.content-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  min-height: 400px;
}

/* Modern Table */
.table-container {
  overflow-x: auto;
}
.modern-table {
  width: 100%;
  border-collapse: collapse;
}
.modern-table th {
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-bottom: 2px solid #eee;
}
.modern-table td {
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

/* Slide Grid */
.slide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}
.slide-box {
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
}
.slide-box img {
  width: 100%;
  height: auto;
}
.slide-box p {
  padding: 0.8rem;
  font-weight: bold;
  font-size: 0.9rem;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* สำหรับ Chrome, Safari และ Edge */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #d1d5db; /* สีเทา */
  border-radius: 10px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .nav-menu {
    display: none; /* ซ่อนเมนูแบบข้อความบนมือถือ */
  }
  .brand-sub,
  .user-badge {
    display: none;
  }
}
</style>
