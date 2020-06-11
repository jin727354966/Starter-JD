import {pajax} from './pajax.js';
class Channel{
    constructor(option){
        this.date=new Date();//时间戳
        this.elem=Array.from(option.elem);//要渲染的元素
        this.url=option.url+"?date="+this.date;//接口
        this.smalltemplate=option.smalltemplate;
    }
    init(){
        pajax({
            url:this.url
        }).then((res)=>{
            let data=JSON.parse(res).slice(0,16);//16条数据
            for(let i=0;i<data.length;i++){
                if(i<2){
                    this.render({
                        datas:data[i],
                        index:0
                    });
                }else if(i<4){
                    this.render({
                        datas:data[i],
                        index:1
                    });
                }else{
                    this.render({
                        datas:data[i],
                        index:2
                    });
                }
            }
        })     
    }
    render(option){
        let pic=option.datas.piclisturl.split("===").slice(0,2);
                    let newelem=this.smalltemplate.cloneNode(true);
                    newelem.style.display="inline-block";
                    const smalltemplate=newelem.querySelectorAll(".hac img");
                    for(let j=0;j<smalltemplate.length;j++){
                        smalltemplate[j].src=pic[j];
                    }
                    this.elem[option.index].appendChild(newelem);
    }
}
export{Channel}