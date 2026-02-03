# TravelTrucks – Camper Rental App

TravelTrucks, karavan kiralama alanında faaliyet gösteren bir şirket için geliştirilmiş bir frontend web uygulamasıdır.  
Uygulama, kullanıcıların karavanları listeleyip filtreleyebileceği, favorilere ekleyebileceği ve detaylarını inceleyebileceği bir yapı sunar.

---

## 🚐 Proje Özeti

Bu proje, React ve Redux kullanılarak geliştirilmiş bir karavan kiralama platformunun frontend kısmını kapsar.  
Uygulama; ana sayfa, katalog sayfası ve karavan detay sayfasından oluşur.

Backend olarak verilen **MockAPI** kullanılmıştır.

API:  
https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers

---

## 🛠 Kullanılan Teknolojiler

- **React** (Vite)
- **Redux Toolkit** (global state yönetimi)
- **React Router** (sayfa yönlendirme)
- **Axios** (API istekleri)
- **CSS Modules** (stillendirme)

---

## 📄 Sayfalar

### 🏠 Ana Sayfa (`/`)
- Call to Action (CTA) banner
- “View Now” butonu ile katalog sayfasına yönlendirme

### 📋 Katalog Sayfası (`/catalog`)
- Tüm karavanların listelenmesi
- Filtreleme seçenekleri:
  - Konum (metin)
  - Araç tipi (tek seçim)
  - Ek özellikler (çoklu seçim: AC, Kitchen, Bathroom, TV, Automatic)
- “Load More” butonu ile kart yükleme
- Favorilere ekleme özelliği
- Fiyatların UI’da ondalıklı gösterimi (örn. 8000.00)

### 🚐 Karavan Detay Sayfası (`/catalog/:id`)
- Karavanın detaylı bilgileri
- Fotoğraf galerisi
- Özellikler ve teknik detaylar
- Kullanıcı yorumları
- Rezervasyon formu ve başarı bildirimi

---

## 🔄 State Management (Redux)

Redux global state üzerinde aşağıdaki veriler tutulmaktadır:

- Karavan listesi
- Yüklenme durumu (loading)
- Hata durumu (error)
- Favorilere eklenen karavanlar

UI’a özgü filtre seçimleri (konum, ekipman, araç tipi) **local state** olarak yönetilmiştir.

---

## 🔍 Filtreleme Hakkında Önemli Not

Proje gereksinimlerinde filtreleme işleminin backend tarafında yapılması belirtilmiştir.  
Ancak sağlanan **MockAPI**, query parametreleriyle filtreleme desteği sunmadığı için filtreleme işlemi frontend tarafında uygulanmıştır.

Bu nedenle:
- Tüm ilanlar backend’den çekilir
- Filtreleme işlemleri frontend üzerinde gerçekleştirilir

---

## ⏳ Yüklenme Durumu

Asenkron API istekleri sırasında kullanıcıya bilgi vermek için loading indicator kullanılmıştır.

---

## 📦 Kurulum ve Çalıştırma

Projeyi lokal ortamda çalıştırmak için:

```bash
git clone <repo-url>
cd traveltrucks
npm install
npm run dev
