importJS("TaskController-0.0.1");
importJS('RBM-0.0.3');

function isSameColor(c1, c2, diff) {
  if (diff === undefined) {
    diff = 20;
  }
  if (Math.abs(c1.r - c2.r) > diff) {
    return false;
  }
  if (Math.abs(c1.g - c2.g) > diff) {
    return false;
  }
  if (Math.abs(c1.b - c2.b) > diff) {
    return false;
  }
  return true;
}

var appPackageName = 'com.h157945806.qsa';

var rbm;

var Click = function(x, y) {
  rbm.click({x: x, y: y});
};
var TapDown = function(x, y) {
  rbm.tapDown({x: x, y: y});
};
var MoveTo = function(x, y) {
  rbm.moveTo({x: x, y: y});
};
var TapUp = function(x, y) {
  rbm.tapUp({x: x, y: y});
};
var Swipe = function(x1, y1, x2, y2) {
  rbm.swipe({x: x1, y: y1}, {x: x2, y: y2}, 4);
};
var Home = function() {
  keycode('HOME', 100);
}
var Back = function() {
  keycode('BACK', 100);
}
var Screenshot = function() {
  var img = getScreenshot();
  saveImage(img, getStoragePath() + "/screenshot/" + Date.now() + ".png");
  safeSleep(100);
  releaseImage(img);
}
var PrintColor = function(x, y) {
  var wh = getScreenSize();
  if (x < 0 || x >= wh.width || y < 0 || y > wh.height) {
    rbm.log("X < 0 or X >= width or Y < 0 or Y >= height");
  }
  var img = getScreenshot();
  var c = getImageColor(img, x, y);
  releaseImage(img);
  rbm.log("Color R: " + c.r + " G: " + c.g + " B: " + c.b);
}

function safeSleep(t) {
  if (t === undefined) {
    t = 200;
  }
  
  var start = Date.now();
  if (rbm !== undefined) {
      while(rbm.running) {
        sleep(200);
        if (Date.now() - start >= t) {
          break;
        }
     }
  }
}

function start(account, password) {
  stop();
  var screenSize = getScreenSize();
    
  var config = {

    oriScreenWidth: screenSize.width,
    oriScreenHeight: screenSize.height,
    oriVirtualButtonHeight: 0,
    oriResizeFactor: 0.8,
    eventDelay: 200,
    imageThreshold: 0.9,
    imageQuality: 90,
    resizeFactor: 0.8,
  };

  rbm = new RBM(config);
  rbm.running = true;
  rbm.init();
  rbm.log('[LeCun] Start');

  rbm.startApp(appPackageName, 'com.uzmap.pkg.EntranceActivity');

  safeSleep(5000);
  
  StartLogin(account, password);
}

function StartLogin(account, password) {
  rbm.log('[LeCun] StartLogin('+account+'::'+password+')');

  //登入帳號
  tap(284, 810, 10);
  safeSleep(1000);
  rbm.typing(account)

  safeSleep(500);

  //登入密碼
  tap(306, 998, 10);
  rbm.typing(password, 100);

  //返回鍵
  Back();

  safeSleep(1000);

  //按下登入鈕
  tap(525, 1232, 100);

  safeSleep(1000);

  tap(298, 955, 100);

  safeSleep(1000);

  tap(74, 1945, 100);
}

function stop() {
  if (rbm !== undefined) {
    rbm.stopApp(appPackageName);
    rbm.running = false;
    rbm.log('[LeCun] Stop');
  }
}
