/**
 * Created by 萤火虫 on 2016/12/24.
 */
window.onload = function(){
  var timerObj = document.getElementById("timer");//pause
  var pauseObj = document.getElementById("pause");//play
  var playObj = document.getElementById("play");
    function Timer(options){
        this.target = options.target;
        this.direction = options.direction;
        this.container = options.container;
        this.callBack = options.callBack;
        this.init();
    };
  Timer.prototype = {
    "init":function(goOn){
      var isThis = this;
      isThis.sumTime = isThis.caculate(isThis.target);
      clearInterval(isThis.cacuTime);
      var panelTime =null;
      if(isThis.direction){
        if(goOn){
          panelTime = goOn;
        }else{
          panelTime = 0;
        }
        isThis.cacuTime = setInterval(function(){
          panelTime++;
          isThis.sumTime = panelTime;
          if(panelTime==isThis.caculate(isThis.target)){
            isThis.pause();
            isThis.callBack&&isThis.callBack();
          }
          isThis.container.html(isThis.formate(panelTime));
        },1000);
      }else{
        if(goOn){
          panelTime = isThis.sumTime;
        }else{
          panelTime = 0;
        }
        isThis.cacuTime = setInterval(function(){
          panelTime--;
          isThis.sumTime = panelTime;
          if(panelTime==0){
            isThis.pause();
            isThis.callBack&&isThis.callBack();
          }

          isThis.container.html(isThis.formate(panelTime));
        },1000);
      }

    },
    formate:function(s){
      var t;
      if(s > -1){
        var hour = Math.floor(s/3600);
        var min = Math.floor(s/60) % 60;
        var sec = s % 60;
        var day = parseInt(hour / 24);
        if (day > 0) {
          hour = hour - 24 * day;
          t = day + "day " + hour + ":";
        }
        else t = hour + ":";
        if(min < 10){t += "0";}
        t += min + ":";
        if(sec < 10){t += "0";}
        t += sec;
      }
      return t;
    },
    checkForm:function(str){
      var regSecond = /^\d{2}$/g;
      var regMinute = /^\d{2}\:\d{2}$/g;
      var regHour = /^\d{2}\:\d{2}:\d{2}$/g;
      return regSecond.test(str)||regMinute.test(str)||regHour.test(str);
    },
    "pause":function(){
      clearInterval(this.cacuTime);
    },
    "goOn":function(){
        console.log(this.sumTime);
        this.init(this.sumTime);
    },
    "caculate":function(target){
      var isRight = this.checkForm(target);
      if(isRight){
        var sumTime = target.split(":");
        var sunTimeLen = sumTime.length;
        var caculateSumTime = "";
        switch (sunTimeLen){
          case 1:
            caculateSumTime = parseInt(sumTime[0]);
            break;
          case 2:
            caculateSumTime = parseInt(sumTime[0])*60+parseInt(sumTime[1]);
            break;
          case 3:
            caculateSumTime = parseInt(sumTime[0])*3600+parseInt(sumTime[1])*60+parseInt(sumTime[2]);
            break;
          default:
            alert("请输入正确的时间格式00:00:00");
            break;
        }
        return caculateSumTime;
      }else{
        alert("请输入正确的时间格式00:00:00");
      }
    }
  };
  var t = new Timer({"target":"00:00:11","direction":true,"container":$("#timer"),"callBack":function(){
    console.log("回调");
  }});
  pauseObj.onclick = function(){
    t.pause();
  };
  playObj.onclick = function(){
    t.goOn();
  };
  var str = "www.yi-ding-net.cn";
  var newStr = str.replace(/www/,"m");
  console.log(newStr)
};