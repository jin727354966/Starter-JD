/* 购物车总执行 */
import{getCookie} from './cookie.js';
// import{cookie} from './cookie2.js';
import{headerinit} from './headerinit.js';
import{Cartrender} from './cartrender.js';
function cartinit(){
    // cookie.unset("cartData");
    /* 头部用户获取 */
    headerinit();
    /* 1 购物车渲染 */
    /* 判断用户名是否存在 */
    let user=document.querySelector("#header .nav .lore .user");
    if(!getCookie("username")) return;
    if(!user.style.display==="inline-block"){
        alert("请先登入");
        location.href="http://localhost/Starter-JD/src/login.html";
        return;
    }
    /* 判断cookie是否有购物车数据 */
    if(!getCookie("cartData")){
        alert("购物车空空如也");
        return;
    }
    /* 购物车渲染 */
    let cartdata=JSON.parse(getCookie("cartData"));//对象型数组
    
    let litemplate=document.querySelector("#cart_list .list_wrap .product");
    let twocheckall=document.querySelector("#cart_list .list_wrap .aggregate input");//全选
    let summaryli=document.querySelector("#cart_list .list_wrap .aggregate");//最后总结计数的li
    let delcheck=document.querySelector("#cart_list .list_wrap .aggregate .delcheck");//删除选中的
    let delall=document.querySelector("#cart_list .list_wrap .aggregate .delall");//全部删除
    let selectedGoods=document.querySelector("#cart_list .list_wrap .aggregate .cart_count i");//已选择商品
    let totalprice=document.querySelector("#cart_list .list_wrap .aggregate .cart_sum strong");//总价
    let liparent=document.querySelector("#cart_list .list_wrap ul");//购物列表父容器
    let checkall=document.querySelector("#cart_list .cart_title input");//全选
    
    new Cartrender({
        cartdata,//购物车数据，是数组
        litemplate,//li渲染结构样板
        liparent,//购物列表父容器
        checkall,//第一个全选
        twocheckall,//第二个全选
        delcheck,//删除选中的
        delall,//全部删除
        selectedGoods,//已选择商品
        totalprice,//总价
        summaryli//最后总结计数的li
    }).init();
}

export{cartinit}
