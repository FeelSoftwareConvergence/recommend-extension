let test = document.getElementById("test")
let newP = document.createElement("p")

let url = "http://localhost:8000";
let method = "GET";

// 통신을 위한 객체 생성
let xhr = new XMLHttpRequest();

// 상태변화를 알려주는 콜백함수
xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
        console.log(xhr.response);

        // 실제 화면에 적용 response {"hello":"world"}
        newP.textContent = xhr.response["hello"];
        test.append(newP);
    }
}
// 반환되는 타입을 명시해야함
xhr.responseType = "json";
// 비동기 적으로 처리
xhr.open(method, url);
xhr.send();














