// notification
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.type === "notify") {
            console.log("btn click");
            chrome.notifications.create('', request.options);
            sendResponse({res: "notify success"});
        }
    }
)

// storage
chrome.runtime.onInstalled.addListener(() => {
    // 연결되었을 때 초기값 설정 및 저장
    let arr = []
    for (let i = 0; i < 5; i++) {
        let data = {
            song_name: "name" + i,
            recommend: "recommend" + i
        };
        arr.push(data);
    }

    chrome.storage.sync.set({res: arr}).then();
})