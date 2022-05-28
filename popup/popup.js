

if (typeof browser === "undefined") {
    var browser = chrome;
}
//====== 변수 정의 ======


//====== method 정의 ======
async function makeNotify(type, title, message, iconUrl) {
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

//====== 실제 동작 정의 ======
const activeBtn = document.querySelector(".form-check-input");
const mainImg = document.getElementById("main img");
const tbody = document.getElementById("tbody");


browser.storage.sync.get(null, function (items) {
    // Toggle button not supprted in Firefox
    if (items == undefined) {
        document.querySelector(".support-alert").innerText = `
            해당 브라우저에서는 KLAS Helper 기능을 끌 수 없습니다.
        `
        activeBtn.checked = true;
    } else if (items.currentState === undefined) {
        browser.storage.sync.set({currentState: "ON"})
            .then(() => {
                mainImg.src = "../icon/origin_on.png"
            });
        chrome.runtime.sendMessage({
            action: 'updateIcon',
            value: "enabled"
        }).then(r => console.log(r));
        activeBtn.checked = true;
    } else if (items.currentState === "OFF") {
        mainImg.src = "../icon/origin_off.png"
        chrome.runtime.sendMessage({
            action: 'updateIcon',
            value: "disabled"
        }).then(r => console.log(r));
        activeBtn.checked = false;
    } else if (items.currentState === "ON") {
        mainImg.src = "../icon/origin_on.png"
        chrome.runtime.sendMessage({
            action: 'updateIcon',
            value: "enabled"
        }).then(r => console.log(r));
        activeBtn.checked = true;
    }
});


activeBtn.onclick = function () {
    if (activeBtn.checked) {
        browser.storage.sync.set({currentState: "ON"})
            .then(() => {
                mainImg.src = "../icon/origin_on.png"
            });
        // send message
        chrome.runtime.sendMessage({
            action: 'updateIcon',
            value: "enabled"
        }).then(r => console.log(r));
        // display table on
        tbody.style.display = '';

    } else {
        browser.storage.sync.set({currentState: "OFF"})
            .then(() => {
                mainImg.src = "../icon/origin_off.png"
            });
        // send message
        chrome.runtime.sendMessage({
            action: 'updateIcon',
            value: "disabled"
        }).then(r => console.log(r));
        // table display off
        tbody.style.display = 'none';
    }
}

//버튼에 notify 기능 설정
const notifyBtn = document.getElementById("btn notify");

notifyBtn.addEventListener('click', () => {
    makeNotify('basic', "hello world", "this is test msg", "../icon/origin_on.png")
        .then((res) => console.log(res.res))
        .catch(() => console.log("notify fail"));
});


// 리스트 출력하기
chrome.storage.sync.get('songs')
    .then((data) => {
        console.log(data);
        let titles = data.songs.title;
        let artists = data.songs.artist;

        // tr td 만들기
        for (let i = 0; i < 5; i++) {
            let tr = document.createElement("tr");
            let th = document.createElement("th");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");

            th.setAttribute('scope', "row");
            th.textContent = i.toString();
            td1.textContent = titles[i];
            td2.textContent = artists[i];

            tr.append(th);
            tr.append(td1);
            tr.append(td2);

            tbody.append(tr);
        }
    })
