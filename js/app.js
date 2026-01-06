// 🌬️ تنفس + شمارش و رنگ‌بندی
const breathingCircle = document.getElementById('breathing-circle');
const startBreathingBtn = document.getElementById('start-breathing');
const breathText = document.getElementById('breath-text');

let breathingActive = false;
let breathInterval = null;

function startBreathingCycle() {
  let phase = 'inhale';
  let count = 4;

  breathText.textContent = `دم: ${count}`;
  breathingCircle.classList.remove('exhale');

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      breathText.textContent = `${phase === 'inhale' ? 'دم' : 'بازدم'}: ${count}`;
    } else {
      if (phase === 'inhale') {
        phase = 'exhale';
        count = 4;
        breathText.textContent = `بازدم: ${count}`;
        breathingCircle.classList.add('exhale');
      } else {
        phase = 'inhale';
        count = 4;
        breathText.textContent = `دم: ${count}`;
        breathingCircle.classList.remove('exhale');
      }
    }
  }, 1000);

  return interval;
}


startBreathingBtn.addEventListener('click', () => {
  if (!breathingActive) {
    breathingCircle.style.animation = 'breathe 8s ease-in-out infinite';
    startBreathingBtn.textContent = 'توقف تنفس';
    startBreathingBtn.classList.add('active');
    breathInterval = startBreathingCycle();
  } else {
    breathingCircle.style.animation = 'none';
    startBreathingBtn.textContent = 'شروع تمرین تنفس';
    startBreathingBtn.classList.remove('active');
    clearInterval(breathInterval);
    breathText.textContent = 'آماده‌ای؟';
    breathingCircle.classList.remove('exhale');
  }
  breathingActive = !breathingActive;
});

  // پیام انگیزشی
  const fallbackMessages = [

  "🧭 اعتماد به نفس یعنی ادامه دادن، نه بی‌اشتباه بودن.",
  "✨ دستاورد یعنی حرکت – نه رسیدن به مقصد خاص.",
  "💪 هر روزی که ادامه دادی، خودش یه پیروزیه."
  ];
  const popup = document.getElementById('emergency-popup');
  const countdownEl = document.getElementById('countdown');
  const typingBox = document.getElementById('typing-message');
  
 // ⏱️ نمایش پاپ‌آپ هشدار فقط یک بار
if (!localStorage.getItem('emergencyShown')) {
  let counter = 5;

  const countdownInterval = setInterval(() => {
    countdownEl.textContent = counter;
    counter--;

    if (counter < 0) {
      clearInterval(countdownInterval);
      popup.style.animation = "fade-out 1s ease forwards";
      setTimeout(() => {
        popup.style.display = "none";
        localStorage.setItem('emergencyShown', 'true');
        loadMessagesAndStart();
      }, 1000);
    }
  }, 1000);
} else {
  popup.style.display = "none";
  loadMessagesAndStart();
}

// 🎯 بارگذاری پیام‌ها از فایل JSON یا استفاده از fallback
function loadMessagesAndStart() {
  fetch('../assets/messages.json')
    .then(res => {
      if (!res.ok) throw new Error('فایل پیام‌ها پیدا نشد');
      return res.json();
    })
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        startMotivationalTyping(data);
      } else {
        startMotivationalTyping(fallbackMessages);
      }
    })
    .catch(() => {
      startMotivationalTyping(fallbackMessages);
    });
}

// 🎬 افکت تایپ هر پیام
function typeMessage(message, callback) {
  let i = 0;
  typingBox.innerHTML = '';
  typingBox.classList.remove('blink-gold', 'fade-out-msg');

  const interval = setInterval(() => {
    typingBox.innerHTML += message.charAt(i);
    i++;
    if (i >= message.length) {
      clearInterval(interval);

      setTimeout(() => {
        typingBox.classList.add('blink-gold');

        setTimeout(() => {
          typingBox.classList.remove('blink-gold');
          typingBox.classList.add('fade-out-msg');

          setTimeout(callback, 1000);
        }, 3000);
      }, 5000);
    }
  }, 40);
}

// 🔁 انتخاب تصادفی X پیام بدون تکرار
function getRandomMessages(array, count) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

// ♾️ پخش پشت‌سرهم پیام‌ها
function startMotivationalTyping(messagesArray) {
  const selectedMessages = getRandomMessages(messagesArray, 10);
  let currentIndex = 0;

  function showNext() {
    if (currentIndex >= selectedMessages.length) {
      currentIndex = 0;
    }
    typeMessage(selectedMessages[currentIndex], () => {
      currentIndex++;
      showNext();
    });
  }

  showNext();
}
let deferredPrompt;

// گوش دادن به رویداد beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // دکمه نصب را نمایش بده (مثلاً دکمه‌ای با id="installBtn")
  const installBtn = document.getElementById('installBtn');
  if (installBtn) {
    installBtn.style.display = 'inline-block';

    installBtn.addEventListener('click', () => {
      installBtn.style.display = 'none'; // دکمه رو مخفی کن
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ کاربر نصب را قبول کرد');
        } else {
          console.log('❌ کاربر نصب را رد کرد');
        }
        deferredPrompt = null;
      });
    });
  }
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registered ✅', reg))
      .catch(err => console.error('Service Worker error ❌', err));
  });
}
// وضعیت نصب
const installBtn = document.getElementById('installBtn');
if (window.matchMedia('(display-mode: standalone)').matches || localStorage.getItem('pwaInstalled')) {
  installBtn.style.display = 'none';
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'inline-block';

  installBtn.addEventListener('click', () => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        console.log('✅ نصب شد');
        localStorage.setItem('pwaInstalled', 'true');
      } else {
        console.log('❌ کاربر رد کرد');
      }
      deferredPrompt = null;
    });
  });
});

// حذف دکمه پس از نصب از منوی مرورگر
window.addEventListener('appinstalled', () => {
  localStorage.setItem('pwaInstalled', 'true');
  installBtn.style.display = 'none';
});
