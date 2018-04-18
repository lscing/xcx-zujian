# xcx-zujian
弹出框的组件  

里面包含着弹框出现之后的input对焦，以及主要解决了小程序的弹框出现之后的页面底层滚动的BUG  

这个底层滚动的BUG分为2种，第一种是只要你滑动遮罩层都会滑动，第二种是，只在弹框的区域内才可以滑动  

<img src="https://github.com/lscing/xcx-zujian/blob/master/img/img1.png" width = "375" height = "667" alt="图片名称" align=center />  
# 以下是各种技术的详解  
一.components 里面是组件，pages\model里面是组件的调用，看代码既可懂！  

二.焦点通过<input maxlength='{{maxlength}}'focus="{{dialog_focus}}" 来控制  

因为弹框隐藏的，所以默认dialog_focus:false  

当弹框开启，或者隐藏时候取反   

//隐藏弹框
    hideDialog() {
      this.setData({
        isShow: !this.data.isShow,
        dialog_focus: !this.data.dialog_focus
      })
    },
    //展示弹框
    showDialog() {
      this.setData({
        isShow: !this.data.isShow,
        dialog_focus: !this.data.dialog_focus
      })
    },    
三.弹框底层滑动问题解决方案  
model中的css  
page{
  overflow-y:hidden;
}
然后通过给wxml里面最外层使用  
<scroll-view scroll-y="{{isScroll}}"> 
data: {
    isScroll: true
  },
  showDialog() {
    this.dialog.showDialog();
    this.setData({
      isScroll: false
    });
  },

  //取消事件
  _cancelEvent() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
    this.setData({
      isScroll: true
    });
  },
  //确认事件
  _confirmEvent() {
    console.log('你点击了确定');
    this.dialog.hideDialog();
    this.setData({
      isScroll: true
    });
  },
