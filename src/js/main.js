//判断执行
import {reginit} from './register.js';
import {loginit} from './login.js';
import {demoinit} from './demo.js';
import {listinit} from './list.js';
if(document.getElementById("currentpage")){
    let url=document.getElementById("currentpage").getAttribute("index");
    switch(url){
        case 'reg'://如果是注册页，就执行注册页的js
            reginit();
        break;
        case "log":
            loginit();
        break;
        case "demo":
            demoinit();
            break;
        case "list":
            listinit();
            break;
    }
}