//轮播图：显示隐藏型轮播  无缝轮播  自动轮播 放大轮播
class Carousel {
    constructor(option) {
        this.parent = option.parent;//轮播图最大的容器 用于听自动轮播
        this.alldata = option.alldata;//数据
        this.picparent = option.picparent;//图片父容器
        this.dotparent = option.dotparent;//小圆点父容器
        this.rightbtn = option.rightbtn;//右键点击
        this.leftbtn = option.leftbtn;//左键点击
        this.type = option.type;//效果类型  显示隐藏型轮播  无缝轮播  自动轮播 放大轮播
        this.template = option.template;//渲染模板
        this.prevdot = null;//上一个小圆点
        this.prevpic = null;//上一张图片
        this.pic = [];//图片容器
        this.dot = [];//小圆点容器 自动生成
        this.index = 0;//刚开始的下标
        this.auto = option.auto;//是否自动轮播 true 是自动轮播
        this.timer = null;//自动轮播的定时器
    }
    init() {
        /* 1渲染 */
        this.render();
        if (this.type === "showhide") {//显示隐藏
            /*2 默认显示第一张 prev存储当前项*/
            this.picparent.children[this.index].className = this.dotparent.children[this.index].className = "active";
            this.prevdot = this.dotparent.children[this.index];//存储第一次的小圆点
            this.prevpic = this.picparent.children[this.index];//存储第一次的图片
            this.dot = Array.from(this.dotparent.children);//小圆点数组
            this.pic = Array.from(this.picparent.children);//图片数组

            /*3 小圆点切换 事件委托*/
            this.dotparent.addEventListener("click", (e) => {
                var e = e || window.event;
                this.dotHandler(e);
            });
            /* 4 右键点击切换 */
            this.rightbtn.addEventListener("click", () => {
                this.rightHandler();
            });
            /* 5 左键点击 */
            this.leftbtn.addEventListener("click", () => {
                this.leftHandler();
            });
            /* 6 是否自动轮播 */
            if (this.auto) {
                this.autokinesis();
                //     /* 7 鼠标移入停止自动轮播 */
                this.parent.addEventListener("mouseover", () => {
                    clearInterval(this.timer);
                })
                //     /* 8 鼠标移出开始自动轮播 */
                this.parent.addEventListener("mouseout", () => {
                    this.autokinesis();
                })
            }
        }
        

    }
    // this.picparent.children[this.index].className=this.dotparent.children[this.index].className="active";
    // this.prevdot=this.dotparent.children[this.index];//存储第一次的小圆点
    // this.prevpic=this.picparent.children[this.index];//存储第一次的图片
    // this.dot=Array.from(this.dotparent.children);//小圆点数组
    // this.pic=Array.from(this.picparent.children);//图片数组

    /*3 小圆点切换 事件委托*/
    // this.dotparent.addEventListener("click",(e)=>{
    //     var e= e||window.event;
    //     this.dotHandler(e);
    // });
    /* 4 右键点击切换 */
    // this.rightbtn.addEventListener("click",()=>{
    //     this.rightHandler();
    // });
    /* 5 左键点击 */
    // this.leftbtn.addEventListener("click",()=>{
    //     this.leftHandler();
    // });
    /* 6 是否自动轮播 */
    // if(this.auto){
    //     this.autokinesis();
    //     /* 7 鼠标移入停止自动轮播 */
    //     this.parent.addEventListener("mouseover",()=>{
    //         clearInterval(this.timer);
    //     })
    //     /* 8 鼠标移出开始自动轮播 */
    //     this.parent.addEventListener("mouseout",()=>{
    //         this.autokinesis();
    //     })
    // } 

/* 自动轮播 */
autokinesis(){
    this.timer = setInterval(() => {
        this.cut();
    }, 1000)
}
/* 左键点击切换 */
leftHandler(){
    this.index -= 2;
    this.cut();
}
/* 右键点击切换 */
rightHandler(){
    this.cut();
}
/* 切换 */
cut(){
    this.index++;
    if (this.index > this.dot.length - 1) {
        this.index = 0;
    }
    if (this.index < 0) {
        this.index = this.dot.length - 1;
    }
    this.dothander("prevdot", this.dot[this.index]);
    this.dothander("prevpic", this.pic[this.index]);
}
/* 切换函数  保留前一位 */
dothander(prev, elem){
    if (this[prev]) this[prev].className = "";
    this[prev] = elem;
    this[prev].className = "active";
}
/* 小圆点切换 */
dotHandler(e){
    if (e.target.nodeName === "LI") {
        this.index = this.dot.indexOf(e.target);
        this.dothander("prevdot", e.target);
        if (this.type === "showhide") {
            this.dothander("prevpic", this.pic[this.index]);
        }
    }
}
/* 
clickHandler(e){
    if(!this.flag) return;
    let l = this.sparent.offsetLeft;
    let sw = this.sgrandpa.offsetWidth;//小图爷爷的宽
    let pw = this.sparent.offsetWidth;//小图父容器的宽
    let position = 0;
    if(e.target===this.leftbtn){/* 左键点击 */
//判断父容器的left位置是否在0  在0的位置，左键要加类
//     if (l === 0) {//说明小图片父容器已经在最左边了
//         this.leftbtn.style.background = "url(./images/disabled-prev.png) no-repeat 0 0";
//         return;
//     }
//     /* 左键防抖 */
//     this.flag = false;
//     if (Math.abs(l) < sw) {//如果偏移量小于爷爷的宽  父容器移动总距离是l
//         position = 0;
//     } else {  //如果偏移量大于等于爷爷宽  则移动爷爷的宽的距离 l + sw
//         position = l + sw;
//     }
//     }else if(e.target===this.rightbtn){/* 右键点击 */
//         if(l===sw-pw){//表示父容器已经在爷爷的最又边
//             this.rightbtn.background="url(./images/disabled-next.png) no-repeat 0 0;";
//             return;
//         }
//         this.flag = false;//右键防抖
//         if(pw-(sw-l)<sw){//表示剩余移动的位置少于一个爷爷的宽度
//             position=sw-pw;//最终要到的位置是爷爷宽减父容器宽
//         }else{
//             position=l-sw;
//         }
//     }
//     this.spicmove(position);
// }
// /* 小图父容器移动 */
// spicmove(position){
//     let direction="left";
//     if(position>this.sparent.offsetLeft){//表示左键点击 速度是正数
//         this.speed=Math.abs(this.speed);
//         direction="left";
//     }else{//表示右键点击  速度是负数
//         this.speed=-Math.abs(this.speed);
//         direction="right";
//     }
//     let timer = setInterval(() => {
//                 let lpos = this.sparent.offsetLeft;
//                 lpos += this.speed;
//                 if(direction==="left"){
//                     if (lpos >= position) {
//                         lpos = position;
//                         if(lpos<=0){
//                             lpos = 0;
//                         }
//                         this.backimgcut();
//                         this.flag = true;
//                         clearInterval(timer);
//                     }
//                 }else if(direction==="right"){
//                     if(lpos <= position){
//                         lpos = position;
//                         this.backimgcut();
//                         this.flag = true;
//                         clearInterval(timer);
//                     }
//                 }
//                 this.sparent.style.left = lpos + "px";
//             }, 16)
// }
// */
/* 渲染 */
render(){
    /* 遍历数据渲染 根据数据生成对应个数小圆点 */
    if (this.type === "showhide") {
        for (let value of this.alldata) {
            this.picparent.innerHTML += `<img src="${value.url}" alt="">`;
            this.dotparent.innerHTML += `<li></li>`;
        }
        return;
    }
    if (this.type === "clickmove") {
        this.alldata = this.alldata.slice(0, 20);
        for (let item of this.alldata) {
            this.picparent.innerHTML += `
                <div class="item">
                    <a href="javascript:;">
                        <img src="${item.url}" alt="">
                        <h3>${item.title}</h3>
                        <p><span><i>￥</i><strong>${item.price}</strong></span><u>￥<i>7909.00</i></u></p>
                    </a>
                </div>
            `;
        }
        this.picparent.style.width = this.alldata.length * 202 + "px";
        return;
    }

}
}
export { Carousel }