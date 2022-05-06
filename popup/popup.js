import * as core from "../core/core.js";
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

async function sendOnOff(type) {
    console.log("send msg");
    return chrome.runtime.sendMessage('', {
        type: type
    })
}

function changeMainImg(toggle){
    let img = document.getElementById("main img");
    if (isChecked(toggle)) {
        img.src = '../icon/on.png';
    } else {
        img.src = '../icon/off.png';
    }
}

function isChecked(toggle) {
    return toggle.checked;
}

//====== 실제 동작 정의 ======
{
    // toggle onoff
    const toggle = document.getElementById("toggle");

    toggle.addEventListener('click', () => {
        changeMainImg(toggle);
    });
}

{
    //버튼에 notify 기능 설정
    const notifyBtn = document.getElementById("btn notify");

    notifyBtn.addEventListener('click', () => {
        makeNotify('basic', "hello world", "this is test msg", "./icon/on.png")
            .then((res) => console.log(res.res))
            .catch(() => console.log("notify fail"));
    });
}

{
    // 리스트 출력하기
    chrome.storage.sync.get('res')
        .then((res) => {
            console.log(res.res)
            let arr = res.res;
            let tbody = document.getElementById("tbody");

            // tr td 만들기
            for (let i = 0; i < arr.length; i++) {
                console.log(arr[i]);
                let tr = document.createElement("tr");
                let th = document.createElement("th");
                let td1 = document.createElement("td");
                let td2 = document.createElement("td");

                th.setAttribute('scope', "row");
                th.textContent = i.toString();
                td1.textContent = arr[i].song_name;
                td2.textContent = arr[i].recommend;

                tr.append(th);
                tr.append(td1);
                tr.append(td2);

                tbody.append(tr);
            }
        })
}