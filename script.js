const PASSWORD = "Beautiful Soul";

/* =====================
   MUSIC
===================== */
const music = document.getElementById("music");
let playing = false;

function toggleMusic() {
  playing ? music.pause() : music.play().catch(() => {});
  playing = !playing;
}

/* =====================
   UNLOCK
===================== */
function unlock() {
  const input = document.getElementById("password").value.trim();
  const msg = document.getElementById("lock-msg");

  if (input === PASSWORD) {
    document.getElementById("lock").style.display = "none";
    document.getElementById("app").classList.add("active");
    music.play().catch(() => {});
    loadQuestion();
  } else {
    msg.textContent = "Wrong password 💔";
  }
}

/* =====================
   QUIZ
===================== */
const quiz = [
  { q: "What special name did I first call you? 💖", a: "beautiful soul" },
  { q: "Who do I call my Queen? 👑", a: "me" },
  { q: "Why do you love me? ❤️", a: "__any__" }
];

let qi = 0;

function loadQuestion() {
  const el = document.getElementById("quizQuestion");
  if (el) el.textContent = quiz[qi].q;
}

function submitQuiz() {
  const input = document.getElementById("quizInput").value.trim().toLowerCase();
  const msg = document.getElementById("quizMsg");

  if (quiz[qi].a === "__any__" ? input.length > 2 : input === quiz[qi].a) {
    qi++;
    document.getElementById("quizInput").value = "";

    if (qi < quiz.length) {
      loadQuestion();
      msg.textContent = "Correct 😌";
    } else {
      document.getElementById("quizBox").style.display = "none";
      document.getElementById("afterQuiz").style.display = "block";
    }
  } else {
    msg.textContent = "Try again 😏";
  }
}

/* =====================
   FIREWORKS (SMOOTH)
===================== */
const canvas = document.getElementById("fireworks");
let ctx = null;
let particles = [];

if (canvas) {
  ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

function launchFirework() {
  if (!ctx) return;

  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;
  const color = `hsl(${Math.random() * 360},100%,60%)`;

  for (let i = 0; i < 80; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      alpha: 1,
      color
    });
  }
}

function animateFireworks() {
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter(p => p.alpha > 0);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.015;

    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
   ctx.beginPath();
ctx.moveTo(p.x, p.y);
ctx.bezierCurveTo(
  p.x - 4, p.y - 4,
  p.x - 6, p.y + 2,
  p.x, p.y + 6
);
ctx.bezierCurveTo(
  p.x + 6, p.y + 2,
  p.x + 4, p.y - 4,
  p.x, p.y
);
ctx.fill();

    ctx.fill();
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(animateFireworks);
}

animateFireworks();

/* =====================
   CELEBRATE
===================== */
function celebrate() {
  document.getElementById("popup").style.display = "flex";
  setInterval(launchFirework, 600);
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

/* =====================
   SAVE HER MESSAGE
===================== */
function saveMessage() {
  const msg = document.getElementById("loveMsg").value.trim();
  if (msg.length < 3) return;

  localStorage.setItem("mercyMessage", msg);
  document.getElementById("savedMsg").textContent = "Saved forever ❤️";
}

window.addEventListener("load", () => {
  const saved = localStorage.getItem("mercyMessage");
  if (saved && document.getElementById("loveMsg")) {
    document.getElementById("loveMsg").value = saved;
    document.getElementById("savedMsg").textContent = "Saved forever ❤️";
  }
});
function createRose() {
  const rose = document.createElement("div");
  rose.className = "rose";
  rose.textContent = "🌹";
  rose.style.left = Math.random() * 100 + "vw";
  rose.style.animationDuration = 8 + Math.random() * 6 + "s";
  document.body.appendChild(rose);

  setTimeout(() => rose.remove(), 14000);
}

setInterval(createRose, 900);

