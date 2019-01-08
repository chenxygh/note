# es6-函数形参默认值
es6 里，提供了函数形参默认值的 类似 php 中的做法: <br>
```
function show (a = '1', b = '2', c = '3') {
    console.log(a, b, c);
}
```

原先的做法:
```
function show (a, b, c) {
    a = a || '1';
    b = b || '2';
    c = c || '3';
    console.log(a, b, c);
}

function show (a, b, c) {
    a = arguments[0]? arguments[0]: '1';
    b = arguments[1]? arguments[1]: '2';
    c = arguments[2]? arguments[2]: '3';
    console.log(a, b, c);
}

jQuery 自行了解
```

这里的问题在于，如果传了 空字符串 或者 null 或者 false 等其他会被 判 false 的情况，
就会无法处理
可以使用 typeof undefined === 'undefined' 来处理
总之，就是麻烦