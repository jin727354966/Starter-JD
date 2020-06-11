/* 详情页加入购物车加入 */
/* 1 要判断用户名是否存在，是否登入状态
 2加入购物车，存储cookie */
 import{setCookie,getCookie} from './cookie.js';
class Addcart{
    constructor(option){
        this.user=option.user;//用户名标签
        this.price=option.price;//价格
        this.numtext=option.numtext;//数量
        this.addbtn=option.addbtn;//+按键
        this.subbtn=option.subbtn;//-按键
        this.cartbtn=option.cartbtn;//-加入购物车按键
        this.sid=null;//存储当前详情页的sid
        this.num=null;//存储加入该产品的数量
        this.username=null;//存储加入该产品的数量
    }
    init(){
        /*1 判断用户是否是登入状态 */
        if(!getCookie("username")) return;
        if(!this.user.style.display==="inline-block") return;
        this.username=getCookie("username");
        /* 2 获取页面sid */
        this.sid=location.search.slice(1).split("=")[1];
        console.log(this.sid);
        
        /*3 加入购物车 */
        /* 3.1 数量初始默认是1 ，将数量存入num属性中 */
        this.numtext.value=1;
        this.num=this.numtext.value;
        /* 3.2 加号按键添加点击事件 */
        this.addbtn.addEventListener("click",(e)=>{
            var e=e||window.event;
            this.purchase(e);
        })
        this.subbtn.addEventListener("click",(e)=>{
            var e=e||window.event;
            this.purchase(e);
        })
        /* 3.3 数量文本框的数据改变，添加失去焦点事件 */
        this.numtext.addEventListener("input",(e)=>{
            var e=e||window.event;
            this.inputHandler(e);
        });
        /* 3.4 加入购物车按键添加点击事件  存储cookie */
        this.cartbtn.addEventListener("click",()=>{
            
            this.gocartHandler();
        });
    }
    /* cookie存值的类型设计[{sid:1,num:2},{sid:2,num:2},{sid:3,num:2}] */
    /*加入购物车,存储cookie  如果该产品存在，则添加数量，如果不存在，则添加产品和对应数量  */
    gocartHandler(){
        if(getCookie("cartData")){//有存产品键
            let aCart=JSON.parse(getCookie("cartData"));//得到对象型数组
             /*遍历数组， 判断当前的商品是否有加入购物车 */
             let cartflag=true;//开关
            for(let value of aCart){
                if(value.sid===this.sid){//购物车有加入过该产品
                    /* 改变对应的num值就可以了 */
                    value.num=Number(value.num)+Number(this.num);
                    cartflag=false;
                }
            }
            /* 循环结束，cartflag还是为true，说明该产品没有加入过购物车 
            将当前产品加入购物车数组中*/
            if(cartflag)  aCart.push({sid:this.sid,num:this.num});
            /*存入cookie中  */
            setCookie({
                key:"cartData",
                value:JSON.stringify(aCart),
                date:10,
                path:"/"
            })
        }else{//购物车一个产品都没有
            let newCart=[];
            newCart.push({sid:this.sid,num:this.num});
            /*存入cookie中  */
            setCookie({
                key:"cartData",
                value:JSON.stringify(newCart),
                date:10,
                path:"/"
            })
        }
        location.href="http://localhost/Starter-JD/src/cart.html";//跳转到购物车页面
    }
    /* 数量文本框的数据改变，num也要改变  节流*/
    inputHandler(){
        let timer=setTimeout(()=>{
            clearInterval(timer);
            if(Number(this.numtext.value.trim())===0 ) this.numtext.value=1;
            this.num=Number(this.numtext.value);
            
            if(this.num!==1){
                if(/disable/g.test(this.subbtn.className)) this.subbtn.className=this.subbtn.className.replace(/ disable/,"");
            }else if(this.num===1){
                if(!(/disable/g.test(this.subbtn.className))) this.subbtn.className+=" disable";
            }
        },1000)
    }
    /* 产品加购 */
    purchase(e){
        if(e.currentTarget===this.addbtn){/* +按键 */
            this.num++;
            //只有点击+，num肯定大于1，因为初始值1开始 判断 —按钮是否存在禁用类，存在就可以删除
            if(/disable/g.test(this.subbtn.className)) this.subbtn.className=this.subbtn.className.replace(/ disable/,"");
            this.numtext.value=this.num;
        }else if(e.currentTarget===this.subbtn){/* -按键 */
            this.num--;
            if( this.num<=1){
                this.num=1;
                // disable 添加禁用的类
                this.subbtn.className+=" disable";
            }
            this.numtext.value=this.num;
        }
    }
}
export{Addcart}