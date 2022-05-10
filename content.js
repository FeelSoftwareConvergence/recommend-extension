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
    let url = "http://localhost:8000"
    let method = "POST"

    let formData = new FormData();


    // 보낼 데이터 사전 준비
    if (img !== null) {
        formData.append('img', img.src);
    }
    if (content !== null) {
        formData.append('content', content.innerText);
    }

    // xhr setting
    xhr.onreadystatechange = () => {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    }

    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(formData);
}

// makeNotify('basic', 'Recommend ','', '')








