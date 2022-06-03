// let flag = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ flag: false });
});

// function isLogedIn(sendResponse) {
//   chrome.storage.local.get(["userStatus"], (response) => {
//     const error = chrome.runtime.lastError;
//     if (error) console.log(error);

//     if (!response.userStatus) {
//       sendResponse({ message: "login" });
//     } else {
//       sendResponse({ message: "success" });
//     }
//   });
// }
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === "alram") {
//     console.log(request.message);
//     isLogedIn(sendResponse);
//     return true;
//   }
// });

importScripts("pusher.worker.js");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("message: ", request.message);
  console.log("payload: ", request.payload);

  if (request.message === "alram") {
    var pusher = new this.Pusher("a2cb611847131e062b32", {
      cluster: "ap1",
    });
    Notification.requestPermission();

    var channel = pusher.subscribe("solution-" + request.payload.solutionId);

    channel.bind("update", (data) => {
      console.log(data.result);
      if (data.result >= 4) {
        new Notification("동규바보", { body: "된다!" });
      }
    });
    return true;
  }
});
