---
title: video 在移动端的踩坑之旅
date: 2019-05-29 12:22:01
categories: Study
tags: [前端, html5]
---





17 号接了个需求，要在移动端网页实现小视频的播放，具体可以参考淘宝等主流购物平台的表现。

# video 在移动端的踩坑之旅

> 这篇文章鸽了好久。。。现在补上



17 号接了个需求，要在移动端网页实现小视频的播放，具体可以参考淘宝等主流购物平台的表现。

23 号解决完成。

...

...

...

```html
<video controls width="100%" height="100%" webkit-playsinline="true" playsinline="true" x5-playsinline="" x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="false" x5-video-orientation="portraint" controlslist="nofullscreen nodownload" style="display: none;background-color: #000;">
	<source src="@Detail.VideoUrl" type="video/mp4" />
	您的浏览器不支持视频播放
</video>
```

有点暴躁，要写仔细似乎要很长很久。

直接解释吧，

video 里面的部分属性是解决 IOS 播放自动全屏的

部分是解决微信浏览器 video 层级过高的 ( = h5 那个)

还有一些解决 Android 层级的

以及其他的一系列问题的

嗯，就是这样，不会百度。



然后，这样一般 IOS 就正常了，

Android还有很多问题，特别是微信浏览器 (我称之为 手机版 IE)



+ Android 及 微信遮罩层 canvas 等处理

```html
<div class="swiper-slide video-pic">
	<video controls width="100%" height="100%" webkit-playsinline="true" playsinline="true" x5-playsinline="" x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="false" x5-video-orientation="portraint" controlslist="nofullscreen nodownload" style="display: none;background-color: #000;">
	<source src="@Detail.VideoUrl" type="video/mp4" />
		您的浏览器不支持视频播放
	</video>
	<div class="video-mask" style="position:absolute;left:0;top:0;width: 100%;height:100%;background:rgba(0,0,0,1); display:none;">
		<canvas id="myCanvas" style="position: absolute;left: 0;top: 50%;transform: translateY(-50%);">
			您的浏览器不支持 h5 的 canvas 标签
		</canvas>
		<i class="icon-play2" style="position:absolute;left:50%;top:50%;margin-left: -0.60rem;margin-top: -0.60rem;font-size: 1.20rem;color: rgba(0, 0, 0, .3)"></i>
	</div>
</div>
```

说下问题和思路，

安卓这里，下拉一段距离暂停，然后 video 会回到顶部，有回滚的效果，$(window).scroll(currentTop) 解决

安卓，层级的话，直接暂停后隐藏掉 video，用 canvas 和 字体图标 做了一个假视频暂停封面，canvas 截取暂停瞬间那一帧

安卓的微信浏览器，canvas 无法截取，不用 canvas ，其原生表现就可以，反正 =h5 没有层级影响



不写了，不懂看代码。就是这样，暴躁老哥，再见。



```
// 设置 视频播放 poster 为第一张图片
// videoHandle;
(function (video) {
	if (!video) return;
	var img = document.querySelectorAll('.J-slide img')[0];
	var videoBoxWidth = window.screen.availWidth;
	var videoBoxHeight = videoBoxWidth;
	video.poster = img.src;

	// 向下滑动距离超过视频高度 1 /3 的时候，暂停
	var scrollTop = 0;
	window.addEventListener('scroll', function () {
		scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		var temp = videoBoxHeight / 3;
		if (!video.paused && scrollTop > temp) {
			video.pause();
		}
	}, false);

	video.addEventListener('loadeddata', function () {
		window.videoRatio = video.videoWidth / video.videoHeight;
		$(video).show();
	}, false);

	// 终端识别, 安卓的 回滚 遮罩 层级 等各种处理
	if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1) {// 安卓
		var canvas = $('#myCanvas')[0];
		var context = canvas.getContext('2d');

		// 绘制 poster
		var imgRatio = img.width / img.height;
		canvas.style.width = videoBoxWidth + 'px';
		canvas.style.height = videoBoxWidth / imgRatio + 'px';
		console.log(img);
		context.clearRect(0, 0, canvas.width, canvas.width);// 绘制前，先清除
		context.drawImage(img, 0, 0, canvas.width, canvas.height);

		var videoMask = document.querySelector('.video-mask');
		$(videoMask).show();
		$(video).hide();
		video.removeAttribute('controls');
		videoMask.addEventListener('click', function (event) {// 视频播放
			$(video).show();
			$(video).attr('controls', 'controls');
			video.play();
			$(videoMask).hide();
			$(video).addClass('swiper-no-swiping');

			$('.J-videoplay-hide').hide();
		}, false);

		// 暂停的时候，页面会向上回滚一段距离，修复这个问题
		video.addEventListener('pause', function (event) {// 视频暂停

			// alert('pause');
			if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i)=="micromessenger") return;
			// canvas 暂停保留当前帧
			if (context) {
				context.clearRect(0, 0, canvas.width, canvas.width);// 绘制前，先清除
				canvas.style.width = videoBoxWidth + 'px';
				canvas.style.height = videoBoxWidth / videoRatio + 'px';
				
				context.drawImage(video, 0, 0, canvas.width, canvas.height);
			} else {
				// 不支持该渲染上下文
			}

			$(window).scrollTop(scrollTop);
			video.removeAttribute('controls');
			$(video).hide().removeClass('swiper-no-swiping');
			$(videoMask).show();

			$('.J-videoplay-hide').show();
		}, false);


		// x5 安卓微信全屏处理
		if (navigator.userAgent.toLowerCase().match(/MicroMessenger/i)=="micromessenger") {
			video.addEventListener('x5videoexitfullscreen', function (event) {// 退出全屏
				context.clearRect(0, 0, canvas.width, canvas.width);// 绘制前，先清除
				videoMask.style.background = 'rgba(0,0,0,0)';

				$(window).scrollTop(scrollTop);
				video.removeAttribute('controls');
				// $(video).hide();
				$(video).removeClass('swiper-no-swiping');
				$(videoMask).show();

				$('.J-videoplay-hide').show();
			}, false);
		}
	}
}(document.querySelector('.video-pic video')));
```



[GoodsDetails.cshtml](20190529/GoodsDetails.cshtml)
[goodsdetails.js](20190529/goodsdetails.js)
