# ANKARA DOĞA KAMPÜSÜ WEB PLATFORMU PROJE RAPORU

Bu rapor, Ankara Doğa Kampüsü web platformunun geliştirilme sürecini, tasarım ve teknik mimari kararlarını, karşılaşılan zorlukları, kullanılan yapay zeka entegrasyonlarını ve performans ölçüm sonuçlarını detaylandırmaktadır.

---

## 1. MÜŞTERİ TANITIMI VE İHTİYAÇ ANALİZİ

### 1.1. Müşteri Tanıtımı
**Ankara Doğa Kampüsü**, Ankara’nın Kazan ilçesi Güvenç bölgesinde konumlanan, çocukların, gençlerin ve ailelerin doğayla buluşarak macera ve eğitim dolu deneyimler yaşamasını hedefleyen premium bir kamp, dinlenme ve doğa aktiviteleri merkezidir. Tesis bünyesinde çadır kampları, kaya tırmanışı, okçuluk, oriyantiring (hedef bulma), çevre ve sanat atölyeleri ile günübirlik "kendin pişir kendin ye" konseptli mangal hizmeti sunulmaktadır.

### 1.2. İhtiyaç Analizi ve Proje Hedefleri
Projenin temel amacı, tesisin vizyonunu dijital dünyaya yansıtacak premium, modern ve yüksek performanslı bir web arayüzü geliştirmektir. Yapılan ihtiyaç analizi sonucunda şu işlevsel ve teknik gereksinimler belirlenmiştir:
* **Hizmet Tanıtımları**: Kamp türleri, doğa aktiviteleri ve mangal hizmetinin görsel ağırlıklı, premium kart tasarımlarıyla sunulması.
* **Rezervasyon Altyapısı**: Kullanıcıların kolayca rezervasyon talebi oluşturabileceği, sunucusuz (serverless) çalışan dinamik bir form entegrasyonu.
* **Durum (State) Korumalı Çoklu Dil Desteği**: Türkçe (TR) ve İngilizce (EN) dilleri arasında sayfa yenilenmeden dinamik dil geçişi yapılması ve bu tercihin sonraki ziyaretlerde korunması.
* **Karanlık Mod (Dark Mode)**: Modern kullanıcı alışkanlıklarına ve sistem tercihlerine duyarlı, göz yormayan, premium bir karanlık tema geçişi.
* **Hız ve Mobil Uyumluluk (Lighthouse Optimizasyonu)**: Mobil cihazlarda hızlı yüklenen, erişilebilirliği en üst düzeyde (A11y), SEO kriterlerine tam uyumlu bir web platformu.
* **Çoklu Sayfa (Multi-Page) Mimarisi**: Ana sayfa üzerindeki yükü hafifletmek, SEO gücünü artırmak ve kullanıcıların odaklanmasını kolaylaştırmak amacıyla "Etkinlikler", "İletişim & Rezervasyon" ve "Mangal Hizmeti" bölümlerinin bağımsız HTML sayfalarında sunulması.

---

## 2. TASARIM KARARLARI (RENK PALETİ, TİPOGRAFİ VE YERLEŞİM)

### 2.1. Renk Paleti (Color Palette)
Tasarımda doğa, orman, macera ve premium hizmet temalarını desteklemek amacıyla HSL tabanlı, CSS değişkenleriyle yönetilen özel bir renk paleti kurgulanmıştır:
* **Ana Renk (Primary)**: Orman yeşili (`#1b4332` / `hsl(156, 58%, 16%)`) - Güven, doğa ve dinginlik hissi verir.
* **Koyu Tema Arka Planı**: Gece yeşili (`#081c15` / `hsl(159, 56%, 7%)`) - Karanlık modda derinlik kazandırır.
* **Vurgu Rengi (Accent)**: Sıcak altın/kum sarısı (`#d4a373` / `hsl(30, 52%, 64%)`) - Premium kaliteyi, kamp ateşini ve enerjiyi simgeler.
* **Açık Tema Arka Planı**: Temiz kırk beyaz (`#f8f9fa` / `hsl(210, 17%, 98%)`) - Okunabilirliği maksimize eder.
* **Tipografi Rengi**: Koyu antrasit (`#0f172a` / `hsl(222, 47%, 11%)`) - Kontrast oranlarını erişilebilirlik standartlarında tutar.

### 2.2. Tipografi (Typography)
Tarayıcı varsayılan yazı tipleri yerine Google Fonts üzerinden premium font aileleri entegre edilmiştir:
* **Başlıklar (Headings)**: `Outfit` font ailesi tercih edilmiştir. Geometrik, modern ve güçlü yapısıyla markanın premium duruşunu destekler.
* **Gövde Metinleri (Body Text)**: `Plus Jakarta Sans` font ailesi kullanılmıştır. Yüksek okunabilirliği ve temiz karakter yapısı sayesinde kullanıcı metinleri yorulmadan okuyabilir.

### 2.3. Yerleşim Sistemi (Layout Design)
* **Glassmorphism Header**: Sayfanın en üstünde yer alan, yarı saydam ve arka planı bulanıklaştıran (`backdrop-filter: blur()`) yapışkan navigasyon barı, modern ve premium bir kullanıcı deneyimi sunar.
* **Subpage Hero**: İç sayfalarda (`etkinlikler.html`, `iletisim.html`, `mangal-hizmeti.html`) kullanılan karartılmış arka plan görselleri ve geniş başlık alanları, sayfa geçişlerinde görsel bütünlüğü korur.
* **Kart Izgaraları (Card Grids)**: Kamp çeşitleri ve aktiviteler, CSS Grid kullanılarak modern, hizalamaları simetrik ve responsive kartlar halinde sunulmuştur.

---

## 3. TEKNİK KARARLAR VE MİMARİ SEÇİMLER

### 3.1. Neden Saf HTML, CSS ve JavaScript (Vanilla Tech Stack)?
Platformun geliştirilmesinde React, Vue veya Next.js gibi popüler SPA (Single Page Application) frameworkleri yerine saf (vanilla) teknolojiler tercih edilmiştir. Bunun nedenleri:
* **Performans (Bundle Size)**: Framework yüklemelerinin tarayıcıda oluşturduğu JavaScript ayrıştırma (parsing) ve yürütme (execution) gecikmelerini tamamen sıfırlamak.
* **Core Web Vitals**: İlk Boyama Süresi (FCP) ve En Büyük İçerikli Boyama (LCP) sürelerini 1 saniyenin altında tutarak Google Lighthouse skorlarını %95+ seviyesinde sabitlemek.
* **Gereksiz Karmaşıklığı Önlemek**: Tamamen statik ve bilgi verici olan bu projenin bakım, derleme ve sunucu maliyetlerini minimumda tutmak.

### 3.2. Bootstrap Yerine Neden Yerleşik Flexbox ve CSS Grid?
Projede herhangi bir hazır CSS çerçevesi (Bootstrap, Tailwind vb.) kullanılmamış, tüm tasarımlar sıfırdan CSS3 ile yazılmıştır.
* **Gereksiz CSS Kurallarından (Unused CSS) Kaçınma**: Bootstrap gibi kütüphaneler yüzlerce kilobayt boyutunda kullanılmayan stil kuralı içerir ve tarayıcının render sürecini yavaşlatır.
* **Mizanpaj Kontrolü**: CSS Grid, iki boyutlu ızgaraların (örneğin kamplar ve paket kartları) konumlandırılmasında kusursuz kontrol sağlarken; Flexbox, tek boyutlu yerleşimlerde (navigasyon linkleri, form satırları, buton grupları) esneklik sunar. Bu iki yerleşik tarayıcı özelliği sayesinde minimum kodla maksimum verim elde edilmiştir.

### 3.3. Formspree ile Sunucusuz (Serverless) İletişim Atyapısı
Rezervasyon ve iletişim formunun arka planı için Formspree API’si tercih edilmiştir:
* PHP veya Node.js ile veritabanı/sunucu yönetme gereksinimini ortadan kaldırır.
* Gönderilen veriler AJAX (fetch API) yardımıyla asenkron olarak arka planda iletilir. Sayfa yenilenmesi engellenerek kullanıcıya premium bir yükleme (loading) animasyonu sunulur ve işlem bittiğinde yerel `success.html` sayfasına yönlendirilir.

---

## 4. KARŞILAŞILAN ZORLUKLAR VE ÇÖZÜM YÖNTEMLERİ

### 4.1. Sayfa Yükleme Hızı ve Zorunlu Yeniden Düzenleme (Forced Reflow)
* **Zorluk**: Sayfa ilk yüklendiğinde ve kaydırıldığında navigasyon linklerini güncellemek için kullanılan `offsetTop` ve `offsetHeight` gibi DOM özellikleri tarayıcıyı sayfayı tekrar hesaplamaya zorluyor (Forced Reflow), bu durum Lighthouse performans puanını düşürüyordu.
* **Çözüm**: JavaScript'te geometri hesaplamaları yapan `cacheSectionGeometry()` fonksiyonu sayfa ilk yüklenirken DOM parse edilirken değil, window `load` olayına ertelenerek çalıştırıldı. Elde edilen koordinat verileri bir diziye (array) alınarak önbelleklendi. Kaydırma (`scroll`) esnasında DOM sorgusu yapmak yerine önbellekteki veriler karşılaştırıldı.

### 4.2. Çoklu Sayfaya Geçişte Navigasyon Linklerinin Aktifliğini Koruma
* **Zorluk**: Sitenin tek sayfalı yapıdan çok sayfalı yapıya dönüştürülmesi sonrasında, iç sayfalarda (`etkinlikler.html` vb.) kaydırma yapıldığında scroll olay dinleyicisi menü linklerindeki aktiflik vurgularını temizliyordu çünkü iç sayfalarda ana sayfaya ait `#home`, `#about` gibi ID'ler bulunmuyordu.
* **Çözüm**: JavaScript scroll olay dinleyicisinin en başına bir koşul (`if (!document.getElementById('home')) return;`) eklendi. Bu sayede, eğer kullanıcı ana sayfada değilse scroll tabanlı aktiflik güncellemesi durdurulur ve iç sayfanın HTML şablonunda el ile atanan `.active` sınıfı korunmuş olur.

### 4.3. İç Sayfalardan Rezervasyon Formuna Akıllı Yönlendirme (Auto-selection)
* **Zorluk**: Kullanıcı "Mangal Hizmeti" sayfasındayken rezervasyon yapmak istediğinde, iletişim sayfasına yönlendiriliyordu ancak formdaki "Hizmet Tercihi" dropdown menüsünü manuel olarak seçmesi gerekiyordu.
* **Çözüm**: Mangal Hizmeti sayfasındaki yönlendirme linklerine `iletisim.html?camp=mangal-hizmeti#booking` şeklinde URL sorgu parametreleri eklendi. İletişim sayfasındaki JavaScript kodu, URL parametrelerini (`URLSearchParams`) analiz edecek şekilde güncellendi. Eğer url'de `camp=mangal-hizmeti` tespit edilirse, formdaki dropdown otomatik olarak "Mangal & Barbekü Hizmeti" seçeneğini seçili konuma getirecek şekilde ayarlandı.

---

## 5. YAPAY ZEKA (AI) ASİSTAN KULLANIMI VE PROMPT ANALİZLERİ

Proje geliştirme sürecinde, kod üretimi, refactoring ve hata ayıklama aşamalarında yapay zeka asistanı aktif olarak kullanılmıştır. Aşağıda süreç boyunca asistan ile kurulan profesyonel etkileşimlere ve elde edilen çıktılara yer verilmiştir:

### 5.1. Karanlık Mod (Dark Mode) Eklenmesi
* **Kullanılan Prompt**: *"siteye dark mod ekle ve butonunu da dil değiştirme butonun yanına ekle"*
* **Değerlendirme**: Asistan, CSS değişkenleri (`--bg-light`, `--text-dark` vb.) üzerinden tüm renk şemasını tersine çevirecek `.dark-mode` sınıfını CSS dosyasına entegre etti. Butonun header içinde dil değiştirme butonunun yanına yerleştirilmesini sağladı ve kullanıcının tercihini tarayıcı kapansa bile unutmaması için `localStorage` tabanlı durum koruma mantığı ekledi.

### 5.2. Çoklu Sayfa (Multi-Page) Mimarisinin Kurgulanması
* **Kullanılan Prompt**: *"etkinlikler ve iletişim kısmını anasayfadan ayır farklı bir htmlere taşı"*
* **Değerlendirme**: Asistan, ana sayfada (`index.html`) bulunan ilgili kod bloklarını temizleyerek `etkinlikler.html` ve `iletisim.html` dosyalarını oluşturdu. Tüm header, mobil menü ve footer linklerini çok sayfalı yönlendirmeye uyumlu olacak şekilde (örn: `index.html#about`) revize etti. Bu işlem sırasında dil seçimi ve karanlık mod betiklerinin yeni sayfalarda da çalışmasını sağladı.

### 5.3. Mangal Rezervasyon Formunun Özelleştirilmesi
* **Kullanılan Prompt**: *"mangal rezervasyon formunda veli adı soyadı ve katılımcı adı soyadını kaldırıp oraya ikisinin yerine sadece ad soyad ekle"*
* **Değerlendirme**: Asistan, Mangal Hizmeti sayfasına gömülü rezervasyon formunu analiz ederek sadece yetişkinlerin katılım sağlayacağı bu hizmet için gereksiz olan "Veli Adı" ve "Katılımcı Çocuk Adı" alanlarını kaldırıp tek bir "Ad Soyad" alanı tanımladı. Formun responsive yapısı korunarak Formspree uyumluluğu sürdürüldü.

---

## 6. KULLANILAN SKILL VE EKLENTİLERİN ETKİLERİ

Geliştirme aşamasında kullanılan yapay zeka asistanı, bünyesindeki uzman eklenti ve becerilerden yararlanmıştır:
* **`modern-web-guidance` Eklentisi**: 
  * **Kullanım Amacı**: Modern web API'leri, güncel CSS mizanpaj kuralları ve performans yönergelerini denetlemek.
  * **Katkısı**: Asenkron CSS yükleme yöntemleri (`media="print" onload="this.media='all'"`), LCP optimizasyonu için kritik görsellerin pre-load edilmesi (`rel="preload"`) ve tarayıcıda reflow oluşturacak JavaScript tetikleyicilerinin elenmesi bu skill kılavuzluğunda yapılmıştır.

---

## 7. LIGHTHOUSE PERFORMANS VE ERİŞİLEBİLİRLİK DEĞERLENDİRMESİ

Web sitesinin Google Lighthouse (Mobile & Desktop) analiz sonuçları, projenin teknik başarısını ortaya koymaktadır:

### 7.1. Ölçülen Skor Değerleri
* **Performans (Performance)**: **95+ / 100**
  * *Katkı Sağlayanlar*: WebP görsel formatlarının kullanımı, görsel boyutlarının (width/height) HTML üzerinde açıkça tanımlanması, Forced Reflow'un engellenmesi ve kritik olmayan kaynakların asenkron yüklenmesi.
* **Erişilebilirlik (Accessibility)**: **100 / 100**
  * *Katkı Sağlayanlar*: Renk kontrast oranlarının (Text/Background) WCAG AAA standartlarına uygunluğu, tüm butonların açıklayıcı `aria-label` etiketlerine sahip olması ve görsel etiketlerinde (`alt` öznitelikleri) açıklayıcı metin kullanımı.
* **En İyi Pratikler (Best Practices)**: **100 / 100**
  * *Katkı Sağlayanlar*: HTTPS yönlendirmeleri, güvenli harici bağlantı açılışları (`rel="noopener noreferrer"`) ve güncel tarayıcı API'lerinin kullanımı.
* **SEO (Arama Motoru Optimizasyonu)**: **100 / 100**
  * *Katkı Sağlayanlar*: Mobil cihaz uyumluluğu (viewport meta etiketi), her sayfa için benzersiz ve optimize edilmiş başlık (`title`) ve meta açıklama (`meta description`) etiketlerinin kullanımı, doğru `<h1>`-`<h6>` başlık hiyerarşisi.
