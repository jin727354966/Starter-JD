/* 列表页 每一个产品点击，a连接放详情页地址，并且加上对应sid的数据  */
import{Render} from './render.js';
import{headerinit} from './headerinit.js';
function listinit(){
    /* 1 头部 cookie获取 */
    /* 1 获取头部父容器 显示用户名 */
    headerinit();
    /*2 列表总页数据渲染 */
    const goodsul=document.querySelector("#listmain_list .goods_wrap ul");
    /* 获取分页需要的元素 */
    const appoint=document.querySelector("#listmain_list .paging_wrap .paging_r");//指定到几页
    const pagetext=appoint.querySelector("strong");//共几页
    const text=appoint.querySelector("input");//指定第几页
    const btn=appoint.querySelector("a");//指定第几页的按钮
    const pagingparent=document.querySelector("#listmain_list .paging_wrap .paging_l");//是上一页下一页和每一页码的父容器
    const prevPage=pagingparent.querySelector("#prevPage");//上一页
    const nextPage=pagingparent.querySelector("#nextPage");//上一页
    let oPage={
        itemwrap:pagingparent,//每一页的父容器
        top:prevPage,   //上一页
        bot:nextPage,   //下一页
        text:text,     //指定跳转哪一页的数
        btn:btn,       //指定跳转哪一页的按钮
        pagetext:pagetext,   // 要显示总页码
        count:10,     //每页设置显示几条数据
        elem:goodsul  //要渲染的元素
    };
    new Render({
        elem:goodsul,//要渲染的元素
        url:"http://10.31.162.70/Starter-JD/php/render.php",//接口
        type:"listmain",
        oPage:oPage
    }).init();
    /* 价格排序 */
    const pricebtn=document.querySelector("#listmain_list .synthesize .price");
    const pricetop=pricebtn.querySelector(".top");
    const pricebot=pricebtn.querySelector(".bot");
    let sortbool=false;
    pricebtn.addEventListener("click",()=>{
        console.log(1);
        
        sortbool=!sortbool;
        /* 按键标识显示 */
        if(sortbool){//为true 从低到高
            pricetop.style.backgroundPosition="-10px -120px";
            pricebot.style.backgroundPosition="-10px -110px";
        }else{//为false 从高到低
            pricetop.style.backgroundPosition="-10px -100px";
            pricebot.style.backgroundPosition="-10px -130px";
        }
        let oPage2={
            itemwrap:pagingparent,//每一页的父容器
            top:prevPage,   //上一页
            bot:nextPage,   //下一页
            text:text,     //指定跳转哪一页的数
            btn:btn,       //指定跳转哪一页的按钮
            pagetext:pagetext,   // 要显示总页码
            count:10,     //每页设置显示几条数据
            elem:goodsul  //要渲染的元素
        };
        new Render({
            elem:goodsul,//要渲染的元素
            url:"http://10.31.162.70/Starter-JD/php/render.php",//接口
            type:"listmain",
            sortbool:sortbool,
            oPage:oPage2
        }).init();
    });
    
}
export{listinit}