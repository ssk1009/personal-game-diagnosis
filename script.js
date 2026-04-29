// 1. 플로우차트 데이터 준비 (대본 같은 역할)
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
    // 결과 페이지들
    "end_A": { text: "신중한 성격이시군요! 게임오버.", choices: [] },
    "result_warrior": { text: "당신의 성향은 든든한 방패 '전사'입니다!", choices: [] },
    "result_mage": { text: "당신의 성향은 지능적인 '마법사'입니다!", choices: [] }
};

// 2. 화면에 질문과 버튼을 그려주는 함수
function renderStory(nodeId) {
    const currentStory = storyData[nodeId];

    // 질문 텍스트 바꾸기
    document.getElementById('question-text').innerText = currentStory.text;

    // 기존 버튼들 지우기
    const choicesContainer = document.getElementById('choices-container');
    choicesContainer.innerHTML = "";

    // 새로운 버튼들 만들기
    currentStory.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.answer;

        // 버튼을 클릭했을 때 다음 노드로 이동하는 이벤트
        button.onclick = () => {
            renderStory(choice.next);
        };

        choicesContainer.appendChild(button);
    });
}

// 3. 게임 첫 시작점 실행
renderStory("start");