const workouts = {
  week1: {
    title: "WEEK 1: Threshold Interval",
    buttonTitle: "WEEK 1",
    buttonSubtitle: "Threshold + Plus",
    description: "Threshold Pace와 Threshold Plus를 함께 경험하는 인터벌 훈련입니다.",
    steps: [
      {
        section: "BRIEFING",
        phase: "오늘의 훈련 안내",
        time: 90,
        target: "Threshold Pace 적응",
        paceOffset: 0,
        round: "총 소요 시간: 약 40분",
        message:
          "오늘은 Threshold Interval 훈련입니다. 입력한 30분 TT 평균 페이스를 기준으로 Threshold Pace가 자동 계산됩니다. 목표는 빠르게 시작하는 것이 아니라, 5라운드 동안 페이스를 유지하는 것입니다.",
      },
      {
        section: "BRIEFING",
        phase: "프로그램 구성 설명",
        time: 90,
        target: "Threshold + Threshold Plus",
        paceOffset: 0,
        round: "Warm Up → Strides → 5 Rounds → Cool Down",
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
          round: `Strides ${i + 1}/4`,
          message:
            "20초 Strides입니다. 전력질주가 아니라 Threshold Pace까지 부드럽게 속도를 올립니다.",
        },
        {
          section: "WARM UP",
          phase: `Easy Recovery ${i + 1}/4`,
          time: 40,
          target: "호흡 회복",
          paceOffset: 90,
          round: `Recovery ${i + 1}/4`,
          message:
            "40초 Easy Recovery입니다. 속도를 낮추고 호흡을 정리하세요.",
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
          "이제 본훈련입니다. Threshold 구간은 입력한 30분 TT 평균 페이스로 진행합니다. Threshold Plus는 기준 페이스보다 조금 더 빠르게 진행합니다. 회복 구간은 RPE 4 수준으로 낮춰주세요.",
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
            "3분 Threshold 구간입니다. 빠르지만 통제 가능한 페이스를 유지하세요.",
        },
        {
          section: "MAIN SET",
          phase: `Recovery ${i + 1}/5`,
          time: 60,
          target: "1 Minute Recovery",
          paceOffset: 90,
          round: `Round ${i + 1}/5`,
          message:
            "1분 Recovery입니다. RPE 4 수준으로 속도를 낮추고 호흡을 정리하세요.",
        },
        {
          section: "MAIN SET",
          phase: `Threshold Plus ${i + 1}/5`,
          time: 60,
          target: "1 Minute at Threshold Plus",
          paceOffset: -10,
          round: `Round ${i + 1}/5`,
          message:
            "1분 Threshold Plus입니다. 기준 페이스보다 조금 더 빠르게 갑니다. 자세가 무너지지 않는 선에서 밀어붙이세요.",
        },
        {
          section: "MAIN SET",
          phase: `Recovery ${i + 1}/5`,
          time: 60,
          target: "1 Minute Recovery",
          paceOffset: 90,
          round: `Round ${i + 1}/5`,
          message:
            "다시 1분 Recovery입니다. 다음 라운드를 위해 호흡을 충분히 낮춰주세요.",
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
          "5분 쿨다운입니다. 속도를 충분히 낮추고 편하게 움직입니다. 오늘 훈련을 마무리합니다.",
      },
    ],
  },

  week2: {
    title: "WEEK 2: Threshold Volume",
    buttonTitle: "WEEK 2",
    buttonSubtitle: "10 Sets Threshold",
    description: "Threshold Pace 반복 능력과 후반 페이스 유지력을 만드는 훈련입니다.",
    steps: [
      {
        section: "BRIEFING",
        phase: "오늘의 훈련 안내",
        time: 90,
        target: "Threshold 반복 능력 강화",
        paceOffset: 0,
        round: "총 소요 시간: 약 50분",
        message:
          "오늘은 10세트 Threshold 훈련입니다. 입력한 30분 TT 평균 페이스를 기준으로 3분씩 반복합니다. 목표는 빠르게 시작하는 것이 아니라, 10세트 동안 일정한 페이스를 유지하는 것입니다.",
      },
      {
        section: "BRIEFING",
        phase: "프로그램 구성 설명",
        time: 90,
        target: "10세트 페이스 유지",
        paceOffset: 0,
        round: "Warm Up → Strides → 10 Sets → Cool Down",
        message:
          "먼저 6분 Easy Jog로 몸을 올립니다. 이후 20초 Strides와 40초 Easy Recovery를 4라운드 진행합니다. 본훈련은 3분 Threshold와 40초 Easy Jog를 총 10세트 반복합니다.",
      },
      {
        section: "BRIEFING",
        phase: "페이스 가이드",
        time: 60,
        target: "Threshold RPE 8",
        paceOffset: 0,
        round: "첫 3세트는 보수적으로",
        message:
          "Threshold 구간은 RPE 8 정도입니다. 숨은 차지만 무너지지 않아야 합니다. 첫 3세트에서 과하게 올리면 후반부가 무너질 수 있습니다. 오늘의 핵심은 후반 유지입니다.",
      },
      {
        section: "WARM UP",
        phase: "Easy Jog",
        time: 360,
        target: "몸의 온도 올리기",
        paceOffset: 75,
        round: "6 Minute Easy Jog",
        message:
          "6분 Easy Jog입니다. 몸을 천천히 올리고 호흡을 안정적으로 만들어주세요.",
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
          paceOffset: 90,
          round: `Recovery ${i + 1}/4`,
          message:
            "40초 Easy Recovery입니다. 속도를 낮추고 다음 Strides를 준비하세요.",
        },
      ]),
      {
        section: "MAIN BRIEFING",
        phase: "본훈련 안내",
        time: 90,
        target: "10 Sets For Meters",
        paceOffset: 0,
        round: "3분 Threshold + 40초 Easy Jog × 10 Sets",
        message:
          "이제 본훈련입니다. 3분 동안 Threshold Pace로 달리고, 40초 동안 Easy Jog로 회복합니다. 총 10세트입니다. 후반에도 같은 속도를 유지하는 것이 오늘의 목표입니다.",
      },
      ...Array.from({ length: 10 }).flatMap((_, i) => [
        {
          section: "MAIN SET",
          phase: `Threshold ${i + 1}/10`,
          time: 180,
          target: "3 Minutes at Threshold",
          paceOffset: 0,
          round: `Set ${i + 1}/10`,
          message:
            "3분 Threshold 구간입니다. RPE 8 정도의 강도입니다. 빠르지만 무너지지 않는 페이스를 유지하세요.",
        },
        {
          section: "MAIN SET",
          phase: `Easy Jog ${i + 1}/10`,
          time: 40,
          target: "40 Seconds Easy Jog",
          paceOffset: 90,
          round: `Recovery ${i + 1}/10`,
          message:
            "40초 Easy Jog입니다. 완전히 멈추지 말고 가볍게 호흡을 정리하세요.",
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
