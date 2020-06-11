//用于封装登入注册的类
//注册的类和登入的类要做的哪些
//存一个变量用于判断是注册页还是登入页
// 需要操作的元素：用户名，密码 ， 重复密码 ， 电话号码 ，提交按键， 提示错误  6个参数，那选择对象有传参
//先验证是否符合正则    没输入一个完成后失去焦点就发送ajax去后台验证
//点击提交 用form表单来提交 需要取消默认行为 注册是去后台存储数据 登入是去后台验证密码与用户名是否正确，登入成功后需要将用户名存到cookie中在首页获取显示

import {pajax} from './pajax.js';//导入pajax的函数
import {setCookie,getCookie,delCookie} from './cookie.js';//导入pajax的函数
class Enroll{//注册的类  登入的类
    constructor(option){//option是一个对象类型，存入要炒作的元素
        this.type=option.type;//type属性用于存储是注册还是登入  reg===注册 log===登入
        this.username=option.username;// 用户名
        this.password=option.password;//密码
        this.repass=option.repass;//再次输入密码
        this.tel=option.tel;//手机号
        this.sub=option.sub;//提交按钮
        this.errormsg=option.errormsg;//错误提示
        this.checkbox=option.checkbox;//盒子选择
        this.error={};//用于防止错误提示的对象
        this.form=option.form;
        this.strength=option.strength;//展示用户名强度
    }
    init(){//初始函数
        this.sub.disabled=true;
        this.sub.className="disable";//提交按钮一开始是不可点击且是灰色的
        if(this.type==='reg'){//表示是注册
            
            this.repass.addEventListener("blur",(e)=>{//注册再次密码验证
                var e=e||window.event;
                this.verify(e);
                this.subHandler();
            });
            this.tel.addEventListener("blur",(e)=>{//注册手机验证
                var e=e||window.event;
                this.verify(e);
                this.subHandler();
            });
            this.checkbox.addEventListener("click",(e)=>{//注册checkbox
                this.subHandler(e);
            });
        }
        if(this.type==="reg"){
            this.password.addEventListener("input",(e)=>{//注册密码验证
                var e=e||window.event;
                /* 判断强弱 */
                this.determine(e);
                this.subHandler();
            });
        }
        
        this.password.addEventListener("blur",(e)=>{//注册密码验证
            var e=e||window.event;
            this.verify(e);
            this.subHandler();
        });
        this.username.addEventListener("blur",(e)=>{//用户名
            var e=e||window.event;
            this.userhandler(e);
            this.subHandler();
        });
        
        this.sub.addEventListener("click",(e)=>{
            this.subclickHandler(e);
        });
    }
    /* 判断强弱 */
    determine(){
        /* 判断强弱 */
            let passvalue=this.password.value.trim();
            
            if(passvalue.length>7 && passvalue.length<17){
                let passNum = /\d+/;
            let passCaps = /[A-Z]+/;
            let passlower = /[a-z]+/;
            let passSymbol = /[\W\_]+/;
        let num = 0;
            if (passNum.test(passvalue)) num++;
            if (passCaps.test(passvalue)) num++;
            if (passlower.test(passvalue)) num++;
            if (passSymbol.test(passvalue)) num++;
        this.strength.innerHTML="";
        switch (num) {
                case 1:
                this.strength.innerHTML="弱";
                this.strength.style.color="red";
                this.errorshow("password","密码太弱哦");
                return;
                case 2:
                case 3:
                this.strength.innerHTML="中";
                this.strength.style.color="orange";
                this.errorshow("password");
                break;
                case 4:
                this.strength.innerHTML="强";
                this.strength.style.color="green";
                this.errorshow("password");
                break;
            }
            }
    }
    /* 提交表单 */
    subclickHandler(e){
        if(e.currentTarget.disabled) return;
        if(this.type==="log"){//登入
            //判断密码是否跟用户名对应
            pajax({
                type:"post",
                url:"http://localhost/Starter-JD/php/login.php",
                data:{
                    username:this.username.value.trim(),
                    password:this.password.value.trim()
                }
            }).then((res)=>{//this指向实例对象
                if(res==="1"){//用户名与密码一致 可以登入，并且把用户名存在cookie 中
                    this.errorshow("user");//调用显示方法
                }
            }).catch(()=>{//用户名与密码不一致 
                this.errorshow("user",res);
            })
        }
    }
    /* 提交表单是否可以点击，每个文件失去焦点都要判断一次 */
    subHandler(){
    /* 判断所以表单是否为空，判断checkbox是否选中,错误对象是否为空  都对的话，改变确定按钮的类 ,并且发送ajax*/
        if(this.type==='reg'){//如果确认密码存在，还要判断确认密码和电话号码 checkbox是否选中
            if(this.repass.value.trim() && this.tel.value.trim() &&  this.checkbox.checked && this.username.value.trim() && this.password.value.trim()  && JSON.stringify(this.error) === "{}"){//注册
                this.sub.className="";
                this.sub.disabled=false;
            }else{
                this.sub.disabled=true;
                this.sub.className="disable";
            }
        }else{//登入
            if(this.username.value.trim() && this.password.value.trim()  && JSON.stringify(this.error) === "{}"){//登入
                this.sub.className="";
                this.sub.disabled=false;
            }else{
                this.sub.disabled=true;
                this.sub.className="disable";
            }
        }
    }
    /* 用户名验证 */
    userhandler(e){
        let userreg=/^[a-zA-Z]{1}\w{5,17}$/;//用户名6到18位  需要字母开头
        if(userreg.test(this.username.value.trim())){//如果符合正则，则发送ajax请求
            //判断是登入还是注册
            
            
            if(this.type==='reg'){//注册
                //判断用户名是否被注册
                pajax({
                    type:"post",
                    url:"http://localhost/Starter-JD/php/register.php",
                    data:{
                        username:this.username.value.trim()
                    }
                }).then((res)=>{//this指向实例对象
                    if(res!=="1"){//已被注册
                        this.errorshow("user",res);
                    }
                }).catch(()=>{//用户名可以用  先删除对象的user属性，清空页面错误信息，判断对象是否是空对象，是空对象就隐藏，不是就重新遍历显示新内容
                    this.errorshow("user");//调用显示方法
                })
            }else{//登入
                //判断用户名是否存在
                pajax({
                    type:"post",
                    url:"http://localhost/Starter-JD/php/login.php",
                    data:{
                        username:this.username.value.trim()
                    }
                }).then((res)=>{//this指向实例对象
                    if(res==="1"){//用户名存在 先删除对象的user属性，清空页面错误信息，判断对象是否是空对象，是空对象就隐藏，不是就重新遍历显示新内容
                        this.errorshow("user");//调用显示方法
                        /* 存储用户名到cookie */
                        setCookie({
                            key:"username",
                            value:this.username.value.trim(),
                            date:60,
                            path:"/"
                        });
                        /* 提交按键可以点击 */
                        this.sub.disabled=false;
                        this.sub.className="";
                        // location.href="./demo.html";
                    }
                }).catch(()=>{//用户名错误  
                    this.errorshow("user",res);
                    this.sub.disabled=true;
                    this.sub.className="disable";
                })
            }
        }else{//正则不符合规则
            this.errorshow("user","用户名不符合规则");//调用显示方法
        }
    }
    verify(e){//验证
        switch(e.currentTarget){
            case this.password: //密码  
            let passreg=/^[a-zA-Z0-9]{8,16}$/;//用户名8到16位

            if(!passreg.test(this.password.value.trim())){//如果不符合正则，则显示错误
                this.errorshow("password","密码不符合规则");//调用显示方法
            }else{
                this.errorshow("password");//调用显示方法
            }
            break;
            case this.repass: //再次输入密码
            if(this.password.value.trim()){//密码不为空
                if( this.repass.value.trim() !== this.password.value.trim()){
                    this.errorshow("repass","密码不相同");//调用显示方法
                }else{
                    this.errorshow("repass");//调用显示方法
                }
            }
            break;
            case this.tel: //电话
            let tellreg=/^1\d{10}$/;//用户名8到16位
            if(!tellreg.test(this.tel.value.trim())){//如果不符合正则，则显示错误
                this.errorshow("tell","电话不符合规则");//调用显示方法
            }else{
                this.errorshow("tell");//调用显示方法
            }
            break;
        }
    }
    /* 验证 true表示要修改  attr是修改的属性  value是要修改的属性值 */
    errorshow(attr,value){//为ture 表示是错误的，要加属性，或者修改属性
        if(value) this.error[attr]=value;
        else delete this.error[attr];
        this.errormsg.textContent="";
        if(JSON.stringify(this.error) === "{}"){//看是否是空对象
                this.errormsg.style.display="none"; 
            }else{
            this.errormsg.style.display="block"; 
            let num = 0;
            for(let prop in this.error){
                num++;
                if(num===1)  this.errormsg.textContent+=this.error[prop];
                else this.errormsg.textContent+=";"+this.error[prop];
           
            }
        } 
    }
}
export {Enroll}