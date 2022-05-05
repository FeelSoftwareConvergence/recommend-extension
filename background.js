// //버튼 온오프 기능 구현
// let toggle = false;
//
// {
//     chrome.runtime.onClicked.addListener(function(tab) {
//         toggle = !toggle;
//         if(toggle){
//             chrome.browserAction.setIcon({path: "on.png", tabId:tab.id});
//             chrome.tabs.executeScript(tab.id, {file: "popup/popup.js"}).then();
//         }
//         else{
//             chrome.browserAction.setIcon({path: "off.png", tabId:tab.id});
//             chrome.tabs.executeScript(tab.id, {code:"alert()"}).then();
//         }
//     });
//
// }

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "notify") {
        console.log("btn click");
        chrome.notifications.create('', request.options);
        sendResponse({res: "notify success"});
    }
})