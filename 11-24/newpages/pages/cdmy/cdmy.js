var token, IMEI, filePath
var grant_type ="client_credentials";
var appKey ="KzKQvGDw9bI4oGfIi9IezbN2";
var appSecret ="XGvGXxfQcGrh2MkuWRZuQXoQkgiwOhed";
var url = "https://openapi.baidu.com/oauth/2.0/token"
var cuid = IMEI;
var ctp=1;
var lan = "zh";    
var spd = 5; 
var tok;
const innerAudioContext = wx.createInnerAudioContext()
          innerAudioContext.autoplay = true
var url1;

function sleep(delay) {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
      continue;
  }
}

Page({
  data: {
    students: [],
    currentStudentIndex: 0, // 当前显示的学生索引
    deltaX: 0, // 滑动操作X轴距离
    deltaY: 0, // 滑动操作Y轴距离
    studentsPinyin: [], // 用来存储拼音的数组
    course_id:'',
    flag:0,
  },
  onLoad: function(options) {
    console.log(options.students);
    var studentsDat = JSON.parse(options.students);
    if (options.course_id) {
      this.setData({
        course_id: options.course_id
      });
    }
    this.setData({
      students: studentsDat,
    });
    this.firstvoice();//新增第一个学生声音
  },
  firstvoice:function()//第一个学生姓名语音
  {
    if(this.data.flag==0)
       {
        var a=this.data.students[0].name;
        //console.log(this.data.flag);
        this.bofang(a);
        this.setData({
          flag:1
        })
        //console.log(this.data.flag);
       }
  },
  // 滑动开始事件
  touchStart: function(e) {
    let that=this;
    var startX = e.touches[0].pageX; // 获取触摸时的原点
    var startY = e.touches[0].pageY; // 获取触摸时的原点
    // 拿到起始坐标点
    this.setData({
      startX: startX,
      startY: startY
    })
  },

  // 滑动移动事件
  touchMove: function(e) {
    var startX = this.data.startX;  // 开始X坐标
    var startY = this.data.startY;  // 开始Y坐标
    var touchMoveX = e.touches[0].pageX;  // 滑动变化坐标
    var touchMoveY = e.touches[0].pageY;  // 滑动变化坐标
    // 拿到滑动后的坐标点
    this.setData({
      deltaX: startX - touchMoveX,
      deltaY: startY - touchMoveY
    })
  },

  // 滑动结束事件
  touchEnd: function() {
    var deltaX = this.data.deltaX;
    var deltaY = this.data.deltaY;
    var currentStudentIndex = this.data.currentStudentIndex;
    var currentStudent = this.data.students[currentStudentIndex];
    var courseId = this.data.course_id;

    if (Math.abs(deltaX) > 100 || Math.abs(deltaY) > 100) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // 左滑 or 右滑
        if (deltaX < 0) {
          currentStudent.status = "出席";
        } else {
          currentStudent.status = "旷课";
        }
      } else {
        // 上滑
        currentStudent.status = "请假";
      }

      
      this.setData({
        [`students[${currentStudentIndex}]`]: currentStudent,
      });

      if (currentStudentIndex < this.data.students.length - 1) {
        setTimeout(() => {
          this.setData({
            currentStudentIndex: currentStudentIndex + 1,
          });
        }, 1000);
        sleep(1000);
        var a=this.data.students[this.data.currentStudentIndex+1].name;
        this.bofang(a);
      } else {
        var studentsData = JSON.stringify(this.data.students);
        wx.navigateTo({
          url: `../dmy2/dmy2?students=${studentsData}&course_id=${courseId}`,
        });
      }
    }
  },
  
  bofang:function(a){
    var text = a;
    var tex = encodeURI(text);
    wx.request({
      url: url,
      data: {
        grant_type: grant_type,
        client_id: appKey,
        client_secret: appSecret
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        token = res.data.access_token
        tok = token;
        url1 = "https://tsn.baidu.com/text2audio?tex=" + tex  + "&lan=" + lan + "&cuid=" + cuid + "&ctp=" + ctp + "&tok=" + tok + "&spd=" +spd
        wx.downloadFile({
          url: url1,
          success: function (res) {
            console.log(res)
            filePath=res.tempFilePath;
            if (res.statusCode === 200) {
              wx.playVoice({
                filePath: res.tempFilePath
              })
            }
            innerAudioContext.src = filePath
            innerAudioContext.onPlay(() => {
            console.log('开始播放')
            })
          }
        })
      }
    })
    },
});