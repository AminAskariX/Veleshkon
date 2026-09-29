# 🌤️ Veleshkon | ولش‌کن

[فارسی](#فارسی) · [English](#english)

<a id="فارسی"></a>
## 🇮🇷 فارسی

وب‌اپ فارسی برای مکث کوتاه، تمرین تنفس، نمایش پیام‌های انگیزشی، موسیقی و بازی ساده. این ابزار جایگزین خدمات درمانی نیست.

### 🚀 امکانات

- صفحهٔ اصلی، تمرین تنفس، پخش موسیقی و بازی در پوشهٔ `game/`.
- پیام‌های ذخیره‌شده در `assets/messages.json` با متن جایگزین در صورت خطای بارگذاری.
- وب‌اپ قابل نصب با `manifest.webmanifest` و سرویس‌ورکر برای کش منابع.

### 🛠️ اجرا

`git clone https://github.com/AminAskariX/Veleshkon.git` را اجرا کنید و پروژه را از یک وب‌سرور محلی یا هاست HTTPS باز کنید. برای نمونه، در ریشهٔ پروژه `python -m http.server 8000` و سپس `http://localhost:8000` را باز کنید. نصب PWA و سرویس‌ورکر به بستر امنِ پشتیبانی‌شده وابسته‌اند.

### ⚠️ محدودیت فعلی

پشتیبانی آفلاین به منابعی محدود است که واقعاً کش شده‌اند؛ همهٔ موسیقی‌ها در فهرست پیش‌کش قرار ندارند و صفحهٔ `offline.html` نیز در فهرست نصب سرویس‌ورکر نیست.

### 💡 تجربهٔ پیشنهادی

ولش‌کن فضایی سبک برای یک وقفهٔ کوتاه است: کاربر می‌تواند تمرین تنفس را دنبال کند، پیام‌ها را بخواند، موسیقی پخش کند یا سراغ بازی کوچک برود. این‌ها ابزارهای تجربهٔ کاربری و سرگرمی‌اند و دربارهٔ اثر درمانی یا نتیجهٔ پزشکی ادعایی ندارند.

### 🧩 اجزای پروژه

| مسیر | نقش |
| --- | --- |
| `index.html` و `js/app.js` | صفحهٔ اصلی و تعاملات |
| `assets/messages.json` | متن پیام‌ها |
| `game/` | بازی مستقل |
| `manifest.webmanifest` | اطلاعات نصب وب‌اپ |
| `service-worker.js` | ذخیرهٔ انتخابی منابع برای استفادهٔ آفلاین |

> 🔎 برای آزمون دقیق نصب و حالت آفلاین، پروژه را از `localhost` یا HTTPS اجرا و کش مرورگر را در هر بار تغییر بررسی کنید.

### 👤 پدیدآورنده و حقوق نشر

© م.امین عسکری (M. Amin Askari). [GitHub](https://github.com/AminAskariX) · [وب‌سایت](https://aminaskarix.ir)

### 📌 وضعیت مجوز

در این مخزن فایل مجوزی وجود ندارد. برای استفاده، بازنشر یا تغییر خارج از حقوقی که قانون به‌طور پیش‌فرض می‌دهد، از مالک اثر اجازه بگیرید. حقوق دارایی‌های شخص ثالث متعلق به صاحبان آن‌هاست.

<a id="english"></a>
## 🇬🇧 English

A Persian web app for a short pause, breathing practice, motivational messages, music, and a small game. It is not a substitute for clinical care.

### 🚀 Features

- Home view, breathing interaction, music playback, and a game under `game/`.
- Messages in `assets/messages.json`, with fallback text when loading fails.
- Installable web-app metadata and a service worker that caches selected resources.

### 🛠️ Run

Clone `https://github.com/AminAskariX/Veleshkon.git` and serve the project from a local web server or HTTPS host. For example, run `python -m http.server 8000` at the repository root and open `http://localhost:8000`. PWA installation and service workers require a supported secure context.

### ⚠️ Current limitation

Offline support depends on resources that were actually cached. Music files are not all precached, and `offline.html` is absent from the service worker's installation list.

### 💡 Intended experience

Veleshkon offers a lightweight pause: follow the breathing interaction, read short messages, play music, or open the small game. These are interface and leisure features, without a claim of medical or therapeutic effect.

### 🧩 Repository map

| Path | Purpose |
| --- | --- |
| `index.html` and `js/app.js` | Home view and interactions |
| `assets/messages.json` | Message content |
| `game/` | Separate game |
| `manifest.webmanifest` | Install metadata |
| `service-worker.js` | Selective offline caching |

> 🔎 Test installation and offline behavior from `localhost` or HTTPS, and check the browser cache when assets change.

### 👤 Author and copyright

Copyright © M. Amin Askari (م.امین عسکری). [GitHub](https://github.com/AminAskariX) · [Website](https://aminaskarix.ir)

### 📜 License status

This repository does not contain a license file. Seek permission from the rights holder for uses beyond those allowed by default law. Third-party assets retain their respective rights.
