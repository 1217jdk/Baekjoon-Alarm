// 제출 버튼
var button = document.getElementById("submit_button");

// 제출 버튼 클릭 체크
button.addEventListener("click", () => {
  chrome.storage.sync.set({ flag: true });
});
