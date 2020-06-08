/* 为你推荐页面渲染 */
import {pajax} from './pajax.js';
import {Paging} from './paging.js';

class Render{
    constructor(option){
        this.date=new Date();//时间戳
        this.elem=option.elem;//要渲染的元素
        this.url=option.url+"?date="+this.date;//接口
        this.type=option.type;//indexrec 是首页为你推荐
        this.sortbool=option.sortbool;//排序的开关  true 表示价格从高到底，flase 表示价格从低到高
        this.dataarr=[];//用于排序储存数据
        this.oPage=option.oPage;//分页用到的所有元素
    }
    init(){
        pajax({
            url:this.url
        }).then((res)=>{
            res=JSON.parse(res);
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
            this.elem.innerHTML="";//把要渲染的元素先清空
            /* 分页 只有列表页才有分页*/
            this.oPage.alldata=res;//给分页传参的对象添加总数据属性
            if(this.type==="listmain"){
                new Paging(this.oPage).init();
            }
            for(let value of res){
                
                if(this.type==="indexrec"){//首页为你推荐
                    this.elem.innerHTML+=`
                    <li class="hac">
                        <a href="javascript:;" sid="${value.sid}">
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
                // else if(this.type==="listmain"){//列表页
                //     this.elem.innerHTML+=`
                //     <li>
                //         <a href="javascript:;" class="pic" >
                //             <div class="goodpic">
                //                 <img src="" alt="" data="${value.url}">
                //             </div>
                //         </a>
                //         <p>￥${value.price}</p>
                //         <a href="javascript:;" class="headline">
                //             <h4>${value.title}</h4>
                //             <h5>${value.des}</h5>
                //         </a>
                //         <!-- 评论 选购 -->
                //             <div class="comment">
                //             <div class="comment-l">
                //                 <i>${value.evaluste}万+</i>条评价
                //             </div>
                //             <div class="comment-r">
                //                 选购指数<i>${value.evaluste}</i>
                //             </div>
                //             </div>   
                //             <div class="television">
                //                 <a href="javascript:;">KKTV电视京东自营旗舰店</a>
                //                 <a href="javascript:;"></a>
                //             </div>
                //         <div class="sign">
                //             自营
                //         </div>
                //         <div class="trolley">
                //             <a href="javascript:;"><i></i>对比</a>
                //             <a href="javascript:;" class="schange"><u class="attention"></u>关注</a>
                //             <a href="javascript:;" class="trolley_cart"><u class="scart"></u>加入购物车</a>
                //         </div>
                //     </li>
                //     `;
                // }
                
            }
            /* 懒加载滚轮事件 */
        window.addEventListener("scroll",(e)=>{
            this.scrollHandler(e,this.elem.children);
        })
        })
        
    }
    scrollHandler(e,list){
        list=Array.from(list);//没一个li
        let scrollball=document.documentElement.scrollTop || document.body.scrollTop;
        for(let value of list){
            let distance=0;
                if(this.type==="indexrec") distance=400;
                else if(this.type==="listmain") distance=10;
                if(scrollball>=value.offsetTop-distance){
                    var parent=Array.from(Array.from(value.children)[0].children)[0];
                    
                    
                    let img=Array.from(parent.children)[0];
                    // console.log(img);
                    
                    // console.log(img.getAttribute('data'));
                    // console.log(img.getAttribute('data'));
                    
                    img.src=img.getAttribute('data');
                }
            
        }
    }
}
export{Render};