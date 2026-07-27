const memberWorkouts = {
  week1: {
    title: "SESSION A: 400m 10K Speed Repeats",
    buttonTitle: "SESSION A",
    buttonSubtitle: "400m × 10",
    targetRpeMin: 8,
    targetRpeMax: 9,
    description:
      "10km 페이스보다 빠른 속도로 400m 반복을 수행하며 속도 적응과 회복 능력을 만드는 훈련입니다.",
    steps: [
      {
        section: "BRIEFING",
        phase: "오늘의 훈련 안내",
        time: 60,
        target: "400m × 10 Sets",
        paceOffset: 8,
        round: "목표 RPE 8-9",
        message:
          "오늘은 400m 반복 훈련입니다. 10km 페이스보다 10-15초 빠른 속도로 진행합니다. 세트 사이 60초는 걷지 않고 Easy Jog로 회복합니다.",
      },
      {
        section: "WARM UP",
        phase: "Easy Jog",
        time: 240,
        target: "몸의 온도 올리기",
        paceOffset: 105,
        round: "4 Minute Easy Jog",
        message:
          "4분 Easy Jog입니다. 호흡을 편하게 만들고 몸을 천천히 준비하세요.",
      },
      ...Array.from({ length: 4 }).flatMap((_, i) => [
        {
          section: "WARM UP",
          phase: `Strides ${i + 1}/4`,
          time: 20,
          target: "Threshold Pace까지 부드럽게 상승",
          paceOffset: 0,
          round: `Strides ${i + 1}/4`,
          message:
            "20초 Strides입니다. 전력질주가 아니라 Threshold Pace까지 부드럽게 끌어올립니다.",
        },
        {
          section: "WARM UP",
          phase: `Easy Recovery ${i + 1}/4`,
          time: 40,
          target: "호흡 회복",
          paceOffset: 120,
          round: `Recovery ${i + 1}/4`,
          message:
            "40초 Easy Recovery입니다. 속도를 낮추고 다음 Strides를 준비하세요.",
        },
      ]),
      {
        section: "MAIN BRIEFING",
        phase: "본훈련 안내",
        time: 60,
        target: "10 Sets For Meters",
        paceOffset: 8,
        round: "400m + 60초 Easy Jog × 10 Sets",
        message:
          "이제 본세트입니다. 400m를 10km 페이스보다 빠르게 10세트 진행합니다. 회복 구간은 걷지 않고 Easy Jog로 이어갑니다.",
      },
      ...Array.from({ length: 10 }).flatMap((_, i) => [
        {
          section: "MAIN SET",
          phase: `400m Fast 10K Pace ${i + 1}/10`,
          distanceMeters: 400,
          target: "400m at 10K Pace -10~15s",
          paceOffset: 8,
          round: `Set ${i + 1}/10`,
          message:
            "400m 구간입니다. 10km 페이스보다 빠르게 진행합니다. 목표 RPE는 8-8.5 정도입니다.",
        },
        {
          section: "MAIN SET",
          phase: `Easy Jog Recovery ${i + 1}/10`,
          time: 60,
          target: "60 Seconds Easy Jog Recovery",
          paceOffset: 120,
          round: `Recovery ${i + 1}/10`,
          message:
            "60초 Easy Jog Recovery입니다. 걷지 말고 가볍게 조깅으로 회복하세요.",
        },
      ]),
      {
        section: "COOL DOWN",
        phase: "Easy Jog",
        time: 300,
        target: "호흡과 심박 안정",
        paceOffset: 105,
        round: "5 Minute Easy Jog",
        message:
          "5분 쿨다운입니다. 속도를 충분히 낮추고 오늘 훈련을 마무리합니다.",
      },
    ],
  },

  week2: {
    title: "SESSION B: 20 Min 10K Tempo",
    buttonTitle: "SESSION B",
    buttonSubtitle: "20 Min Tempo",
    targetRpeMin: 7,
    targetRpeMax: 8,
    description:
      "10km 페이스보다 여유 있는 속도로 20분 지속주를 수행하며 페이스 유지력을 만드는 훈련입니다.",
    steps: [
      {
        section: "BRIEFING",
        phase: "오늘의 훈련 안내",
        time: 60,
        target: "20 Min Continuous Run",
        paceOffset: 35,
        round: "목표 RPE 7-8",
        message:
          "오늘은 20분 지속주입니다. 10km 페이스보다 10-15초 느린 속도로 진행합니다. 무리하게 빠르게 시작하지 말고 끝까지 일정하게 유지하세요.",
      },
      {
        section: "WARM UP",
        phase: "Easy Jog",
        time: 240,
        target: "몸의 온도 올리기",
        paceOffset: 105,
        round: "4 Minute Easy Jog",
        message:
          "4분 Easy Jog입니다. 호흡을 편하게 만들고 몸을 천천히 준비하세요.",
      },
      ...Array.from({ length: 4 }).flatMap((_, i) => [
        {
          section: "WARM UP",
          phase: `Strides ${i + 1}/4`,
          time: 20,
          target: "Threshold Pace까지 부드럽게 상승",
          paceOffset: 0,
          round: `Strides ${i + 1}/4`,
          message:
            "20초 Strides입니다. 전력질주가 아니라 Threshold Pace까지 부드럽게 끌어올립니다.",
        },
        {
          section: "WARM UP",
          phase: `Easy Recovery ${i + 1}/4`,
          time: 40,
          target: "호흡 회복",
          paceOffset: 120,
          round: `Recovery ${i + 1}/4`,
          message:
            "40초 Easy Recovery입니다. 속도를 낮추고 다음 Strides를 준비하세요.",
        },
      ]),
      {
        section: "MAIN BRIEFING",
        phase: "본훈련 안내",
        time: 60,
        target: "20 Min For Meters",
        paceOffset: 35,
        round: "20분 지속주",
        message:
          "이제 본세트입니다. 20분 동안 개인 기준 페이스보다 35초 느린 페이스로 달립니다. 목표 RPE는 7-8입니다.",
      },
      {
        section: "MAIN SET",
        phase: "20 Min 10K Tempo",
        time: 1200,
        target: "20 Min at 10K Pace +10~15s",
        paceOffset: 35,
        round: "20 Minute Run",
        message:
          "20분 지속주입니다. 호흡과 페이스를 일정하게 유지하세요. 후반에도 무너지지 않는 것이 목표입니다.",
      },
      {
        section: "COOL DOWN",
        phase: "Easy Jog",
        time: 300,
        target: "호흡과 심박 안정",
        paceOffset: 105,
        round: "5 Minute Easy Jog",
        message:
          "5분 쿨다운입니다. 속도를 충분히 낮추고 오늘 훈련을 마무리합니다.",
      },
    ],
  },
};

// 이번 주는 코치도 동일 프로그램
const coachWorkouts = memberWorkouts;

// 기본값: 일반 멤버용
let workouts = memberWorkouts;
