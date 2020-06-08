// 首页的js
/* 头部 */
import{setCookie,getCookie,delCookie} from './cookie.js';
import{Render} from './render.js';
function demoinit(){
    /* 1 获取头部父容器 显示用户名 */
    let header =document.querySelector("iframe").contentWindow.document.querySelector("#header");
    let as=Array.from(header.querySelectorAll(".lore a"));
    let lore=header.querySelector(".lore");
    let user=header.querySelector(".lore .user");
    let useri=header.querySelector(".lore .user i");
    let userbtn=header.querySelector(".lore .user span");//绑定点击事件，点击取消显示
    if(getCookie("username")){
        for(let value of as){
            value.style.display="none";
        }
        user.style.display="inline-block";
        useri.innerText=getCookie("username");
    }else{
        lore.style.width="unset";
        user.style.display="none";
        for(let value of as){
            value.style.display="block";
        }
    }
    /*2 按钮点击事件 删除cookie */
    userbtn.addEventListener("click",()=>{
        for(let value of as){
            value.style.display="inline-block";
        }
        user.style.display="none";
        delCookie("username","/");
        useri.innerText="";
    });
    /* 3 页面底部图片加载 */
    let recommend=document.getElementById("recommend");
    let recommendList=recommend.querySelector(".recommend_list");
    let recommendListul=recommendList.querySelector("ul");
    let recommendListli=Array.from(recommendListul.querySelectorAll("li"));

    new Render({
        elem:recommendListul,//要渲染的元素
        url:"http://localhost/Starter-JD/php/render.php",//接口
        type:"indexrec"
    }).init();
}
export{demoinit}

