chrome.storage.sync.get("flag", ({ flag }) => {
  if (flag == true) {
    chrome.storage.sync.set({ flag: false });

    var solutionId = document
      .getElementById("status-table")
      .getElementsByTagName("td")[0].innerText;

    var problemId = document
      .getElementById("status-table")
      .getElementsByTagName("td")[2].innerText;

    chrome.runtime.sendMessage({
      message: "alram",
      payload: { solutionId, problemId },
    });
  }
});
