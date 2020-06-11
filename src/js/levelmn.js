/* 二级菜单栏 */
class Menu{
    constructor(option){
        this.parent=option.parent;//一级菜单
        this.texts=Array.from(option.texts);//二级菜单的内容们
        this.textp=option.textp;//二级菜单的父亲
        this.menulist=Array.from(option.menulist);//一级菜单li们
        this.prev=null;
        this.index=null;
        this.top=null;//一级菜单离文档的距离
    }
    init(){
        this.prev=this.texts[0];//默认第一项是第一块
        this.prev.style.display="block";
        /* 切换二级菜单 */
        for(let value of this.menulist){
            value.addEventListener("mouseover",(e)=>{
                var e= e||window.event;
                this.overHandler(e);
            });
            value.addEventListener("mouseout",(e)=>{
                var e= e||window.event;
                this.overHandler(e);
            });
        }
        /* 移出 隐藏二级菜单 */
        this.textp.addEventListener("mouseover",(e)=>{
            var e= e||window.event;
            e.currentTarget.style.display="block";
        })
        /* 滚动条监听 */
        window.addEventListener("scroll",()=>{
            this.scrollmave()
        })
    }
    scrollmave(){
        let top =this.parent.getBoundingClientRect();//父容器相对可视窗口的位置
        let y=top.y;
        if(y<0){
            this.textp.style.top=-y+"px";
        }
    }
    /*切换二级菜单  */
    overHandler(e){
        /* 移入父容器的li，显示二级内容 */
            if(e.type==="mouseover"){
                this.textp.style.display="block";
                /* 显示对应的内容 */
                this.index=this.menulist.indexOf(e.currentTarget);
                if(this.prev) this.prev.style.display="none";
                this.prev=this.texts[this.index];
                this.prev.style.display="block";
                this.scrollmave();
            }
            if(e.type==="mouseout"){
                this.textp.style.display="none";
            }
    }
}
export{Menu};