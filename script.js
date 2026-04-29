// 1. 플로우차트 데이터 준비 (그대로 유지)
const storyData = {
    "start": {
        text: "게임을 시작하시겠습니까?",
        choices: [
            { answer: "네, 당장 시작할래요!", next: "q1" },
            { answer: "아니요, 좀 더 생각해볼게요.", next: "end_A" }
        ]
    },
    "q1": {
        text: "파티에 직업을 하나만 데려갈 수 있다면?",
        choices: [
            { answer: "든든한 탱커 전사", next: "result_warrior" },
            { answer: "강력한 한방 마법사", next: "result_mage" }
        ]
    },
    "end_A": {
        text: "신중한 성격이시군요! 게임오버.",
        choices: [{ answer: "처음으로 돌아가기", next: "start" }]
    },
    "result_warrior": {
        text: "당신의 성향은 든든한 방패 '전사'입니다!",
        choices: [{ answer: "처음으로 돌아가기", next: "start" }]
    },
    "result_mage": {
        text: "당신의 성향은 지능적인 '마법사'입니다!",
        choices: [{ answer: "처음으로 돌아가기", next: "start" }]
    }
};

// 2. 화면에 질문과 버튼을 그려주는 함수 (애니메이션 대상 수정됨)
function renderStory(nodeId) {
    const currentStory = storyData[nodeId];

    // 💡 [핵심 수정] 이제 개별 텍스트가 아닌 컨테이너(하얀 네모) 자체를 가져옵니다.
    const container = document.getElementById('game-container');
    const questionText = document.getElementById('question-text');
    const choicesContainer = document.getElementById('choices-container');

    // 💡 [핵심 수정] 하얀 네모 자체에서 애니메이션 클래스 제거
    container.classList.remove('animate-slide-side');

    // 브라우저가 클래스 제거를 인식하도록 잠깐 강제 새로고침
    void container.offsetWidth;

    // --- [콘텐츠 교체 로직 - 기존과 동일] ---
    questionText.innerText = currentStory.text;
    choicesContainer.innerHTML = "";

    currentStory.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.answer;

        button.onclick = () => {
            renderStory(choice.next);
        };

        choicesContainer.appendChild(button);
    });
    // ----------------------------------------

    // 💡 [핵심 수정] 내용 교체가 끝난 후 하얀 네모 자체에 애니메이션 클래스 다시 붙이기
    // 이제 반투명한 네모 통째로 오른쪽에서 스르륵 밀려 들어옵니다.
    container.classList.add('animate-slide-side');
}

// 3. 게임 첫 시작점 실행
renderStory("start");