# video播放的一些小问题
h5 的 video 标签，支持某些类型的视频， 每个浏览器的支持格式不同 <br>
当视频格式不支持的时候，就无法播放 <br>

---

有一种方案是，直接放上视频的 url <br>
然后用户点击的时候，可能会调取默认的视频播放设备进行播放 <br>

目前，chrome pc 端，直接请求视频 url <br>
如果是 video 标签在当前浏览器可以播放的类型，会自动生成一个 video 标签，用于播放 <br>
不可以播放的话，是会提示是否下载 <br>

在 魅族 不知道型号 的内置浏览器，是直接调用默认视频播放器进行播放 <br>
在不可以播放的情况下，也是会提示是否下载

不同机型和浏览器表现可能有所不同 <br>

## 资料:
[cnblogs](https://www.cnblogs.com/Kevin-Zhao/articles/5065865.html)
