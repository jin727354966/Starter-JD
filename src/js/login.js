//登入页
import {Enroll} from './user.js';
function loginit(){
    new Enroll({
        type:"log",
        username:document.querySelector("input[name='username']"),
        password:document.querySelector("input[name='password']"),
        sub:document.querySelector("input[type='submit']"),//提交按钮
        errormsg:document.querySelector(".errormsg")//错误显示段落
    }).init();
}
export {loginit};