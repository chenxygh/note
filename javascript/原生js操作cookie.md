# 原生js操作cookie
[runoob](http://www.runoob.com/js/js-cookies.html)
---
`DOMObject` <br>
**读取，读全部** <br>
`var str = document.cookie` <br>
**设置，设一条** <br>
document.cookie = 'name=hahh; expires=Thu, 18 Dec 2043 12:00:00 GMT'; <br>
`expire` 以 UTC 或 GMT 时间 <br>
默认浏览器关闭后过期 <br>
<br>
expire 要用 toGMTtime 设置，已经废止 <br>
var d = new Date; <br>
在这之前，设置 d 的天数年份月份等 <br>
如： d.setDate(20); <br>
那么 d 的时间就是，当地时间的20号 <br>
然后再 转换 <br>
d.toGMTtime() <br>
反正，到时候查资料 <br>
document.cookie = "foo=bar;" <br>
自己去 console 试 <br>
 <br>
原生 js 有点恶心的 <br>
读全部，设一条 <br>
 <br>
jQuery 插件    -----> 2014 年停止维护 <br>
而且使用时，必须要有 jQuery <br>
https://github.com/carhartl/jquery-cookie <br>
 <br>
without jQuery <br>
下面这个不需要 jQuery <br>
https://github.com/js-cookie/js-cookie <br>