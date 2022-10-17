
//============== 전역변수, 함수 정의 영역 ==================//

// 게임 데이터 객체
// 실제 정답, 사용자가 선택한 정답, 최소값, 최대값
// x이상 y이하 랜덤 정수 생성 공식
// Math.floor(Math.random() * (y - x + 1)) + x
const gameDatas = {
    secret: Math.floor(Math.random() * 100) + 1,
    answer: null,
    min: 1,
    max: 100
};

// 숫자 아이콘 생성 함수
function makeIcons() {

    const $numbers = document.getElementById('numbers');

    const $middle = document.createDocumentFragment();

    for (let n = 1; n <= 100; n++) {
        const $div = document.createElement('div');
        $div.classList.add('icon');

        $div.dataset.number = n;
        $div.textContent = n;
        $middle.appendChild($div);
    }
    $numbers.appendChild($middle);

}

// 아이콘 삭제 함수
function clearIcons($target, isUp) {

    const $numbers = document.getElementById('numbers');

    let $delTarget = $target;

    while ($delTarget) {

        let $next = isUp 
                ? $delTarget.previousElementSibling
                : $delTarget.nextElementSibling;
        
        $numbers.removeChild($delTarget);
        $delTarget = $next;        
    }

}

// 업, 다운 렌더링 처리
function processUpDownCase(isUp, $target) {

    const ANI_CLASS_NAME = 'selected';

    const [$up, $down] = [...document.querySelector('aside.result').children]

    if (isUp) { // UP인 경우
        $down.classList.remove(ANI_CLASS_NAME);
        $up.classList.add(ANI_CLASS_NAME);
        gameDatas.min = gameDatas.answer + 1;
        document.getElementById('begin').textContent = gameDatas.min;
    } else { // DOWN인 경우
        $up.classList.remove(ANI_CLASS_NAME);
        $down.classList.add(ANI_CLASS_NAME);
        gameDatas.max = gameDatas.answer - 1;
        document.getElementById('end').textContent = gameDatas.max;
    }

    // 아이콘 삭제 처리
    clearIcons($target, isUp);
}

// 정답시 화면 렌더링 처리
function processCorrect($target) {
    // 1. 축하박스 등장 처리
    document.getElementById('finish').classList.add('show');

    // 2. 정답아이콘에 id = move 부여
    $target.setAttribute('id', 'move');

    // 클릭 이벤트 해제
    document.getElementById('numbers').onclick = null;
}

// 정답을 검증하는 함수 정의
function checkAnswer($target) {

    // 객체 디스트럭쳐링
    const {secret, answer} = gameDatas;

    if (secret === answer) { // 정답인 경우
        processCorrect($target);
    } else if (secret > answer) { // UP인 경우
        processUpDownCase(true, $target);
    } else { // DOWN인 경우
        processUpDownCase(false, $target);
    }

}

//============== 실행 코드 영역 ====================//
(function() {

    makeIcons();

    const $numbers = document.getElementById('numbers');
    $numbers.onclick = function(e) {

        if (!e.target.matches('#numbers .icon')) return;

        // console.log('아이콘 클릭됨!', e.target.textContent);

        // 사용자가 선택한 숫자를 객체의 answer프로퍼티에 저장.
        gameDatas.answer = +e.target.textContent;

        console.log(gameDatas);

        // 정답 검증
        checkAnswer(e.target);
    };

}) ();