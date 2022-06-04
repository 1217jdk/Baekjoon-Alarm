chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ flag: false });
});

importScripts("pusher.worker.js");

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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "alram") {
    var pusher = new this.Pusher("a2cb611847131e062b32", {
      cluster: "ap1",
    });

    var channel = pusher.subscribe("solution-" + request.payload.solutionId);

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

function sendNotification(notiId, result, problemId) {
  chrome.notifications.create(notiId, {
    type: "basic",
    title: result,
    iconUrl: "Notification.png",
    message: problemId,
    priority: 2, // -2 to 2 (highest)

    eventTime: Date.now(),
  });
}
