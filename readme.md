# ✍️ Yazboz - Full-Stack Blog & Yazı Paylaşım Platformu

Yazboz; kullanıcıların spor, tarih, dijital ve genel kategorilerde yazılar oluşturabildiği, yorum yapabildiği ve görsel içerikler paylaşabildiği modern bir full-stack blog platformudur.

---

## 🚀 Özellikler

* **Kullanıcı Kimlik Doğrulama & Yetkilendirme:** Spring Security ve JWT (JSON Web Token) tabanlı güvenli oturum yönetimi.
* **Kategori Bazlı İçerik Yönetimi:** Tarih, Spor, Dijital ve Diğer kategorilerinde makale filtreleme ve listeleme.
* **Makale Oluşturma & Paylaşma:** Giriş yapmış kullanıcılar için zengin metin ve görsel yükleme paneli.
* **Medya Yönetimi:** Yüklenen makale kapak görsellerinin Cloudinary üzerinde güvenli depolanması ve CDN optimizasyonu.
* **Yorum Sistemi:** Makalelere anlık yorum ekleme ve okuma desteği.
* **Arama Sistemi:** Makale başlığı ve içeriğine göre arama yapabilme.
* **Global Durum Yönetimi:** Redux Toolkit ile kimlik doğrulama, makale ve yorum süreçlerinin merkezi kontrolü.

---

## 🛠️ Kullanılan Teknolojiler

| Alan | Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Frontend** | React 18 & Vite | Hızlı ve modüler kullanıcı arayüzü |
| **State Management** | Redux Toolkit | Global auth, makale ve yorum state yönetimi |
| **Routing** | React Router DOM | Tek sayfa uygulaması (SPA) yönlendirmesi |
| **Backend** | Spring Boot 3 / Java | RESTful API mimarisi |
| **Güvenlik** | Spring Security & JWT | Stateless token bazlı yetkilendirme |
| **Veritabanı** | PostgreSQL (Neon DB) | İlişkisel bulut veritabanı |
| **Medya Depolama** | Cloudinary API | Bulut tabanlı görsel depolama |
| **Dağıtım (Deploy)** | Render (Backend) & Vercel (Frontend) | Bulut barındırma ve CI/CD pipeline |

---

## 📁 Proje Dizin Yapısı

```text
yazboz/
├── backend/
│   ├── src/main/java/com/yigithas/
│   │   ├── config/          # CORS ve Security yapılandırmaları
│   │   ├── controller/      # Auth, Article, Comment API Controller'ları
│   │   ├── dto/             # İstek/Yanıt veri transfer nesneleri (DTO)
│   │   ├── models/          # JPA Entity sınıfları (Articles, Comment, Writers)
│   │   ├── repository/      # Spring Data JPA Repository arayüzleri
│   │   ├── security/        # JWT Filter ve Token servisleri
│   │   └── service/         # İş mantığı ve dosya yükleme servisleri
│   └── src/main/resources/  # application.properties yapılandırması
│
└── frontend/yazboz_react/
    ├── src/
    │   ├── assets/          # Logo ve statik görseller
    │   ├── components/      # Header, Footer, Navbar, Card bileşenleri
    │   ├── pages/           # Anasayfa, Detay, Panel, Login, Kategori sayfaları
    │   ├── redux/           # Slice'lar ve Store konfigürasyonu
    │   └── css/             # Sayfa ve bileşen stilleri
    └── vercel.json          # SPA yönlendirme yapılandırması