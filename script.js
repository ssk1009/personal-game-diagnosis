// 1. 태그 점수를 저장할 바구니 준비
let tags = {
    multi: 0, solo: 0, competitive: 0, action: 0, explore: 0, story: 0, chill: 0, strategy: 0,
    creative: 0, casual: 0, hardcore: 0, gameplay: 0, character: 0, companion: 0, romance: 0,
    fantasy: 0, realistic: 0, cinematic: 0
};

// 2. 질문 문항 데이터 (10문항)
const questions = [
    {
        q: "[플레이 방식] 게임할 때 나는?",
        choices: [
            { text: "다른 사람과 함께 — 협력하거나 경쟁하는 게 재밌어", add: ["multi"] },
            { text: "혼자 — 내 속도대로 몰입하는 게 좋아", add: ["solo"] }
        ]
    },
    {
        q: "[쾌감 포인트] 게임할 때 가장 짜릿한 순간은?",
        choices: [
            { text: "상대를 이기거나 목표를 달성했을 때", add: ["competitive", "action"] },
            { text: "몰랐던 걸 발견하거나 스토리가 전개될 때", add: ["explore", "story"] }
        ]
    },
    {
        q: "[선호 장르] 더 끌리는 게임은?",
        choices: [
            { text: "치열한 전투·실력 중심 게임 (FPS, 배틀로얄 등)", add: ["action", "competitive"] },
            { text: "느긋하게 즐기는 게임 (시뮬, 어드벤처, 힐링 등)", add: ["chill", "explore"] }
        ]
    },
    {
        q: "[게임 속 목표] 게임에서 내가 원하는 건?",
        choices: [
            { text: "전략·판단력으로 상대를 제압하는 것", add: ["strategy", "competitive"] },
            { text: "세계를 탐험하거나 나만의 무언가를 만드는 것", add: ["explore", "creative"] }
        ]
    },
    {
        q: "[어려울 때] 게임이 너무 어려울 때 나는?",
        choices: [
            { text: "공략 찾아서 빠르게 해결하고 넘어가", add: ["casual"] },
            { text: "스스로 방법 찾을 때까지 몇 번이고 도전", add: ["hardcore"] }
        ]
    },
    {
        q: "[스토리 vs 전투] RPG 게임에서 더 중요한 건?",
        choices: [
            { text: "전투·액션·전략 — 싸우는 재미", add: ["action", "gameplay"] },
            { text: "스토리·대사·연출 — 이야기 보는 재미", add: ["story", "cinematic"] }
        ]
    },
    {
        q: "[컷씬 취향] 게임에서 영상 연출(컷씬)이 나오면?",
        choices: [
            { text: "스킵하고 빨리 게임으로 돌아가고 싶어", add: ["gameplay", "action"] },
            { text: "처음부터 끝까지 다 챙겨보는 편이야", add: ["story", "cinematic"] }
        ]
    },
    {
        q: "[캐릭터 애정] 게임에서 캐릭터에 얼마나 빠지는 편이야?",
        choices: [
            { text: "별로 — 캐릭터보다 게임플레이 자체가 중요해", add: ["gameplay"] },
            { text: "많이 — 애정 가는 캐릭터가 있어야 더 재밌어", add: ["character"] }
        ]
    },
    {
        q: "[캐릭터와의 관계] 게임 속 캐릭터와 어떤 관계를 원해?",
        choices: [
            { text: "동료·전우 — 같이 싸우고 모험하는 관계", add: ["companion", "story"] },
            { text: "연인·감정선 — 두근거리는 로맨스가 있는 관계", add: ["romance", "character"] }
        ]
    },
    {
        q: "[세계관] 더 끌리는 게임 세계관은?",
        choices: [
            { text: "판타지·이세계·귀엽고 아기자기한 세계", add: ["fantasy"] },
            { text: "SF·현실적·하드한 분위기의 세계", add: ["realistic"] }
        ]
    }
];

let currentQuestionIndex = 0;

// 3. 💡 [수정됨] 시작 화면을 보여주는 함수 (게임 사진 콜라주 추가)
function showStartScreen() {
    const container = document.getElementById('game-container');
    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices-container');

    container.classList.remove('animate-slide-side');
    void container.offsetWidth;

    // 💡 게임 사진들과 텍스트 꾸미기
    questionText.innerHTML = `
        <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 25px;">
            <!-- 첫 번째 게임 사진 (약간 왼쪽으로 기울임) -->
            <img src="game1.png" alt="게임1" style="width: 70px; height: 70px; border-radius: 20px; object-fit: cover; box-shadow: 0 8px 15px rgba(0,0,0,0.1); transform: rotate(-8deg); background-color: #ddd;">
            
            <!-- 두 번째 게임 사진 (살짝 위로 올라감) -->
            <img src="game2.png" alt="게임2" style="width: 70px; height: 70px; border-radius: 20px; object-fit: cover; box-shadow: 0 8px 15px rgba(0,0,0,0.1); transform: translateY(-10px); background-color: #eee;">
            
            <!-- 세 번째 게임 사진 (약간 오른쪽으로 기울임) -->
            <img src="game3.png" alt="게임3" style="width: 70px; height: 70px; border-radius: 20px; object-fit: cover; box-shadow: 0 8px 15px rgba(0,0,0,0.1); transform: rotate(8deg); background-color: #ccc;">
        </div>
        
        <div style="font-size: 40px; margin-bottom: 10px;">🎮</div>
        <h1 style="color: var(--mint); font-size: 26px; margin: 0 0 10px 0; word-break: keep-all;">퍼스널 게임 성향 진단</h1>
        <p style="font-size: 15px; color: #888; font-weight: normal; line-height: 1.5; margin-bottom: 20px;">
            10개의 질문을 통해<br>나에게 딱 맞는 게임 플레이 스타일과<br>추천 게임을 알아보세요!
        </p>
    `;

    choicesContainer.innerHTML = "";

    const startBtn = document.createElement('button');
    startBtn.innerText = "테스트 시작하기 🚀";
    startBtn.style.padding = "20px";
    startBtn.style.fontSize = "18px";

    startBtn.onclick = () => {
        renderQuestion();
    };

    choicesContainer.appendChild(startBtn);
    container.classList.add('animate-slide-side');
}

// 4. 화면을 그려주는 함수 (질문 렌더링)
function renderQuestion() {
    const container = document.getElementById('game-container');
    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices-container');

    container.classList.remove('animate-slide-side');
    void container.offsetWidth;

    if (currentQuestionIndex < questions.length) {
        const qData = questions[currentQuestionIndex];
        questionText.innerHTML = `<span style="font-size: 14px; color: var(--mint); display: block; margin-bottom: 10px;">Q${currentQuestionIndex + 1} / 10</span>${qData.q}`;
        choicesContainer.innerHTML = "";

        qData.choices.forEach(choice => {
            const btn = document.createElement('button');
            btn.innerText = choice.text;
            btn.onclick = () => {
                choice.add.forEach(tag => tags[tag]++);
                currentQuestionIndex++;
                renderQuestion();
            };
            choicesContainer.appendChild(btn);
        });
    } else {
        showResult();
    }

    container.classList.add('animate-slide-side');
}

// 5. 결과 계산 및 화면 출력 로직
function showResult() {
    const resultScores = [
        {
            id: "strategy", emoji: "♟️", name: "냉철한 전략가", hash: "#전략형 #경쟁형 #두뇌플레이",
            desc: "두뇌와 판단력으로 게임을 지배하는 타입. 메타 파악이 빠르고 승부욕이 강해요. 이기는 게 제일 재밌음.",
            games: "리그오브레전드, 롤토체스, 스타크래프트, 도타 2",
            score: (tags.strategy * 3) + (tags.competitive * 3) + tags.action - (tags.romance * 4) - (tags.cinematic * 4) - (tags.chill * 2) - (tags.creative * 2)
        },
        {
            id: "hardcore", emoji: "⚔️", name: "하드코어 파이터", hash: "#하드코어 #액션형 #도전형",
            desc: "빡셀수록 불타오르는 진성 게이머. 배틀로얄·FPS·소울라이크가 딱이에요.",
            games: "배틀그라운드, 발로란트, 엘든링, 검은신화:오공, 로스트아크, 던전앤파이터",
            score: (tags.action * 3) + (tags.hardcore * 3) + (tags.competitive * 2) - (tags.romance * 4) - (tags.cinematic * 4) - (tags.chill * 2)
        },
        {
            id: "explore", emoji: "🗺️", name: "자유로운 탐험가", hash: "#오픈월드 #탐험형 #장기플레이",
            desc: "넓은 오픈월드를 자유롭게 돌아다니며 발견의 기쁨을 즐기는 타입. 지도 구석구석 다 뒤지는 스타일.",
            games: "젤다의전설, 원신, 명조, 호그와트 레거시, 사이버펑크 2077, 연운, 파이널판타지 14",
            score: (tags.explore * 3) + (tags.solo * 2) + tags.story - (tags.romance * 3) - (tags.cinematic * 2) - (tags.competitive * 2)
        },
        {
            id: "story", emoji: "🌙", name: "감성 스토리텔러", hash: "#스토리RPG #감성몰입 #서사형",
            desc: "전투도 즐기면서 깊은 서사에 몰입하는 RPG 타입. 스킵 버튼은 없는 것과 같고, 엔딩에서 눈물 한 방울 각.",
            games: "페르소나 시리즈, NieR:오토마타, 붕괴:스타레일, 프래그마타, 용과같이 시리즈, 할로우나이트",
            score: (tags.story * 3) + tags.action + tags.solo + tags.explore - (tags.romance * 3) - (tags.cinematic * 3) - (tags.competitive * 2)
        },
        {
            id: "cinematic", emoji: "🎬", name: "시네마틱 게이머", hash: "#시네마틱 #선택지형 #인터랙티브무비",
            desc: "선택지·연출 중심의 영화 같은 게임을 좋아하는 타입. 게임인지 영화인지 구분이 안 될 때 행복해요.",
            games: "디트로이트 비컴 휴먼, 더 라스트 오브 어스, 투 더 문, 헤비 레인, 성세천하",
            score: (tags.cinematic * 5) + (tags.story * 3) + (tags.solo * 2) - (tags.action * 3) - (tags.competitive * 3) - (tags.romance * 3)
        },
        {
            id: "social", emoji: "🎉", name: "신나는 파티 소셜러", hash: "#멀티플레이 #파티게임 #사교형",
            desc: "같이 웃고 떠드는 게 제일 재밌는 타입. 친구들이랑 같이 하는 게 열 배는 재밌어요.",
            games: "폴가이즈, 피코파크, 휴먼폴플랫, 어몽어스, 잇 테익스 투, 파티 애니멀즈",
            score: (tags.multi * 5) + (tags.casual * 2) - (tags.solo * 4) - (tags.romance * 3) - (tags.cinematic * 3)
        },
        {
            id: "chill", emoji: "🌿", name: "느긋한 힐링메이커", hash: "#힐링형 #생활시뮬 #느긋한플레이",
            desc: "나만의 공간을 꾸미고 느긋하게 일상을 즐기는 힐링형. 경쟁보다 나만의 페이스.",
            games: "스타듀밸리, 동물의숲, 마인크래프트, 포코피아, 심즈, 두근두근타운, 테라리아",
            score: (tags.chill * 4) + (tags.creative * 3) + tags.solo - (tags.action * 4) - (tags.competitive * 4) - (tags.romance * 2)
        },
        {
            id: "collector", emoji: "✨", name: "열정적인 수집가", hash: "#수집형 #캐릭터덕후 #장기운영",
            desc: "좋아하는 캐릭터를 위해서라면 끝없이 파고드는 덕후형. 뽑기는 취미가 아니라 사명.",
            games: "블루 아카이브, 뱅드림, 프로젝트 세카이, 앙상블 스타즈, 우마무스메, 명일방주",
            score: (tags.character * 3) + (tags.fantasy * 2) + tags.story - (tags.romance * 3) - (tags.action * 2) - (tags.competitive * 2)
        },
        {
            id: "romance", emoji: "💌", name: "감성 로맨서", hash: "#로맨스형 #감정몰입 #미연시",
            desc: "게임 속 캐릭터와의 감정선·연애 요소에 진심으로 몰입하는 타입. 심장 두근거리는 게 취미.",
            games: "러브딜리버리, 러브앤딥스페이스, 아이돌리쉬세븐",
            score: (tags.romance * 6) + (tags.character * 2) + tags.story - (tags.action * 4) - (tags.competitive * 4) - (tags.multi * 3)
        }
    ];

    resultScores.sort((a, b) => b.score - a.score);
    const finalResult = resultScores[0];

    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices-container');

    questionText.innerHTML = `
        <div style="font-size: 50px; margin-bottom: 10px;">${finalResult.emoji}</div>
        <h2 style="color: var(--mint); margin-top: 0; margin-bottom: 5px;">${finalResult.name}</h2>
        <div style="font-size: 13px; color: #888; margin-bottom: 20px;">${finalResult.hash}</div>
        <p style="font-size: 16px; line-height: 1.5; color: var(--text-color);">${finalResult.desc}</p>
        
        <div style="background: rgba(29, 209, 161, 0.1); border: 1px solid rgba(29, 209, 161, 0.3); padding: 15px; border-radius: 15px; margin-top: 25px; text-align: left;">
            <strong style="color: var(--mint-hover); display: block; margin-bottom: 5px;">🎮 추천 게임</strong>
            <span style="font-size: 14px; line-height: 1.4;">${finalResult.games}</span>
        </div>
    `;

    choicesContainer.innerHTML = "";
    const restartBtn = document.createElement('button');
    restartBtn.innerText = "테스트 다시 하기";
    restartBtn.style.marginTop = "20px";
    restartBtn.onclick = () => {
        for (let key in tags) tags[key] = 0;
        currentQuestionIndex = 0;
        showStartScreen();
    };
    choicesContainer.appendChild(restartBtn);
}

// 6. 시작 화면 실행
showStartScreen();