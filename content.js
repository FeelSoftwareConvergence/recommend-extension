// variable

// method
function makeNotify(type, title, message, iconUrl) {
    console.log("send msg to background");
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

const img = document.querySelector('#react-root > section > main > div > div > article > div > div._97aPb.wKWK0 > div > div > div.KL4Bh > img')
const content = document.querySelector('#react-root > section > main > div > div > article > div > div.qF0y9.Igw0E.IwRSH.eGOV_.acqo5._4EzTm > div > div.eo2As > div.EtaWk > div > div > div > span:nth-child(3) > span')

console.log(img)
console.log(content)

// 이미지와 사진을 가지고 있다면 여기서 통신을 해서 진행해야한다.
if (img !== null || content !== null) {
    var xhr = new XMLHttpRequest();
    let url = "http://localhost:8000/sentiment/recommend/"
    let method = "POST"


    let data = {}

    // 보낼 데이터 사전 준비
    data.image = img == null ? "" : img.src;
    data.content = content == null ? "" : content.innerText;

    // xhr setting
    xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            let songs = JSON.parse(xhr.response);// object로 변환
            console.log(songs);

            // 저장소에 저장하고 알림을 보낸다.
            chrome.storage.sync.set({"songs": songs})
                .then(res => {
                    console.log("save success");
                    makeNotify(
                        'basic',
                        'Recommend ' + songs['title'][0],
                        'artist: ' + songs['artist'][0],
                        "../icon/origin_on.png");
                });
        }
    }

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}










