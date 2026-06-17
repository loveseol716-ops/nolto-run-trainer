let selectedWorkout = [];
let currentIndex = 0;
let remainingTime = 0;
let timer = null;
let isPaused = false;
let thresholdPaceSeconds = 330;

const workouts = {
  week1: {
    title: "WEEK 1: Threshold Interval",
    description: "Threshold Pace를 찾고, 반복 가능한 빠른 페이스에 적응하는 훈련입니다.",
    steps: [
      {
        section: "BRIEFING",
        phase: "오늘의 훈련 안내",
        time: 90,
        target: "Threshold Pace 적응",
        paceOffset: 0,
        round: "총 소요 시간: 약 45분",
        message:
          "안녕하세요. 오늘 훈련을 선택한 여러분, 일단 대단합니다. 오늘은 Threshold Interval 훈련입니다. 입력한 30분 TT 평균 페이스를 기준으로 오늘의 페이스가 자동 계산됩니다.",
      },
      {
        section: "BRIEFING",
        phase: "프로그램 구성 설명",
        time: 90,
        target: "훈련 흐름 이해",
        paceOffset: 0,
        round: "Warm Up → Strides → Main → Cool Down",
        message:
          "먼저 4분 Easy Jog로 몸을 올립니다. 이후 20초 Strides와 40초 Easy Recovery를 4라운드 진행합니다. 본훈련은 3분 Threshold, 1분 Recovery, 1분 Threshold Plus, 1분 Recovery를 총 5라운드 반복합니다.",
      },
      {
        section: "WARM UP",
        phase: "Easy Jog",
        time: 240,
        target: "몸의 온도 올리기",
        paceOffset: 75,
        round: "4 Minute Easy Jog",
        message:
          "가볍게 조깅을 시작합니다. 아직 빠르게 달릴 필요 없습니다. 호흡을 편하게 만들고 몸을 준비하세요.",
      },
      ...Array.from({ length: 4 }).flatMap((_, i) => [
        {
          section: "WARM UP",
          phase: `Strides ${i + 1}/4`,
          time: 20,
          target: "Threshold Pace까지 부드럽게 상승",
          paceOffset: 0,
          round: `Warm Up Strides ${i + 1}/4`,
          message:
            "20초 동안 천천히 속도를 올립니다. 전력질주가 아니라 Threshold Pace까지 부드럽게 끌어올립니다.",
        },
        {
          section: "WARM UP",
          phase: `Easy Recovery ${i + 1}/4`,
          time: 40,
          target: "호흡 회복",
          paceOffset: 90,
          round: `Recovery ${i + 1}/4`,
          message:
            "속도를 낮추고 호흡을 정리합니다. 다음 Strides를 준비하세요.",
        },
      ]),
      {
        section: "MAIN BRIEFING",
        phase: "본훈련 안내",
        time: 90,
        target: "5 Rounds For Meters",
        paceOffset: 0,
        round: "3분 + 1분 + 1분 + 1분 × 5R",
        message:
          "이제 본훈련입니다. Threshold는 입력한 30분 TT 평균 페이스를 기준으로 진행합니다. Threshold Plus는 그보다 조금 더 빠르게 진행합니다. 회복 구간에서는 확실히 속도를 낮춰 다음 구간을 준비하세요.",
      },
      ...Array.from({ length: 5 }).flatMap((_, i) => [
        {
          section: "MAIN SET",
          phase: `Threshold ${i + 1}/5`,
          time: 180,
          target: "3 Minutes at Threshold",
          paceOffset: 0,
          round: `Round ${i + 1}/5`,
          message:
            "3분 Threshold 구간입니다. 빠르지만 통제 가능한 페이스를 유지하세요. 오늘의 기준 페이스입니다.",
        },
        {
          section: "MAIN SET",
          phase: `Recovery ${i + 1}/5`,
          time: 60,
          target: "1 Minute Recovery",
          paceOffset: 90,
          round: `Round ${i + 1}/5`,
          message:
            "회복 구간입니다. 속도를 낮추고 호흡을 정리하세요. 회복을 잘해야 다음 빠른 구간을 살릴 수 있습니다.",
        },
        {
          section: "MAIN SET",
          phase: `Threshold Plus ${i + 1}/5`,
          time: 60,
          target: "1 Minute at Threshold Plus",
          paceOffset: -10,
          round: `Round ${i + 1}/5`,
          message:
            "1분 Threshold Plus입니다. 기준 페이스보다 조금 더 빠르게 갑니다. 강하지만 자세는 무너지지 않게 유지하세요.",
        },
        {
          section: "MAIN SET",
          phase: `Recovery ${i + 1}/5`,
          time: 60,
          target: "1 Minute Recovery",
          paceOffset: 90,
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
        paceOffset: 105,
        round: "5 Minute Cool Down",
        message:
          "쿨다운입니다. 속도를 충분히 낮추고 편하게 움직입니다. 오늘 쌓인 피로를 정리하세요.",
      },
    ],
  },

  week2: {
    title: "WEEK 2: Threshold Builder",
    description: "Threshold Pace 유지 시간을 늘리고, 후반부 페이스 저항력을 만드는 훈련입니다.",
    steps: [
      {
        section: "BRIEFING",
        phase: "오늘의 훈련 안내",
        time: 90,
        target: "Threshold 유지 시간 증가",
        paceOffset: 0,
        round: "총 소요 시간: 약 42분",
        message:
          "오늘은 Week 2 Threshold Builder입니다. Week 1보다 빠른 구간 유지 시간이 길어집니다. 목표는 더 세게 뛰는 것이 아니라, 기준 페이스를 더 오래 유지하는 것입니다.",
      },
      {
        section: "BRIEFING",
        phase: "프로그램 구성 설명",
        time: 90,
        target: "후반 페이스 유지",
        paceOffset: 0,
        round: "Warm Up → Build Up → Main → Cool Down",
        message:
          "먼저 5분 Easy Jog로 몸을 올립니다. 이후 30초 Build Up과 30초 Recovery를 4번 진행합니다. 본훈련은 4분 Threshold, 1분 Recovery, 90초 Threshold Plus, 90초 Recovery를 4라운드 반복합니다.",
      },
      {
        section: "WARM UP",
        phase: "Easy Jog",
        time: 300,
        target: "몸의 온도 올리기",
        paceOffset: 75,
        round: "5 Minute Easy Jog",
        message:
          "가볍게 조깅을 시작합니다. 호흡을 편하게 만들고, 몸이 자연스럽게 올라오도록 합니다.",
      },
      ...Array.from({ length: 4 }).flatMap((_, i) => [
        {
          section: "WARM UP",
          phase: `Build Up ${i + 1}/4`,
          time: 30,
          target: "Threshold Pace 접근",
          paceOffset: 15,
          round: `Build Up ${i + 1}/4`,
          message:
            "30초 동안 속도를 조금씩 올립니다. 기준 페이스보다 살짝 여유 있게 접근하세요.",
        },
        {
          section: "WARM UP",
          phase: `Easy Recovery ${i + 1}/4`,
          time: 30,
          target: "호흡 회복",
          paceOffset: 90,
          round: `Recovery ${i + 1}/4`,
          message:
            "속도를 낮추고 편하게 회복합니다. 다음 Build Up을 준비하세요.",
        },
      ]),
      {
        section: "MAIN BRIEFING",
        phase: "본훈련 안내",
        time: 90,
        target: "4 Rounds For Quality",
        paceOffset: 0,
        round: "4분 + 1분 + 90초 + 90초 × 4R",
        message:
          "이제 본훈련입니다. 4분 Threshold에서는 기준 페이스를 안정적으로 유지합니다. 이후 90초 Threshold Plus에서는 기준보다 조금 더 빠르게 달립니다. 후반 라운드에서도 페이스가 무너지지 않도록 조절하세요.",
      },
      ...Array.from({ length: 4 }).flatMap((_, i) => [
        {
          section: "MAIN SET",
          phase: `Threshold ${i + 1}/4`,
          time: 240,
          target: "4 Minutes at Threshold",
          paceOffset: 0,
          round: `Round ${i + 1}/4`,
          message:
            "4분 Threshold 구간입니다. 기준 페이스를 안정적으로 유지하세요. 호흡은 차지만 통제 가능한 강도입니다.",
        },
        {
          section: "MAIN SET",
          phase: `Recovery ${i + 1}/4`,
          time: 60,
          target: "1 Minute Recovery",
          paceOffset: 90,
          round: `Round ${i + 1}/4`,
          message:
            "회복 구간입니다. 속도를 낮추고 호흡을 정리합니다.",
        },
        {
          section: "MAIN SET",
          phase: `Threshold Plus ${i + 1}/4`,
          time: 90,
          target: "90 Seconds at Threshold Plus",
          paceOffset: -10,
          round: `Round ${i + 1}/4`,
          message:
            "90초 Threshold Plus입니다. 기준 페이스보다 조금 더 빠르게 갑니다. 마지막까지 자세를 유지하세요.",
        },
        {
          section: "MAIN SET",
          phase: `Recovery ${i + 1}/4`,
          time: 90,
          target: "90 Seconds Recovery",
          paceOffset: 90,
          round: `Round ${i + 1}/4`,
          message:
            "긴 회복 구간입니다. 다음 라운드를 위해 충분히 호흡을 낮추세요.",
        },
      ]),
      {
        section: "COOL DOWN",
        phase: "Easy Pace",
        time: 300,
        target: "호흡과 심박 안정",
        paceOffset: 105,
        round: "5 Minute Cool Down",
        message:
          "쿨다운입니다. 속도를 충분히 낮추고 편하게 움직입니다. 오늘의 훈련을 마무리합니다.",
      },
    ],
  },
};

const startScreen = document.getElementById("start-screen");
const workoutScreen = document.getElementById("workout-screen");
const finishScreen = document.getElementById("finish-screen");

const paceMinInput = document.getElementById("pace-min");
const paceSecInput = document.getElementById("pace-sec");
const programButtons = document.querySelectorAll(".program-btn");

const pauseBtn = document.getElementById("pause-btn");
const nextBtn = document.getElementById("next-btn");
const resetBtn = document.getElementById("reset-btn");
const restartBtn = document.getElementById("restart-btn");

const sectionLabel = document.getElementById("section-label");
const phaseLabel = document.getElementById("phase-label");
const timeDisplay = document.getElementById("time-display");
const targetDisplay = document.getElementById("target-display");
const paceDisplay = document.getElementById("pace-display");
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

function formatPace(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${String(sec).padStart(2, "0")}/km`;
}

function paceToSpeed(secondsPerKm) {
  const minutesPerKm = secondsPerKm / 60;
  return (60 / minutesPerKm).toFixed(1);
}

function calculatePace(baseSeconds, offset) {
  return baseSeconds + offset;
}

function updateScreen() {
  const current = selectedWorkout[currentIndex];
  const next = selectedWorkout[currentIndex + 1];

  const adjustedPace = calculatePace(thresholdPaceSeconds, current.paceOffset);
  const treadmillSpeed = paceToSpeed(adjustedPace);

  sectionLabel.textContent = current.section;
  phaseLabel.textContent = current.phase;
  timeDisplay.textContent = formatTime(remainingTime);
  targetDisplay.textContent = `목표: ${current.target}`;
  paceDisplay.textContent = `권장 페이스: ${formatPace(adjustedPace)}`;
  speedDisplay.textContent = `트레드밀 속도: ${treadmillSpeed} km/h`;
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

function startWorkout(programKey) {
  const min = Number(paceMinInput.value);
  const sec = Number(paceSecInput.value);

  if (Number.isNaN(min) || Number.isNaN(sec) || min <= 0 || sec < 0 || sec >= 60) {
    alert("30분 TT 평균 페이스를 올바르게 입력해주세요. 예: 5분 30초");
    return;
  }

  thresholdPaceSeconds = min * 60 + sec;
  selectedWorkout = workouts[programKey].steps;

  currentIndex = 0;
  remainingTime = selectedWorkout[0].time;
  isPaused = false;
  pauseBtn.textContent = "PAUSE";

  showScreen(workoutScreen);
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

  if (currentIndex >= selectedWorkout.length) {
    clearInterval(timer);
    showScreen(finishScreen);
    return;
  }

  remainingTime = selectedWorkout[currentIndex].time;
  updateScreen();
}

function resetWorkout() {
  clearInterval(timer);

  currentIndex = 0;
  remainingTime = 0;
  selectedWorkout = [];
  isPaused = false;
  pauseBtn.textContent = "PAUSE";

  showScreen(startScreen);
}

programButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const programKey = button.dataset.program;
    startWorkout(programKey);
  });
});

pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "RESUME" : "PAUSE";
});

nextBtn.addEventListener("click", goToNextPhase);

resetBtn.addEventListener("click", resetWorkout);

restartBtn.addEventListener("click", resetWorkout);
