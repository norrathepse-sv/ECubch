<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import DocumentList from "@/components/DocumentList.vue";
import DocumentModal from "@/components/DocumentModal.vue";

const router = useRouter();
const meetings = ref<any[]>([]);
const uploadProgress = ref(0);
const isUploading = ref(false);
const isLoading = ref(true);

// ข้อมูลจำลองสำหรับ "ภาพสไลด์"
const slides = ref([
  {
    id: 1,
    title: "วาระที่ 1: รายงานการประชุมครั้งที่แล้ว",
    url: "https://placehold.co/600x400?text=Slide+1",
  },
  {
    id: 2,
    title: "วาระที่ 2: เรื่องเสนอเพื่อพิจารณา",
    url: "https://placehold.co/600x400?text=Slide+2",
  },
  { id: 3, title: "วาระที่ 3: เรื่องอื่นๆ", url: "https://placehold.co/600x400?text=Slide+3" },
]);

// 1. ข้อมูลจำลองสำหรับ "เอกสารดาวน์โหลด" (อนาคตสามารถดึงจาก API ได้เช่นกัน)
// ข้อมูลจำลอง
const documents = ref([{ id: 1, name: "แบบฟอร์มเสนอโครงการวิจัย", size: "1.2 MB", url: "#" }]);

// ตัวแปรสำหรับคุม Modal
const isDocModalOpen = ref(false);
const editingDoc = ref<any>(null); // เก็บข้อมูลตัวที่จะแก้

// เปิดฟอร์ม "เพิ่ม"
const handleAddDoc = () => {
  editingDoc.value = null; // เคลียร์ของเก่าทิ้ง
  isDocModalOpen.value = true;
};

// เปิดฟอร์ม "แก้ไข"
const handleEditDoc = (doc: any) => {
  editingDoc.value = doc; // ส่งของเก่าไปให้ฟอร์ม
  isDocModalOpen.value = true;
};

// ยืนยันการลบ
const handleDeleteDoc = (id: number) => {
  if (confirm("คุณแน่ใจหรือไม่ที่จะลบเอกสารนี้?")) {
    documents.value = documents.value.filter((doc) => doc.id !== id);
    // TODO: ยิง API delete ไปหา Laravel
  }
};

// เมื่อกดปุ่ม "บันทึกข้อมูล" ใน Modal
const saveDocument = async (formData: any) => {
  const token = localStorage.getItem("auth_token");
  const data = new FormData();
  data.append("name", formData.name);
  if (formData.file) data.append("file", formData.file);

  let url = "http://10.180.10.71:8000/api/documents";
  if (formData.id) {
    data.append("_method", "PUT");
    url = `http://10.180.10.71:8000/api/documents/${formData.id}`;
  }

  try {
    isLoading.value = true;
    isUploading.value = true;
    uploadProgress.value = 0;

    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          uploadProgress.value = percentCompleted;
        }
      },
    });

    // 🔥 [แก้ไขจุดนี้] ดึงข้อมูลจากดาด้าเบสใหม่ยกแผงทันที ข้อมูลจะอัปเดตตรงกับ DB 100%
    await fetchData();

    isDocModalOpen.value = false; // ปิดป๊อปอัป
  } catch (error: any) {
    if (error.response && error.response.status === 422) {
      alert("ข้อมูลไม่ถูกต้อง: " + JSON.stringify(error.response.data.errors));
    } else {
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
    console.error(error);
  } finally {
    isLoading.value = false;
    isUploading.value = false;
    uploadProgress.value = 0;
  }
};

const fetchDocuments = async () => {
  const token = localStorage.getItem("auth_token");

  try {
    // ยิงไปที่ API ที่เราสร้างไว้ใน DocumentController@index
    const response = await axios.get("http://10.180.10.71:8000/api/documents", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    // เอาข้อมูลจริงที่ได้จาก DB มาใส่ตัวแปร documents แทนที่ของจำลอง
    documents.value = response.data;
  } catch (error) {
    console.error("โหลดเอกสารไม่สำเร็จ:", error);
  }
};

// ฟังก์ชันดึงข้อมูลตารางการประชุมจาก API
const fetchData = async () => {
  const token = localStorage.getItem("auth_token");

  if (!token) {
    router.push("/login");
    return;
  }

  try {
    const meetingsResponse = await axios.get("http://10.180.10.71:8000/api/meetings", {
      headers: { Authorization: `Bearer ${token}` },
    });
    meetings.value = meetingsResponse.data;
  } catch (error) {
    console.error("ไม่สามารถดึงข้อมูลระบบได้:", error);
    localStorage.removeItem("auth_token");
    router.push("/login");
  } finally {
    isLoading.value = false;
  }
};

// 2. ปรับ onMounted ให้เรียกทั้งตารางประชุมและเอกสาร
onMounted(() => {
  fetchData(); // ดึงตารางประชุม
  fetchDocuments(); // 🔥 เพิ่มตรงนี้เข้าไปครับ
});
</script>

<template>
  <div class="dashboard-wrapper">
    <div class="container">
      <section class="card">
        <div class="card-header">
          <h3>📅 ตารางการประชุมคณะกรรมการฯ</h3>
        </div>

        <div v-if="isLoading" class="loading-box">กำลังโหลดข้อมูลตารางการประชุม...</div>

        <div v-else class="table-responsive">
          <table class="meeting-table">
            <thead>
              <tr>
                <th style="width: 40%; text-align: center">ประชุมครั้งที่</th>
                <th style="width: 60%; text-align: center">วันประชุม</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(m, index) in meetings" :key="index">
                <td style="text-align: center">
                  <strong>{{ m.round }}</strong>
                </td>
                <td style="text-align: center">{{ m.date || "-" }}</td>
              </tr>
              <tr v-if="meetings.length === 0">
                <td colspan="2" class="empty-row">ไม่พบข้อมูลกำหนดการประชุม</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card">
        <div class="card-header">
          <h3>📄 เอกสารดาวน์โหลดที่เกี่ยวข้อง</h3>
        </div>
        <DocumentList
          :documents="documents"
          @add="handleAddDoc"
          @edit="handleEditDoc"
          @delete="handleDeleteDoc"
        />

        <DocumentModal
          :is-open="isDocModalOpen"
          :document-data="editingDoc"
          :upload-progress="uploadProgress"
          :is-uploading="isUploading"
          @close="isDocModalOpen = false"
          @save="saveDocument"
        />
      </section>

      <section class="card">
        <div class="card-header">
          <h3>🖼️ ภาพสไลด์สรุปวาระ</h3>
        </div>
        <div class="slide-grid">
          <div v-for="s in slides" :key="s.id" class="slide-item">
            <img :src="s.url" class="slide-img" />
            <p class="slide-caption">{{ s.title }}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  background-color: #f0f2f5;
  min-height: 100vh;
  font-family: "Sarabun", sans-serif;
  padding-top: 2rem;
  padding-bottom: 3rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}
.card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
  background: #fafafa;
}
.card-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.1rem;
}

/* Table Style */
.table-responsive {
  overflow-x: auto;
}
.meeting-table {
  width: 100%;
  border-collapse: collapse;
}
.meeting-table th,
.meeting-table td {
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}
.meeting-table th {
  background: #f8f9fa;
  color: #555;
  font-weight: bold;
}
.empty-row {
  text-align: center;
  color: #888;
  padding: 2rem !important;
  font-style: italic;
}
.loading-box {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
}

/* Document List Style (ส่วนที่เพิ่มใหม่) */
.document-list {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.doc-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  transition: all 0.2s;
}
.doc-item:hover {
  border-color: #004d40;
  background-color: #f0fdfa;
}
.doc-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.doc-icon {
  width: 40px;
  height: 40px;
  color: #004d40;
  background: #e0f2f1;
  padding: 8px;
  border-radius: 8px;
}
.doc-name {
  margin: 0;
  font-weight: bold;
  color: #333;
  font-size: 1rem;
}
.doc-size {
  margin: 0;
  color: #777;
  font-size: 0.85rem;
  margin-top: 2px;
}
.btn-download {
  display: inline-flex;
  align-items: center;
  background-color: #004d40;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: bold;
  transition: 0.2s;
}
.btn-download:hover {
  background-color: #00332a;
}

/* Slide Grid Style */
.slide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}
.slide-item {
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  transition: 0.3s;
}
.slide-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
.slide-img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}
.slide-caption {
  padding: 0.8rem;
  font-size: 0.9rem;
  color: #444;
  font-weight: bold;
  margin: 0;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .doc-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  .btn-download {
    width: 100%;
    justify-content: center;
  }
}
</style>
