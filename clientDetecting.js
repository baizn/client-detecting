var clientDetecting = function() {
    //呈现引擎
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,

        version: null
    };

    //主流浏览器
    var browser = {
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,

        varsion: null
    };

    //平台、设备和操作系统
    var system = {
        win: false,
        mac: false,
        unix: false,

        //移动设备
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,

        //游戏系统
        wii: false,
        ps: false
    };

    //检测呈现引擎和浏览器
    var ua = navigator.userAgent;
    if(window.opera) {
        engine.version = browser.version = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.version);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {
        engine.version = RegExp['$1'];
        engine.webkit = parseFloat(engine.version);

        //chrome or safari
        if(/Chrome\/(S+)/.test(ua)) {
            browser.version = RegExp['$1'];
            browser.chrome = parseFloat(browser.version);
        } else if (/Version\/(S+)/.test(ua)) {
            browser.version = RegExp['$1'];
            browser.safari = parseFloat(browser.version);
        } else {
            var safariVersion = 1;
            if(engine.webkit < 100) {
                safariVersion = 1;
            } else if(engine.webkit < 312) {
                safariVersion = 1.2;
            } else if(engine.webkit < 412) {
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }

            browser.safari = browser.version = safariVersion;
        }
    } else if (/KHTM\/(S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
         engine.version = browser.version = RegExp['$1'];
         engine.khtml = browser.konq = parseFloat(engine.version);
    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
        engine.version = RegExp['$1'];
        engine.gecko = parseFloat(engine.version);

        //firefox ?
        if(/Firefox\/(S+)/.test(ua)) {
            browser.version = RegExp['$1'];
            browser.firefox = parseFloat(browser.version);
        }
    } else if (/MSIE ([^;]+)/.test(ua)) {
        engine.version = browser.version = RegExp['$1'];
        engine.ie = browser.ie = parseFloat(engine.version);
    }

    //c检测浏览器
    browser.ie = engine.ie;
    browser.opera = engine.opera;

    //检测平台
    var platForm = navigator.platform;
    system.win = platForm.indexOf('Win') === 0;
    system.mac = platForm.indexOf('Mac') === 0;
    system.unix = (platForm === 'X11') || (platForm.indexOf('Linux') === 0);

    //检测window系统
    if(system.win) {
        var winReg = /Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/;
        if(winReg.test(ua)) {
            var winType = RegExp['$1'];
            if(winType === 'NT') {
                switch(RegExp['$2']) {
                    case '5.0':
                        system.win = '2000';
                        break;
                    case '5.1':
                        system.win = 'XP';
                        break;
                    case '6.0':
                        system.win = 'Vista';
                        break;
                    case '6.1':
                        system.win = '7';
                        break;
                    default:
                        system.win = 'NT';
                        break;
                }
            } else if (winType === '9x') {
                system.win = 'ME';
            } else {
                system.win = winType;
            }
        }
    }

    //移动设备
    system.iphone = ua.indexOf('iPhone') > -1;
    system.ipod = ua.indexOf('iPod') > -1;
    system.ipad = ua.indexOf('iPad') > -1;
    system.nokiaN = ua.indexOf('NokiaN') > -1;

    //windows Mobile
    if(system.win === 'CE') {
        system.winMobile = system.win;
    } else if (system.win === 'Ph') {
        if(/Windows Phone OS (\d+\.\d+)/.test(ua)) {
            system.win = 'Phone';
            system.winMobile = parseFloat(RegExp['$1']);
        }
    }

    //检测IOS版本
    if(system.mac && ua.indexOf('Mobile') > -1) {
        if(/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
            system.ios = parseFloat(RegExp.$1.replace('_', '.'));
        } else {
            system.ios = 2;
        }
    }

    //检测Android
    if(/Android (\d+\.\d+)/.test(ua)) {
        system.android = parseFloat(RegExp.$1);
    }

    //游戏系统
    system.will = ua.indexOf('Wii') > -1;
    system.ps = /playstation/i.test(ua);

    return {
        engine: engine,
        browser: browser,
        system: system
    }
}();
