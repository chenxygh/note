# cookie_sessionStorage_localStorage
> cookie
是为了解决 http 无状态的一种方案 <br>
每一次的 http 请求中，都会附上 所有的 cookie 内容到 请求头中 <br>

> sessionStorage  localStorage <br>
是 h5 为了方便客户端的内容存储而提出的新的存储机制 <br>

`comparation`:

<table>
    <thead>
        <tr>
            <th>cookie</th>
            <th>sessionStorage</th>
            <th>localStorage</th>
        </tr>
    </thead>
    <tbody style="text-align: center;">
        <tr>
            <td>不可通过文件协议打开然后 debug，因为是基于 http 协议提出的</td>
            <td colspan="2">客户端的东西，可以通过文件协议打开, 不参与和服务端的通信</td>
        </tr>
        <tr>
            <td>4k 左右 </td>
            <td>5m 左右</td>
            <td>20m 左右</td>
        </tr>
        <tr>
            <td>可以设置 expires <br> 如果是客户端设置的 cookie，默认是浏览器关闭后销毁</td>
            <td>存在当前页面中，页面关闭就销毁</td>
            <td>存在本地硬盘中，不会随着浏览器或者页面关闭而销毁，必须手动销毁</td>
        </tr>
        <tr>
            <td colspan="3">都不可跨浏览器</td>
        </tr>
    </tbody>
</table>

`demo`: <br>
[cookie](20190109/cookie.html) <br>
[sessionStorage](20190109/sessionStorage.html) <br>
[localStorage](20190109/localStorage.html) <br>