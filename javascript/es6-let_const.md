# es6-let_const

---

`let`: <br>
let 用于声明变量，以块级作用域的方式 <br>
有下面几个特点: <br>

1. 块级作用域 <br>
2. 没有 hoisting <br>
3. 使用前必须要先声明 --> 暂存死区 <br>
4. 在 script 标签下，let 声明的变量，不会作为 window 对象的一个属性 <br>
5. let 不可在同一个块级作用域下声明同名变量 (for 的 () 和 {} 有点特殊，不要管了)
6. for (let i = 0) {} 尽管不是在 {} 内，但是 当前 for 下的 {} 中可以获取到 () 中的 i 的值 <br>
当 for () {let i = 1;} <br>
不会报错，可以运行，而且 {} 内的 i 的值变成了新声明的 i，原来 () 中的 i，不可访问 <br>
但是循环还是可以走，说明 () 和 {} 的 i 不是一个 i <br>
只不过 {} 中可以获取 () 中的值罢了 <br>
但是建议不要这样用，console 结果有点奇怪的，虽然不是什么大问题 <br>

```
for (let i = 0; i < 2; i++) {
    let i = 1;console.log(i);
}
1 ---> 输出了两遍
undefined ---> 不知道什么鬼，所以尽量不要在 {} 中再重新声明 () 的内容
```

---

`const`:
const 和 let 一样 <br>
多一条：<br>
const 常量，后期不可修改，只读，所以要在声明的时候就初始化 <br>

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)
[cnblogs](https://www.cnblogs.com/LLLLily/p/7389652.html)
