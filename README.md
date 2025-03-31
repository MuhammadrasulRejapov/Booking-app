# Event Booking App

![Event Booking App](https://via.placeholder.com/800x400.png?text=Event+Booking+App)

Event Booking App — bu foydalanuvchilarga tadbirlarni yaratish, band qilish, bekor qilish va o‘chirish imkonini beruvchi veb-ilova. Ushbu loyiha Angular (frontend) va .NET (backend) texnologiyalari yordamida ishlab chiqilgan bo‘lib, foydalanuvchilarga qulay interfeys va autentifikatsiya tizimini taqdim etadi.

## Loyiha haqida

Ushbu loyiha tadbirlarni boshqarish uchun mo‘ljallangan. Foydalanuvchilar tizimga kirishi, yangi tadbirlar qo‘shishi, mavjud tadbirlarni band qilishi, band qilishni bekor qilishi yoki tadbirlarni o‘chirishi mumkin. Loyiha autentifikatsiya tizimi (login/logout) va server-side rendering (SSR) muammolarini hal qilish uchun maxsus optimallashtirilgan.

### Asosiy funksiyalar
- **Tadbirlarni yaratish:** Foydalanuvchilar tadbir nomi, sanasi, joylashuvi va o‘rinlar sonini kiritib, yangi tadbir qo‘shishi mumkin.
- **Tadbirlarni band qilish:** Foydalanuvchilar mavjud tadbirlarni band qilishi mumkin (agar o‘rinlar bo‘lsa).
- **Band qilishni bekor qilish:** Band qilingan tadbirlarni bekor qilish imkoniyati.
- **Tadbirlarni o‘chirish:** Foydalanuvchilar o‘z tadbirlarini o‘chirishi mumkin.
- **Autentifikatsiya:** Foydalanuvchilar tizimga kirishi va chiqishi mumkin (login/logout).
- **Vaqt o‘tgan tadbirlarni belgilash:** O‘tib ketgan tadbirlar avtomatik ravishda belgilanadi.

## Ishlatilgan texnologiyalar

- **Frontend:** Angular 19.2.5, TypeScript, SCSS
- **Backend:** .NET (ASP.NET Core)
- **API:** REST API (`http://localhost:5202/api`)
- **Autentifikatsiya:** JWT token
- **Boshqa:** RxJS (API so‘rovlar uchun), Angular Router (yo‘naltirish uchun)

## Loyihani ishga tushirish

Loyihani o‘z kompyuteringizda ishga tushirish uchun quyidagi qadamlarni bajaring.

### Talablar
- Node.js (v18 yoki undan yuqori)
- .NET SDK (v6 yoki undan yuqori)
- Angular CLI (v19.2.5)
- Git

### 1. Repositoriyani klonlash
```bash
git clone https://github.com/MuhammadrasulRejapov/Booking-app.git
cd Booking-app