chrome.storage.sync.get("flag", ({ flag }) => {
  console.log(flag);
  if (flag == true) {
    chrome.storage.sync.set({ flag: false });

    var solutionId = document
      .getElementById("status-table")
      .getElementsByTagName("td")[0].innerText;

    console.log("chrome: ", chrome);
    console.log("runtime: ", chrome.runtime);
    chrome.runtime.sendMessage({
      message: "alram",
      payload: { solutionId },
    });
  }
});
