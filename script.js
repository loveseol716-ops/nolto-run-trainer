const API_URL = "https://script.google.com/macros/s/AKfycbwWdEm_u4DimzCdlRDPKRI-9b70dADd54EU9OOFvpnHyW5oVhjyKCo0WuCtSSy7ridFoA/exec";

// 코치 전용 프로그램을 볼 코드
// 실제 사용하는 설재현 / 윤관장 코드로 바꾸면 됨
const COACH_CODES = ["SJ01", "DW01"];

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

// 현재 사용할 프로그램 세트 선택
function selectWorkoutSet(member) {
  const code = String(member.code || "").trim().toUpperCase();
  const role = String(member.role || "").trim().toLowerCase();

  const isCoach =
    role === "coach" ||
    COACH_CODES.map((item) => item.toUpperCase()).includes(code);

  if (isCoach && typeof coachWorkouts !== "undefined") {
    workouts = coachWorkouts;
    return "coach";
  }

  if (typeof memberWorkouts !== "undefined") {
    workouts = memberWorkouts;
  }

  return "member";
}

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

// 거리 기반 시간 계산
function calculateDistanceTime(step) {
  if (!step.distanceMeters) {
    return step.time;
  }

  const paceForDistance = calculatePace(
    thresholdPaceSeconds,
    step.paceOffset || 0
  );

  return Math.round(paceForDistance * (step.distanceMeters / 1000));
}

// 현재 스텝 시간 가져오기
function getStepDuration(step) {
  if (step.distanceMeters) {
    return calculateDistanceTime(step);
  }

  return step.time;
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

// 멤버 로그인: Google Sheet에서 멤버 정보 불러오기
async function loginMember() {
  const code = memberCodeInput.value.trim().toUpperCase();

  if (!code) {
    alert("멤버 코드를 입력해주세요.");
    return;
  }

  try {
    initAudio();

    memberLoginBtn.textContent = "LOADING...";

    const url = `${API_URL}?action=getMember&code=${encodeURIComponent(code)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.success) {
      alert(data.message || "멤버 정보를 불러오지 못했습니다.");
      memberLoginBtn.textContent = "ENTER";
      return;
    }

    currentMemberCode = data.member.code;
    currentMember = data.member;
    thresholdPaceSeconds = Number(currentMember.basePaceSeconds);

    const workoutType = selectWorkoutSet(currentMember);

    memberNameDisplay.textContent = `${currentMember.name}님`;
    memberPaceDisplay.textContent = `현재 기준 페이스: ${formatPace(thresholdPaceSeconds)}`;
    memberSpeedDisplay.textContent = `트레드밀 속도: ${paceToSpeed(thresholdPaceSeconds)} km/h`;

    if (workoutType === "coach") {
      memberNameDisplay.textContent = `${currentMember.name}님 / COACH MODE`;
    }

    memberInfoBox.classList.remove("hidden");
    programList.classList.remove("hidden");

    renderProgramButtons();

    memberLoginBtn.textContent = "ENTER";
  } catch (error) {
    console.error(error);
    alert("Google Sheet 연결에 실패했습니다. Apps Script 배포 URL을 확인해주세요.");
    memberLoginBtn.textContent = "ENTER";
  }
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

  sectionLabel.textContent = current.section;
  phaseLabel.textContent = current.phase;
  timeDisplay.textContent = formatTime(remainingTime);
  targetDisplay.textContent = `목표: ${current.target}`;
  roundDisplay.textContent = `진행: ${current.round}`;
  coachMessage.textContent = current.message;
  nextPhase.textContent = next ? `다음 구간: ${next.phase}` : "마지막 구간";

  if (current.paceOffset === null) {
    paceDisplay.textContent = "권장 페이스: Rest";
    speedDisplay.textContent = "트레드밀 속도: 정지 또는 걷기";
  } else {
    const adjustedPace = calculatePace(
      thresholdPaceSeconds,
      current.paceOffset || 0
    );
    const treadmillSpeed = paceToSpeed(adjustedPace);

    paceDisplay.textContent = `권장 페이스: ${formatPace(adjustedPace)}`;
    speedDisplay.textContent = `트레드밀 속도: ${treadmillSpeed} km/h`;
  }

  if (current.distanceMeters) {
    targetDisplay.textContent = `목표: ${current.distanceMeters}m`;
  }

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
  thresholdPaceSeconds = Number(currentMember.basePaceSeconds);
  selectedWorkout = workouts[programKey].steps;

  currentIndex = 0;
  remainingTime = getStepDuration(selectedWorkout[0]);
  currentStepTotalTime = getStepDuration(selectedWorkout[0]);
  isPaused = false;
  lastBeepSecond = null;
  pauseBtn.textContent = "PAUSE";

  showScreen(workoutScreen);
  updateScreen();

  clearInterval(timer);

  timer = setInterval(() => {
    if (isPaused) return;

    remainingTime--;

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

  remainingTime = getStepDuration(selectedWorkout[currentIndex]);
  currentStepTotalTime = getStepDuration(selectedWorkout[currentIndex]);
  lastBeepSecond = null;

  updateScreen();
  showGoOverlay();
}

// RPE 입력 화면
function showRpeScreen() {
  showScreen(rpeScreen);
}

// RPE 저장: Google Sheet로 전송
async function submitRpe(actualRpe) {
  if (!currentMember || !selectedProgramKey) {
    alert("멤버 또는 프로그램 정보가 없습니다.");
    return;
  }

  const program = workouts[selectedProgramKey];
  const targetMin = program.targetRpeMin || 8;
  const targetMax = program.targetRpeMax || 9;

  try {
    finishResult.innerHTML = "기록 저장 중입니다...";

    const url =
      `${API_URL}?action=saveRpe` +
      `&code=${encodeURIComponent(currentMemberCode)}` +
      `&programKey=${encodeURIComponent(selectedProgramKey)}` +
      `&programName=${encodeURIComponent(program.buttonTitle)}` +
      `&targetRpeMin=${encodeURIComponent(targetMin)}` +
      `&targetRpeMax=${encodeURIComponent(targetMax)}` +
      `&actualRpe=${encodeURIComponent(actualRpe)}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.success) {
      alert(data.message || "기록 저장에 실패했습니다.");
      return;
    }

    currentMember.basePaceSeconds = Number(data.basePaceAfter);
    thresholdPaceSeconds = Number(data.basePaceAfter);

    finishResult.innerHTML = `
      ${currentMember.name}님 훈련 완료<br /><br />
      오늘 RPE: ${actualRpe}<br />
      ${data.message}<br /><br />
      이전 기준 페이스: ${formatPace(Number(data.basePaceBefore))}<br />
      현재 기준 페이스: ${formatPace(Number(data.basePaceAfter))}
    `;

    showScreen(finishScreen);
  } catch (error) {
    console.error(error);
    alert("Google Sheet 기록 저장에 실패했습니다. Apps Script 배포 상태를 확인해주세요.");
  }
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
    thresholdPaceSeconds = Number(currentMember.basePaceSeconds);
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
