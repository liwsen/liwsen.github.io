---
layout: post
title: Javascript函数库
desc: Javascript函数库
date: 2016-12-19
author: liwsen
category: Javascript
tags: [Javascript, js, timestamp, htmlspecialchars, htmlspecialchars_decode, browserType]
img: ''
finished: true
---

## JavaScript 获取当前时间戳：

__第一种方法：__

```
	var timestamp = Date.parse(new Date());
	// 结果：1280977330000
```

__第二种方法：__

```
	var timestamp = (new Date()).valueOf();
	// 结果：1280977330748
```

__第三种方法：__

```
	var timestamp=new Date().getTime()；
	// 结果：1280977330748
```

	第一种：获取的时间戳是把毫秒改成000显示，
	第二种和第三种是获取了当前毫秒的时间戳。


## HTML字符串转换为HTML实体

    function htmlspecialchars(str){
        var s = "";
        if (str.length == 0) return "";  
        for   (var i=0; i<str.length; i++){  
            switch (str.substr(i,1)){  
                case "<": s += "&lt;"; break;  
                case ">": s += "&gt;"; break;  
                case "&": s += "&amp;"; break;  
                case " ":  
                    if(str.substr(i + 1, 1) == " "){  
                        s += " &nbsp;";  
                        i++;  
                    } else s += " ";  
                    break;  
                case "\"": s += "&quot;"; break;  
                case "\n": s += "<br>"; break;  
                default: s += str.substr(i,1); break;  
            }  
        }  
        return s;
    };

## HTML实体转换为HTML字符串

	function htmlspecialchars_decode(str){
        str = str.replace(/&amp;/g, '&'); 
        str = str.replace(/&lt;/g, '<');
        str = str.replace(/&gt;/g, '>');
        str = str.replace(/&quot;/g, "''");  
        str = str.replace(/&#039;/g, "'");  
        return str;
    };

## 判断当前浏览类型

	function browserType(){  
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
        var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器  
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器  
        var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器  
        var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器  
        var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器  
        var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器  
    
        if (isIE)   
        {  
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");  
            reIE.test(userAgent);  
            var fIEVersion = parseFloat(RegExp["$1"]);  
            if(fIEVersion == 7)  
            { return "IE7";}  
            else if(fIEVersion == 8)  
            { return "IE8";}  
            else if(fIEVersion == 9)  
            { return "IE9";}  
            else if(fIEVersion == 10)  
            { return "IE10";}  
            else if(fIEVersion == 11)  
            { return "IE11";}  
            else  
            { return "0"}//IE版本过低  
        }//isIE end  
           
        if (isFF) {  return "FF";}  
        if (isOpera) {  return "Opera";}  
        if (isSafari) {  return "Safari";}  
        if (isChrome) { return "Chrome";}  
        if (isEdge) { return "Edge";}  
    }

    