chrome.storage.sync.get("isSubmitted", ({ isSubmitted }) => {
  // 제출 버튼 클릭 여부 확인
  if (isSubmitted == true) {
    chrome.storage.sync.set({ isSubmitted: false });

    // 제출 번호와 문제 번호 가져오기
    const scoreTableRow = document
      .getElementById("status-table")
      .getElementsByTagName("td");

    const solutionId = scoreTableRow[0].innerText;
    const problemId = scoreTableRow[2].innerText.trim();

    // service worker에 메시지 전달
    chrome.runtime.sendMessage({
      message: "alram",
      payload: { solutionId, problemId },
    });
  }
});
