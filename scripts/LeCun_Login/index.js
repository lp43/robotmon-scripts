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
  rbm.click({
    x: x,
    y: y
  });
};
var TapDown = function(x, y) {
  rbm.tapDown({
    x: x,
    y: y
  });
};
var MoveTo = function(x, y) {
  rbm.moveTo({
    x: x,
    y: y
  });
};
var TapUp = function(x, y) {
  rbm.tapUp({
    x: x,
    y: y
  });
};
var Swipe = function(x1, y1, x2, y2) {
  rbm.swipe({
    x: x1,
    y: y1
  }, {
    x: x2,
    y: y2
  }, 4);
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

function findImagePosition(x1, y1, x2, y2, imageThreshold, imageName){

  var result;
  if (rbm !== undefined) {
    rbm.log('findImagePosition('+imageName+')');

    //抓圖辨識數字及x位置
    rbm.keepScreenshotPartial(x1, y1, x2, y2);


    var results = rbm.findImages(imageName, imageThreshold, 1, false, false);

    var arrynum = 1

		for (var index in results){
			result = results[index];
		// 	rbm.log('result.x'+result.x+', result.y: '+result.y);
			arrynum = arrynum + 1
		}
    rbm.releaseScreenshot();
  }
    return result;
}

function tapImage(x1,y1,x2,y2, imageName, imageThreshold){
  if (rbm !== undefined) {
    rbm.log('tapImage('+imageName+')');

  	rbm.keepScreenshotPartial(x1, y1, x2, y2);
	  rbm.imageClick(imageName, imageThreshold);
	  rbm.releaseScreenshot();
  }
}

function safeSleep(t) {
  if (t === undefined) {
    t = 200;
  }

  var start = Date.now();
  if (rbm !== undefined) {
    while (rbm.running) {
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
  rbm.log('[LeCun] StartLogin(' + account + '::' + password + ')');

  // 登入帳號
  tapImage(176, 742, 637, 861, 'field_account.png', 0.7);
  safeSleep(1000);
  rbm.typing(account)

  safeSleep(500);

  //返回鍵
  Back();

  safeSleep(500);

  //登入密碼
  tapImage(180, 937, 867, 1081, 'field_pass.png', 0.7);
  safeSleep(1000);
  rbm.typing(password);

  //返回鍵
  Back();

  safeSleep(1000);

  //按下登入鈕
  tapImage(61, 1063, 993, 1373, 'btn_login.png', 0.7);

  safeSleep(1000);

  //按下請輸入圖形驗證碼
  tapImage(75, 746, 975, 1063, 'field_verify.png', 0.7);

  safeSleep(1000);

  //按下鍵盤上數字切換
  tapImage(0, 1800, 200, 2075, 'field_keyboard_num.png', 0.7);
}

function stop() {
  if (rbm !== undefined) {
    rbm.stopApp(appPackageName);
    rbm.running = false;
    rbm.log('[LeCun] Stop');
  }
}

// start('account', 'pass');
