/* 放大镜的类 */
import { pajax } from './pajax.js';
class Magnifying {
    constructor(option) {
        this.price=option.price;//价格
        this.parent = option.parent;//整体的父容器
        this.mediumpic = option.mediumpic;//中等图片
        this.mparent = option.mparent;//中等父容器
        this.largerpic = option.largerpic;//大图
        this.shadow = option.shadow;//阴影
        this.lparent = option.lparent;//大图图片父容器
        this.sparent = option.sparent;//小图的父容器
        this.sgrandpa = option.sgrandpa;//小图爷爷
        this.leftbtn = option.leftbtn;//左键按钮
        this.rightbtn = option.rightbtn;//右键按钮
        this.url = "http://localhost/Starter-JD/php/detail.php";//ajax发送的后端地址
        this.smallpic = [];//小图的图片,需要根据后台数据生成
        this.sid = null;//详情页的产品数据库的具体哪一条
        this.flag = true;//左键右键点击防抖
        // this.rightflag = true;//右键点击防抖
        this.speed = 2;//点击移动的速度
        this.spicwidth=0;
        this.picradio=null;//放大镜比例  中图大小：大图大小
    }
    init() {
        /*1 渲染数据通过地址栏的sid 到数据库请求 判断左右按钮是否需要加点击事件*/
        this.detailrender();
        /* 2 小图跟中图，大图，切换 
        小图是动态添加的，所以获取不到元素，用事件委托，委托小图父容器添加点击事件*/
        this.sparent.addEventListener("click", (e) => {
            var e = e || window.event;
            this.tabHandler(e);
        });
        /* 3 放大镜 */
        /* 移入中图父容器，显示阴影和大图 */
        this.parent.addEventListener("mouseover",(e1)=>{
            var e1=e1||window.event;
            this.disswitchHandler(e1.type,e1);
        });
        this.parent.addEventListener("mouseout",(e2)=>{
            var e2=e2||window.event;
            this.disswitchHandler(e2.type);
        });
    }
    /* 中等图片父容器移入移出 */
    disswitchHandler(type,obj){
        if(type==="mouseover"){//鼠标移入
            this.lparent.style.display="block";
            this.picradio=this.mediumpic.offsetWidth/this.largerpic.offsetWidth;
            
            Object.assign(this.shadow.style,{
                width:this.picradio*this.lparent.offsetWidth+"px",
                height:this.picradio*this.lparent.offsetHeight+"px",
                display:'block'
            })
            /* 并且中盒子绑定鼠标移动事件 */
            this.parent.that=this;//储存当前this
            this.parent.addEventListener("mousemove",this.mousemoveHandler);
        }else if(type==="mouseout"){//鼠标移出
            this.lparent.style.display="none";
            this.shadow.style.display="none";
            /* 取消鼠标移动事件 */
            this.parent.removeEventListener("mousemove",this.mousemoveHandler);
        } 
    }
    mousemoveHandler(e3){//this是document  this.that是实例对象
        var e3=e3||window.event;
        var rect=this.getBoundingClientRect();
        let x = e3.clientX-rect.x-(this.that.shadow.offsetWidth/2);
        let y = e3.clientY-rect.y-(this.that.shadow.offsetHeight/2);
        if(x<=0){
            x=0;
        }else if(x>=this.offsetWidth-this.that.shadow.offsetWidth){
            x=this.offsetWidth-this.that.shadow.offsetWidth;
        }
        if(y<=0){
            y=0;
        }else if(y>this.offsetHeight-this.that.shadow.offsetHeight){
            y=this.offsetHeight-this.that.shadow.offsetHeight;
        }
        this.that.shadow.style.left=x+"px";
        this.that.shadow.style.top=y+"px";
        // this.largerpic
        this.that.largerpic.style.left=-x/this.that.picradio+"px";
        this.that.largerpic.style.top=-y/this.that.picradio+"px";
    }
    /* 获取sid */
    getsid() {
        let data = location.search.substring(1);
        let arr = data.split("=");
        this.sid = arr[1];
    }
    /* 渲染 */
    detailrender() {
        /*1 获取对应的sid */
        this.getsid();
        /* 2 数据请求 */
        pajax({
            url: this.url,
            data: {
                sid: this.sid
            }
        }).then((res) => {//箭头函数 这里this指向实例对象
            res = JSON.parse(res);//转成json对象
            console.log(res);
            // console.log(this.price);
            Number(res.price).toFixed(2);
            this.price.innerHTML=res.price;
            /* 小图数组 存入属性smallpic中，并且遍历数组，动态生成小图*/
            this.smallpic = res.piclisturl.split("===");
            for (let value of this.smallpic) {
                this.sparent.innerHTML += `
                <li><img src="${value}" alt=""></li>
                `;
            }
            /* 小图的父容器根据小图的数组的个数，设置宽度 */
            this.spicwidth=58 * this.smallpic.length;
            this.sparent.style.width = this.spicwidth + "px";
            /* 判断父容器是否比爷爷宽  比他宽，左右按键才可以绑定点击事件 */
            if(this.sparent.offsetWidth>=this.sgrandpa.offsetWidth){
                /* 给左右按键绑定点击事件 */
                /* 左键点击  移动小图父容器 */
            this.leftbtn.addEventListener("click", (e) => {
                var e=e||window.event;
                this.clickHandler(e);
            });
            /* 右键点击 */
            this.rightbtn.addEventListener("click", (e) => {
                var e=e||window.event;
                this.clickHandler(e);
            });
            }else{//否则按键禁用，背景图跟换
                this.leftbtn.style.background = "url(./images/disabled-prev.png) no-repeat 0 0";
                this.rightbtn.style.background = "url(./images/disabled-next.png) no-repeat 0 0";
            }
            /* 中图和大图 显示对应下标的图片 默认显示第0个*/
            this.mediumpic.src = this.largerpic.src = this.smallpic[0];
           
        })
    }
    /* 左右键点击执行函数 */
    clickHandler(e){
        if(!this.flag) return;
        let l = this.sparent.offsetLeft;
        let sw = this.sgrandpa.offsetWidth;//小图爷爷的宽
        let pw = this.sparent.offsetWidth;//小图父容器的宽
        let position = 0;
        if(e.target===this.leftbtn){/* 左键点击 */
        //判断父容器的left位置是否在0  在0的位置，左键要加类
        if (l === 0) {//说明小图片父容器已经在最左边了
            this.leftbtn.style.background = "url(./images/disabled-prev.png) no-repeat 0 0";
            return;
        }
        /* 左键防抖 */
        this.flag = false;
        if (Math.abs(l) < sw) {//如果偏移量小于爷爷的宽  父容器移动总距离是l
            position = 0;
        } else {  //如果偏移量大于等于爷爷宽  则移动爷爷的宽的距离 l + sw
            position = l + sw;
        }
        }else if(e.target===this.rightbtn){/* 右键点击 */
            if(l===sw-pw){//表示父容器已经在爷爷的最又边
                this.rightbtn.background="url(./images/disabled-next.png) no-repeat 0 0;";
                return;
            }
            this.flag = false;//右键防抖
            if(pw-(sw-l)<sw){//表示剩余移动的位置少于一个爷爷的宽度
                position=sw-pw;//最终要到的位置是爷爷宽减父容器宽
            }else{
                position=l-sw;
            }
        }
        this.spicmove(position);
    }
    /* 小图父容器移动 */
    spicmove(position){
        let direction="left";
        if(position>this.sparent.offsetLeft){//表示左键点击 速度是正数
            this.speed=Math.abs(this.speed);
            direction="left";
        }else{//表示右键点击  速度是负数
            this.speed=-Math.abs(this.speed);
            direction="right";
        }
        let timer = setInterval(() => {
                    let lpos = this.sparent.offsetLeft;
                    lpos += this.speed;
                    if(direction==="left"){
                        if (lpos >= position) {
                            lpos = position;
                            if(lpos<=0){
                                lpos = 0;
                            }
                            this.backimgcut();
                            this.flag = true;
                            clearInterval(timer);
                        }
                    }else if(direction==="right"){
                        if(lpos <= position){
                            lpos = position;
                            this.backimgcut();
                            this.flag = true;
                            clearInterval(timer);
                        }
                    }
                    this.sparent.style.left = lpos + "px";
                }, 16)
    }
    /* 左右键背景图切换 */
    backimgcut(){
        let sl=this.sparent.offsetLeft;
            if(sl===-2){//移动0的位置，打印出来的-2
                this.leftbtn.style.background = "url(./images/disabled-prev.png) no-repeat 0 0";
                this.rightbtn.style.background ="url(./images/jtsprite.png) no-repeat -78px 0";
            }else if(sl=this.sgrandpa.offsetWidth-this.sparent.offsetWidth){
                this.rightbtn.style.background = "url(./images/disabled-next.png) no-repeat 0 0";
                this.leftbtn.style.background = "url(./images/jtsprite.png) no-repeat 0 -54px";
            }else{
                this.rightbtn.style.background ="url(./images/jtsprite.png) no-repeat -78px 0";
                this.leftbtn.style.background = "url(./images/jtsprite.png) no-repeat 0 -54px";
            }
            return true;//返回true，左右按键需要绑定点击事件
        }
    /* 小图跟中图，大图，切换  */
    tabHandler(e) {
        if (e.target.nodeName === "IMG") {
            this.mediumpic.src = this.largerpic.src = e.target.src;
        }
    }
}
    
export { Magnifying };