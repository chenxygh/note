# es6_解构赋值_剩余参数_展开语法_箭头函数
[解构赋值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) <br>
## 解构赋值
可以将值从数组或属性从对象提取到不同的变量中 <br>
用法: <br>

```
解构赋值 对于对象，必须变量名和属性名一致，或者是 剩余语法 解决
(({id, ...args} = {id: 1, name: 'cxy', fuck: 'all'}) => {console.log(args);})()
VM127:1 {name: "cxy", fuck: "all"}

解构赋值，对于数组，就常理来
[a, b = 4] = [1]
[1]
console.log(a) --> 1
console.log(b) --> 4
```

[剩余参数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters) <br>
[展开语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax) <br>
[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions) <br>
## 箭头函数
1. 不绑定 this， 它只会从自己的作用域链的上一层继承 this <br>
2. 通过 call 或 apply 调用 <br>
由于 箭头函数没有自己的this指针，通过 call() 或 apply() 方法调用一个函数时，只能传递参数（不能绑定this---译者注），他们的第一个参数会被忽略。（这种现象对于bind方法同样成立---译者注）
3. 不绑定arguments <br>
一般使用 剩余参数(真数组) 会更方便 <br>
4. 箭头函数不能用作构造器，和 new一起用会抛出错误 <br>
5. 箭头函数没有prototype属性 <br>
6. 返回对象字面量 <br>
var func = () => ({foo: 1});

