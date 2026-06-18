let selectedWorkout = [];
let currentIndex = 0;
let remainingTime = 0;
let currentStepTotalTime = 0;
let timer = null;
let isPaused = false;
let thresholdPaceSeconds = 330;
let lastBeepSecond = null;

// 화면 요소
const startScreen = document.getElementById("start-screen");
const workoutScreen = document.getElementById("workout-screen");
const finishScreen = document.getElementById("finish-screen");

// 입력 요소
const paceMinInput = document.getElementById("pace-min");
const paceSecInput = document.getElementById("pace-sec");

// 프로그램 버튼 영역
const programList = document.getElementById("program-list");

// 버튼 요소
const pauseBtn = document.getElementById("pause-btn");
const nextBtn = document.getElementById("next-btn");
const resetBtn = document.getElementById("reset-btn");
const restartBtn = document.getElementById("restart-btn");

// 운동 화면 표시 요소
const sectionLabel = document.getElementById("section-label");
const phaseLabel = document.getElementById("phase-label");
const timeDisplay = document.getElementById("time-display");
const targetDisplay = document.getElementById("target-display");
const paceDisplay = document.getElementById("pace-display");
const speedDisplay = document.getElementById("speed-display");
const roundDisplay = document.getElementById("round-display");
const coachMessage = document.getElementById("coach-message");
const nextPhase = document.getElementById("next-phase");

// 진행 바 요소
const elapsedDisplay = document.getElementById("elapsed-display");
const progressPercent = document.getElementById("progress-percent");
const progressFill = document.getElementById("progress-fill");

// 카운트다운 오버레이 요소
const countdownOverlay = document.getElementById("countdown-overlay");
const countdownSmall = document.getElementById("countdown-small");
const countdownText = document.getElementById("countdown-text");
const countdownNext = document.getElementById("countdown-next");

// 화면 전환
function showScreen(screen) {
  startScreen.classList.remove("active");
  workoutScreen.classList.remove("active");
  finishScreen.classList.remove("active");
  screen.classList.add("active");
}

// 초 → 00:00
function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// 초/km → 5:30/km
function formatPace(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${String(sec).padStart(2, "0")}/km`;
}

// 페이스 → 트레드밀 속도 km/h
function paceToSpeed(secondsPerKm) {
  const minutesPerKm = secondsPerKm / 60;
  return (60 / minutesPerKm).toFixed(1);
}

// 기준 페이스 + 오프셋
function calculatePace(baseSeconds, offset) {
  return baseSeconds + offset;
}

// 프로그램 버튼 자동 생성
function renderProgramButtons() {
  programList.innerHTML = "";

  Object.keys(workouts).forEach((key) => {
    const workout = workouts[key];

    const button = document.createElement("button");
    button.className = "program-btn";
    button.dataset.program = key;

    button.innerHTML = `
      ${workout.buttonTitle}<br />
      <span>${workout.buttonSubtitle}</span>
    `;

    button.addEventListener("click", () => {
      startWorkout(key);
    });

    programList.appendChild(button);
  });
}

// 구간별 배경 톤 변경
function updateBodyMode(current) {
  document.body.classList.remove(
    "briefing",
    "warmup",
    "main",
    "recovery",
    "cooldown",
    "countdown-mode"
  );

  const section = current.section.toLowerCase();
  const phase = current.phase.toLowerCase();

  if (remainingTime <= 10 && remainingTime > 0) {
    document.body.classList.add("countdown-mode");
  }

  if (section.includes("briefing")) {
    document.body.classList.add("briefing");
  } else if (section.includes("warm")) {
    document.body.classList.add("warmup");
  } else if (
    phase.includes("recovery") ||
    phase.includes("easy jog") ||
    phase.includes("easy pace")
  ) {
    document.body.classList.add("recovery");
  } else if (section.includes("cool")) {
    document.body.classList.add("cooldown");
  } else if (section.includes("main")) {
    document.body.classList.add("main");
  } else {
    document.body.classList.add("briefing");
  }
}

// 현재 구간 진행 바 업데이트
function updateProgressBar() {
  const elapsedTime = currentStepTotalTime - remainingTime;

  const progress =
    currentStepTotalTime > 0
      ? Math.min((elapsedTime / currentStepTotalTime) * 100, 100)
      : 0;

  elapsedDisplay.textContent = formatTime(Math.max(elapsedTime, 0));
  progressPercent.textContent = `${Math.round(progress)}%`;
  progressFill.style.width = `${progress}%`;
}

// 카운트다운 오버레이 업데이트
function updateCountdownOverlay() {
  const next = selectedWorkout[currentIndex + 1];

  if (remainingTime <= 10 && remainingTime > 3 && next) {
    countdownOverlay.classList.add("show");
    countdownOverlay.classList.remove("final-count", "go");
    countdownSmall.textContent = "NEXT IN";
    countdownText.textContent = remainingTime;
    countdownNext.textContent = `다음 구간: ${next.phase}`;
    return;
  }

  if (remainingTime <= 3 && remainingTime > 0 && next) {
    countdownOverlay.classList.add("show", "final-count");
    countdownOverlay.classList.remove("go");
    countdownSmall.textContent = "READY";
    countdownText.textContent = remainingTime;
    countdownNext.textContent = `다음 구간: ${next.phase}`;
    return;
  }

  if (remainingTime > 10 || !next) {
    countdownOverlay.classList.remove("show", "final-count", "go");
  }
}

// GO 오버레이
function showGoOverlay() {
  const current = selectedWorkout[currentIndex];

  if (!current) return;

  countdownOverlay.classList.add("show", "go");
  countdownOverlay.classList.remove("final-count");
  countdownSmall.textContent = "GO";
  countdownText.textContent = current.phase;
  countdownNext.textContent = current.target;

  setTimeout(() => {
    countdownOverlay.classList.remove("show", "go");
  }, 900);
}

// 현재 운동 화면 업데이트
function updateScreen() {
  const current = selectedWorkout[currentIndex];
  const next = selectedWorkout[currentIndex + 1];

  if (!current) return;

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

  updateProgressBar();
  updateBodyMode(current);
  updateCountdownOverlay();
}

// 짧은 알림음
function beepShort() {
  const audio = new AudioContext();
  const oscillator = audio.createOscillator();
  const gainNode = audio.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audio.destination);

  oscillator.frequency.value = 850;
  gainNode.gain.value = 0.12;

  oscillator.start();
  oscillator.stop(audio.currentTime + 0.16);
}

// 긴 전환 알림음
function beepLong() {
  const audio = new AudioContext();
  const oscillator = audio.createOscillator();
  const gainNode = audio.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audio.destination);

  oscillator.frequency.value = 1050;
  gainNode.gain.value = 0.16;

  oscillator.start();
  oscillator.stop(audio.currentTime + 0.35);
}

// 카운트다운 사운드 제어
function handleCountdownSound() {
  if (remainingTime <= 3 && remainingTime > 0) {
    if (lastBeepSecond !== remainingTime) {
      beepShort();
      lastBeepSecond = remainingTime;
    }
  }
}

// 운동 시작
function startWorkout(programKey) {
  const min = Number(paceMinInput.value);
  const sec = Number(paceSecInput.value);

  if (
    Number.isNaN(min) ||
    Number.isNaN(sec) ||
    min <= 0 ||
    sec < 0 ||
    sec >= 60
  ) {
    alert("30분 TT 평균 페이스를 올바르게 입력해주세요. 예: 5분 30초");
    return;
  }

  thresholdPaceSeconds = min * 60 + sec;
  selectedWorkout = workouts[programKey].steps;

  currentIndex = 0;
  remainingTime = selectedWorkout[0].time;
  currentStepTotalTime = selectedWorkout[0].time;
  isPaused = false;
  lastBeepSecond = null;
  pauseBtn.textContent = "PAUSE";

  showScreen(workoutScreen);
  updateScreen();

  clearInterval(timer);

  timer = setInterval(() => {
    if (isPaused) return;

    remainingTime--;
    updateScreen();
    handleCountdownSound();

    if (remainingTime <= 0) {
      goToNextPhase();
    }
  }, 1000);
}

// 다음 단계로 이동
function goToNextPhase() {
  if (selectedWorkout.length === 0) return;

  beepLong();

  currentIndex++;

  if (currentIndex >= selectedWorkout.length) {
    clearInterval(timer);

    document.body.classList.remove(
      "briefing",
      "warmup",
      "main",
      "recovery",
      "cooldown",
      "countdown-mode"
    );

    countdownOverlay.classList.remove("show", "final-count", "go");
    showScreen(finishScreen);
    return;
  }

  remainingTime = selectedWorkout[currentIndex].time;
  currentStepTotalTime = selectedWorkout[currentIndex].time;
  lastBeepSecond = null;

  updateScreen();
  showGoOverlay();
}

// 리셋
function resetWorkout() {
  clearInterval(timer);

  selectedWorkout = [];
  currentIndex = 0;
  remainingTime = 0;
  currentStepTotalTime = 0;
  isPaused = false;
  lastBeepSecond = null;
  pauseBtn.textContent = "PAUSE";

  document.body.classList.remove(
    "briefing",
    "warmup",
    "main",
    "recovery",
    "cooldown",
    "countdown-mode"
  );

  countdownOverlay.classList.remove("show", "final-count", "go");

  showScreen(startScreen);
}

// 일시정지 / 재시작
pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "RESUME" : "PAUSE";
});

// 다음 단계
nextBtn.addEventListener("click", goToNextPhase);

// 리셋
resetBtn.addEventListener("click", resetWorkout);

// 완료 후 다시 시작
restartBtn.addEventListener("click", resetWorkout);

// 처음 화면에 프로그램 버튼 생성
renderProgramButtons();
