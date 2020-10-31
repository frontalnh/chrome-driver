chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log("The color is green.");
  });


  // You should always register or unregister rules in bulk 
  // rather than individually because each of these operations 
  // recreates internal data structures. 
  // This re-creation is computationally expensive but facilitates a 
  // faster matching algorithm.
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        // developer.chrome.com 에 있으면 활성화 시킨다.
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostEquals: 'toptoon.com' },
          css: ["img"]
        }),
        // img 태그가 있으면 액션 활성화 시킨다.
        // new chrome.declarativeContent.PageStateMatcher({
        //   css: ["img"]
        // })
      ],
      actions: [
        new chrome.declarativeContent.ShowPageAction(),
      ]
    }]);
  });


  // chrome.pageAction.setBadgeText({ text: 'ON' });
  // chrome.pageAction.setBadgeBackgroundColor({ color: '#4688F1' });

});
