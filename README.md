## 使用JavaScript检测客户端
### 能力检测
能力检测又称特性检测。能力检测的目的不是识别具体的浏览器，而是识别浏览器的能力。

能力检测的基本模式如下：

```
if(object.property) {
	//存在该属性或方法，使用object.property
}
```

使用能力检测要注意一下两点：

>* 先检测达成目的的最常用的特性
>* 必须测试实际要用到的特性

在可能的情况下，尽量使用typeof进行能力检测。但各个浏览器队typeof的返回值又不尽相同，可以采用下面的代码进行检测。

```
function isHostMethod(object, property) {
	var tp = typeof object[property];
	return tp === 'function' ||
		(!!(tp === 'object' && object[property])) ||
		t === 'unknown';
}
```

如果知道应用程序需要使用某些特定的浏览器特性，那么最好是一次性检测所有相关的特性，而不要分别检测。

```
//确定浏览器是否支持Netscape风格的插件
var hasNSPlugins = !!(navigator.plugins && navigator.plugins.length);

//确认浏览器是否具有DOM1级规定的能力
var hasDOM1 = !!(document.getElementById && document.createElement && document.getElementByTagName);
```

### 用户代理检测
用户代理检测通过检测用户代理字符串确定实际使用的浏览器。该字符串在javascript中可以通过navigator.userAgent属性访问。

#### 用户代理字符串检测技术
使用用户代理字符串来检测特定浏览器，一般情况下知道呈现引擎和最低限度的版本就可以决定正确的操作方法。

**识别呈现引擎**

知道确切的浏览器名字和版本号不如确切知道它使用的什么呈现引擎。如果Firefox，Camino和Netscape都使用相同版本的Gecko，那它们肯定支持相同的特性。因此，可以编写脚本检测5大呈现引擎：IE，Gecko，WebKit，KHTML和Opera。

```
var clientCheck = function() {
	var engine = {
		ie: 0,
		gecko: 0,
		webkit: 0,
		khtml: 0,
		opera: 0

		//具体版本号
		version: null
	}

	return {
		engine: engine
	}
}();
```

**识别浏览器**

大多数情况下，识别了浏览器的呈现引擎就可以为我们采取正确的操作提供依据了。但只有呈现引擎还不能说明存在所需的JavaScript功能。

因此，还需要在上面代码的基础中加入一下部分代码：

```
var browser = {
	ie: 0,
	firefox: 0,
	safari: 0,
	konq: 0,
	opera: 0,
	chrome: 0,

	version: null
}

return {
	engine: engine,
	browser: browser
}
```

**识别平台**

很多时候，只要知道呈现引擎就足以编写适当的代码了。但在某些条件下，平台可能是必须关注的问题，那些具有各种平台版本的浏览器在不同平台下可能会有不同的问题。

```
var system = {
	win: false,
	mac: false,
	unix: false
}

return {
	engine: engine,
	browser: browser,
	system: system
}
```

**识别Window平台**

在Windows平台下，还可以通过用户代理字符串中进一步取得具体的操作系统信息。

使用下面的正则表达式匹配各个Windows版本：

```
/Win(?:dows)?([^do]{2})\s?(\d+\.\d+)?/
```

**识别移动设备**

添加所有移动设备属性。

```
var system = {
	//移动设备
	iphone: false,
	ipod: false,
	ipad: false,
	ios: false,
	android: false,
	nokiaN: false,
	winMobile: false
}
```

检测IOS版本：

```
va ua = navigator.userAgent;
if(system.mac && ua.indexOf('Mobile') > -1) {
	if(/CPU (?:iPhone)?OS (\d+_\d+)/.test(ua)) {
		system.ios = parseFloat(RegExp.$1.replace('_', '.'));
	} else {
		system.ios = 2; // 默认
	}
}
```

**识别游戏系统**

```
var system = {
	wii: false,
	ps: false
}

system.wii = ua.indexOf('Wii') > -1;
system.ps = /playstation/i.test(ua);
```

上面简单介绍了检测呈现引擎、浏览器、平台及移动设备等的基本思路，完整的检测呈现引擎、浏览器、平台、Window操作系统、
移动设备和游戏系统的代码请猛戳[这里](https://github.com/baizn/client-detecting/blob/master/clientDetecting.js)。
