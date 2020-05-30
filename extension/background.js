var port = chrome.runtime.connectNative("default_opener");

port.onMessage.addListener((response) => {
  console.log("Received: " + response);
});

port.onDisconnect.addListener(() => {
  console.log("Port was disconnected. Error:", chrome.runtime.lastError);
});

function openUrl(url) {
  try {
    port.postMessage({link: url});
  }
  catch(err) {
    port = chrome.runtime.connectNative("default_opener");
    port.postMessage({link: url});
  }
}

chrome.contextMenus.create({
  title: 'Open in default browser',
  contexts: ['link'],
  onclick: (info) => {
    openUrl(info.linkUrl);
  }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.hasOwnProperty("request")) {
      if (request["request"] == "LAUNCH" && !sender.tab.pinned && sender.tab.windowId != 1) {
        openUrl(sender.tab.url);
        chrome.tabs.remove(sender.tab.id);
      }
    }
    else {
      sendResponse({response: "nothing"});
    }
  });
