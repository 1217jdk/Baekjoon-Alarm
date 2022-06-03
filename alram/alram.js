chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ flag: false });
});

importScripts("pusher.worker.js");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("message: ", request.message);
  console.log("payload: ", request.payload);

  if (request.message === "alram") {
    var pusher = new this.Pusher("a2cb611847131e062b32", {
      cluster: "ap1",
    });

    var channel = pusher.subscribe("solution-" + request.payload.solutionId);

    channel.bind("update", (data) => {
      console.log(data.result);
      if (data.result >= 4) {
        sendNotification("동규바보", "된다!", (dwellingTimeMs = 5000));
      }
    });
    return true;
  }
});

function sendNotification(notiId, msg, dwellingTimeMs) {
  //clear noti for fast notification
  chrome.notifications.clear((notificationId = notiId), (callback = () => {}));

  chrome.notifications.create(notiId, {
    type: "basic",
    title: "mytitle",
    iconUrl: "Notification.png",
    message: msg,
    priority: 2, // -2 to 2 (highest)

    eventTime: Date.now(),
  });

  setTimeout(() => {
    chrome.notifications.clear(
      (notificationId = notiId),
      (callback = () => {}),
    );
  }, dwellingTimeMs);
}
