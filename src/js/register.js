//注册页
//注册的类和登入的类要做的哪些
//存一个变量用于判断是注册页还是登入页
// 用户名要去空格，正则表达式要满足 
import {Enroll} from './user.js';
    function reginit(){
        new Enroll({
            type:"reg",
            username:document.querySelector("input[name='username']"),
            password:document.querySelector("input[name='password']"),
            repass:document.querySelector("input[name='repass']"),
            tel:document.querySelector("input[name='tell']"),
            sub:document.querySelector("input[type='submit']"),//提交按钮
            checkbox:document.querySelector("input[type='checkbox']"),//履行诺言
            errormsg:document.querySelector(".errormsg"),//提交按钮
            strength:document.querySelector(".formwrap .pass u")
        }).init();
    }
    export {reginit};