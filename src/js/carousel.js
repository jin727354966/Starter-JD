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
        this.flag = true;//左右移动的点击开关防抖
        this.speed = 5;//点击移动的速度
        this.picwidth=null;//点击移动父容器的宽度
        this.site=0;//存储无缝轮播的当前位置
        this.num=0;//存值，用于切换方向
        this.progressbar=option.progressbar;//进度条
        this.bar=option.bar;//精度小条
        this.barwidth=null;//精度小条宽度
        this.pbarwidth=null;//进度条宽度
        this.shortx=null;//用于存储滚动条鼠标点下的距离
        this.pleft=null;//进度条相对可视窗口的位置
        this.bili=null;
    }
    init() {
        /* 1渲染 */
        this.render();
        /*2 默认显示第一张 prev存储当前项*/
        if(this.dotparent){
            this.dotparent.children[this.index].className= "active";
            this.prevdot = this.dotparent.children[this.index];//存储第一次的小圆点
            this.dot = Array.from(this.dotparent.children);//小圆点数组
        }
        /* 显示隐藏 */
        if (this.type === "showhide") {//显示隐藏
            /*2 默认显示第一张 prev存储当前项*/
            this.picparent.children[this.index].className = "active";
            this.prevpic = this.picparent.children[this.index];//存储第一次的图片
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
        /* 点击移动版 */
        if (this.type === "clickmove") {//点击移动 
            /* 2 点击左键按钮事件 */
            this.leftbtn.addEventListener("click", (e) => {
                var e=e||window.event;
                this.cmclickHandler(e.currentTarget);
            });
            /* 3 点击右键按钮事件*/
            this.rightbtn.addEventListener("click", (e) => {
                var e=e||window.event;
                this.cmclickHandler(e.currentTarget);
            });
        }
        /* 点击移动自动轮播轮播版 */
        if(this.type ==="seamless"){//滑动轮播
            this.pic=Array.from(this.picparent.children);//图片li的数组
            /* 小圆点切换 */
            this.dotparent.addEventListener("click",(e)=>{
                var e=e||window.event;
                this.slclickHandler(e.target);
            })
            /* 自动轮播 */
            this.timer=setInterval(()=>{
                this.num++;
                //表示第一个小圆点点击
                if(this.num%2===0) this.dothander("prevdot",this.dot[1]);
                else this.dothander("prevdot",this.dot[0]);
                /* 图片移动 */
                this.cmclickHandler(this.dot[1]);
            },1000)
        }
        /* 移动轮播放大缩小版 */
        if(this.type==="scalelb"){
            this.index=1;//默认从第2张图片开始运动
            this.prevpic=this.pic[ this.index];
             /* 1 右键点击切换 */
             this.rightbtn.addEventListener("click", (e) => {
                this.scalerHandler(e);
            });
            /* 2 左键点击 */
            this.leftbtn.addEventListener("click", (e) => {
                this.scalelHandler(e);
            });
            /* 3 自动轮播 */
            if (this.auto) {
                this.autosc();
                //     /* 7 鼠标移入停止自动轮播 */
                this.parent.addEventListener("mouseover", () => {
                    clearInterval(this.timer);
                })
                //     /* 8 鼠标移出开始自动轮播 */
                this.parent.addEventListener("mouseout", () => {
                    this.autosc();
                })
            }
        }
        if(this.type==="scroll"){
            /* 自动轮播 */
        this.pbarwidth=this.progressbar.offsetWidth;//进度条宽度
            if (this.auto) {
                this.autoscroll();
                //     /* 7 鼠标移入停止自动轮播 */
                this.parent.addEventListener("mouseover", () => {
                    clearInterval(this.timer);
                    this.progressbar.style.display="block";
                    this.barwidth=this.bar.offsetWidth;//精度小条宽度
                    this.pbarwidth=this.progressbar.offsetWidth;//精度小条宽度
                    let picl=this.picparent.offsetLeft;//获取当前父元素的位置
                    let sbili=(-picl)/(this.picwidth-this.parent.offsetWidth);//比例
                    this.bili=(this.picwidth-this.parent.offsetWidth)/(this.pbarwidth-this.barwidth);
                    let prox=this.progressbar.getBoundingClientRect();
                    this.pleft=prox.x;
                    this.bar.style.left=sbili*(this.pbarwidth-this.barwidth) +"px";
                })
                this.bar.addEventListener("mousedown",(e)=>{
                    this.shortx=e.offsetX;//到目标元素右上角的位置
                    console.log(this.shortx);
                    this.prevdot=this.bar.offsetLeft;
                    document.that=this;//在document上绑定一个属性，存储当前this
                    document.addEventListener("mousemove",this.barmoveHandler);
                    document.addEventListener("mouseup",()=>{
                        document.removeEventListener("mousemove",this.barmoveHandler);
                    })
                });
                //     /* 8 鼠标移出开始自动轮播 */
                this.parent.addEventListener("mouseout", (e) => {
                    this.autoscroll();
                    this.progressbar.style.display="none";
                })
            }
        }
    }
    /* 滚动条移动 */
    barmoveHandler(e){//this指document  this.that 是实例对象
        var e=e||window.event;
        let borx=e.clientX-this.that.pleft-this.that.shortx;
        /* 如果到顶就移动不了 */
        if(borx<=0){
            borx=0;
            this.that.picparent.style.left=borx+"px";
            this.that.bar.style.left=0+"px";
            return;
        }
        if(borx>=this.that.pbarwidth-this.that.barwidth){
            borx=this.that.pbarwidth-this.that.barwidth;
            this.that.bar.style.left=borx+"px";
            this.that.picparent.style.left=this.that.parent.offsetWidth-this.that.picwidth+"px";
            return;
        }
        let newbl =Math.abs(Math.abs(this.that.prevdot)-Math.abs(borx));//运动距离
        let picx=this.that.picparent.offsetLeft;
        if(this.that.prevdot>borx){//左移
        this.that.picparent.style.left=picx+newbl*this.that.bili+"px";
        }else{
            this.that.picparent.style.left=picx-newbl*this.that.bili+"px";
        }
        this.that.prevdot=borx;
        this.that.bar.style.left=borx+"px";
    }
    /* 好货自动轮播 */
    autoscroll(){
        this.timer=setInterval(()=>{
            let x=this.picparent.offsetLeft;
            if(Math.abs(x)>=this.picparent.offsetWidth-this.parent.offsetWidth){
                x=0;
                this.picparent.style.left=x+"px";
            }else{
                this.picparent.style.left=x-this.speed+"px";
            }
        },16)
    }
    /* 放大缩小版 左键点击 */
    scalelHandler(){
        if(!this.flag) return;
        this.flag=false;
        this.index--;
        this.speed=2;
        if(this.index<=1){
            this.index=this.pic.length;
            this.picparent.style.left=-(this.picwidth+25)+"px";
            this.dothander("prevpic",this.picparent.children[this.index-1]);
        }else{
            this.dothander("prevpic",this.picparent.children[this.index-1]);
        }
        this.lmove();
    }
    lmove(){
        let y=0;
        let y2=this.picparent.offsetLeft;
        this.timer=setInterval(()=>{
            y+=this.speed;
            if(y>=104){
                this.flag=true;
                clearInterval(this.timer);
            }
            this.picparent.style.left=y2+y+"px";
        },16)
    }
    /* 放大缩小版 右键点击 */
    scalerHandler(){
        if(!this.flag) return;
        this.flag=false;
        this.speed=2;
        this.scmove();
    }
    scmove(){
        let l=0;
        this.index++;
        /* 当 当前下标大于图片数组的话，又从0开始 */
            this.dothander("prevpic",this.picparent.children[this.index]);
        /* 切换图片显示的类 */
        let picl=this.picparent.offsetLeft;//移动的父容器的left值
        this.timer=setInterval(()=>{
            l+=this.speed;
            if(l>=103){//运动结束
                this.flag=true;
                if(this.index>=this.pic.length){//运动的最后
                    this.index=1;
                    this.picparent.style.left="-50px";
                    this.dothander("prevpic",this.picparent.children[this.index]);
                    clearInterval(this.timer);
                    return;
                }
                let all_l=picl-l;
                clearInterval(this.timer);
            }
            this.picparent.style.left=picl-l+"px";
        },16)
    }
    /* 滑的轮播小圆点切换 */
    slclickHandler(elem){
        /* 小圆点切换 */  
        this.dothander("prevdot",elem);
        /* 图片移动 */
        this.cmclickHandler(elem);
    }
    /* 左右键点击移动效果 */
    cmclickHandler(elem) {
        if(!this.flag) return;
        let l = this.picparent.offsetLeft;//小图的left值
        let sw = this.parent.offsetWidth;//小图爷爷的宽
        let pw = this.picparent.offsetWidth;//小图父容器的宽
        
        let position = 0;
        
        if(elem === this.leftbtn || elem===this.dot[0]){/* 左键点击 */
    // // 判断父容器的left位置是否在0  在0的位置，左键要加类
        if (l === 0) {//瞬间切换到最后
            l=-this.picwidth;
            this.picparent.style.left=l+"px";
        }
        /* 左键防抖 */
        this.flag = false;
        if (Math.abs(l) < sw) {//如果偏移量小于爷爷的宽  父容器移动总距离是l
            position = 0;
        } else {  //如果偏移量大于等于爷爷宽  则移动爷爷的宽的距离 l + sw
            position = l + sw;
        }
        }else if(elem===this.rightbtn || elem===this.dot[1]){/* 右键点击 */
            this.flag = false;//右键防抖
            if(this.picwidth-(sw-l)<sw && this.picwidth-(sw-l)!==0){//表示剩余移动的位置少于一个爷爷的宽度
                position=sw-this.picwidth;//最终要到的位置是爷爷宽减父容器宽
            }else{
                position=l-sw;
            }
        }
        this.spicmove(position);
    }
    /* 小图父容器移动 */
    spicmove(position){
        let direction="left";
        if(position>this.picparent.offsetLeft){//表示左键点击 速度是正数
            this.speed=Math.abs(this.speed);
            direction="left";
        }else{//表示右键点击  速度是负数
            this.speed=-Math.abs(this.speed);
            direction="right";
        }
        let timer = setInterval(() => {
                    let lpos = this.picparent.offsetLeft;
                    lpos += this.speed;
                    if(direction==="left"){
                        if (lpos >= position) {
                            lpos = position;
                            this.flag = true;
                            clearInterval(timer);
                        }
                    }else if(direction==="right"){
                        if(lpos <= position){
                            this.flag = true;
                            if(lpos==-this.picwidth){//如果left盒值
                                lpos=0;
                            }
                            clearInterval(timer);
                        }
                    }
                    this.picparent.style.left = lpos + "px";
                }, 16)
    }
    /* 自动轮播 */
    autokinesis() {
        this.timer = setInterval(() => {
            this.cut();
        }, 2000)
    }
    /* 放大版自动轮播 */
    autosc() {
        this.timer = setInterval(() => {
            this.scmove();
        }, 1000)
    }
    /* 左键点击切换 */
    leftHandler() {
        this.index -= 2;
        this.cut();
    }
    /* 右键点击切换 */
    rightHandler() {
        this.cut();
    }
    /* 切换 */
    cut() {
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
    dothander(prev, elem) {
        if (this[prev]) this[prev].className = "";
        this[prev] = elem;
        this[prev].className = "active";
    }
    /* 小圆点切换 */
    dotHandler(e) {
        if (e.target.nodeName === "LI") {
            this.index = this.dot.indexOf(e.target);
            this.dothander("prevdot", e.target);
            if (this.type === "showhide") {
                this.dothander("prevpic", this.pic[this.index]);
            }
        }
    }
    
    /* 渲染 */
    render() {
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
            let streen=this.alldata.slice(0, 3);
            for (let prop of streen) {
                this.picparent.innerHTML += `
                <div class="item">
                    <a href="javascript:;">
                        <img src="${prop.url}" alt="">
                        <h3>${prop.title}</h3>
                        <p><span><i>￥</i><strong>${prop.price}</strong></span><u>￥<i>7909.00</i></u></p>
                    </a>
                </div>
            `;
            }
            this.picwidth=this.alldata.length * 202;
            this.picparent.style.width = (this.alldata.length+4) * 202 + "px";
            return;
        }
        if(this.type ==="seamless"){
            this.alldata = this.alldata.slice(0, 2);
            for (let obj of this.alldata) {
                this.picparent.innerHTML += `
                <a href="javascript:;" class="major_pic"><!-- 单个图片 -->
                    <img src="${obj.url}" alt="">
                    <p>${obj.title}</p>
                    <h3>${obj.des}</h3>
                    <h5>大牌闪购<i class="iconfont"></i></h5>
                </a>
            `;
            this.dotparent.innerHTML += `<li></li>`;
            
            }
            let sldatalast=this.alldata.slice(0, 1);
            for (let obj2 of sldatalast) {
                this.picparent.innerHTML += `
                <a href="javascript:;" class="major_pic"><!-- 单个图片 -->
                    <img src="${obj2.url}" alt="">
                    <p>${obj2.title}</p>
                    <h3>${obj2.des}</h3>
                    <h5>大牌闪购<i class="iconfont"></i></h5>
                </a>
            `;
            }
            this.picwidth=this.alldata.length * 170;
            this.picparent.style.width = (this.alldata.length+1) * 170 + "px";
            return;
        }
        if(this.type==="scalelb"){//方法缩小
            this.alldata = this.alldata.slice(0,6);
            for (let scobj of this.alldata) {
                this.picparent.innerHTML += `
                <a href="javascript:;" >
                <div class="imgpic">
                    <img src="${scobj.url}" alt="">
                </div>
                <div class="deg">
                <h3>${scobj.title}</h3>
                <p>${scobj.des}</p>
                <span>￥<i>${scobj.price}.00</i><u>起</u></span>
            </div>
            </a>
            `;
            }
            let scdatalast=this.alldata.slice(0, 3);
            for (let scitem of scdatalast) {
                this.picparent.innerHTML += `
                <a href="javascript:;" >
                <div class="imgpic">
                    <img src="${scitem.url}" alt="">
                </div>
                <div class="deg">
                <h3>${scitem.title}</h3>
                <p>${scitem.des}</p>
                <span>￥<i>${scitem.price}.00</i><u>起</u></span>
            </div>
            </a>
            `;
            }
            /* 给2个产品加 active的类*/
            this.pic=Array.from(this.picparent.children).slice(0,-2);
            this.picparent.children[1].className="active";
            this.picwidth=(this.alldata.length-1) * 104+130;
            this.picparent.style.width = (this.alldata.length+2) * 104+ 130+ "px";
            return;
        }
        if(this.type==="scroll"){//有滚动条
            this.alldata = this.alldata.slice(0, 20);
            for(let i=0;i<this.alldata.length;i++){
                if(i%2===0){
                    this.picparent.innerHTML+=`
                    <a href="javascript:;" class="odd">
                        <p>${this.alldata[i].title}</p>
                        <img src="${this.alldata[i].url}" alt="">
                    </a>
                    `;
                }else{
                    this.picparent.innerHTML+=`
                    <a href="javascript:;" class="even">
                            <img src="${this.alldata[i].url}" alt="">
                            <p>${this.alldata[i].title}</p>
                        </a>
                    `;
                }
            }
            this.picwidth=this.alldata.length*200;
            this.picparent.style.width=this.picwidth+"px";
        }
    }
}
export { Carousel }