# Yazlab1-3 E-Ticaret Uygulaması

Bu proje, Kocaeli Üniversitesi Yazılım Laboratuvarı I - 3. Proje kapsamında geliştirilmiş bir e-ticaret uygulamasıdır. Proje, Next.js kullanılarak geliştirilmiş ve MongoDB veritabanı ile entegre edilmiştir.

## Proje Özellikleri

- Ürün listeleme ve detay görüntüleme
- Kullanıcı kaydı ve girişi
- Sepet yönetimi
- Sipariş oluşturma ve takip etme
- Admin paneli ile ürün ve sipariş yönetimi
- Semafor mekanizması ile eşzamanlı işlem yönetimi

## Teknolojiler

- **Frontend:** React, Next.js
- **Backend:** Next.js API Routes
- **Veritabanı:** MongoDB (Mongoose)
- **Kimlik Doğrulama:** JWT (JSON Web Token)
- **Stil:** Tailwind CSS, Bootstrap
- **HTTP İstekleri:** Axios

## Başlangıç

Projeyi yerel makinenizde çalıştırmak için aşağıdaki adımları izleyin:

1. Projeyi klonlayın:
```bash
git clone <repo-url>
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env.local` dosyası oluşturun ve MongoDB bağlantı URL'inizi ekleyin:
```
MongoDBUrl=your_mongodb_connection_string
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyebilirsiniz.

## Proje Yapısı

- `/src/app`: Next.js sayfaları ve API rotaları
- `/src/components`: Yeniden kullanılabilir React bileşenleri
- `/src/models`: Mongoose veri modelleri
- `/src/lib`: Yardımcı fonksiyonlar ve kütüphaneler
- `/src/utils`: Yardımcı işlevler
- `/src/middlewares`: Middleware fonksiyonları

## Semafor Mekanizması

Bu projede, eşzamanlı stok güncellemelerini yönetmek için semafor mekanizması kullanılmıştır. Semafor işlemi şu adımları içerir:

1. İşlem başlatılır ve semafor alınır
2. Stok güncellemesi yapılır
3. İşlem tamamlanır ve semafor serbest bırakılır
4. Tüm işlemler loglama sistemi ile kayıt altına alınır

## Katkıda Bulunanlar

- Yunus Hanifi Öztürk
- Eyüp Ensar Kara

## Lisans

Bu proje açık kaynak olarak lisanslanmıştır.
