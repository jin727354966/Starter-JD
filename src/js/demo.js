// 首页的js
/* 头部 */
import{Render} from './render.js';
import{headerinit} from './headerinit.js';
import{Tab} from './Tab.js';
import{Menu} from './levelmn.js';
import{Channel} from './channel.js';

function demoinit(){
    /* 1 获取头部父容器 显示用户名 */
    headerinit();
    /* 1 搜索框 */
    
    
    // let searchul=document.querySelector('.search-bar .form ul');
//             console.log(searchtext,searchul);
          

//             searchtext.oninput=function(){
//                 let shtimer=setTimeout(()=>{
//                     let scr=document.createElement('script');
//                 scr.src='https://suggest.taobao.com/sug?code=utf-8&q='+text.value+'&_ksTS=1589723848122_399&callback=getlist&k=1&area=c2c&bucketid=16';
//                 document.body.appendChild(scr);
//                 },300)
//             }
    /* 2.1 头部显示隐藏 轮播图 */
    const bnavc=document.querySelector("#bnav .bnav_c");//总的父容器
    const bnavpicwrap=bnavc.querySelector(".picwrap");//图片父容器
    const bnavleftbtn=document.querySelector("#bnav .bnav_c .lbtn");//右键
    const bnavrightbtn=document.querySelector("#bnav .bnav_c .rbtn");//左键
    const bnavdotparent=document.querySelector("#bnav .bnav_c .circle");//小圆点父容器
    const searchtext=document.querySelector(".search_t");//小圆点父容器
    const searchul=document.querySelector(".form ul");//小圆点父容器
    // console.log(searchtext);
    // console.log(searchul);
    
    function getlist(data){
        searchul.innerHTML="";
        for(let i=0;i<data.result.length;i++){
            let li=document.createElement("li");
            li.innerText=data.result[i][0];
            searchul.appendChild(li);
        }
    }
    window.getlist=getlist;
    searchtext.oninput=function(){
        let shtimer=setTimeout(()=>{
            searchul.style.display="block";
            clearInterval(shtimer);
            let src=document.createElement("script");
            src.src='https://suggest.taobao.com/sug?code=utf-8&q='+searchtext.value+'&_ksTS=1589723848122_399&callback=getlist&k=1&area=c2c&bucketid=16';
            document.body.appendChild(src);
        },300)
    }
    searchtext.onblur=function(){
        searchul.style.display="none";
    }
    let oPage={
        parent:bnavc,
        picparent:bnavpicwrap,//图片父容器
        dotparent:bnavdotparent,//小圆点父容器
        leftbtn:bnavleftbtn,//左键
        type:"showhide",//效果类型  显示隐藏型轮播  无缝轮播  自动轮播 放大轮播
        rightbtn:bnavrightbtn,//右键
        auto:true  //需要自动轮播
    }
    new Render({
        elem:bnavpicwrap,//要渲染的元素
        url:"http://localhost/Starter-JD/php/biglun.php",//接口
        type:"showhide",
        oPage:oPage
    }).init();
    /*2.2 秒杀 点击轮播效果  */
    const seckill=document.querySelector("#seckill .seckill_commodity");//总的父容器
    const skpicp=seckill.querySelector(".seckill_lb");//图片父容器
    const sklbtn=seckill.querySelector(".lbtn");//左按键
    const skrbtn=seckill.querySelector(".rbtn");//右按键
    let skpage={
        parent:seckill,
        picparent:skpicp,//图片父容器
        leftbtn:sklbtn,//左键
        type:"clickmove",//效果类型  显示隐藏型轮播  无缝轮播  自动轮播 放大轮播 点击轮播
        rightbtn:skrbtn,//右键
        auto:false,  //需要自动轮播
    }
    new Render({
        elem:skpicp,//要渲染的元素
        url:"http://localhost/Starter-JD/php/render.php",//接口
        type:"showhide",
        oPage:skpage
    }).init();
    /*2.2 秒杀 轮播效果  */
    const majorWrap=document.querySelector("#seckill .major .major_wrap");//轮播父容器
    const picWrap=majorWrap.querySelector(".major_lb");//图片父容器
    const majordotp=majorWrap.querySelector("ul");//小圆点
    let majorpage={
        parent:majorWrap,
        picparent:picWrap,//图片父容器
        dotparent:majordotp,//小圆点父容器
        type:"seamless",//效果类型  显示隐藏型轮播  无缝轮播  自动轮播 放大轮播 点击轮播
        auto:true
    }
    new Render({
        elem:picWrap,//要渲染的元素
        url:"http://localhost/Starter-JD/php/render.php",//接口
        type:"showhide",
        oPage:majorpage
    }).init();
    /*3 新品首发 移动轮播效果 自动轮播 */
    const goodnewlbWrap=document.querySelector("#goodnew .issue .lb_wrap");//轮播总父容器
    const gnlbtn=goodnewlbWrap.querySelector(".lbtn");//左按键
    const gnrbtn=goodnewlbWrap.querySelector(".rbtn");//右按键
    const gnpicWrap=goodnewlbWrap.querySelector(".picwrap");//图片父容器
    let gnpage={
        parent:goodnewlbWrap,//总父容器
        picparent:gnpicWrap,//图片父容器
        leftbtn:gnlbtn,//左键
        type:"scalelb",//效果类型  显示隐藏型轮播  无缝轮播  自动轮播 放大轮播
        rightbtn:gnrbtn,//右键
        auto:true
    }
    new Render({
        elem:gnpicWrap,//要渲染的元素
        url:"http://localhost/Starter-JD/php/render.php",//接口
        type:"showhide",
        oPage:gnpage
    }).init();
    /* 3.1 排行榜，tab切换 */
    const btns=document.querySelectorAll(".ranking .btn button");//按钮们
    const texts=document.querySelectorAll(".ranking .ranking_list .item ul");//内容们
    new Tab({
        texts,
        btns
    }).init();
    /*4 发现好货 移动轮播效果 自动轮播 */
    const fglbwrap=document.querySelector("#findgood .fglb_wrap");//轮播总父容器
    const progressbar=fglbwrap.querySelector(".progressbar");//精度条
    const bar=progressbar.querySelector(".bar");//进度小条
    const fglb=fglbwrap.querySelector(".fglb");//图片父容器
    let fglbpage={
        parent:fglbwrap,//总父容器
        picparent:fglb,//图片父容器
        progressbar:progressbar,//进度小条
        type:"scroll",//效果类型  显示隐藏型轮播  无缝轮播  自动轮播 放大轮播
        bar:bar,//精度条
        auto:true
    }
    new Render({
        elem:fglb,//要渲染的元素
        url:"http://localhost/Starter-JD/php/render.php",//接口
        type:"showhide",
        oPage:fglbpage
    }).init();

    /* 5 二级菜单*/
    const menu=document.querySelector("#bnav .bnav_l>ul");//一级菜单
    const menuli=document.querySelectorAll("#bnav .bnav_l>ul>li");//一级菜单子元素li
    const menutextp=document.querySelector("#bnav .bnav-wrap");//二级菜单的父亲
    const menutexts=document.querySelectorAll("#bnav .bnav-wrap .bnav_item");//二级菜单的内容们
    new Menu({
        parent:menu,
        texts:menutexts,
        textp:menutextp,
        menulist:menuli
    }).init();


    /* 6 页面底部图片加载 */
    // const recommend=document.getElementById("#recommend");
    // const recommendList=document.querySelector(".recommend_list");
    const recommendListul=document.querySelector(".recommend_list ul");
    new Render({
        elem:recommendListul,//要渲染的元素
        url:"http://localhost/Starter-JD/php/render.php",//接口
        type:"indexrec"
    }).init();
    /* 7 频道广场图片渲染 */
    const smallwrap=document.querySelectorAll("#channel .smallwrap");
    const smalltemplate=document.querySelector("#channel .smallwrap .small");
    console.log(smalltemplate);
    
    // console.log(smallwrap);
    new Channel({
        elem:smallwrap,//要渲染的元素
        smalltemplate:smalltemplate,
        url:"http://localhost/Starter-JD/php/render.php"//接口
    }).init();
}
export{demoinit}

