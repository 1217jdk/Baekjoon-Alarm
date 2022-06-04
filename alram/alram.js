chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ flag: false });
});

importScripts("pusher.worker.js");

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
    // pusher 연결
    var pusher = new this.Pusher("a2cb611847131e062b32", {
      cluster: "ap1",
    });

    // 채널 구독
    var channel = pusher.subscribe("solution-" + request.payload.solutionId);

    // 채점이 끝날 때까지 업데이트하고,
    // 채점이 완료되면 알림을 띄움
    channel.bind("update", (data) => {
      if (data.result >= 4) {
        sendNotification(
          request.payload.solutionId,
          solution_id_kor[data.result],
          request.payload.problemId.trim() + "번",
        );
      }
    });
    return true;
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
