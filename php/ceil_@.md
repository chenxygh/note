Cannot start session when headers already sent
这个警告似乎是表示，在 session_start() 之前，已经有内容输出了
解决方案是，@session_start() 用于忽略警告
记得好像可以在 php.ini 还是 apache 的配置文件里，可以修改是否汇报警告或者错误
其他方法暂时不了解，先直接 @ 掉
https://stackoverflow.com/questions/49024013/php-warning-session-start-cannot-start-session-when-headers-already-sent





ceil 函数的返回值是 float 类型，在做严格比较的时候要小心！