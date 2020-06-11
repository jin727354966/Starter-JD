/* tab切换 */
class Tab{
    constructor(option){
        this.btns=Array.from(option.btns);//按钮数组
        this.texts=Array.from(option.texts);//内容数组
        this.prev=null;
        this.index=0;
    }
    init(){
        /* 点击切换 */
        this.prev=this.btns[0];
        this.texts[this.index].className="active";
        for(let value of this.btns){
            value.addEventListener("click",(e)=>{
                this.tabshow(e);
        })
        }
}
    tabshow(e){
        if(this.prev){
            this.prev.className="";
            this.index=this.btns.indexOf(this.prev);
            this.texts[this.index].className="";
        } 
        this.prev=e.currentTarget;
        this.prev.className="active";
        this.index=this.btns.indexOf(this.prev);
        this.texts[this.index].className="active";
    }
}
export{Tab};