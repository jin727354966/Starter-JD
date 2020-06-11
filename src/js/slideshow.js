/* 轮播类 */
class Slideshow{
    constructor(option){
        this.parent=option.parent;//移动的容器
        this.list=option.items;//每张图片或者li
        this.dots=option.dots;//每一个小圆点
        this.type=option.type;//效果标识符
    }
}