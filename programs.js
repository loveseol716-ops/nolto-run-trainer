const workouts = {
  week1: {
    title: "SESSION A: 800m 10K Pace Repeats",
    buttonTitle: "SESSION A",
    buttonSubtitle: "800m 10K Pace",
    targetRpeMin: 7,
    targetRpeMax: 8,
    description: "800m 반복을 통해 10km 페이스 감각과 안정적인 반복 능력을 만드는 훈련입니다.",
    steps: [
      {
        section: "BRIEFING",
        phase: "오늘의 훈련 안내",
        time: 60,
        target: "800m 반복 페이스 유지",
        paceOffset: 30,
        round: "800m × 4 Sets",
        message:
          "오늘은 800m 반복 훈련입니다. 10km 페이스보다 조금 여유 있는 속도로 진행합니다. 목표 RPE는 7-8입니다.",
      },
      {
        section: "WARM UP",
        phase: "Easy Jog",
        time: 480,
        target: "몸의 온도 올리기",
        paceOffset: 105,
        round: "8 Minute Easy Jog",
        message:
          "8분 Easy Jog입니다. 호흡을 편하게 만들고 몸을 천천히 준비하세요.",
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
        target: "4 Sets For Time",
        paceOffset: 30,
        round: "800m + 90초 Easy Jog × 4 Sets",
        message:
          "이제 본세트입니다. 800m를 개인 기준 페이스보다 30초 느린 페이스로 진행합니다. 각 세트 후 90초 Easy Jog로 회복합니다.",
      },
      ...Array.from({ length: 4 }).flatMap((_, i) => [
        {
          section: "MAIN SET",
          phase: `800m 10K Pace ${i + 1}/4`,
          distanceMeters: 800,
          target: "800m at 10K Pace +5-10s",
          paceOffset: 30,
          round: `Set ${i + 1}/4`,
          message:
            "800m 구간입니다. 10km 페이스보다 살짝 여유 있게, RPE 7 정도로 안정적으로 유지하세요.",
        },
        {
          section: "MAIN SET",
          phase: `Easy Jog Recovery ${i + 1}/4`,
          time: 90,
          target: "90 Seconds Easy Jog Recovery",
          paceOffset: 120,
          round: `Recovery ${i + 1}/4`,
          message:
            "90초 Easy Jog Recovery입니다. 완전히 멈추지 말고 가볍게 호흡을 정리하세요.",
        },
      ]),
      {
        section: "COOL DOWN",
        phase: "Easy Jog",
        time: 600,
        target: "호흡과 심박 안정",
        paceOffset: 105,
        round: "10 Minute Easy Jog",
        message:
          "10분 쿨다운입니다. 속도를 충분히 낮추고 오늘 훈련을 마무리합니다.",
      },
    ],
  },

  week2: {
    title: "SESSION B: 6 Min 10K Pace Volume",
    buttonTitle: "SESSION B",
    buttonSubtitle: "6 Min 10K Volume",
    targetRpeMin: 7,
    targetRpeMax: 7,
    description: "10km 페이스보다 여유 있는 속도로 6분 반복을 수행하며 유산소 볼륨을 쌓는 훈련입니다.",
    steps: [
      {
        section: "BRIEFING",
        phase: "오늘의 훈련 안내",
        time: 60,
        target: "6분 반복 유산소 볼륨",
        paceOffset: 40,
        round: "6분 × 3 Sets",
        message:
          "오늘은 6분 반복 훈련입니다. 10km 페이스보다 더 여유 있는 속도로 진행합니다. 목표 RPE는 7입니다.",
      },
      {
        section: "WARM UP",
        phase: "Easy Jog",
        time: 600,
        target: "몸의 온도 올리기",
        paceOffset: 105,
        round: "10 Minute Easy Jog",
        message:
          "10분 Easy Jog입니다. 몸을 천천히 올리고 호흡을 안정적으로 만들어주세요.",
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
        target: "3 Sets For Meters",
        paceOffset: 40,
        round: "6분 + 90초 Easy Jog × 3 Sets",
        message:
          "이제 본세트입니다. 6분 동안 개인 기준 페이스보다 40초 느린 페이스로 달리고, 세트 사이에는 90초 Easy Jog로 회복합니다.",
      },
      ...Array.from({ length: 3 }).flatMap((_, i) => [
        {
          section: "MAIN SET",
          phase: `6 Min 10K Pace ${i + 1}/3`,
          time: 360,
          target: "6 Min at 10K Pace +15-20s",
          paceOffset: 40,
          round: `Set ${i + 1}/3`,
          message:
            "6분 구간입니다. 10km 페이스보다 여유 있게, RPE 7 정도로 안정적으로 유지하세요.",
        },
        {
          section: "MAIN SET",
          phase: `Easy Jog Recovery ${i + 1}/3`,
          time: 90,
          target: "90 Seconds Easy Jog Recovery",
          paceOffset: 120,
          round: `Recovery ${i + 1}/3`,
          message:
            "90초 Easy Jog Recovery입니다. 완전히 멈추지 말고 가볍게 호흡을 정리하세요.",
        },
      ]),
      {
        section: "COOL DOWN",
        phase: "Easy Jog",
        time: 600,
        target: "호흡과 심박 안정",
        paceOffset: 105,
        round: "10 Minute Easy Jog",
        message:
          "10분 쿨다운입니다. 속도를 충분히 낮추고 오늘 훈련을 마무리합니다.",
      },
    ],
  },
};
