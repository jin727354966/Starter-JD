/* 分页 */
class Paging{
    constructor(option){
        this.alldata=option.alldata;//总数据
        this.count=option.count;//一页显示几条
        this.top=option.top;// 上一页
        this.bot=option.bot;// 下一页
        this.itemwrap=option.itemwrap;// 每一页的父容器
        this.text=option.text;//指定跳转哪一页的数
        this.btn=option.btn;//指定跳转哪一页的按钮
        this.pagetext=option.pagetext;//要显示总页码
        this.elem=option.elem;//要渲染的元素
        this.page=null;//一共分几页，通过计算 总数据/一页显示几条
        this.index=0;
        this.aItem=[];
        this.prev=null;//存储上一次显示的页面
    }
    init(){
        /* 1 计算要分几页 并且显示在指定位置   要向上取整*/
        this.page=Math.ceil(this.alldata.length/this.count);
        
        this.pagetext.textContent=this.page;
        /* 2 分几页，就对应生成每一页的li */
        for(let i=1;i<=this.page;i++){
            let a=document.createElement("a");
            a.textContent=i;
            a.href="javascript:;";
            this.aItem.push(a);
            this.itemwrap.insertBefore(a,this.bot);
        }
        // 首次需要渲染一次  默认是渲染第一页，所以第一页的页面要加类
        this.aItem[0].className="active";
        this.prev=this.aItem[0];
        this.cut();
        /* 3 分页 每个页码添加点击事件*/
        for(let value of this.aItem){
            value.addEventListener("click",(e)=>{
                if(this.index===this.aItem.indexOf(e.currentTarget)) return;//点击当前页不渲染
                this.index=this.aItem.indexOf(e.currentTarget);//存储当前点击的下标
                if(this.index===0){//当页码是第一页，则上一页按钮禁止点击
                    this.toggleclass(this.bot,this.top);
                }else if(this.index===this.aItem.length-1){//当页码是最后一页，则下一页按钮禁止点击
                    this.toggleclass(this.top,this.bot);
                }else{
                    this.bot.className= this.top.className="";
                }
                this.cut();
            })
        }
        /* 4 上一页添加点击事件 */
        this.top.addEventListener("click",()=>{
            if(this.index===0) return;//当显示的是第一页时，禁止点击上一页
            this.index--;
            if(this.index<=0){
                this.index=0;
                this.top.className="stopword";//如果页面显示时第一页则加禁止点击的类名
            }else if(this.index===this.aItem.length-1){
                this.toggleclass(this.top,this.bot);
            }else{
                this.top.className=this.bot.className="";
            }
           
            /* 显示对应的页码 */
            this.cut();
        })
        /* 5 下一页添加点击事件 */
        this.bot.addEventListener("click",()=>{
            if(this.index===this.aItem.length-1) return;//当显示的是最后一页时，禁止点击下一页
            this.index++;
            if(this.index>=this.aItem.length-1){
                this.index=this.aItem.length-1;
                this.bot.className="stopword";//如果页面显示时第一页则加禁止点击的类名
            }else if(this.index===0){
                this.toggleclass(this.bot,this.top);
            }else{
                this.top.className=this.bot.className="";
            } 
            /* 显示对应的页码 */
            this.cut();
        })
        /* 6 指定显示哪一页 */
        this.btn.addEventListener("click",()=>{
            /* 获取指定跳转哪一页的数  如果为空则不跳转 */
            if(!this.text.value.trim()) return;
            let num=Number(this.text.value.trim())-1;
            
            if(this.index===num) return;//如果指定跳转页跟当前页是同一页，就不跳转
            this.index=num;
            if(num<=0){
                this.index=0;
                this.toggleclass(this.bot,this.top);
            }else if(num>=this.aItem.length-1){
                this.index=this.aItem.length-1;
                this.toggleclass(this.top,this.bot);
            }else{
                this.top.className=this.bot.className="";
            }
            console.log(this.index);
            
            this.cut();
        })
    }
    cut(){
        if(this.prev) this.prev.className="";
        this.prev=this.aItem[this.index];
        this.prev.className="active";
        /* 根据下标，获取对应的数据  当前下标*每页显示的条数 到 当前下标加1*每页显示的条数 */
        /* 如果index 是数组的最后一位，就截取他当前到最后 */
        let newdata=this.alldata.slice(this.index*this.count,(this.index+1)*this.count);
        /* 渲染页面 */
        this.elem.innerHTML="";//每次渲染之前要先清空
        for(let value of newdata){
            this.elem.innerHTML+=`
                    <li>
                        <a href="http://localhost/Starter-JD/src/detail.html?sid=${value.sid}" class="pic" >
                            <div class="goodpic">
                                <img src="" alt="" data="${value.url}">
                            </div>
                        </a>
                        <p>￥${value.price}</p>
                        <a href="http://localhost/Starter-JD/src/detail.html?sid=${value.sid}" class="headline">
                            <h4>${value.title}</h4>
                            <h5>${value.des}</h5>
                        </a>
                        <!-- 评论 选购 -->
                            <div class="comment">
                            <div class="comment-l">
                                <i>${value.evaluste}万+</i>条评价
                            </div>
                            <div class="comment-r">
                                选购指数<i>${value.evaluste}</i>
                            </div>
                            </div>   
                            <div class="television">
                                <a href="javascript:;">KKTV电视京东自营旗舰店</a>
                                <a href="javascript:;"></a>
                            </div>
                        <div class="sign">
                            自营
                        </div>
                        <div class="trolley">
                            <a href="javascript:;"><i></i>对比</a>
                            <a href="javascript:;" class="schange"><u class="attention"></u>关注</a>
                            <a href="javascript:;" class="trolley_cart"><u class="scart"></u>加入购物车</a>
                        </div>
                    </li>
                    `;
        }
    }
    toggleclass(pre,now){
        if(pre.className) pre.className="";
        now.className="stopword";
    }

}
export{Paging};