const workouts = {
  week1: {
    title: "SESSION A: 5 Min Threshold",
    buttonTitle: "SESSION A",
    buttonSubtitle: "5 Min Threshold",
    targetRpeMin: 7,
    targetRpeMax: 8,
    description: "5분 Threshold 반복을 통해 지속 가능한 페이스 유지력을 만드는 훈련입니다.",
    steps: [
      {
        section: "BRIEFING",
        phase: "오늘의 훈련 안내",
        time: 60,
        target: "5분 Threshold 반복 능력",
        paceOffset: 0,
        round: "총 구성: Warm Up → 5 Sets → Cool Down",
        message:
          "오늘은 5분 Threshold 반복 훈련입니다. 본세트 목표 체감 강도는 RPE 7-8입니다. 빠르게 시작하기보다 모든 세트를 안정적으로 유지하는 것이 목표입니다.",
      },
      {
        section: "WARM UP",
        phase: "Easy Jog",
        time: 360,
        target: "몸의 온도 올리기",
        paceOffset: 90,
        round: "6 Minute Easy Jog",
        message:
          "6분 Easy Jog입니다. 호흡을 편하게 만들고 몸을 천천히 준비하세요.",
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
          paceOffset: 105,
          round: `Recovery ${i + 1}/4`,
          message:
            "40초 Easy Recovery입니다. 속도를 낮추고 다음 Strides를 준비하세요.",
        },
      ]),
      {
        section: "MAIN BRIEFING",
        phase: "본훈련 안내",
        time: 60,
        target: "5 Sets For Meters",
        paceOffset: 0,
        round: "5분 Threshold + 1분 Rest × 5 Sets",
        message:
          "이제 본세트입니다. 5분 동안 Threshold Pace로 달리고, 세트 사이에는 1분간 휴식합니다. 목표 RPE는 7-8입니다.",
      },
      ...Array.from({ length: 5 }).flatMap((_, i) => [
        {
          section: "MAIN SET",
          phase: `Threshold ${i + 1}/5`,
          time: 300,
          target: "5 Minutes at Threshold",
          paceOffset: 0,
          round: `Set ${i + 1}/5`,
          message:
            "5분 Threshold 구간입니다. RPE 7-8 정도의 강도로 안정적으로 유지하세요.",
        },
        {
          section: "MAIN SET",
          phase: `Rest ${i + 1}/5`,
          time: 60,
          target: "1 Minute Rest",
          paceOffset: null,
          round: `Rest ${i + 1}/5`,
          message:
            "1분 휴식입니다. 트레드밀을 낮추거나 멈추고 다음 세트를 준비하세요.",
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
    title: "SESSION B: 1K Threshold",
    buttonTitle: "SESSION B",
    buttonSubtitle: "1K Threshold",
    targetRpeMin: 7,
    targetRpeMax: 8,
    description: "1000m Threshold 반복을 통해 페이스 감각과 회복 능력을 만드는 훈련입니다.",
    steps: [
      {
        section: "BRIEFING",
        phase: "오늘의 훈련 안내",
        time: 60,
        target: "1000m Threshold 반복",
        paceOffset: 0,
        round: "총 구성: Warm Up → 4 Sets → Cool Down",
        message:
          "오늘은 1000m Threshold 반복 훈련입니다. 1000m 구간은 멤버별 기준 페이스에 맞춰 자동으로 시간이 계산됩니다. 본세트 목표 RPE는 7-8입니다.",
      },
      {
        section: "WARM UP",
        phase: "Easy Jog",
        time: 240,
        target: "몸의 온도 올리기",
        paceOffset: 90,
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
          paceOffset: 105,
          round: `Recovery ${i + 1}/4`,
          message:
            "40초 Easy Recovery입니다. 속도를 낮추고 다음 Strides를 준비하세요.",
        },
      ]),
      {
        section: "MAIN BRIEFING",
        phase: "본훈련 안내",
        time: 60,
        target: "4 Sets For Time",
        paceOffset: 0,
        round: "1000m Threshold + 90초 Jog Recovery × 4 Sets",
        message:
          "이제 본세트입니다. 1000m 구간은 개인 기준 페이스를 기준으로 자동 계산됩니다. 각 세트 후 90초 Jog Recovery로 회복합니다.",
      },
      ...Array.from({ length: 4 }).flatMap((_, i) => [
        {
          section: "MAIN SET",
          phase: `1000m Threshold ${i + 1}/4`,
          distanceMeters: 1000,
          target: "1000m at Threshold",
          paceOffset: 0,
          round: `Set ${i + 1}/4`,
          message:
            "1000m Threshold 구간입니다. 개인 기준 페이스에 맞춰 자동 계산된 시간 동안 달립니다. RPE 7-8을 유지하세요.",
        },
        {
          section: "MAIN SET",
          phase: `Jog Recovery ${i + 1}/4`,
          time: 90,
          target: "90 Seconds Jog Recovery",
          paceOffset: 105,
          round: `Recovery ${i + 1}/4`,
          message:
            "90초 Jog Recovery입니다. 완전히 멈추지 말고 가볍게 호흡을 정리하세요.",
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
};
