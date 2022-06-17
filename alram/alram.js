chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ flag: false });
});

// 채점 결과
var solution_id_kor = [
  "기다리는 중",
  "재채점을 기다리는 중",
  "채점 준비 중",
  "채점 중",
  "맞았습니다!!",
  "출력 형식이 잘못되었습니다",
  "틀렸습니다",
  "시간 초과",
  "메모리 초과",
  "출력 초과",
  "런타임 에러",
  "컴파일 에러",
  "채점 불가",
  "삭제된 제출",
  "잠시후 채점 시작",
  "맞았습니다!!",
  "런타임 에러 이유를 찾는 중",
];

// 메시지 수신
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "alram") {
    var details = {
      solution_id: request.payload.solutionId,
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    let interval = setInterval(() => {
      fetch("https://www.acmicpc.net/status/ajax", {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "x-requested-with": "XMLHttpRequest",
        },
        body: formBody,
      }).then((res) => {
        res.json().then((data) => {
          if (data.result > 3) {
            clearInterval(interval);
            sendNotification(
              request.payload.solutionId,
              solution_id_kor[data.result],
              request.payload.problemId.trim() + "번",
            );
          }
        });
      });
    }, 2000);
  }
});

// 알림을 띄워주는 함수
function sendNotification(notiId, result, problemId) {
  chrome.notifications.create(notiId, {
    type: "basic",
    title: result,
    iconUrl: "icon.png",
    message: problemId,
    priority: 2, // -2 to 2 (highest)

    eventTime: Date.now(),
  });
}
