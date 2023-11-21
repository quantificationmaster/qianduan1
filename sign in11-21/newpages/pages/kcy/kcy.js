// newpages/pages/kcy/kcy.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classname:'软件工程A',
        building:'',
        classroom:'',
        classdate:'周六',
        classtime:'一二节',
        course_id:''
    },
    jumptodmy:function(){
        console.log('dianl')
        wx.navigateTo({
          url: '/newpages/pages/dmy/dmy',
        })
    },
    jumptodmy1:function(){
        console.log('dianl')
        wx.navigateTo({
          url: '/newpages/pages/ccdm/ccdm',
        })
    },
    jumptojl:function(){
        console.log('dianl')
        wx.navigateTo({
          url: '/newpages/pages/jly/jly',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      this.setData({classname:options.classname}),
      this.setData({building:options.building}),
      this.setData({classroom:options.classroom}),
      this.setData({classdate:options.classdate}),
      this.setData({classtime:options.classtime}),
      this.setData({course_id:options.cid})
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },


    

    
})