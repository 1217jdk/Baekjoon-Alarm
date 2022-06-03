var button = document.getElementById("submit_button");

button.addEventListener("click", () => {
  chrome.storage.sync.set({ flag: true });
});
