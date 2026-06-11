<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
    <h2 class="text-xl font-bold text-navy mb-4">สร้างหัวข้อข่าวใหม่</h2>
    <form @submit.prevent="saveNews" class="space-y-4">
      <input
        v-model="form.title"
        placeholder="ชื่อข่าว"
        class="w-full p-2 border rounded-lg"
        required
      />
      <input
        v-model="form.subtitle"
        placeholder="คำอธิบายสั้น"
        class="w-full p-2 border rounded-lg"
      />
      <textarea
        v-model="form.content"
        placeholder="เนื้อหาข่าว..."
        rows="5"
        class="w-full p-2 border rounded-lg"
        required
      ></textarea>

      <button type="submit" class="bg-gold text-white px-6 py-2 rounded-full font-bold">
        บันทึกข่าว
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const form = ref({ title: "", subtitle: "", content: "" });

const saveNews = async () => {
  await axios.post("http://10.180.10.71:8000/api/admin/news", form.value);
  alert("สร้างข่าวสำเร็จ! ตอนนี้ไปเลือกข่าวในหน้าอัปโหลดสไลด์ได้เลย");
  form.value = { title: "", subtitle: "", content: "" };
};
</script>
