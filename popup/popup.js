//====== 변수 정의 ======


//====== method 정의 ======
{
    //버튼에 notify 기능 설정
    const notifyBtn = document.getElementById("btn notify");

    notifyBtn.addEventListener('click', () => {
        chrome.runtime.sendMessage('', {
            type: "notify",
            options: {
                type: "basic",
                title: "Hello world",
                message: "this is test msg",
                iconUrl: "./icon/on.png",
            }
        }).then((res) => console.log(res.res))
            .catch(() => console.log("notify fail"));
    });
}

{
    // 리스트 출력하기
    chrome.storage.sync.get('res')
        .then((res)=>{
            console.log(res.res)
            let arr = res.res;
            let tbody = document.getElementById("tbody");

            // tr td 만들기
            for(let i = 0; i<arr.length; i++){
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