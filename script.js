const API_URL = "https://script.google.com/macros/s/AKfycbwWdEm_u4DimzCdlRDPKRI-9b70dADd54EU9OOFvpnHyW5oVhjyKCo0WuCtSSy7ridFoA/exec";
let selectedWorkout = [];
let selectedProgramKey = null;
let currentMemberCode = null;
let currentMember = null;

let currentIndex = 0;
let remainingTime = 0;
let currentStepTotalTime = 0;
let timer = null;
let isPaused = false;
let thresholdPaceSeconds = 330;
let lastBeepSecond = null;
let audioContext = null;

// 화면 요소
const startScreen = document.getElementById("start-screen");
const workoutScreen = document.getElementById("workout-screen");
const rpeScreen = document.getElementById("rpe-screen");
const finishScreen = document.getElementById("finish-screen");

// 멤버 로그인 요소
const memberCodeInput = document.getElementById("member-code-input");
const memberLoginBtn = document.getElementById("member-login-btn");
const memberInfoBox = document.getElementById("member-info-box");
const memberNameDisplay = document.getElementById("member-name-display");
const memberPaceDisplay = document.getElementById("member-pace-display");
const memberSpeedDisplay = document.getElementById("member-speed-display");

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

// RPE 요소
const rpeButtons = document.querySelectorAll(".rpe-btn");
const finishResult = document.getElementById("finish-result");

// 화면 전환
function showScreen(screen) {
  startScreen.classList.remove("active");
  workoutScreen.classList.remove("active");
  rpeScreen.classList.remove("active");
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

// 오디오 초기화
function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

// 알림음 생성
function playBeep(frequency, duration, volume) {
  initAudio();

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + duration
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

// 짧은 알림음
function beepShort() {
  playBeep(900, 0.14, 0.16);
}

// 긴 전환 알림음
function beepLong() {
  playBeep(1100, 0.32, 0.18);
}

// localStorage key
function getMemberStorageKey(code) {
  return `nolto_member_${code}`;
}

// 저장된 멤버 데이터 불러오기
function loadMemberData(code) {
  const saved = localStorage.getItem(getMemberStorageKey(code));

  if (saved) {
    return JSON.parse(saved);
  }

  const base = members[code];

  const newMemberData = {
    code,
    name: base.name,
    basePaceSeconds: base.basePaceSeconds,
    weeklyResults: []
  };

  localStorage.setItem(getMemberStorageKey(code), JSON.stringify(newMemberData));

  return newMemberData;
}

// 멤버 데이터 저장
function saveMemberData() {
  if (!currentMemberCode || !currentMember) return;

  localStorage.setItem(
    getMemberStorageKey(currentMemberCode),
    JSON.stringify(currentMember)
  );
}

// 멤버 로그인
function loginMember() {
  const code = memberCodeInput.value.trim().toUpperCase();

  if (!code) {
    alert("멤버 코드를 입력해주세요.");
    return;
  }

  if (!members[code]) {
    alert("등록되지 않은 멤버 코드입니다.");
    return;
  }

  initAudio();

  currentMemberCode = code;
  currentMember = loadMemberData(code);
  thresholdPaceSeconds = currentMember.basePaceSeconds;

  memberNameDisplay.textContent = `${currentMember.name}님`;
  memberPaceDisplay.textContent = `현재 기준 페이스: ${formatPace(thresholdPaceSeconds)}`;
  memberSpeedDisplay.textContent = `트레드밀 속도: ${paceToSpeed(thresholdPaceSeconds)} km/h`;

  memberInfoBox.classList.remove("hidden");
  programList.classList.remove("hidden");

  renderProgramButtons();
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
  if (!currentMember) {
    alert("먼저 멤버 코드를 입력해주세요.");
    return;
  }

  initAudio();

  selectedProgramKey = programKey;
  thresholdPaceSeconds = currentMember.basePaceSeconds;
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

    // 소리를 먼저 실행해서 화면 숫자와 체감 싱크를 맞춤
    handleCountdownSound();

    updateScreen();

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

    showRpeScreen();
    return;
  }

  remainingTime = selectedWorkout[currentIndex].time;
  currentStepTotalTime = selectedWorkout[currentIndex].time;
  lastBeepSecond = null;

  updateScreen();
  showGoOverlay();
}

// RPE 입력 화면
function showRpeScreen() {
  showScreen(rpeScreen);
}

// RPE 판정
function judgeRpe(actualRpe, targetMin, targetMax) {
  if (actualRpe < targetMin) return "LOW";
  if (actualRpe > targetMax) return "HIGH";
  return "OK";
}

// 주간 2회 기준 보정
function calculateWeeklyAdjustment(results) {
  if (results.length < 2) {
    return {
      adjustment: 0,
      message: "이번 주 1회 기록 완료. 2회 기록 후 기준 페이스가 보정됩니다."
    };
  }

  const lastTwo = results.slice(-2);
  const first = lastTwo[0].result;
  const second = lastTwo[1].result;

  if (first === "LOW" && second === "LOW") {
    return {
      adjustment: -5,
      message: "최근 2회 모두 목표보다 쉬웠습니다. 다음 기준 페이스를 5초 빠르게 조정합니다."
    };
  }

  if (first === "HIGH" && second === "HIGH") {
    return {
      adjustment: 5,
      message: "최근 2회 모두 목표보다 과했습니다. 다음 기준 페이스를 5초 느리게 조정합니다."
    };
  }

  return {
    adjustment: 0,
    message: "최근 2회 결과가 한 방향으로 벗어나지 않았습니다. 기준 페이스를 유지합니다."
  };
}

// RPE 저장 및 결과 표시
function submitRpe(actualRpe) {
  const program = workouts[selectedProgramKey];
  const targetMin = program.targetRpeMin || 8;
  const targetMax = program.targetRpeMax || 9;

  const result = judgeRpe(actualRpe, targetMin, targetMax);

  const record = {
    date: new Date().toISOString(),
    programKey: selectedProgramKey,
    programName: program.buttonTitle,
    targetRpeMin: targetMin,
    targetRpeMax: targetMax,
    actualRpe,
    result
  };

  currentMember.weeklyResults.push(record);

  const weeklyAdjustment = calculateWeeklyAdjustment(currentMember.weeklyResults);
  const beforePace = currentMember.basePaceSeconds;

  if (weeklyAdjustment.adjustment !== 0) {
    currentMember.basePaceSeconds += weeklyAdjustment.adjustment;

    // 보정 후에는 새로운 기준으로 다시 2회 측정 시작
    currentMember.weeklyResults = [];
  }

  const afterPace = currentMember.basePaceSeconds;

  saveMemberData();

  let resultText = "";

  if (result === "LOW") {
    resultText = "오늘 본세트는 조금 여유 있었습니다.";
  } else if (result === "HIGH") {
    resultText = "오늘 본세트는 강도가 높았습니다.";
  } else {
    resultText = "오늘 본세트는 적절한 강도였습니다.";
  }

  finishResult.innerHTML = `
    ${currentMember.name}님 훈련 완료<br /><br />
    오늘 RPE: ${actualRpe}<br />
    판정: ${resultText}<br /><br />
    ${weeklyAdjustment.message}<br /><br />
    이전 기준 페이스: ${formatPace(beforePace)}<br />
    현재 기준 페이스: ${formatPace(afterPace)}
  `;

  showScreen(finishScreen);
}

// 리셋
function resetWorkout() {
  clearInterval(timer);

  selectedWorkout = [];
  selectedProgramKey = null;
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

  if (currentMember) {
    thresholdPaceSeconds = currentMember.basePaceSeconds;
    memberPaceDisplay.textContent = `현재 기준 페이스: ${formatPace(thresholdPaceSeconds)}`;
    memberSpeedDisplay.textContent = `트레드밀 속도: ${paceToSpeed(thresholdPaceSeconds)} km/h`;
  }

  showScreen(startScreen);
}

// 이벤트 연결
memberLoginBtn.addEventListener("click", loginMember);

memberCodeInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    loginMember();
  }
});

pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "RESUME" : "PAUSE";
});

nextBtn.addEventListener("click", goToNextPhase);

resetBtn.addEventListener("click", resetWorkout);

restartBtn.addEventListener("click", resetWorkout);

rpeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const rpe = Number(button.dataset.rpe);
    submitRpe(rpe);
  });
});
