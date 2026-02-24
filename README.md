🚐 TravelTrucks - Camper Rental App
TravelTrucks, karavan tutkunlarının hayallerindeki araçları bulmalarını, filtrelemelerini ve kolayca rezervasyon yapmalarını sağlayan modern bir web uygulamasıdır. Kullanıcı dostu arayüzü ve güçlü filtreleme özellikleriyle en iyi karavan kiralama deneyimini sunar.

🚀 Öne Çıkan Özellikler
Dinamik Katalog: API üzerinden çekilen gerçek zamanlı karavan ilanları.

Gelişmiş Filtreleme: Konum, araç tipi ve teknik donanımlara (Klima, Mutfak, TV, vb.) göre anlık arama.

Favori Yönetimi: Beğenilen araçları favorilere ekleme ve sayfa yenilense bile bu listeyi koruma (Redux Persist).

Detaylı İnceleme: Her aracın teknik özellikleri, fotoğraf galerisi ve kullanıcı yorumlarına ulaşım.

Akıllı Rezervasyon: Tarih seçimi ve anlık bildirim sistemi içeren entegre rezervasyon formu.

Kesintisiz UX: Sayfalamada "Load More" desteği ve veri yükleme aşamasında profesyonel "Custom Loader" animasyonu.

🛠️ Kullanılan Teknolojiler
Core: React 18, Vite

State Management: Redux Toolkit, Redux Persist (Local Storage entegrasyonu için)

Routing: React Router 6 (SPA yönlendirme yapısı)

API Client: Axios

UI & Styling: CSS Modules (Bileşen tabanlı stil yönetimi), React Hot Toast (Bildirimler), React Datepicker

Icons: Figma tasarımına sadık kalınarak optimize edilmiş SVG setleri.

🏗️ Kurulum ve Çalıştırma
Projeyi yerel makinenizde çalıştırmak için şu adımları izleyin:

Depoyu klonlayın:

Bash
git clone [repo-url-buraya-gelecek]
Bağımlılıkları yükleyin:

Bash
npm install
Uygulamayı başlatın:

Bash
npm run dev
Tarayıcıda açın: http://localhost:5173

🧠 Teknik Kararlar ve Çözümler
Scroll Management: Veri yükleme (Loading) esnasında sayfanın kaymasını engellemek için useEffect cleanup mekanizması kullanılarak overflow: hidden mantığı uygulanmıştır.

Backend Filtreleme & Sayfalama: Veri trafiğini optimize etmek ve ödev kriterlerini karşılamak amacıyla filtreleme ve sayfalama işlemleri Backend (MockAPI) tarafında yönetilmektedir. İstemci (Frontend), sadece gerekli params değerlerini (location, form, equipment) API'ye göndererek filtrelenmiş veriyi çeker.

Deployment Configuration: Single Page Application (SPA) yönlendirme hatalarını önlemek için Vercel üzerinde vercel.json yapılandırması kullanılarak tüm rotalar ana dizine (index.html) yönlendirilmiştir.

Hata Yönetimi: API'den dönen 404 (Sonuç bulunamadı) durumları özel olarak yakalanmış ve uygulamanın çökmesi engellenerek kullanıcıya temiz bir "bulunamadı" geri bildirimi sağlanmıştır.

Figma Sadakati: Tüm ikonlar ve görsel yerleşimler orijinal Figma tasarımına sadık kalınarak, pixel-perfect anlayışıyla geliştirilmiştir.

Sticky/Fixed UI: Rezervasyon formu ve detay sekmeleri, kullanıcı deneyimini artırmak için sayfa akışına göre optimize edilmiştir.

Price Formatting: Ödev kriterlerine uygun olarak tüm fiyatlar toFixed(2) ile standart ondalık formatta gösterilmektedir.

👤 Yazar
İsim: Burcu Budak

Rol: Frontend Developer






🚐✨