/* 为你推荐页面渲染 */
import {pajax} from './pajax.js';
import {Paging} from './paging.js';
import {Carousel} from './carousel.js';

class Render{
    constructor(option){
        this.date=new Date();//时间戳
        this.elem=option.elem;//要渲染的元素
        this.url=option.url+"?date="+this.date;//接口
        this.type=option.type;//indexrec 是首页为你推荐  showhide 表示首页最大的轮播
        this.sortbool=option.sortbool;//排序的开关  true 表示价格从高到底，flase 表示价格从低到高
        this.dataarr=[];//用于排序储存数据
        this.oPage=option.oPage;//分页|轮播 用到的所有元素
        
    }
    init(){
        
        pajax({
            url:this.url
        }).then((res)=>{
            
            res=JSON.parse(res);
            if(this.type==="showhide"){
                this.oPage.alldata=res;
            }
            /* 价格排序 */
            if(this.sortbool===false){//从高到底
                for(let i=0;i<res.length-1;i++){
                    for(let j=i+1;j<res.length;j++){
                        if(Number(res[i].price)<Number(res[j].price)){
                            var num=res[j];
                            res[j]=res[i];
                            res[i]=num;
                        }
                    }
                }
                console.log(res);
            }else if(this.sortbool===true){//从低到高
                for(let i=0;i<res.length-1;i++){
                    for(let j=i+1;j<res.length;j++){
                        if(Number(res[i].price)>Number(res[j].price)){
                            var num=res[j];
                            res[j]=res[i];
                            res[i]=num;
                        }
                    }
                }
            }
            /* 分页  只有列表页才有分页*/
            /* 把数据放到this.oPage里，传出去渲染   分页 轮播 */
            if(this.type==="listmain" || this.type==="showhide"){
                this.oPage.alldata=res;//给分页传参的对象添加总数据属性
            }
            if(this.type==="showhide"){//轮播 不需要懒加载
                new Carousel(this.oPage).init();
                return;
            }
            if(this.type==="listmain"){
                new Paging(this.oPage).init();
            }
            for(let value of res){
                
                if(this.type==="indexrec"){//首页为你推荐
                    this.elem.innerHTML+=`
                    <li class="hac">
                        <a href="http://10.31.162.70/Starter-JD/src/detail.html?sid=${value.sid}">
                            <div class="recommend_pic">
                                <img src="" alt="" data="${value.url}">
                            </div>
                            <div class="recommend_msg">
                                <p>${value.title}</p>
                                <span>￥<i>${value.price}</i></span>
                            </div>
                        </a>
                    </li>
                    `;
                }
            }
            /* 懒加载滚轮事件 */
        window.addEventListener("scroll",(e)=>{
            this.scrollHandler(e,this.elem.children);
        })
        })
    }
    scrollHandler(e,list){
        list=Array.from(list);//每一个li
        let scrollball=document.documentElement.scrollTop || document.body.scrollTop;
        for(let value of list){
            let distance=0;
                if(this.type==="indexrec") distance=10;
                else if(this.type==="listmain") distance=10;
                if(scrollball>=value.offsetTop-distance){
                    var parent=Array.from(Array.from(value.children)[0].children)[0];
                    let img=Array.from(parent.children)[0];
                    img.src=img.getAttribute('data');
                }
        }
    }
}
export{Render};