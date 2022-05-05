// 버튼 클릭시 알림을 띄우는 기능
{
    const btn = document.getElementById("btn notify");

    btn.addEventListener('click', () => {
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