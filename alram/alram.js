// let flag = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ flag: false });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'alram') {
    var pusher = new Pusher("a2cb611847131e062b32", {
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