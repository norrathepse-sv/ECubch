# Product Specification: UBCH Human Research Ethics Committee Website

## 📌 ภาพรวมของระบบ (Product Overview)
ระบบเว็บไซต์สำหรับ **คณะกรรมการจริยธรรมการวิจัยในมนุษย์ โรงพยาบาลมะเร็งอุบลราชธานี กรมการแพทย์ (UBCH REC)** สร้างขึ้นเพื่อเป็นศูนย์กลางในการเผยแพร่ข้อมูลข่าวสาร ขั้นตอนการดำเนินงาน มาตรฐานการปฏิบัติงาน (SOP) และตารางการประชุมประจำปี เพื่ออำนวยความสะดวกให้แก่ผู้วิจัยและบุคลากรทางการแพทย์ที่ต้องการยื่นขอพิจารณาจริยธรรมการวิจัย

## 🎯 วัตถุประสงค์ (Objectives)
* เพื่อเป็นช่องทางหลักในการสื่อสารระหว่างคณะกรรมการจริยธรรมฯ และผู้วิจัย
* เพื่อลดความซับซ้อนในการเข้าถึงเอกสารและแบบฟอร์มที่จำเป็นสำหรับการขอรับรอง
* เพื่อให้ผู้วิจัยสามารถติดตามกำหนดการประชุมและรอบการพิจารณาโครงการได้อย่างถูกต้อง
* เพื่อรองรับการแสดงผลบนทุกอุปกรณ์ (Responsive Design) ทั้ง Desktop, Tablet และ Mobile

## 💻 เทคโนโลยีที่ใช้ (Tech Stack)
* **Framework:** Vue.js 3 (Composition API)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS v4
* **Language:** TypeScript
* **Routing:** Vue Router

## ✨ ฟีเจอร์หลัก (Key Features & Components)

### 1. User Interface (Public Facing)
* **Responsive Navigation (`AppNavbar.vue`):** แถบเมนูนำทางที่รองรับการแสดงผลแบบ Dropdown บน Desktop และปรับเป็น Hamburger Menu แบบ Accordion สำหรับ Mobile
* **Hero Image Slider (`ImageSlider.vue`):** ระบบภาพสไลด์อัตโนมัติบริเวณส่วนบนสุดของเว็บไซต์ พร้อมข้อความซ้อนทับ (Text Overlay) สำหรับนำเสนอวิสัยทัศน์และภาพลักษณ์ขององค์กร
* **Document Management (`DocumentCard.vue`):** คอมโพเนนต์แสดงรายการเอกสาร (เช่น SOP, แบบฟอร์มเสนอโครงการ) ที่รองรับการแสดงผลไอคอนตามประเภทไฟล์ (PDF, Word) แสดงขนาดไฟล์ และวันที่อัปเดต พร้อมปุ่มดาวน์โหลด
* **Meeting Schedule (`MeetingSchedule.vue`):** ตารางแสดงกำหนดการประชุมประจำปี รูปแบบกึ่งเอกสารทางการ (A4 Style) ที่สามารถกำหนดครั้งที่ประชุมและวันเดือนปีได้อย่างอิสระ
* **Photo Gallery Grid:** ส่วนแสดงภาพบรรยากาศการทำงานแบบ Grid พร้อมแถบข้อความคาดกลางเพื่อเน้นย้ำความพร้อมในการให้คำปรึกษาแก่ผู้วิจัย

### 2. Back Office / Admin Panel (Planned Phase)
* ระบบล็อคอิน (Login) สำหรับผู้ดูแลระบบ
* ระบบจัดการเอกสารดาวน์โหลด (Upload/Edit/Delete Document)
* ระบบจัดการตารางการประชุม (เพิ่ม/แก้ไขรอบการประชุม)
* ระบบจัดการภาพสไลด์และภาพแกลเลอรี
* *(ฟีเจอร์อื่นๆ ในส่วน Admin จะถูกพัฒนาในเฟสถัดไป)*

## 📂 โครงสร้างคอมโพเนนต์หลัก (Component Structure)
```text
src/
├── components/
│   ├── AppNavbar.vue         # เมนูนำทางหลัก
│   ├── AppFooter.vue         # ส่วนท้ายของเว็บไซต์
│   ├── ImageSlider.vue       # ภาพสไลด์ Hero Section
│   ├── DocumentCard.vue      # การ์ดเอกสารสำหรับดาวน์โหลด
│   └── MeetingSchedule.vue   # ตารางกำหนดการประชุม
├── views/
│   ├── HomeView.vue          # หน้าแรก (Hero, Gallery)
│   ├── StandardsView.vue     # หน้ามาตรฐานงานวิจัย (SOP)
│   ├── ProceduresView.vue    # หน้าขั้นตอนการดำเนินงาน
│   └── ContactView.vue       # หน้าติดต่อเรา
└── assets/
    └── css/
        └── style.css         # ไฟล์กำหนดค่า CSS เริ่มต้นและ Theme ของ Tailwind