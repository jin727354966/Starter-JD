// 首页的js
/* 头部 */
import{headerinit} from './headerinit.js';
import{Render} from './render.js';
function demoinit(){
    /* 1 获取头部父容器 显示用户名 */
    headerinit();
    /* 2.1 头部显示隐藏 轮播图 */
    const bnavc=document.querySelector("#bnav .bnav_c");//总的父容器
    const bnavpicwrap=bnavc.querySelector(".picwrap");//图片父容器
    const bnavleftbtn=document.querySelector("#bnav .bnav_c .lbtn");//右键
    const bnavrightbtn=document.querySelector("#bnav .bnav_c .rbtn");//左键
    const bnavdotparent=document.querySelector("#bnav .bnav_c .circle");//小圆点父容器
   
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
    const skpictemplate=skpicp.querySelector(".item");//模板
    const sklbtn=seckill.querySelector(".lbtn");//左按键
    const skrbtn=seckill.querySelector(".rbtn");//右按键
    let skpage={
        parent:seckill,
        picparent:skpicp,//图片父容器
        dotparent:bnavdotparent,//小圆点父容器
        leftbtn:sklbtn,//左键
        type:"clickmove",//效果类型  显示隐藏型轮播  无缝轮播  自动轮播 放大轮播 点击轮播
        rightbtn:skrbtn,//右键
        auto:false,  //需要自动轮播
        template:skpictemplate //模板
    }
    new Render({
        elem:skpicp,//要渲染的元素
        url:"http://localhost/Starter-JD/php/render.php",//接口
        type:"showhide",
        oPage:skpage
    }).init();
    /* 3 页面底部图片加载 */
    const recommend=document.getElementById("recommend");
    const recommendList=recommend.querySelector(".recommend_list");
    const recommendListul=recommendList.querySelector("ul");
    new Render({
        elem:recommendListul,//要渲染的元素
        url:"http://localhost/Starter-JD/php/render.php",//接口
        type:"indexrec"
    }).init();
}
export{demoinit}

