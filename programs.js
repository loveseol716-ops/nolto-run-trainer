const memberWorkouts = {
  week1: {
    title: "SESSION A: 1000m + 500m 10K Pace",
    buttonTitle: "SESSION A",
    buttonSubtitle: "1000m + 500m",
    targetRpeMin: 7,
    targetRpeMax: 8,
    description:
      "10km 페이스 기반으로 1000m 반복 후 500m 구간에서 조금 더 강도를 올리는 훈련입니다.",
    steps: [
      {
        section: "BRIEFING",
        phase: "오늘의 훈련 안내",
        time: 60,
        target: "1000m × 4 + 500m × 2",
        paceOffset: 30,
        round: "목표 RPE 7-8",
        message:
          "오늘은 1000m 반복 후 500m 구간으로 마무리하는 훈련입니다. 1000m는 10km 페이스보다 살짝 여유 있게, 500m는 10km 페이스로 진행합니다.",
      },
      {
        section: "WARM UP",
        phase: "Easy Jog",
        time: 360,
        target: "몸의 온도 올리기",
        paceOffset: 105,
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
        target: "4 Sets + 2 Sets",
        paceOffset: 30,
        round: "1000m × 4 → 500m × 2",
        message:
          "이제 본세트입니다. 먼저 1000m 4세트를 진행하고, 이후 500m 2세트를 진행합니다. 1000m는 RPE 7, 500m는 RPE 8 정도를 목표로 합니다.",
      },
      ...Array.from({ length: 4 }).flatMap((_, i) => [
        {
          section: "MAIN SET",
          phase: `1000m 10K Pace ${i + 1}/4`,
          distanceMeters: 1000,
          target: "1000m at 10K Pace +5-10s",
          paceOffset: 30,
          round: `Set ${i + 1}/4`,
          message:
            "1000m 구간입니다. 10km 페이스보다 살짝 여유 있게, RPE 7 정도로 안정적으로 유지하세요.",
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
      ...Array.from({ length: 2 }).flatMap((_, i) => [
        {
          section: "MAIN SET",
          phase: `500m 10K Pace ${i + 1}/2`,
          distanceMeters: 500,
          target: "500m at 10K Pace",
          paceOffset: 20,
          round: `Set ${i + 1}/2`,
          message:
            "500m 구간입니다. 10km 페이스로 조금 더 강하게 밀어주세요. 목표 RPE는 8입니다.",
        },
        {
          section: "MAIN SET",
          phase: `Easy Jog Recovery ${i + 1}/2`,
          time: 60,
          target: "60 Seconds Easy Jog Recovery",
          paceOffset: 120,
          round: `Recovery ${i + 1}/2`,
          message:
            "60초 Easy Jog Recovery입니다. 호흡을 정리하고 다음 구간을 준비하세요.",
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
    title: "SESSION B: 8 Min 10K Pace Volume",
    buttonTitle: "SESSION B",
    buttonSubtitle: "8 Min × 3",
    targetRpeMin: 7,
    targetRpeMax: 7,
    description:
      "10km 페이스보다 여유 있는 속도로 8분 반복을 수행하며 유산소 볼륨을 쌓는 훈련입니다.",
    steps: [
      {
        section: "BRIEFING",
        phase: "오늘의 훈련 안내",
        time: 60,
        target: "8분 반복 유산소 볼륨",
        paceOffset: 40,
        round: "8분 × 3 Sets",
        message:
          "오늘은 8분 반복 훈련입니다. 10km 페이스보다 여유 있는 속도로 진행합니다. 목표 RPE는 7입니다.",
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
        target: "3 Sets For Time",
        paceOffset: 40,
        round: "8분 + 90초 Easy Jog × 3 Sets",
        message:
          "이제 본세트입니다. 8분 동안 개인 기준 페이스보다 40초 느린 페이스로 달리고, 세트 사이에는 90초 Easy Jog로 회복합니다.",
      },
      ...Array.from({ length: 3 }).flatMap((_, i) => [
        {
          section: "MAIN SET",
          phase: `8 Min 10K Pace ${i + 1}/3`,
          time: 480,
          target: "8 Min at 10K Pace +15-20s",
          paceOffset: 40,
          round: `Set ${i + 1}/3`,
          message:
            "8분 구간입니다. 10km 페이스보다 여유 있게, RPE 7 정도로 안정적으로 유지하세요.",
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

const coachWorkouts = {
  week1: {
    title: "COACH SESSION A: 1000m + 500m 10K Pace",
    buttonTitle: "COACH A",
    buttonSubtitle: "1000m × 5 + 500m × 2",
    targetRpeMin: 7,
    targetRpeMax: 8,
    description:
      "코치용 10km 페이스 기반 인터벌입니다. 1000m 반복 볼륨을 5세트로 늘린 버전입니다.",
    steps: [
      {
        section: "BRIEFING",
        phase: "코치 훈련 안내",
        time: 60,
        target: "1000m × 5 + 500m × 2",
        paceOffset: 30,
        round: "목표 RPE 7-8",
        message:
          "코치용 프로그램입니다. 1000m 5세트 후 500m 2세트로 마무리합니다. 1000m는 10km 페이스보다 살짝 여유 있게, 500m는 10km 페이스로 진행합니다.",
      },
      {
        section: "WARM UP",
        phase: "Easy Jog",
        time: 360,
        target: "몸의 온도 올리기",
        paceOffset: 105,
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
        target: "5 Sets + 2 Sets",
        paceOffset: 30,
        round: "1000m × 5 → 500m × 2",
        message:
          "이제 본세트입니다. 먼저 1000m 5세트를 진행하고, 이후 500m 2세트를 진행합니다. 1000m는 RPE 7, 500m는 RPE 8 정도를 목표로 합니다.",
      },
      ...Array.from({ length: 5 }).flatMap((_, i) => [
        {
          section: "MAIN SET",
          phase: `1000m 10K Pace ${i + 1}/5`,
          distanceMeters: 1000,
          target: "1000m at 10K Pace +5-10s",
          paceOffset: 30,
          round: `Set ${i + 1}/5`,
          message:
            "1000m 구간입니다. 10km 페이스보다 살짝 여유 있게, RPE 7 정도로 안정적으로 유지하세요.",
        },
        {
          section: "MAIN SET",
          phase: `Easy Jog Recovery ${i + 1}/5`,
          time: 90,
          target: "90 Seconds Easy Jog Recovery",
          paceOffset: 120,
          round: `Recovery ${i + 1}/5`,
          message:
            "90초 Easy Jog Recovery입니다. 완전히 멈추지 말고 가볍게 호흡을 정리하세요.",
        },
      ]),
      ...Array.from({ length: 2 }).flatMap((_, i) => [
        {
          section: "MAIN SET",
          phase: `500m 10K Pace ${i + 1}/2`,
          distanceMeters: 500,
          target: "500m at 10K Pace",
          paceOffset: 20,
          round: `Set ${i + 1}/2`,
          message:
            "500m 구간입니다. 10km 페이스로 조금 더 강하게 밀어주세요. 목표 RPE는 8입니다.",
        },
        {
          section: "MAIN SET",
          phase: `Easy Jog Recovery ${i + 1}/2`,
          time: 60,
          target: "60 Seconds Easy Jog Recovery",
          paceOffset: 120,
          round: `Recovery ${i + 1}/2`,
          message:
            "60초 Easy Jog Recovery입니다. 호흡을 정리하고 다음 구간을 준비하세요.",
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
    title: "COACH SESSION B: 9 Min 10K Pace Volume",
    buttonTitle: "COACH B",
    buttonSubtitle: "9 Min × 3",
    targetRpeMin: 7,
    targetRpeMax: 7,
    description:
      "코치용 9분 반복 훈련입니다. 10km 페이스보다 약간 여유 있는 속도로 유산소 볼륨을 확보합니다.",
    steps: [
      {
        section: "BRIEFING",
        phase: "코치 훈련 안내",
        time: 60,
        target: "9분 반복 유산소 볼륨",
        paceOffset: 35,
        round: "9분 × 3 Sets",
        message:
          "코치용 9분 반복 훈련입니다. 10km 페이스보다 12-15초 정도 여유 있는 속도로 진행합니다. 목표 RPE는 7입니다.",
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
        target: "3 Sets For Time",
        paceOffset: 35,
        round: "9분 + 90초 Easy Jog × 3 Sets",
        message:
          "이제 본세트입니다. 9분 동안 개인 기준 페이스보다 35초 느린 페이스로 달리고, 세트 사이에는 90초 Easy Jog로 회복합니다.",
      },
      ...Array.from({ length: 3 }).flatMap((_, i) => [
        {
          section: "MAIN SET",
          phase: `9 Min 10K Pace ${i + 1}/3`,
          time: 540,
          target: "9 Min at 10K Pace +12-15s",
          paceOffset: 35,
          round: `Set ${i + 1}/3`,
          message:
            "9분 구간입니다. 10km 페이스보다 약간 여유 있게, RPE 7 정도로 안정적으로 유지하세요.",
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

// 기본값: 일반 멤버용
let workouts = memberWorkouts;
