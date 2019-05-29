$(function () {
    priceSize();
    singlePriceSize();
    sellTextStr();
    titleMar();
    checkPosition();
    goodsStr();

    //大图预览
    var pswpElement = document.querySelectorAll('.pswp')[0];
    var galleryOptions = {
        fullscreenEl: false,
        shareEl: false,
        tapToClose: true
    };
    var imgItem = [];
    var imgW = 375;

    $('.J-slide img').each(function(i){
      var $this = $(this);

      $this.attr('index',i);
      imgItem.push({
        src: $this.attr('src'),
        w: imgW,
        h: imgW
      });
    });

    $(document).on('click', '.J-view', function () {
      var i = parseInt($(this).find('img').attr('index'));

      galleryOptions.index = i;
      var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, imgItem, galleryOptions);
      gallery.init();
    });

    //规格图片预览
    var hideImgs = [];

    $('.hideImg').each(function(i){
      var $this = $(this);

      $this.attr('index',i);
      hideImgs.push({
        src: $this.val(),
        w: imgW,
        h: imgW
      });
    });
    $(".category-img").on('click',function(){
      var i = parseInt($(this).attr('index'));

      galleryOptions.index = i;
      var gallery2 = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, hideImgs, galleryOptions);
      gallery2.init();
    });

    var mySwiper = new Swiper('.swiper-container', {
        pagination: '.pagination',
        loop: false,
        grabCursor: true,
        paginationClickable: true,
        noSwiping: true,
        //autoplay: 3000,
        autoplayDisableOnInteraction: false,
        speed: 800,
        onSwiperCreated: function () {
            $('.video-pic video') && $('.video-pic video').show();

            $('#myCanvas')[0].style.width = $('.video-pic video')[0].offsetWidth + 'px';
            $('#myCanvas')[0].style.height = $('.video-pic video')[0].offsetHeight + 'px';
        },
        onSlideChangeEnd: function () {
            document.querySelector('.video-pic video') && document.querySelector('.video-pic video').pause();
        },
        onInit: function () {
            /**if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1) {// 安卓
                var startX = 0;
                var videoMask = document.querySelector('.video-mask');

                videoMask.addEventListener('touchstart', function (event) {
                    startX = event.targetTouches[0].clientX;
                }, false);
                videoMask.addEventListener('touchend', function (event) {
                    if (event.changedTouches[0].clientX - startX < -30) {
                        mySwiper.swipeNext();
                    }
                }, false);
            }**/
        }
    });

    //倒计时效果
    var count = parseInt($("#second").val());//倒计时总秒数量
    timer(count);

    //多个倒计时循环
    UpdateGroupEndTime();
    setInterval(UpdateGroupEndTime, 1000);

    $(".kanjia_zhidaola").click(function () {
        $(".kanjia_tanchu").css("display", "none");
        window.location.reload();
    })

    $(".kanjiashare").click(function () {
        $(".fenxiang_div").css("display", "block")
    })

    $(".fenxiang_div").click(function () {
        $(".fenxiang_div").css("display", "none")
    })

    $(".kanjia_guizhe_xiangqing").click(function () {
        $(".kanjia_zhezao").css("display", "block")
    })
    $(".guanbi").click(function () {
        $(".kanjia_zhezao").css("display", "none")
    })

    //客服弹出
    $(".kefutubiao").click(function () {
        if (1) {//商家没有设置客服
            $(".ke-fu").show();
        }
        else {//商家设置了客服
            window.location.href = "/System/ChatService?chat_id=15000000000";
        }
    })
    $(".guan-bi").click(function () {
        $(".ke-fu").hide();
    })

    //    促销弹出层
    $(".specificationDiv").click(function () {
        $(".sellAlertDiv").show();
        $(".sellAlert").animate({ "bottom": "0" }, 300)
    })
    $(".closedSell").click(function () {
        $(".sellAlert").animate({ "bottom": "-100%" }, 300, function () {
            $(".sellAlertDiv").hide();
        })
    })
    //    选择颜色规格弹出层
    $(".selectColor").click(function () {
        $(".shop-category").show();
        $(".shop-category-ml").animate({ "bottom": "0" }, 300)
        $(".buy-add").show();
        $(".add").hide();
        $(".buy").hide();
    })
    $('.shop-category').click(function(e){
      if($(e.target).hasClass('shop-category')){
        $(".shop-category-ml").animate({ "bottom": "-100%" }, 300, function () {
            $(".shop-category").hide();

            //页面显示选择的规格
            var checks = document.getElementsByClassName("shop-category-ml-check");
            var spevalues = "已选择：";
            for (var i = 0; i < checks.length - 1; i++) {
                spevalues += checks[i].innerHTML + "/";
            }
            spevalues += checks[checks.length - 1].innerHTML;
            $(".selectColor").find("p").eq(0).html(spevalues);
        })
      }
    });
    //拼团
    $(".tanchu_pingtuan_1").click(function () {
        $(".shop-category").show();
        $(".shop-category-ml").animate({ "bottom": "0" }, 300)
        $(".buy-add").show();
        $(".add").hide();
        $(".buy").hide();
        $(".dandu_goumai_span2").attr("onclick", "groupBuy(" + 'false' + ")");
    })
    //单独购买
    $(".tanchu_pingtuan_2").click(function () {
        $(".shop-category").show();
        $(".shop-category-ml").animate({ "bottom": "0" }, 300)
        $(".buy-add").show();
        $(".add").hide();
        $(".buy").hide();
        $(".dandu_goumai_span2").attr("onclick", "groupBuy(" + 'true' + ")");
    })
    //去凑团
    $(".tanchu_pingtuan_3").click(function () {
        $(".shop-category").show();
        $(".shop-category-ml").animate({ "bottom": "0" }, 300)
        $(".buy-add").show();
        $(".add").hide();
        $(".buy").hide();
        var userActivityID = this.id;
        $(".dandu_goumai_span2").removeAttr("onclick");
        $(".dandu_goumai_span2").attr("onclick", "couTuan(" + userActivityID + ")");
    })


    $(".group_people>span>i").click(function () {
        var ProductTBID = $("#ProductID").val();
        var ActivityID = $("#ActivityID").val();
        $.ajax({
            type: "POST",
            url: "/Group/GetListGrouponInfo",
            data: { ProductTBID: ProductTBID, ActivityID: ActivityID },
            success: function (result) {
                if (result != "" && result != "false") {
                    $("#gengduopintuan").html(result);
                    $(".group_tanchu").css("display", "block");
                }
                else {
                    $("#gengduopintuan").html("无拼团");
                    $(".group_tanchu").css("display", "block");
                }
            }
        });
    })
    $(".shop-close_1").click(function () {
        $(".group_tanchu").css("display", "none");
    })
    $(".shop-close").click(function () {
        $(".shop-category-ml").animate({ "bottom": "-100%" }, 300, function () {
            $(".shop-category").hide();

            //页面显示选择的规格
            var checks = document.getElementsByClassName("shop-category-ml-check");
            var spevalues = "已选择：";
            for (var i = 0; i < checks.length - 1; i++) {
                spevalues += checks[i].innerHTML + "/";
            }
            spevalues += checks[checks.length - 1].innerHTML;
            $(".selectColor").find("p").eq(0).html(spevalues);
        })
    })
    //点击规格js效果
    $("body").on("click", ".shop-category-ul li", function () {
        $(this).addClass("shop-category-ml-check");
        $(this).siblings("li").removeClass("shop-category-ml-check")

        /////////////////////////////////////////////////////////////////////////////////更新图片 库存 价格/////////////////////////////
        var a = new Array();
        var Spe = document.getElementsByClassName("shop-category-ml-check");

        for (var i = 0; i < Spe.length; i++) {
            var id = Spe[i].id;
            var data = Spe[i].accessKey;
            var arr = Spe[i].accessKey.split(',');
            a.push(arr);
        }
        var aret = doExchange(a);
        var itemId = 0;
        for (var i = 0; i < aret.length; i++) {
            var flag = 0;//表示相等
            var asd = aret[i].split('*');
            for (var j = 0; j < asd.length; j++) {
                if (asd[0] != asd[j]) {
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                itemId = asd[0];
                break;
            }
        }
        var IsInventory = $("#IsInventory").val();
        var image = $("#ImageUrl_" + itemId).val();
        var index = $("#ImageUrl_" + itemId).attr('index');
        var price = $("#Price_" + itemId).val();
        if (price == undefined)
        {
            price = "0.00";
        }
        var Inventory = $("#Inventory_" + itemId).val();
        var InventoryPrompt = $("#InventoryPrompt_" + itemId).val();
        var Rebate = $("#Rebate_" + itemId).val();
        //alert(image);
        $(".shop-category-ml-body-mc-xx").find("img").eq(0).attr({"src": image, "index": index});
        //alert(price);
        $(".shop-category-ml-body-mc-xx").find(".shop-category-ml-body-mc-xx-jg").eq(0).html("￥" + price);
        //alert(Inventory);
        if (IsInventory == "true") {
            $(".shop-category-ml-body-mc-xx").find(".shop-category-ml-body-mc-xx-kc").eq(0).html("库存<i>" + Inventory + "</i>件");
        }
        else {
            if (Number(Inventory) > Number(InventoryPrompt)) {
                $(".shop-category-ml-body-mc-xx").find(".shop-category-ml-body-mc-xx-kc").eq(0).html("库存<i>充足</i>");
            }
            else {
                $(".shop-category-ml-body-mc-xx").find(".shop-category-ml-body-mc-xx-kc").eq(0).html("库存<i>紧张</i>");
            }
        }
    })
    //加入购物车
    $(".joinShopCart").click(function () {
        $(".shop-category").show();
        $(".shop-category-ml").animate({ "bottom": "0" }, 300)
        $(".buy-add").hide();
        $(".add").show();
        $(".buy").hide();
    })
    //立即购买
    $(".buyNow,.lijigoumai").click(function () {
        $(".shop-category").show();
        $(".shop-category-ml").animate({ "bottom": "0" }, 300)
        $(".buy-add").hide();
        $(".add").hide();
        $(".buy").show();
    })

    var CardinalNumber = parseInt($("#CardinalNumber").val());//2
    $("body").on("touchend", "#add", function () {
        var val = parseInt($("#num").val());
        if (val > 0) {
            $("#minus").css({ "color": "#333", "pointerEvents": "auto" })
        }
        val = val + CardinalNumber;
        $("#num").val(val);
    })
    $("body").on("touchend", "#minus", function () {
        var val = parseInt($("#num").val());
        if (val < CardinalNumber) {
            $("#num").val(CardinalNumber);
            $(this).css({ "color": "#c4c4c4", "pointerEvents": "none" })
        } else {
            val = val - CardinalNumber;
            $("#num").val(val);
        }
    })
    $("body").on("change","#num", function () {
        var val = parseInt($("#num").val());
        if (val >= CardinalNumber) {
            $("#minus").css({ "color": "#333", "pointerEvents": "auto" })
            //更换数量为基数的整数倍
            if(val%CardinalNumber==0){
                //什么都不做
            } else {
                var zs = val / CardinalNumber;
                var newZs = CardinalNumber * parseInt(zs);
                if (newZs == 0) {
                    newZs = CardinalNumber;
                }
                $("#num").val(newZs);
            }
        } else {
            $("#num").val(CardinalNumber);
            $("#minus").css({ "color": "#c4c4c4", "pointerEvents": "none" })
        }
    })
    //   点击收藏
    $("body").on("click", ".collect", function () {
        var athis = $(this);
        var focusID = $("#FocusID").val();
        if (focusID == "" || focusID == "0") {
            //收藏
            $.ajax({
                type: "POST",
                url: "/Goods/InsertFocus",
                data: { FocusType: "1001", BelongMDStoreID: $("#StoreID").val(), ProductTBID: $("#ProductID").val(), BelongMDType: "1000" },
                dataType: "json",
                success: function (result) {
                    if (result.success == "true") {
                        $("#FocusID").val(result.data);
                        athis.addClass("collectColor");
                        athis.find("span").text("已收藏");
                    }
                    else if (result.success == "reload" || result.success == "bindmobile") {
                        window.location.href = result.data;
                    }
                    else {
                        layer.open({
                            content: result.data,
                            btn: '确定'
                        });
                    }
                }
            });
        }
        else {
            //取消收藏
            $.ajax({
                type: "POST",
                url: "/User/DeleteFocus",
                data: { FocusID: $("#FocusID").val() },
                dataType: "json",
                success: function (result) {
                    if (result.success == "true") {
                        $("#FocusID").val("0");
                        athis.removeClass("collectColor");
                        athis.find("span").text("收藏");
                    }
                    else if (result.success == "reload" || result.success == "bindmobile") {
                        window.location.href = result.data;
                    }
                    else {
                        layer.open({
                            content: result.data,
                            btn: '确定'
                        });
                    }
                }
            });
        }
    });

    //点击省略时出现的弹窗
    $(".topIcon").click(function () {
        if ($(this).hasClass("topIconClk")) {
            $(".omitAlert").show();
            $(this).removeClass("topIconClk");
        } else {
            $(".omitAlert").hide();
            $(this).addClass("topIconClk");
        }
    });

    var pageindex = 2;
    $(window).scroll(function () {
        if ($(document).scrollTop() == $(document).height() - $(window).height()) {
        //产品详情页
            var storeid = $("#StoreID").val();
            $.ajax({
                type: "POST",
                url: "/Goods/GoodsList",
                data: { OrderByField: "Sales", OrderByType: "asc", PageIndex: pageindex, PageSize: "20", StoreID: storeid },
                success: function (result) {
                    if (result != "" && result != "false") {
                        $(".merchantDetailList").append(result);
                        pageindex++;
                    }
                    if (result == "") {
                        $('.pullOn').html("已经拉倒最底！");
                    }
                    if (result == "false") {
                        layer.open({
                            content: result,
                            btn: '确定'
                        });
                    }
                }
            });
        }
    })

})

function timer(intDiff){
    window.setInterval(function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if (hour <= 9){hour = '0' + hour}
        if (minute <= 9) {minute = '0' + minute};
        if (second <= 9) {second = '0' + second};
        $('#day_show').html(day+" 天");
        $('#hour_show').html('<s id="h"></s>'+hour+'');
        $('#minute_show').html('<s></s>'+minute+'');
        $('#second_show').html('<s></s>'+second+'');
        intDiff--;
    }, 1000);
}

function UpdateGroupEndTime() {
    $(".group_mingdan").each(function () {
        var intDiff = parseInt($(this).find(".second").val());//倒计时总秒数量
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(intDiff > 0){
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if (hour <= 9){hour = '0' + hour}
        if (minute <= 9) {minute = '0' + minute};
        if (second <= 9) {second = '0' + second};
        $(this).find('.day_show').html(day+"天");
        $(this).find('.hour_show').html('<s id="h"></s>' + hour + '');
        $(this).find('.minute_show').html('<s></s>' + minute + '');
        $(this).find('.second_show').html('<s></s>' + second + '');
        intDiff--;
        $(this).find(".second").val(intDiff);
    })
}

//现价的价格字体大小
function priceSize() {
    $(".priceSize").each(function () {
        var big = $(this).text().split(".")[0];
        var small = $(this).text().split(".")[1];
        $(this).html("<i class='fontSize'>"+big+"</i><i>.</i><i>"+small+"</i>");
        $(".fontSize").css("fontSize", "0.32rem");
    })
}
//商品详情价格字体大小
function singlePriceSize() {
    $(".singlePriceSize").each(function () {
        var big = $(this).text().split(".")[0];
        var small = $(this).text().split(".")[1];
        $(this).html("<i class='singleFontSize'>"+big+"</i><i>.</i><i>"+small+"</i>");
        $(".singleFontSize").css("fontSize","0.44rem");
    })
}

//  商品描述文字省略
function sellTextStr() {
    $(".sellDescribe").each(function () {
        var text = $(this).text();
        console.log(text.length);
        if (text.length < 16) {
            $(this).html(text);
        } else {
            var textStr = text.substr(0,16);
            $(this).html(textStr + "...");
        }
    })
}
//价格计算
function totalPrice() {
    var totalPrice = 0;
    $(".goodsShop").each(function () {
        var price = 0;
        $(this).find(".cartUl li .goodsCheck").each(function () {
            if($(this).is(":checked") == true){
                var goodsPrice = parseFloat($(this).parents("li").find(".priceSize").text());
                var goodsNum = parseInt($(this).parents("li").find(".num").val());
                var priceNum = goodsPrice * goodsNum;
                price += priceNum;
            }
        })
        totalPrice += price;
    })
    $(".allPrice").html(totalPrice.toFixed(2));
    if($(".goodsShop").is(":checked") == true ||$(".shopCheck").is(":checked") == true ||$(".allChecked").is(":checked") == true  ){
        var preferentialPrice = parseFloat($(".preferentialPrice").html())
        $(".preferentialAllPrice").html((totalPrice- preferentialPrice).toFixed(2));
    }else{
        var html = 0
        $(".preferentialAllPrice").html(html.toFixed(2));
    }
    priceSize();
}
function titleMar() {
    var titlePadWidth = $(".titlePad").width();
    var docWidth = $(window).width();
    var left = (docWidth - titlePadWidth)/2;
    $(".titlePad").css({"marginLeft":left});
}
function checkPosition() {
    $(".shopOverUl").find("li").each(function () {
        var liHeight = $(this).height();
        var imgHeight = $(this).find(".shopOverCheck").height();
        var height = liHeight - imgHeight;
        $(this).find(".shopOverCheck").css("top",height /2)
    })
}

//  商品描述文字省略
function goodsStr() {
    $(".introduction").each(function () {
        var text = $(this).text();
        if (text.length < 40) {
            $(this).html(text);
        } else {
            var textStr = text.substr(0, 41);
            $(this).html(textStr + "...");
        }
    })
}


    function loadProductList(pageindex)
    {
        $.ajax({
            type: "POST",
            url: "/Goods/GoodsListNew",
            data: { OrderByField: "Sales", OrderByType: "asc", PageIndex: pageindex, PageSize: "20", StoreID: $('#StoreID').val() },
            success: function (result) {
                if (result != "" && result != "false") {
                    if (pageindex == "1") {
                        $(".merchantDetailList").html(result);
                    }
                    else {
                        $(".merchantDetailList").append(result);
                    }
                }
                if (result == "") {
                    if (pageindex == "1") {
                        //无数据
                    }
                    else {
                        //拉倒最底
                    }
                }
                if (result == "false") {
                    layer.open({
                        content: result,
                        btn: '确定'
                    });
                }
            }
        });
    }
    //第一屏产品
    loadProductList(1);
    //
    function doExchange(doubleArrays) {
        var len = doubleArrays.length;
        if (len >= 2) {
            var len1 = doubleArrays[0].length;
            var len2 = doubleArrays[1].length;
            var newlen = len1 * len2;
            var temp = new Array(newlen);
            var index = 0;
            for (var i = 0; i < len1; i++) {
                for (var j = 0; j < len2; j++) {
                    temp[index] = doubleArrays[0][i] + "*" +
                        doubleArrays[1][j];
                    index++;
                }
            }
            var newArray = new Array(len - 1);
            for (var i = 2; i < len; i++) {
                newArray[i - 1] = doubleArrays[i];
            }
            newArray[0] = temp;
            return doExchange(newArray);
        }
        else {
            return doubleArrays[0];
        }
    }
    //加入购物车
    function addCart()
    {
        var a = new Array();
        var Spe = document.getElementsByClassName("shop-category-ml-check");
        for (var i = 0; i < Spe.length; i++) {
            var id = Spe[i].id;
            var data = Spe[i].accessKey;
            var arr = Spe[i].accessKey.split(',');
            a.push(arr);
        }
        var aret = doExchange(a);
        var itemId = 0;
        for (var i = 0; i < aret.length; i++) {
            var flag = 0;//表示相等
            var asd = aret[i].split('*');
            for (var j = 0; j < asd.length; j++) {
                if (asd[0] != asd[j]) {
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                itemId = asd[0];
                break;
            }
        }
        //判断库存
        if ($("#Inventory_" + itemId).val() == undefined) {
            layer.open({
                content: '该产品项商品库存不足或已下架',
                btn: '确定'
            });
            return false;
        }
        if (Number($("#Inventory_" + itemId).val()) < Number($("#num").val())) {
            layer.open({
                content: '不能超过库存',
                btn: '确定'
            });
            return false;
        }
        $.ajax({
            type: "POST",
            url: "/Cart/InsertCart",
            data: { ProductItemTBID: itemId, Quantity: $("#num").val() },
            dataType: "json",
            success: function (result) {
                if (result.success == "true") {
                    //页面显示选择的规格
                    var checks = document.getElementsByClassName("shop-category-ml-check");
                    var spevalues = "已选择：";
                    for (var i = 0; i < checks.length - 1; i++) {
                        spevalues += checks[i].innerHTML + "/";
                    }
                    spevalues += checks[checks.length - 1].innerHTML
                    $(".selectColor").find("p").eq(0).html(spevalues);
                    //规格弹框隐藏
                    $(".shop-category-ml").animate({ "bottom": "-100%" }, 300, function () {
                        $(".shop-category").hide();
                    })
                    layer.open({
                        content: result.data,
                        btn: '确定'
                    });
                }
                else if (result.success == "reload" || result.success == "bindmobile") {
                    //alert(result.data);
                    window.location.href = result.data;
                }
                else {
                    layer.open({
                        content: result.data,
                        btn: '确定'
                    });
                }
            }
        });
    }
    //立即购买
    function goBuy()
    {
        var a = new Array();
        var Spe = document.getElementsByClassName("shop-category-ml-check");
        for (var i = 0; i < Spe.length; i++) {
            var id = Spe[i].id;
            var data = Spe[i].accessKey;
            var arr = Spe[i].accessKey.split(',');
            a.push(arr);
        }
        var aret = doExchange(a);
        var itemId = 0;
        for (var i = 0; i < aret.length; i++) {
            var flag = 0;//表示相等
            var asd = aret[i].split('*');
            for (var j = 0; j < asd.length; j++) {
                if (asd[0] != asd[j]) {
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                itemId = asd[0];
                break;
            }
        }
        //判断库存
        if ($("#Inventory_" + itemId).val() == undefined)
        {
            layer.open({
                content: '该产品项商品库存不足或已下架',
                btn: '确定'
            });
            return false;
        }
        if (Number($("#Inventory_" + itemId).val()) < Number($("#num").val())) {
            layer.open({
                content: '不能超过库存',
                btn: '确定'
            });
            return false;
        }
        window.location.href = "/Cart/ConfirmOrder?ProductItemTBID=" + itemId + "&Quantity=" + $("#num").val() + "&BelongMDType=1000&BelongMDStoreID=" + $('#StoreID').val();
    }

    //砍价
    function bargain()
    {
        $(".kanjia").css("pointer-events", "none");
        $(".kanjia").attr("disabled", "disabled");
        $.ajax({
            type: "POST",
            url: "/Bargain/JoinBargain",
            data: { UserActivityTBID: $('#UserActivityTBID').val(), ProductTBID: $('#ProductID').val(), ActivityID: $('#ActivityID').val() },
            dataType: "json",
            success: function (result) {
                if (result.success == "true") {
                    //显示弹窗
                    //alert(result.Money);
                    $(".kanjia_tanchu").find("p").html("您砍掉了￥" + result.Money + "");
                    $(".kanjia_tanchu").css("display", "block");
                }
                else if (result.success == "reload" || result.success == "bindmobile") {
                    //alert(result.data);
                    window.location.href = result.data;
                }
                else {
                    layer.open({
                        content: result.data,
                        btn: '确定'
                    });
                }
            }
        });
    }

    //新开砍价
    function gotoBargain()
    {
        $.ajax({
            type: "POST",
            url: "/Bargain/gotoBargain",
            data: {  },
            dataType: "json",
            success: function (result) {
                if (result.success == "true") {
                    window.location.href = '/Goods/GoodsDetails?ProductID=' + $('#ProductID').val();
                }
                else if (result.success == "reload" || result.success == "bindmobile") {
                    //alert(result.data);
                    window.location.href = result.data;
                }
                else {
                    layer.open({
                        content: result.data,
                        btn: '确定'
                    });
                }
            }
        });
    }

    //开团  土豪直钩
    function groupBuy(IsNotJoinActivity)
    {
        var a = new Array();
        var Spe = document.getElementsByClassName("shop-category-ml-check");
        for (var i = 0; i < Spe.length; i++) {
            var id = Spe[i].id;
            var data = Spe[i].accessKey;
            var arr = Spe[i].accessKey.split(',');
            a.push(arr);
        }
        var aret = doExchange(a);
        var itemId = 0;
        for (var i = 0; i < aret.length; i++) {
            var flag = 0;//表示相等
            var asd = aret[i].split('*');
            for (var j = 0; j < asd.length; j++) {
                if (asd[0] != asd[j]) {
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                itemId = asd[0];
                break;
            }
        }
        //判断库存
        if (Number($("#Inventory_" + itemId).val()) < Number($("#num").val())) {
            layer.open({
                content: '不能超过库存',
                btn: '确定'
            });
            return false;
        }
        //单独购买
        window.location.href = "/Cart/ConfirmOrder?ProductItemTBID=" + itemId + "&Quantity=" + $("#num").val() + "&BelongMDType=1000&BelongMDStoreID=" + $('#StoreID').val() + "&IsNotJoinActivity=" + IsNotJoinActivity + "";
    }

    //凑团
    function couTuan(UserActivityTBID) {
        var a = new Array();
        var Spe = document.getElementsByClassName("shop-category-ml-check");
        for (var i = 0; i < Spe.length; i++) {
            var id = Spe[i].id;
            var data = Spe[i].accessKey;
            var arr = Spe[i].accessKey.split(',');
            a.push(arr);
        }
        var aret = doExchange(a);
        var itemId = 0;
        for (var i = 0; i < aret.length; i++) {
            var flag = 0;//表示相等
            var asd = aret[i].split('*');
            for (var j = 0; j < asd.length; j++) {
                if (asd[0] != asd[j]) {
                    flag = 1;
                    break;
                }
            }
            if (flag == 0) {
                itemId = asd[0];
                break;
            }
        }
        //判断库存
        if (Number($("#Inventory_" + itemId).val()) < Number($("#num").val())) {
            layer.open({
                content: '不能超过库存',
                btn: '确定'
            });
            return false;
        }
        //单独购买
        window.location.href = "/Cart/ConfirmOrder?ProductItemTBID=" + itemId + "&Quantity=" + $("#num").val() + "&BelongMDType=1000&BelongMDStoreID=" + $('#StoreID').val() + "&UserActivityTBID=" + UserActivityTBID;
    }
