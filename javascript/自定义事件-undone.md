# 自定义事件
---
> 老式方法(ie 你懂的)

>> 一般三个步骤 <br>
var event = document.createEvent('Event'); <br>
event.initEvent('myEvent', true, true); <br>
element.dispatch(event); <br>

## createEvent (已过时)
var event = document.createEvent(type); <br>
[createEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createEvent)

## initEvent (已过时)
event.initEvent(type, bubbles, cancelable); <br>
用这种方式初始化事件必须是由 document.createEvent() 创建的实例 <br>
且要在 触发前 即 dispatchEvent() 之前 <br>
[initEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/initEvent)

## dispatchEvent()
element.dispatch(event); <br>
触发自定义事件 <br>
[dispatchEvent](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent)

> 新式建议(兼容问题)

>> var event = new Event('myEvent', {'bubbles': true, 'cancelable': true}); <br>
>> element.dispatch(event); <br>

## Event 构造函数
event = new Event(typeArg, eventInit); <br>
[Event](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event)

## CustomEvent (更好地自定义事件，了解)
[CustomEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/CustomEvent)

---

> `link`: 

[Creating_and_triggering_events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) <br>
[zhangxinxu(未懂)](https://www.zhangxinxu.com/wordpress/2012/04/js-dom%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BA%8B%E4%BB%B6/)