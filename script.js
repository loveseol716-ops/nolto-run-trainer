const workout = [
  {
    section: "BRIEFING",
    phase: "오늘의 훈련 안내",
    time: 90,
    target: "Threshold Pace 적응",
    intensity: "전체 강도: RPE 4-8",
    round: "총 소요 시간: 약 45분",
    message:
      "안녕하세요. 오늘 훈련을 선택한 여러분, 일단 대단합니다. 오늘은 Threshold Interval 훈련입니다. Threshold Pace는 오래 버틸 수 있지만 편하지는 않은 강도입니다. 숨은 차지만 무너지지 않는 페이스, 오늘은 그 지점을 찾는 것이 목표입니다.",
  },
  {
    section: "BRIEFING",
    phase: "프로그램 구성 설명",
    time: 90,
    target: "훈련 흐름 이해",
    intensity: "무리한 전력질주 금지",
    round: "Warm Up → Strides → Main → Cool Down",
    message:
      "먼저 4분 Easy Jog로 몸을 올립니다. 그다음 20초씩 Strides를 4번 진행합니다. Strides는 전력질주가 아니라 Threshold Pace까지 부드럽게 끌어올리는 구간입니다. 본훈련은 총 5라운드입니다. 3분 Threshold, 1분 회복, 1분 Threshold Plus, 1분 회복으로 진행됩니다.",
  },
  {
    section: "BRIEFING",
    phase: "오늘의 핵심 포인트",
    time: 60,
    target: "반복 가능한 페이스 찾기",
    intensity: "Threshold: RPE 7 / Threshold+: RPE 8",
    round: "5라운드 동안 페이스 유지",
    message:
      "오늘 중요한 것은 첫 라운드를 세게 뛰는 것이 아닙니다. 5라운드까지 유지할 수 있는 페이스를 찾는 것입니다. Threshold 구간은 컨트롤 가능한 강도, Threshold Plus 구간은 조금 더 밀어붙이는 강도입니다. 회복 구간은 RPE 4로 호흡을 정리하세요.",
  },

  {
    section: "WARM UP",
    phase: "Easy Jog",
    time: 240,
    target: "몸의 온도 올리기",
    intensity: "RPE 3-4",
    round: "4 Minute Easy Jog",
    message:
      "가볍게 조깅을 시작합니다. 아직 빠르게 달릴 필요 없습니다. 호흡을 편하게 만들고, 어깨와 팔에 힘을 빼주세요.",
  },

  ...Array.from({ length: 4 }).flatMap((_, i) => [
    {
      section: "WARM UP",
      phase: `Strides ${i + 1}/4`,
      time: 20,
      target: "Threshold Pace까지 부드럽게 상승",
      intensity: "RPE 6-7",
      round: `Warm Up Strides ${i + 1}/4`,
      message:
        "20초 동안 천천히 속도를 올립니다. 전력질주가 아닙니다. 몸을 깨우는 느낌으로 리듬을 만들어주세요.",
    },
    {
      section: "WARM UP",
      phase: `Easy Recovery ${i + 1}/4`,
      time: 40,
      target: "호흡 회복",
      intensity: "RPE 3-4",
      round: `Recovery ${i + 1}/4`,
      message:
        "속도를 낮추고 호흡을 정리합니다. 다음 Strides를 위해 편하게 회복하세요.",
    },
  ]),

  {
    section: "MAIN BRIEFING",
    phase: "본훈련 안내",
    time: 90,
    target: "5 Rounds For Meters",
    intensity: "Threshold + Threshold Plus",
    round: "3분 + 1분 + 1분 + 1분 × 5R",
    message:
      "이제 본훈련에 들어갑니다. 목표는 총 거리입니다. 각 라운드는 3분 Threshold, 1분 Recovery, 1분 Threshold Plus, 1분 Recovery로 구성됩니다. Threshold는 강하지만 유지 가능한 페이스입니다. Threshold Plus는 그보다 조금 더 빠르게, 하지만 무너지지 않게 진행합니다.",
  },
  {
    section: "MAIN BRIEFING",
    phase: "페이스 설정 가이드",
    time: 60,
    target: "라운드별 페이스 유지",
    intensity: "Recovery는 반드시 RPE 4",
    round: "첫 라운드는 보수적으로 시작",
    message:
      "첫 라운드는 욕심내지 마세요. Threshold 구간은 대화가 거의 어렵지만 컨트롤 가능한 정도입니다. Threshold Plus는 1분만 버티는 구간입니다. 회복 구간에서는 속도를 확실히 낮추고 다음 구간을 준비하세요.",
  },

  ...Array.from({ length: 5 }).flatMap((_, i) => [
    {
      section: "MAIN SET",
      phase: `Threshold ${i + 1}/5`,
      time: 180,
      target: "3 Minutes at Threshold",
      intensity: "RPE 7",
      round: `Round ${i + 1}/5`,
      message:
        "3분 Threshold 구간입니다. 빠르지만 통제 가능한 페이스를 유지하세요. 보폭을 억지로 늘리지 말고, 일정한 리듬으로 갑니다.",
    },
    {
      section: "MAIN SET",
      phase: `Recovery ${i + 1}/5`,
      time: 60,
      target: "1 Minute Recovery",
      intensity: "RPE 4",
      round: `Round ${i + 1}/5`,
      message:
        "회복 구간입니다. 속도를 낮추고 호흡을 정리하세요. 회복을 잘해야 다음 빠른 구간을 살릴 수 있습니다.",
    },
    {
      section: "MAIN SET",
      phase: `Threshold Plus ${i + 1}/5`,
      time: 60,
      target: "1 Minute at Threshold Plus",
      intensity: "RPE 8",
      round: `Round ${i + 1}/5`,
      message:
        "1분 Threshold Plus입니다. 조금 더 밀어붙입니다. 하지만 자세가 무너지면 속도를 낮추세요. 강하지만 깔끔하게 갑니다.",
    },
    {
      section: "MAIN SET",
      phase: `Recovery ${i + 1}/5`,
      time: 60,
      target: "1 Minute Recovery",
      intensity: "RPE 4",
      round: `Round ${i + 1}/5`,
      message:
        "다시 회복입니다. 호흡을 낮추고 어깨 힘을 빼세요. 다음 라운드를 준비합니다.",
    },
  ]),

  {
    section: "COOL DOWN",
    phase: "Easy Pace",
    time: 300,
    target: "호흡과 심박 안정",
    intensity: "RPE 3-4",
    round: "5 Minute Cool Down",
    message:
      "쿨다운입니다. 속도를 충분히 낮추고 편하게 움직입니다. 오늘 쌓인 피로를 정리하면서 호흡을 안정시켜주세요.",
  },
  {
    section: "FINISH",
    phase: "훈련 완료",
    time: 30,
    target: "Session Complete",
    intensity: "잘했습니다",
    round: "Week 1 Complete",
    message:
      "훈련 완료. 오늘은 단순히 뛴 것이 아니라, 나에게 맞는 Threshold Pace를 찾는 훈련이었습니다. 기록을 남기고 다음 훈련에서 다시 이어가겠습니다.",
  },
];

let currentIndex = 0;
let remainingTime = workout[0].time;
let timer = null;
let isPaused = false;

const startScreen = document.getElementById("start-screen");
const workoutScreen = document.getElementById("workout-screen");
const finishScreen = document.getElementById("finish-screen");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const nextBtn = document.getElementById("next-btn");
const resetBtn = document.getElementById("reset-btn");
const restartBtn = document.getElementById("restart-btn");

const sectionLabel = document.getElementById("section-label");
const phaseLabel = document.getElementById("phase-label");
const timeDisplay = document.getElementById("time-display");
const targetDisplay = document.getElementById("target-display");
const speedDisplay = document.getElementById("speed-display");
const roundDisplay = document.getElementById("round-display");
const coachMessage = document.getElementById("coach-message");
const nextPhase = document.getElementById("next-phase");

function showScreen(screen) {
  startScreen.classList.remove("active");
  workoutScreen.classList.remove("active");
  finishScreen.classList.remove("active");
  screen.classList.add("active");
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function updateScreen() {
  const current = workout[currentIndex];
  const next = workout[currentIndex + 1];

  sectionLabel.textContent = current.section;
  phaseLabel.textContent = current.phase;
  timeDisplay.textContent = formatTime(remainingTime);
  targetDisplay.textContent = `목표: ${current.target}`;
  speedDisplay.textContent = `강도: ${current.intensity}`;
  roundDisplay.textContent = `진행: ${current.round}`;
  coachMessage.textContent = current.message;
  nextPhase.textContent = next ? `다음 구간: ${next.phase}` : "마지막 구간";
}

function beep() {
  const audio = new AudioContext();
  const oscillator = audio.createOscillator();
  const gainNode = audio.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audio.destination);

  oscillator.frequency.value = 800;
  gainNode.gain.value = 0.12;

  oscillator.start();
  oscillator.stop(audio.currentTime + 0.2);
}

function startWorkout() {
  showScreen(workoutScreen);

  currentIndex = 0;
  remainingTime = workout[0].time;
  isPaused = false;
  pauseBtn.textContent = "PAUSE";

  updateScreen();

  clearInterval(timer);

  timer = setInterval(() => {
    if (isPaused) return;

    remainingTime--;
    updateScreen();

    if (remainingTime <= 3 && remainingTime > 0) {
      beep();
    }

    if (remainingTime <= 0) {
      goToNextPhase();
    }
  }, 1000);
}

function goToNextPhase() {
  beep();

  currentIndex++;

  if (currentIndex >= workout.length) {
    clearInterval(timer);
    showScreen(finishScreen);
    return;
  }

  remainingTime = workout[currentIndex].time;
  updateScreen();
}

function resetWorkout() {
  clearInterval(timer);

  currentIndex = 0;
  remainingTime = workout[0].time;
  isPaused = false;
  pauseBtn.textContent = "PAUSE";

  showScreen(startScreen);
}

startBtn.addEventListener("click", startWorkout);

pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "RESUME" : "PAUSE";
});

nextBtn.addEventListener("click", goToNextPhase);

resetBtn.addEventListener("click", resetWorkout);

restartBtn.addEventListener("click", () => {
  resetWorkout();
});