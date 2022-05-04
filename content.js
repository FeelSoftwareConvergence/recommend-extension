function asyncFunc1() {
    let method = "GET";
    let url = "https://cors-proxy-jhj.herokuapp.com/http://localhost:8000";//proxy
    return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === xhr.DONE) {
                    if (!xhr.response) reject("error");// 실패 했을 때

                    // 통신이 성공했을 때
                    let newP = document.createElement("p");
                    let test = document.getElementById("test");
                    newP.textContent = xhr.response["hello"];
                    test.append(newP);
                    resolve("success");
                }
            }
            xhr.responseType = "json";
            xhr.open(method, url);
            xhr.send();
            resolve(xhr.response);
        }
    )
}

function asyncTest() {
    let method = "GET";
    let url = "http:localhost:8080/http://localhost:8000/";//proxy

    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "json";

        xhr.onerror =  (error)=>{
            console.log(error);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE) {
                console.log("status: " + xhr.status);
                if(xhr.status === 404){
                    reject("fail");
                }

                console.log(xhr.response);
                resolve("success");
            }
        }

        xhr.open(method, url);
        //xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");// 열고서 헤더를 넣어야함
        xhr.send();
    });
}


let print = (msg) => console.log(msg);
let success = () => console.log("success");
let fail = () => console.log("fail");

let promise = asyncTest();
promise.then(success).catch(fail);

















