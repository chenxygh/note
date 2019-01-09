# cookie的一些想法
## 1. 打开文件的方式
cookie 是解决 http 无状态的一种机制 <br>
所以使用 文件协议 的方式去操作 cookie 是没有意义的，也是没有用的 <br>
涉及 cookie 的，要使用 http 或者 https 去运行文件 <br>
## 2. 生存周期
cookie 默认的生存周期是在 浏览器关闭后销毁
可以通过设置 expires 来设置过期时间(php 时间戳是 s，js 是 ms)
实际上 cookie 的删除也是通过设置 expires 为过去的一个时间节点来实现的
> demo:
[原生 js 的 cookie 操作](20190109/cookie.html)
[runoob](http://www.runoob.com/js/js-cookies.html)
