/* 购物车渲染  */
import {pajax} from './pajax.js';
import{setCookie,delCookie} from './cookie.js';
class Cartrender{
    constructor(option){
        this.cartdata=option.cartdata;//购物车数据 对象型数组 [{sid:1,num:2},{sid:2,num:4}]
        this.litemplate=option.litemplate;//li渲染结构样板
        this.liparent=option.liparent;//li的父容器 用于做事件委托
        this.checkall=option.checkall;//第一个全选
        this.twocheckall=option.twocheckall;//第二个全选
        this.delcheck=option.delcheck;//删除选中的
        this.delall=option.delall;//全部删除
        this.selectedGoods=option.selectedGoods;//已选择商品
        this.summaryli=option.summaryli;//最后总结计数的li
        this.totalprice=option.totalprice;//已选择总价
        this.sids=[];//用于存储购物车数据的所有sid
        this.newlist=[];
        this.num=0;
        
    }
    init(){
        /* 发送ajax */
        this.render();
        /* 显示已选商品 显示总价*/
        this.showpro();
        /* 给父容器添加点击事件 处理商品数量增加，减少 删除*/
        
        this.liparent.addEventListener("click",(e)=>{
            var e=e||window.event;
            this.clickHandler(e);
        })
        /* 给父容器添加点击事件 处理商品数量直接输入*/
        this.liparent.addEventListener("input",e=>{
            var e=e||window.event;
            this.clickHandler(e);
        })
        /* 全选框第一个 */
        this.checkall.addEventListener("click",e=>{
            var e=e||window.event;
            // console.log(1);
            
            this.checkallHanlder(e);
        })
        /* 全选第二个 */
        this.twocheckall.addEventListener("click",e=>{
            var e=e||window.event;
            this.checkallHanlder(e);
        })
        /* 全部删除 */
        this.delall.addEventListener("click",e=>{
            var e=e||window.event;
            this.delallHanlder(e);
        })
        /* 删除选中的 */
        this.delcheck.addEventListener("click",e=>{
            var e=e||window.event;
            this.delcheckHanlder(e);
        })
    }
    /* 已选商品 显示总价*/
    showpro(){
        let procheckAll = Array.from(this.liparent.children).slice(2,-1);//截取产品的li
        let showpronum=0;
        let totalnum=0;
        procheckAll.forEach(item=>{
            let procheckitem=item.querySelector(".select input[type='checkbox']");
            let count=item.querySelector(".cart_count input");
            let pricetotal=item.querySelector(".cart_sum strong");
            console.log(pricetotal);
            
            /* 判断选框是否选中  */
            if(procheckitem.checked){//表示选中
                //计数选中的件数  
                this.cartdata.forEach((procookie)=>{
                    
                    if(procookie.sid===item.sid){
                        showpronum+=Number(count.value);
                        totalnum+=Number(pricetotal.innerText);
                    }
                })
                
            }
       })
       this.selectedGoods.innerHTML=showpronum;
       this.totalprice.innerHTML=totalnum.toFixed(2);
    }
    /* 删除选中的 */
    delcheckHanlder(e){
        let procheckAll = Array.from(this.liparent.children).slice(2,-1);//截取产品的li
        procheckAll.forEach(item=>{
            let procheckitem=item.querySelector(".select input[type='checkbox']");
            /* 判断选框是否选中 */
            if(procheckitem.checked){//表示选中
                //删除对应的产品li  并且改变cookie 存储
                this.liparent.removeChild(item);
                this.cartdata.forEach((procookie,index)=>{
                    if(procookie.sid===item.sid){
                        this.cartdata.splice(index,1);
                    }
                })
                this.tagcookie();
            }
       })
       /* 将已选商品件数改为0  总价改为0 */
       this.selectedGoods.innerHTML="0";
       this.totalprice.innerHTML="0.00";
    }
    /* cookie数据判断，重新设置或者删除 */
    tagcookie(){
        
        if(this.cartdata.length>0){
            setCookie({
                key:"cartData",
                value:JSON.stringify(this.cartdata),
                date:10,
                path:"/"
            });
        }else{
            
            delCookie("cartData","/")
        }
    }
    /* 全部删除 删除产品，删除cookie*/
    delallHanlder(){
        let proAll = Array.from(this.liparent.children).slice(2,-1);//截取产品的li
        /* 遍历删除 */
        proAll.forEach((liitem)=>{
            this.liparent.removeChild(liitem);
        })
        /* 清除cookie 清除cookie数据*/
        this.cartdata=null;
        delCookie("cartData","/");
    }
    /* 全选功能 */
    checkallHanlder(e){
        /* 获取所有产品的checkbox */
       let listAll = Array.from(this.liparent.children);//是所有li的数组

       listAll.forEach(item=>{
        let itemcheck=item.querySelector(".select input[type='checkbox']");//所有li的框
        itemcheck.checked=e.currentTarget.checked;//让所有选框状态等于当前的选框
       })
    //    /* 显示选中几件商品 显示总价*/
       this.showpro();
    }
    /* 父容器点击执行函数 事件委托 */
    clickHandler(e){
        if(/ prochange/g.test(e.target.className)){
            let cart_count1=e.target.parentNode;//数量的父容器
            let counttext1=cart_count1.querySelector("input");//数量文本框
            let subtotalparent1=cart_count1.nextElementSibling;//小计的父容器
            let subtotal1=subtotalparent1.querySelector("strong");//小计
            this.num=Number(counttext1.value);//把文本框的数量给到this.num
            if(/prosub/g.test(e.target.className)){//数量-按键 
                this.num--;
                if(this.num<=1){//数量小于1
                    this.num=1;
                    e.target.className+=" disable";
                    if(this.num>1){//如果数量大于1，把-号的禁用类去掉
                        if(/ disable/g.test(e.target.className)){
                            e.target.className=e.target.className.replace(/ disable/,"");//将有禁用的类去掉
                        }
                    }
                }
                }else if(/proadd/g.test(e.target.className)){
                    this.num++;
                }
                counttext1.value=this.num;//从新将数值赋值给数量文本框
                subtotal1.innerHTML=(e.target.price*this.num).toFixed(2);//从新计算小计
                /* 显示下选中商品数量  显示选中商品价格 */
                this.showpro();
                /* 存储下cookie */
                /* 修改cookie数组数据 */
                this.cartdata.forEach(procookie=>{
                    if(procookie.sid===e.target.sid){
                        procookie.num=this.num;
                    }
                })
                setCookie({
                    key:"cartData",
                    value:JSON.stringify(this.cartdata),
                    date:10,
                    path:"/"
                });
        }else if(e.target.className==="del"){/* 删除按键 */
            let delgruanpa=e.target.parentNode.parentNode;
            e.currentTarget.removeChild(delgruanpa)//删除li
            /* 修改cookie数组数据 */
                this.cartdata.forEach((procookie,index)=>{
                    if(procookie.sid===e.target.sid){
                        this.cartdata.splice(index,1);
                    }
                })
                /* 再存储下cookie 先判断数组是否长度大于0 */
                this.tagcookie();
                /* 显示下选中商品数量  显示选中商品价格 */
                this.showpro();
            }else if(e.target.className==="procheck"){//每一个选框的点击事件
                let listAll = Array.from(e.currentTarget.children).slice(2,-1);//是所有产品li的数组
                let flag=true;//定义开关
                listAll.forEach((item)=>{
                    let listcheck=item.querySelector(".procheck");
                    if(!listcheck.checked){//如果有一个没有选中，则改变开关的值
                        flag=false;
                    }
                })
                if(flag) this.checkall.checked=this.twocheckall.checked=true;
                else this.checkall.checked=this.twocheckall.checked=false;
                this.showpro();
            }
        }
    /* 渲染 */
    render(){
        /* 将加入过购物车的商品的sid存入一个数组 */
        for(let value of this.cartdata){
            this.sids.push(value.sid);
        }
        /* 发送ajax */
        pajax({
            url:"http://localhost/Starter-JD/php/cart.php",
            data:{
                sids:this.sids
            }
        }).then((res)=>{//this是实例对象
            
            res=JSON.parse(res);//是一个对象型数组
            /* 遍历数组，渲染 */
            for(let value of res){
                console.log(value);
                let newli=this.litemplate.cloneNode(true);//克隆的li
                newli.sid=value.sid;
                
                newli.style.display="block";
                this.newlist.push(newli);
                let img=newli.querySelector(".spic img");
                let title=newli.querySelector(".type p");
                let des=newli.querySelector(".type>span");
                let price=newli.querySelector(".cart_price i");
                let num=newli.querySelector(".cart_count input");//数量的文本框
                let del=newli.querySelector(".cart_oper .del");//删除按键
                del.sid=value.sid;//在删除按键上绑定一个属性，用于存储sid 为后面删除操作cookie使用
                let changebtn=Array.from(newli.querySelectorAll(".cart_count span"));//+-按键
                for(let btn of changebtn){
                    btn.price=value.price;//给点击的按键绑定价格
                    btn.sid=value.sid;//给点击的按键绑定sid
                }

                let subtotal=newli.querySelector(".cart_sum strong");//小计
                for(let item of this.cartdata){//在cookie中查找对应的sid的产品购买数量
                    if(value.sid===item.sid){
                        num.value=item.num;
                    }
                }
                if(Number(num.value)===1)  changebtn[0].className+=" disable";//如果数量为1，-按键添加禁用按键类
                subtotal.textContent=(Number(value.price)*Number(num.value)).toFixed(2);
                price.textContent=value.price;
                des.textContent=value.des;
                title.textContent=value.title;
                img.src=value.url;
                this.liparent.insertBefore(newli,this.summaryli);
            }
            
        })

    }
}
export{Cartrender};