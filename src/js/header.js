/* 头部用户登入 */
/* 1 获取头部父容器 显示用户名 */
import{setCookie,getCookie,delCookie} from './cookie.js';
class Enter{
    constructor(option){
        this.as=option.as;//登入和注册的标签集合
        this.user=option.user;//用户名称的父容器
        this.useri=option.useri;//显示用户名称的标签
        this.userbtn=option.userbtn;//点击退出按钮，用于清除cookie
        this.lore=option.lore;//总父容器
    }
    init(){
        /* 1 获取cookie，展示 */
        this.showCookie();
        /* 2 点击退出按钮，绑定事件 */
        this.userbtn.addEventListener("click",()=>{
            this.quitHandler()
        });
    }
    /* 获取cookie，展示 */
    showCookie(){
        if(getCookie("username")){
            for(let value of this.as){
                value.style.display="none";
            }
            this.user.style.display="inline-block";
            this.useri.innerText=getCookie("username");
        }else{
            this.conceal();
        }
    }
    /* 退出 清除cookie,显示登入注册*/
    quitHandler(){
        delCookie("username","/");
       this.conceal();
    }
    /* 显示注册登入，隐藏用户名功能 */
    conceal(){
        this.lore.style.width="unset";
        this.user.style.display="none";
        for(let value of this.as){
            value.style.display="inline-block";
        }
    }
}
export{Enter};