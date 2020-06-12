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
        location.href="http://10.31.162.70/Starter-JD/src/login.html";
        return;
    }
    /* 判断cookie是否有购物车数据 */
    if(!getCookie("cartData")){
        alert("购物车空空如也");
        return;
    }
    /* 购物车渲染 */
    let cartdata=JSON.parse(getCookie("cartData"));//对象型数组
    
    const litemplate=document.querySelector("#cart_list .list_wrap .product");
    const twocheckall=document.querySelector("#cart_list .list_wrap .aggregate input");//全选
    const summaryli=document.querySelector("#cart_list .list_wrap .aggregate");//最后总结计数的li
    const delcheck=document.querySelector("#cart_list .list_wrap .aggregate .delcheck");//删除选中的
    const delall=document.querySelector("#cart_list .list_wrap .aggregate .delall");//全部删除
    const selectedGoods=document.querySelector("#cart_list .list_wrap .aggregate .cart_count i");//已选择商品
    const totalprice=document.querySelector("#cart_list .list_wrap .aggregate .cart_sum strong");//总价
    const liparent=document.querySelector("#cart_list .list_wrap ul");//购物列表父容器
    const checkall=document.querySelector("#cart_list .cart_title input");//全选
    
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
