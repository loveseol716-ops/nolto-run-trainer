const workouts = {
  week1: {
    title: "SESSION A: 10K Time Trial",
    buttonTitle: "SESSION A",
    buttonSubtitle: "10K TT",
    targetRpeMin: 8,
    targetRpeMax: 9,
    description: "개인 기준 페이스보다 조금 낮춘 페이스로 10km 기록을 측정하는 훈련입니다.",
    steps: [
      {
        section: "BRIEFING",
        phase: "오늘의 훈련 안내",
        time: 60,
        target: "10K Time Trial",
        paceOffset: 20,
        round: "Goal Pace = 기준 페이스 +20초/km",
        message:
          "오늘은 10km Time Trial입니다. 30분 TT 기준 페이스보다 20초 느린 페이스로 시작합니다. 처음부터 무리하지 말고, 후반 2~3km에서 여유가 있으면 조금씩 올려주세요.",
      },
      {
        section: "WARM UP",
        phase: "Easy Jog",
        time: 360,
        target: "몸의 온도 올리기",
        paceOffset: 105,
        round: "6 Minute Easy Jog",
        message:
          "6분 Easy Jog입니다. 오늘은 10km를 뛰기 때문에 초반부터 몸을 천천히 올려주세요.",
      },
      ...Array.from({ length: 4 }).flatMap((_, i) => [
        {
          section: "WARM UP",
          phase: `Strides ${i + 1}/4`,
          time: 20,
          target: "Goal Pace까지 부드럽게 상승",
          paceOffset: 20,
          round: `Strides ${i + 1}/4`,
          message:
            "20초 Strides입니다. 전력질주가 아니라 오늘의 10K 목표 페이스까지 부드럽게 올립니다.",
        },
        {
          section: "WARM UP",
          phase: `Easy Recovery ${i + 1}/4`,
          time: 40,
          target: "호흡 회복",
          paceOffset: 120,
          round: `Recovery ${i + 1}/4`,
          message:
            "40초 Easy Recovery입니다. 속도를 낮추고 호흡을 정리하세요.",
        },
      ]),
      {
        section: "MAIN BRIEFING",
        phase: "10K TT 준비",
        time: 120,
        target: "Rest as Needed",
        paceOffset: null,
        round: "준비 후 시작",
        message:
          "이제 10km TT를 시작합니다. 필요하면 물을 마시고, 트레드밀 설정을 준비한 뒤 시작하세요. 목표는 끝까지 무너지지 않는 페이스 유지입니다.",
      },
      {
        section: "MAIN SET",
        phase: "10K Time Trial",
        distanceMeters: 10000,
        target: "10km For Time",
        paceOffset: 20,
        round: "10km TT",
        message:
          "10km Time Trial입니다. 기준 페이스보다 20초 느린 목표 페이스로 시작합니다. 중반까지는 참는 느낌으로 가고, 후반에 여유가 있으면 조금씩 올려주세요.",
      },
      {
        section: "COOL DOWN",
        phase: "Easy Jog / Walk",
        time: 300,
        target: "호흡과 심박 안정",
        paceOffset: 120,
        round: "5 Minute Cool Down",
        message:
          "5분 쿨다운입니다. 속도를 충분히 낮추고 걷거나 가볍게 조깅하면서 마무리합니다.",
      },
    ],
  },

  week2: {
    title: "SESSION B: 6 Min Threshold",
    buttonTitle: "SESSION B",
    buttonSubtitle: "6 Min Threshold",
    targetRpeMin: 7,
    targetRpeMax: 8,
    description: "6분 Threshold 반복을 통해 지속 가능한 페이스 유지력을 만드는 훈련입니다.",
    steps: [
      {
        section: "BRIEFING",
        phase: "오늘의 훈련 안내",
        time: 60,
        target: "6분 Threshold 반복",
        paceOffset: 0,
        round: "총 구성: Warm Up → 4 Sets → Cool Down",
        message:
          "오늘은 6분 Threshold 반복 훈련입니다. 본세트 목표 체감 강도는 RPE 7-8입니다. 빠르게 시작하기보다 4세트 모두 안정적으로 유지하는 것이 목표입니다.",
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
        paceOffset: 0,
        round: "6분 Threshold + 90초 Jog Recovery × 4 Sets",
        message:
          "이제 본세트입니다. 6분 동안 Threshold Pace로 달리고, 세트 사이에는 90초 Jog Recovery로 회복합니다. 목표 RPE는 7-8입니다.",
      },
      ...Array.from({ length: 4 }).flatMap((_, i) => [
        {
          section: "MAIN SET",
          phase: `Threshold ${i + 1}/4`,
          time: 360,
          target: "6 Minutes at Threshold",
          paceOffset: 0,
          round: `Set ${i + 1}/4`,
          message:
            "6분 Threshold 구간입니다. RPE 7-8 정도의 강도로 안정적으로 유지하세요.",
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
        time: 480,
        target: "호흡과 심박 안정",
        paceOffset: 105,
        round: "8 Minute Easy Jog",
        message:
          "8분 쿨다운입니다. 속도를 충분히 낮추고 오늘 훈련을 마무리합니다.",
      },
    ],
  },
};
