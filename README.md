# Fix Finans 13.1.7 — Android APK

Bu proje, mevcut Fix Finans web uygulamasını Android WebView içinde yerel asset olarak çalıştırır.

## Uygulama davranışı
- Chrome adres çubuğu yoktur.
- Uygulama doğrudan Fix Finans açılış ekranını gösterir.
- LocalStorage / DOM Storage WebView içinde aktiftir.
- PWA "Ana Ekrana Ekle" düğmesi APK içinde gösterilmez; uygulama zaten telefona kurulmuş uygulamadır.
- Temel kullanım için internet izni gerekmez.
- Web uygulamasının mevcut finans, gelir/gider ve borç/alacak mantığı korunur.

## APK derleme
Android Studio ile `android-app` klasörünü açıp Gradle sync yaptıktan sonra:
`Build > Build APK(s)`

Komut satırı için Android SDK + Gradle 8.7+ ve JDK 17/21 gerekir.

Not: Bu çalışma ortamında Android SDK/Gradle kurulu olmadığı için derlenmiş `.apk` dosyası bu pakete eklenemedi; kaynak proje gerçek APK üretimine hazırlandı.
