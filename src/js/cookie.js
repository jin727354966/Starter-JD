// setCookie({
        //     key:"sex",
        //     value:"男",
        //     date:10,
        //     path:"/"
        
        // })
        /* cookie设置     
       参数： option是一个对象 
        ---option.key是存入cookie的键  
        ---option.value 存入cookie的值 
        ---option.date 是存入cookie的有效期
        ---option.path  是存入cookie的路径
        */
function setCookie(option){
    let indate=new Date();
indate.setDate(indate.getDate()+option.date);
    if(Object.prototype.toString.call(option.value).slice(8,-1)==="Object" ||
    Object.prototype.toString.call(option.value).slice(8,-1)==="Array") option.value = JSON.stringify(option.value);
    if(!option.date){
        document.cookie=option.key+"="+option.value;
        return;
    }
    if(!option.path){
        document.cookie=option.key+"="+option.value+";expires="+indate;
        return;
    } 
    document.cookie=option.key+"="+option.value+";expires="+indate+";path="+option.path;
}
/* ------------------------------------------------------------------ */
/* cookie 获取指定的键的值 
    参数：key 获取指定的键*/
function getCookie(key){
    /* 1 获取所有Cookie all  是一个name=[1,2,34,5,6]; age=16; sex=男 格式的字符串  注意：键值对之间是分号和一个空格隔开*/
    let all=document.cookie;
    /* 2 将all 转成数组allarr  用到split()  得到的格式  ["name=[1,2,34,5,6]", "age=16", "sex=男"]*/
    let allarr=all.split("; ");
    
    /* 3 遍历allarr */
    for(let i=0;i<allarr.length;i++){
        /* 每一个 allarr[i] 是一个键值对的字符串 "sex=男"  所以又需要截取，并且判断*/
        var itemarr=allarr[i].split("=");
        /* itemarr 第一项是键 ，第二项是值  
          所以判断参数value是否与itemarr第一项（键）一样，如果一样，返回itemarr第二项(值)*/
          if(key===itemarr[0]){
              return itemarr[1];
          }
    }
}

// console.log(getCookie("age"));
/* ---------------------------------------------------------------------- */
/* 删除cookie   
 思路，同一个键，可以覆盖，  设置一个过去的时间 */
 function delCookie(key,path){
    setCookie({
        key:key,
        value:null,
        date:-1,
        path:path
    })
 }
 delCookie("sex","/");
 export {setCookie,getCookie,delCookie};