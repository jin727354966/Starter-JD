import{headerinit} from './headerinit.js';
import{Magnifying} from './magnifying.js';
import{Addcart} from './addcart.js';
function detailinit(){
    /*1 头部用户名获取 */
    headerinit();
    /*2 放大镜效果实现  */
    let parent=document.querySelector("#commodity .mediumpic");//大图，中等图，阴影的父容器
    let mparent=parent.querySelector(".bimg");//中等图片的父容器
    let mediumpic=mparent.querySelector("img");//中等图片
    let shadow=parent.querySelector(".shadow");//阴影部分
    let lparent=parent.querySelector(".bbimg");//大图的父容器
    let largerpic=lparent.querySelector("img");//大图
    let sgrandpa=document.querySelector("#commodity .littlepic .lpicwrap");//小图的爷爷
    let sparent=sgrandpa.querySelector("ul");//小图父容器
    let leftbtn=document.querySelector("#commodity .littlepic .picleft");//小图左键按钮
    let rightbtn=document.querySelector("#commodity .littlepic .picright");//小图右键按钮
    let price=document.querySelector("#commodity .price strong");
    new Magnifying({
        price,
        parent,//整体的父容器
        mparent,//中等图片的父容器
        mediumpic,//中等图片
        largerpic,//大图
        lparent,
        shadow,
        sgrandpa,
        sparent,//小图的容器
        leftbtn,//左键按钮
        rightbtn//右键按钮
    }).init();
    /* 3 加入购物车 */
    let user=document.querySelector("#header .nav .lore .user");
    let numtext=document.querySelector("#commodity .favorable .addcart input");
    let addbtn=document.querySelector("#commodity .favorable .addcart .add");
    let subbtn=document.querySelector("#commodity .favorable .addcart .sub");
    let cartbtn=document.querySelector("#commodity .favorable .addcart .del_add");
    new Addcart({
        user,//用户名标签
        price,//价格
        numtext,
        addbtn,
        subbtn,
        cartbtn
    }).init();
}
export{detailinit};