<template>
  <div class="vue-infographic-container p-4 md:pt-32 md:pb-12 pt-24 w-full flex flex-col items-center justify-center text-gray-800">
    
    <AppBreadcrumb :items="breadcrumbList" />
   
    <div class="bg-white max-w-7xl w-full rounded-[2rem] box-shadow-custom overflow-hidden relative z-10 border border-gray-100">
        
        <div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-50 to-pink-50 opacity-50 z-0"></div>
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div class="absolute -top-24 -left-24 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>

        <div class="relative z-10 pt-10 pb-6 px-8 flex flex-col md:flex-row items-center justify-between border-b border-gray-100">
            <div class="flex items-center mb-4 md:mb-0">
                <img src="/images/logoUBCH.png" alt="โลโก้โรงพยาบาลมะเร็งอุบลราชธานี" class="h-16 md:h-20 w-auto object-contain drop-shadow-sm" @error="handleImageError">
                <div v-if="imageError" class="text-sm text-pink-700 font-bold leading-tight">โรงพยาบาลมะเร็ง<br>อุบลราชธานี</div>
            </div>

            <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-600 drop-shadow-sm mb-4 md:mb-0">
                โครงสร้างและองค์ประกอบ<br class="md:hidden">คณะกรรมการจริยธรรมการวิจัยในมนุษย์
            </h1>

            <div class="flex flex-col items-center">
                <div class="flex space-x-1 mb-1">
                    <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">D</div>
                    <div class="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">M</div>
                    <div class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">S</div>
                </div>
                <div class="text-[10px] text-gray-500 text-center leading-tight">
                    กรมการแพทย์<br>"ทำดีที่สุดเพื่อทุกชีวิต"
                </div>
            </div>
        </div>

        
        <div class="connecting-line hidden lg:block"></div>
        <div class="relative z-10 p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <div class="lg:col-span-5 flex flex-col items-center space-y-0 relative">
                
                <div class="w-full bg-gradient-to-b from-blue-800 to-blue-600 rounded-2xl shadow-lg p-5 text-center transform transition-transform hover:scale-[1.02] border border-blue-400 relative z-10">
                    <h2 class="text-xl font-bold text-white mb-2">โรงพยาบาลมะเร็งอุบลราชธานี</h2>
                    <p class="text-blue-100 text-sm font-medium">นพ.สิทธิชัย อาชายินดี</p>
                    <p class="text-blue-200 text-xs mt-1">ผู้อำนวยการโรงพยาบาล</p>
                </div>
                
                <div class="w-1 h-8 bg-gradient-to-b from-blue-600 to-blue-500"></div>

                <div class="w-11/12 bg-gradient-to-b from-blue-700 to-blue-600 rounded-2xl shadow-md p-4 text-center transform transition-transform hover:scale-[1.02] border border-blue-400 z-10">
                    <h2 class="text-lg font-semibold text-white mb-1">ภารกิจด้านการพัฒนาระบบสุขภาพ</h2>
                    <p class="text-blue-100 text-sm">พญ.ดาริกา ดาโรจน์</p>
                      <p class="text-blue-100 text-xs mt-0.5">(รองผู้อำนวยการด้านพัฒนาระบบสุขภาพ)</p>
                </div>

                <div class="w-1 h-8 bg-blue-500"></div>

                <div class="w-10/12 bg-gradient-to-b from-blue-700 to-blue-500 rounded-2xl shadow-md p-4 text-center transform transition-transform hover:scale-[1.02] border border-blue-300 z-10">
                    <h2 class="text-md font-semibold text-white mb-1 leading-snug">กลุ่มงานวิจัย ถ่ายทอด<br>และสนับสนุนวิชาการ</h2>
                    <p class="text-blue-100 text-sm mt-2">นพ.วิกรานต์ สอนถม</p>
                      <p class="text-blue-100 text-xs mt-0.5">(นายแพทย์ชำนาญการพิเศษ)</p>
                </div>

                <div class="w-1 h-8 bg-blue-400"></div>

                <div class="w-9/12 bg-gradient-to-b from-blue-600 to-blue-400 rounded-2xl shadow-md p-4 text-center transform transition-transform hover:scale-[1.02] border border-blue-300 z-10">
                    <h2 class="text-md font-semibold text-white mb-1">งานวิจัยและประเมินเทคโนโลยี</h2>
                    <p class="text-blue-50 text-sm mt-2">นพ.วิกรานต์ สอนถม</p>
                    <p class="text-blue-100 text-xs mt-0.5">(นายแพทย์ชำนาญการพิเศษ)</p>
                </div>

                <div class="w-1 h-8 bg-blue-300"></div>

                <div class="w-8/12 bg-gradient-to-b from-blue-500 to-blue-400 rounded-2xl shadow-sm p-3 text-center transform transition-transform hover:scale-[1.02] border border-blue-200 z-10">
                    <p class="text-white text-sm font-medium">นางสาวฐานิตา ปริณาพล</p>
                    <p class="text-blue-50 text-xs mt-0.5">(นักวิชาการสาธารณสุข)</p>
                </div>
            </div>

            <div class="lg:col-span-7 flex flex-col relative z-10 mt-8 lg:mt-0">
                
                <div class="bg-gradient-to-r  from-purple-800 to-purple-600 rounded-t-2xl shadow-lg p-5 text-center relative z-20 border-b-4 border-pink-500 ml-0 lg:ml-12">
                    <h2 class="text-xl font-bold text-white mb-2">คณะกรรมการจริยธรรมการวิจัยในมนุษย์</h2>
                    <p class="text-purple-100 text-sm font-medium">นางชลิยา วามะลุน</p>
                </div>

                <div class="bg-pink-50/80 backdrop-blur-sm border border-pink-200 rounded-b-2xl shadow-inner p-6 ml-0 lg:ml-12 relative flex-grow">
                    
                    <ul class="space-y-2.5 text-sm md:text-base text-gray-800 custom-scrollbar h-auto max-h-[500px] overflow-y-auto pr-2">
                        <li v-for="(member, index) in committeeMembers" :key="index" 
                            class="flex flex-col sm:flex-row justify-between sm:items-center pb-2 border-b border-pink-200/50 hover:bg-pink-100/50 p-2 rounded transition-colors">
                            <div class="flex items-center">
                                <span class="w-6" :class="member.highlight ? 'text-pink-600 font-bold' : 'text-gray-500 font-semibold'">
                                    {{ index + 1 }}.
                                </span> 
                                {{ member.name }}
                            </div>
                            <div class="sm:text-right mt-1 sm:mt-0" 
                                 :class="member.highlight ? 'text-purple-700 font-semibold' : 'text-gray-600'">
                                {{ member.role }}
                            </div>
                        </li>
                    </ul>

                    <div class="mt-6 -mb-12 relative flex justify-center lg:justify-end">
                        <div class="bg-pink-100 border-2 border-pink-300 rounded-xl px-6 py-3 shadow-md text-center inline-block">
                            <h3 class="text-purple-800 font-semibold text-sm">เจ้าหน้าที่ประจำสำนักงาน</h3>
                            <p class="text-gray-800 text-sm mt-1">นางสาวฐานิตา ปริณาพล</p>
                            <p class="text-gray-600 text-xs">(นักวิชาการสาธารณสุข)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="h-8 lg:h-4"></div>

        <div class="bg-gradient-to-r from-purple-800 to-purple-900 py-4 px-6 mt-8 flex flex-col md:flex-row items-center justify-between shadow-inner">
            
            <div class="flex space-x-2 mb-3 md:mb-0">
                <div class="w-10 h-10 rounded-full bg-white text-purple-800 flex items-center justify-center font-black text-xl shadow-lg border-2 border-purple-300">D</div>
                <div class="w-10 h-10 rounded-full bg-white text-pink-600 flex items-center justify-center font-black text-xl shadow-lg border-2 border-pink-300">M</div>
                <div class="w-10 h-10 rounded-full bg-white text-orange-500 flex items-center justify-center font-black text-xl shadow-lg border-2 border-orange-300">S</div>
            </div>

            <div class="text-white font-semibold text-lg md:text-xl tracking-wide text-center">
                ทำดีที่สุดเพื่อทุกชีวิต <span class="font-light text-purple-200 text-base md:text-lg">(DO OUR BEST FOR ALL)</span>
            </div>
            
            <div class="hidden md:block text-purple-300 font-bold">
                
            </div>
        </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import AppBreadcrumb from '@/components/AppBreadcrumb.vue';

// 3. กำหนดชื่อเมนูที่จะให้แสดงใน Breadcrumb
const breadcrumbList = ref([
  { name: 'เกี่ยวกับหน่วยงาน' }, // ไม่มี path แปลว่ากดไม่ได้ (แค่โชว์เฉยๆ)
  { name: 'โครงสร้างการบริหารภายในคณะกรรมการ' } // ตัวสุดท้ายจะเป็นสีเข้มอัตโนมัติ
]);
// จัดการเมื่อโหลดรูปภาพไม่สำเร็จ
const imageError = ref(false);
const handleImageError = (event) => {
    imageError.value = true;
    event.target.style.display = 'none';
};

// ข้อมูลรายชื่อคณะกรรมการ
const committeeMembers = ref([
    { name: 'นางชลิยา วามะลุน', role: 'ประธานกรรมการ', highlight: true },
    { name: 'นางชุติวรรณ วิวัฒนาสิทธิพงศ์', role: 'รองประธานฯ', highlight: true },
    { name: 'นางญาณิศา ศรศิลป์', role: 'รองประธานฯ', highlight: true },
    { name: 'นายดำรงฤทธิเดช ทองพิทักษ์', role: 'กรรมการ', highlight: false },
    { name: 'นางสาวนุสรา ประเสริฐศรี', role: 'กรรมการ', highlight: false },
    { name: 'นายวิกรานต์ สอนถม', role: 'กรรมการ', highlight: false },
    { name: 'นางชุตินันท์ สุทธิพงษ์ประชา', role: 'กรรมการ', highlight: false },
    { name: 'นายกฤษณดนัย ตันติเศรษฐ', role: 'กรรมการ', highlight: false },
    { name: 'นางสาวสายใจ ศุภอรรถกร', role: 'กรรมการ', highlight: false },
    { name: 'นายมงคลชัย อึ้งสายเชื้อ', role: 'กรรมการ', highlight: false },
    { name: 'นางอาภาเพ็ญ ทำนุ', role: 'กรรมการ', highlight: false },
    { name: 'นางสาวศิริลักษณ์ เงยวิจิตร', role: 'กรรมการ', highlight: false },
    { name: 'นางสาวอนุชตรา วรรณเสวก', role: 'กรรมการ', highlight: false },
    { name: 'นายกมล วิสุวรรณ', role: 'กรรมการ', highlight: false },
    { name: 'นายไชยา ก่องดวง', role: 'กรรมการ', highlight: false },
    { name: 'นางจิรังกูร ณัฐรังสี', role: 'กรรมการ', highlight: false },
    { name: 'นางพรพิมล ก้อนภูธร', role: 'กรรมการ', highlight: false },
    { name: 'นางโสภิต ทับทิมหิน', role: 'กรรมการ', highlight: false },
]);
</script>

<style scoped>
/* หมายเหตุ: หากเว็บดึง Font ไปใช้ในไฟล์ index.html หรือ style.css หลักแล้ว สามารถลบบรรทัด @import นี้ออกได้เลยครับ */
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap');

.vue-infographic-container {
    font-family: 'Kanit', sans-serif;
    background-color: #f0f4f8;
    background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
    background-size: 20px 20px;
}

/* Custom scrollbar for list */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: #fdf2f8; 
    border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #fbcfe8; 
    border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #f472b6; 
}

.box-shadow-custom {
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

/* Dashed connection line for Desktop */
@media (min-width: 1024px) {
    .connecting-line {
        position: absolute;
        top: 30%;
        left: 22%;
        width: 25%;
        height: 0%;
        border-top: 3px dashed #ef4444;
        border-right: 3px dashed #ef4444;
        border-top-right-radius: 12px;
        z-index: 0;
    }
}
</style>