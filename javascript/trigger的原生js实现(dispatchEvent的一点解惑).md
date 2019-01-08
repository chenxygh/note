# trigger的原生js实现(dispatchEvent的一点解惑)
---
主要思想就是利用 原生 js 提供的 [自定义事件](自定义事件-undone.md) 来实现

```
var trigger = function (type, element, detail) {
    element.dispatchEvent(new CustomEvent(type, {detail: detail, bubbles: true, cancelable: true}));
};
```

`注意`: <br>
dispatchEvent() 不会覆盖原来的内置事件，它触发的事件对象是 CustomEvent <br>
[demo](20190108/trigger的原生js实现.html)