// notification
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // var xml = new XMLHttpRequest();
        if (request.type === "notify") {
            console.log("btn click");
            chrome.notifications.create('', request.options);

            // let url = "http://k-net.kr/sentiment/recommend/"
            // let method = "POST";
            // let data = {
            //     content : "hello",
            //     image: ""
            // }
            // xml.onreadystatechange = ()=>{
            //     if(xml.readyState === xml.DONE && xml.status ===200){
            //         console.log(xml.response);
            //     }
            // }
            //
            // xml.open(method, url);
            // xml.setRequestHeader("Content-Type","application/json");
            // xml.send(JSON.stringify(data))

            sendResponse({res: "notify success"});
        }
    }
)

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === "updateIcon") {
        if (msg.value === "disabled") {
            chrome.action.setIcon({
                path: {"32": "./icon/off.png"}
            });
        } else {
            chrome.action.setIcon({
                path: {"48": "./icon/on.png"}
            });
        }
        sendResponse("change icon is success");
    }
});


// storage
chrome.runtime.onInstalled.addListener(() => {
    // 연결되었을 때 초기값 설정 및 저장
    let data = {
        title: ["nothing", "nothing", "nothing", "nothing", "nothing"],
        artist: ["nothing", "nothing", "nothing", "nothing", "nothing"]
    }

    chrome.storage.sync.set({songs: data}).then();
});


// //proxy
// var config = {
//     mode: "fixed_servers",
//     rules: {
//         proxyForHttp: {
//             scheme: "https",
//             host: "0.0.0.0"
//         },
//         bypassList: ["localhost:8000"]
//     }
// };
// chrome.proxy.settings.set(
//     {value: config, scope: 'regular'},
//     function() {}
// );
