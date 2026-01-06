// فایل: game.js
const orbZone = document.getElementById("orb-zone");
const scoreDisplay = document.getElementById("score");
const messageBox = document.getElementById("game-message");

let score = 0;
let clickCount = 0;
let nextRewardClick = getRandomThreshold(); // اولین آستانه رندوم

// 🎁 تولید عدد رندوم بین 7 تا 19
function getRandomThreshold() {
  return Math.floor(Math.random() * (19 - 7 + 1)) + 7;
}

// 🎵 افکت صوتی پیام
const messageSound = new Audio('../music/game-bonus.mp3');
messageSound.volume = 0.5;

const surpriseMessages = [
    "🪞 تو ارزشمندی، حتی وقتی خسته‌ای.",
    "👑 تو بیشتر از اون چیزی هستی که فکر می‌کنی.",
    "🌈 بودن تو، به این دنیا رنگ داده.",
    "💖 این همه مهربونی رو از کجا آوردی؟",
    "🌟 درونت یه قهرمان پنهانه – من می‌بینمش.",
    "🫶 خودت رو ببخش، چون لایق آرامشی.",
    "🎯 تو داری تلاش می‌کنی، و این کافیه.",
    "🧡 حتی شکست‌هاتم زیبان چون واقعی هستی.",
    "💡 قلبت روشن‌تر از خیلی‌هاست.",
    "🕯️ تو نوری هستی توی تاریکی‌های دنیا.",
    "🧩 هیچ‌کس جای تو رو نمی‌گیره – تو خاصی.",
    "💬 صدای درونت دوست‌داشتنیه، فقط باید بشنویش.",
    "🧠 تو آدم باهوشی هستی، حتی وقتی شک داری.",
    "📖 داستانت هنوز ادامه داره، و قشنگه.",
    "🪶 لطافتت، قوی‌ترت کرده.",
    "🎁 حضورت هدیه‌ست – برای خیلیا.",
    "🧘‍♂️ با همین کلیک‌هات، خودتو آروم کردی – آفرین.",
    "💪 تو بلدی چطور از نو شروع کنی.",
    "🏅 تو یک انسان باارزش و نجات‌یافته‌ای.",
    "🌷 حتی سکوتت هم زیباست.",
    "📍 جای درست، زمان درست – الان اینجایی.",
    "🎧 صدای خوبی داری درونت، که شنیدنیه.",
    "💌 تو لایق احترام، عشق و آرامشی.",
    "✨ چه قدر قشنگه که هنوز ادامه می‌دی.",
    "🫂 کسی هست که بهت افتخار می‌کنه – من!",
    "🏕️ فضای امنی ساختی برای خودت، دمت گرم.",
    "🎯 هدف‌های خوبی داری، و داری نزدیکشون می‌شی.",
    "🌠 حالت مهمه – تو اهمیت داری.",
    "📷 تو زیبایی، نه فقط ظاهری – از درون هم.",
    "🔮 خودت رو باور کن – تو واقعاً فوق‌العاده‌ای.",
    "🌟 فوق‌العاده بود! تو واقعاً انرژی مثبتی داری.",
    "💖 کارت بی‌نقصه – ذهن آرومت رو تحسین می‌کنم.",
    "🎈 هر کلیک از تو، یه نسیم لطیف برای ذهنت بود.",
    "💫 حضور تو، همین الان یه تغییر مثبت ساخت.",
    "🌿 ذهن آروم، قلب شاد – راهتو داری عالی می‌ری.",
    "🫶 واقعاً بهت افتخار می‌کنم، این لحظه مال توئه.",
    "📷 تصویر ذهنی‌ت داره قشنگ‌تر می‌شه، حسش کن.",
    "🎁 خودت یه هدیه‌ای در  این لحظه‌ای.",
    "📡 موج خوب فرستادی – دریافت شد 😄",
    "🔅 نور تو قابل دیدنه – حتی از پشت صفحه.",
    "💎 درونت پر از درخششه – ممنون که اینجایی.",
    "🌈 کلیک تو رنگ زندگیه.",
    "🧘‍♂️ فقط تو می‌تونی انقدر آروم‌کننده باشی!",
    "🕊️ این لحظه با تو خاص‌تر شد.",
    "🧠 ذهنت داره ازت تشکر می‌کنه، واقعاً!",
    "🎨 با هر گوی، داری لحظه رو زیباتر می‌کنی.",
    "🫂 حس خوب تو، قابل انتقاله – ادامه بده.",
    "🌸 تو دلیل لبخند همین لحظه‌ای.",
    "🔋 دوباره شارژ شدی – حسش کن.",
    "💌 خودت رو دست کم نگیر – فوق‌العاده‌ای.",
    "🎯 تمرکزت مثال‌زدنی بود – آفرین.",
    "🌻 حضورت روشنه – حتی وقتی نمی‌دونی.",
    "📖 داری لحظه‌هات رو قشنگ می‌نویسی.",
    "🪞 بهت افتخار می‌کنم – همین الان.",
    "💬 کلیکت مثل یک جمله قشنگه برای ذهنت.",
    "🍃 تو نشون دادی که بلدی با ذهن مهربون باشی.",
    "🏞️ اینجا امنه، چون تو اینجایی.",
    "🌠 حتی سکوتت هم اثرگذاره – مثل لمس‌هات.",
    "🎶 لمس تو مثل یک نت آروم بود در موسیقی ذهن.",
    "🪷 لحظه به لحظه‌ت، داره زیباتر میشه با حضورت.",
    "🧩 تو تکه گمشده‌ی این لحظه‌ای – و پیداش کردی.",
    "☕ یه مکث عالی ساختی – لذت ببر ازش.",
    "🔊 صدای آرامش با کلیکت فعال شد.",
    "📦 ذهنت حالا سبک‌تره – عالی بود!",
    "🚀 هر بار که لمس می‌کنی، ذهنت رو بالا می‌بری.",
    "🎉 احساس شادی از این کلیک بیرون زد!",
    "💝 تو با ارزشی – ممنون که اینجایی.",
    "🏆 برنده کسیه که ادامه می‌ده – مثل تو.",
    "🌌 ذهن تو شایسته‌ی ستایشه، بدون اغراق.",
    "🧬 تو خاصی – چون خودتی."
  ];
  

// 🎧 افکت کلیک گوی
const clickSound = new Audio('../music/bubble-pop.mp3');
clickSound.volume = 0.5;

// 🎨 رنگ‌های متفاوت گوی‌ها
const orbColors = [
  '#ffcc80', '#81d4fa', '#a5d6a7', '#f48fb1',
  '#ffd54f', '#ce93d8', '#b2dfdb', '#e1bee7'
];

// 🎮 ساخت گوی
function createOrb() {
  const orb = document.createElement("div");
  orb.classList.add("orb");

  const x = Math.random() * (orbZone.offsetWidth - 60);
  const y = Math.random() * (orbZone.offsetHeight - 60);
  orb.style.left = `${x}px`;
  orb.style.top = `${y}px`;

  const randomColor = orbColors[Math.floor(Math.random() * orbColors.length)];
  orb.style.background = `radial-gradient(circle at center, #fff, ${randomColor})`;

  orb.addEventListener("click", () => {
    orb.classList.add("pop");
    clickSound.play();
    score += 1;
    scoreDisplay.textContent = score;

    clickCount++;

    if (clickCount >= nextRewardClick) {
      const msg = surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)];
      showMessage(msg);

      // ریست چرخه جایزه
      clickCount = 0;
      nextRewardClick = getRandomThreshold();
    }

    setTimeout(() => {
      if (orb.parentNode) orb.remove();
    }, 500);
  });

  orbZone.appendChild(orb);

  setTimeout(() => {
    if (orb.parentNode) orb.remove();
  }, 6000);
}

// ✨ نمایش پیام جایزه
function showMessage(text) {
  messageSound.play();
  messageBox.textContent = text;
  messageBox.classList.add("active");
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.4 },
    colors: ['#ffcc80', '#81d4fa', '#f48fb1', '#aed581']
  });
  const displayDuration = Math.floor(Math.random() * (4000 - 3000 + 1)) + 4000;

  setTimeout(() => {
    messageBox.classList.remove("active");
  }, displayDuration);
}

// 🔄 ایجاد گوی‌ها با فاصله ثابت
setInterval(createOrb, 1200);


// 🌬️ تمرین تنفس با نوار بالا
const breathLabel = document.getElementById('breath-label');
const breathCount = document.getElementById('breath-count');
const breathFill = document.getElementById('breath-fill');

let breathPhase = 'inhale';
let breathCounter = 4;

function breathingLoop() {
  let count = 4;

  const interval = setInterval(() => {
    count--;
    if (count >= 0) {
      breathCount.textContent = count;
    }

    // دم
    if (breathPhase === 'inhale') {
      breathLabel.textContent = 'نفس بکش 🫁';
      breathFill.style.transition = 'width 4s ease-in-out';
      breathFill.style.backgroundColor = '#4db6ac';
      breathFill.style.width = '100%';
    }

    // بازدم
    if (count < 0) {
      if (breathPhase === 'inhale') {
        breathPhase = 'exhale';
        count = 4;
        breathLabel.textContent = 'بازدم – آرام و ریلکس 🫶';
        breathFill.style.transition = 'width 4.5s ease-in-out';
        breathFill.style.backgroundColor = '#81d4fa';
        breathFill.style.width = '0%';
      } else {
        breathPhase = 'inhale';
        count = 4;
        breathLabel.textContent = 'نفس بکش 🫁';
        breathFill.style.transition = 'width 4.5s ease-in-out';
        breathFill.style.backgroundColor = '#4db6ac';
        breathFill.style.width = '100%';
      }
      breathCount.textContent = 4;
    }
  }, 1000);
}

breathingLoop(); // اجرای نوار تنفس
