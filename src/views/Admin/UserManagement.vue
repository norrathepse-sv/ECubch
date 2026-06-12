<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">จัดการผู้ใช้งานระบบ</h2>
      <button
        @click="openModal()"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        + เพิ่มผู้ใช้งาน
      </button>
    </div>

    <div v-if="isLoading" class="text-center py-10 text-gray-500">กำลังโหลดข้อมูล...</div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ชื่อ-นามสกุล
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              LINE ID
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              สิทธิ์การใช้งาน (Role)
            </th>
            <th
              class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              จัดการ
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <img
                  v-if="user.avatar_url"
                  :src="user.avatar_url"
                  class="h-8 w-8 rounded-full mr-3"
                  alt="avatar"
                />
                <div
                  class="h-8 w-8 rounded-full bg-gray-200 mr-3 flex items-center justify-center text-gray-500"
                  v-else
                >
                  {{ user.name.charAt(0) }}
                </div>
                <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ user.line_id || "-" }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="
                  user.role === 'admin'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                "
              >
                {{ user.role === "admin" ? "ผู้ดูแลระบบ" : "ผู้ใช้งานทั่วไป" }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
              <button @click="openModal(user)" class="text-indigo-600 hover:text-indigo-900 mr-4">
                แก้ไข
              </button>
              <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">
                ลบ
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <h3 class="text-lg font-bold mb-4">
          {{ isEditing ? "แก้ไขข้อมูลผู้ใช้" : "เพิ่มผู้ใช้ใหม่" }}
        </h3>

        <form @submit.prevent="saveUser">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">ชื่อ-นามสกุล</label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">LINE ID (User ID)</label>
            <input
              v-model="form.line_id"
              type="text"
              required
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="U1234567890abcdef..."
            />
            <p class="text-xs text-gray-500 mt-1">ต้องเป็น ID ที่ได้จาก LINE Developer Console</p>
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >สิทธิ์การใช้งาน (Role)</label
            >
            <select
              v-model="form.role"
              class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="admin">ผู้ดูแลระบบ (Admin)</option>
              <option value="user">ผู้ใช้งานทั่วไป (User)</option>
            </select>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              :disabled="isSaving"
            >
              {{ isSaving ? "กำลังบันทึก..." : "บันทึกข้อมูล" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

// ตั้งค่า Base URL ให้ตรงกับโปรเจกต์คุณ (แนะนำให้ใช้ .env ในอนาคต)
const API_URL = "http://10.180.10.71:8000/api";

const users = ref<any[]>([]);
const isLoading = ref(true);
const isModalOpen = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);

const form = ref({
  id: null as number | null,
  name: "",
  line_id: "",
  role: "user",
});

// ดึงข้อมูลผู้ใช้ทั้งหมด
const fetchUsers = async () => {
  try {
    isLoading.value = true;
    const token = localStorage.getItem("auth_token");
    const response = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }, // ส่ง Token ไปด้วย
    });
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    alert("ไม่สามารถดึงข้อมูลผู้ใช้ได้ อาจหมดอายุการเชื่อมต่อ");
  } finally {
    isLoading.value = false;
  }
};

// เปิด Modal (แยกกรณี เพิ่มใหม่ vs แก้ไข)
const openModal = (user: any = null) => {
  if (user) {
    isEditing.value = true;
    form.value = { id: user.id, name: user.name, line_id: user.line_id, role: user.role };
  } else {
    isEditing.value = false;
    form.value = { id: null, name: "", line_id: "", role: "user" };
  }
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// บันทึกข้อมูล (POST หรือ PUT)
const saveUser = async () => {
  try {
    isSaving.value = true;
    const headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };

    if (isEditing.value && form.value.id) {
      // แก้ไข
      await axios.put(`${API_URL}/users/${form.value.id}`, form.value, { headers });
      alert("อัปเดตข้อมูลสำเร็จ");
    } else {
      // เพิ่มใหม่
      await axios.post(`${API_URL}/users`, form.value, { headers });
      alert("เพิ่มผู้ใช้งานสำเร็จ");
    }

    closeModal();
    fetchUsers(); // รีโหลดตาราง
  } catch (error: any) {
    console.error("Error saving user:", error);
    if (error.response?.data?.errors?.line_id) {
      alert("LINE ID นี้มีในระบบแล้ว!");
    } else {
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  } finally {
    isSaving.value = false;
  }
};

// ลบผู้ใช้
const deleteUser = async (id: number) => {
  if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?")) return;

  try {
    await axios.delete(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchUsers(); // รีโหลดตาราง
  } catch (error: any) {
    console.error("Error deleting user:", error);
    alert(error.response?.data?.message || "เกิดข้อผิดพลาดในการลบข้อมูล");
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
