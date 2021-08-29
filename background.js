chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "field",
    title: "UUID Filler this!",
    contexts: ["editable"],
  });
});

chrome.contextMenus.onClicked.addListener(async function genUUID4(info, tab) {
  if (info.menuItemId === "field") {
    const response = await fetch("https://www.uuidgenerator.net/api/version4");
    const uuid4 = await response.text();
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: insertText,
      args: [uuid4],
    });
  }
});

async function insertText(uuid4) {
  let focus = document.querySelector(":focus");
  focus.value = uuid4;
}
