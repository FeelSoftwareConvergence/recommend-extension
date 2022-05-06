// variable

// method
function makeNotify(type, title, message, iconUrl) {
    console.log("send msg");
    return chrome.runtime.sendMessage('', {
        type: "notify",
        options: {
            type: type,
            title: title,
            message: message,
            iconUrl: iconUrl
        }
    })
}

alert("hello world");