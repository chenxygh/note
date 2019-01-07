# FileReader
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onabort) <br>

## 常用方法: 
1. readAsText()  文本字符串 <br>
2. readAsBinaryString()  二进制字符串，一般用于与服务端的文件传输 <br>
3. readAsDataURL()  base64 格式的字符串，data 开头, 可以优化网页加载速度,将图片等文件转化为 DataURL 的编码，比如 img ，放入 src 中，不再向服务器请求图片，而是直接加载 <br>
4. abort()  中断文件读取

**注意:** FileReader 对象也有readyState 属性，是只读的
但是不同于 XMLHttpRequest 对象，有 onreadystatechange 事件
FileReader 没有 onreadystatechange 这个事件

| readyState | FileReader | XMLHttpRequest |
| :-: | :-: | :-: |
|   \-\-    | EMPTY \-\- 0   | UNSENT \-\- 0 |
|   \-\-    | LOADING \-\- 1 | OPENED \-\- 1 |
|   \-\-    | DONE \-\- 2    | HEADER-RECEIVED \-\- 2 |
|   \-\-    |     \-\-       | LOADING \-\- 3 |
|   \-\-    |     \-\-       | DONE \-\- 4 |

## 常用事件: 

|onabort | 文件中断时触发|
| :-: | :-: |
| onerror | 文件读取错误时触发 |
| onload  | 文件成功读取时触发 |
| onloadstart | 文件读取开始时触发 |
| onprogress | 文件读取过程中一直触发 |
| onloadend | 文件读取结束(成功或者失败)时触发 |

## demo
[即时显示的非 ajax 实现](20190107/01_FileReader.html) <br>
`baixiu:` <br>
[即时显示的 ajax 实现](20190107/profile.php) <br>