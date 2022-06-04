chrome.storage.sync.get("flag", ({ flag }) => {
  // 제출 버튼 클릭 여부 확인
  if (flag == true) {
    chrome.storage.sync.set({ flag: false });

    // 제출 번호와 문제 번호 가져오기
    var solutionId = document
      .getElementById("status-table")
      .getElementsByTagName("td")[0].innerText;
    var problemId = document
      .getElementById("status-table")
      .getElementsByTagName("td")[2].innerText;

    // service worker에 메시지 전달
    chrome.runtime.sendMessage({
      message: "alram",
      payload: { solutionId, problemId },
    });
  }
});
