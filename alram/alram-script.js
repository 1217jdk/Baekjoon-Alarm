chrome.storage.sync.get("flag", ({ flag }) => {
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

// var pusher = new Pusher("a2cb611847131e062b32", {
//   cluster: "ap1",
// });
// Notification.requestPermission();

// var channel = pusher.subscribe("solution-" + solutionId);

// channel.bind("update", (data) => {
//   console.log(data.result);
//   if (data.result >= 4) {
//     new Notification("동규바보", { body: "된다!" });
//   }
// });
