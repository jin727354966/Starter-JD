import{Enter} from './header.js';//用户登入，cookie获取
function headerinit(){
    const lore =document.querySelector("#header .nav .lore");
    let as=Array.from(lore.querySelectorAll("a"));
    let user=lore.querySelector(".user");
    let useri=user.querySelector("i");
    let userbtn=user.querySelector("span");//绑定点击事件，点击取消显示
    new Enter({  /* 对象属性和属性值相同时，可以只写一个 */
        as:as,//登入和注册的标签集合
        user,//用户名称的父容器
        useri,//显示用户名称的标签
        userbtn,//点击退出按钮，用于清除cookie
        lore//总父容器
    }).init();
}
export{headerinit};