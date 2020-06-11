let text = document.querySelector('.search-bar form input[type="text"]');
let ul = document.querySelector('.search-bar .searchshow');
class search {
    constructor(text,ul) {
        this.text=text;
        this.ul=ul;
    }
    init(){

    }
    getlist(data){
        this.innerHTML
    }
}

function getlist(data) {
    ul.innerHTML = '';
    for (var i = 0; i < data.result.length; i++) {
        let li = document.createElement('li');
        li.innerText = data.result[i][0];
        ul.appendChild(li);
    }

}

text.oninput = function () {
    let scr = document.createElement('script');
    scr.src = 'https://suggest.taobao.com/sug?code=utf-8&q=' + text.value + '&_ksTS=1589723848122_399&callback=getlist&k=1&area=c2c&bucketid=16';
    document.body.appendChild(scr);
}
export {search}