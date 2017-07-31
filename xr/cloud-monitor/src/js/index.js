// var $ = require('jquery');
$(function() {
	//左侧边栏点击滑动效果
	var $linkBtns = $('.link-btn');
	$linkBtns.on('click', function() {
		console.log(this);
		var $thisLink = $(this);
		var $thisHeight = $(this).outerHeight();
		var $linkAnimate = $thisLink.find('.link-animate');
		var isActive = $thisLink.hasClass('link-btn-active');
		$thisLink.find('.icon-arrow').toggleClass('up');
		if(isActive) {
			$linkAnimate.animate({
				width: '40px'
			},500, function() {
				$linkAnimate.hide();
			});
			$thisLink.parent().animate({
				height: $thisHeight + 'px'
			},500, function() {
				$thisLink.removeClass('link-btn-active');	
			});
		} else {
			var thisColor = $thisLink.data('color');
			$linkAnimate.css('background-color', thisColor)
			$linkAnimate.show().animate({
				width: '2rem'
			},500);
			$thisLink.addClass('link-btn-active');
			var $lis = $thisLink.parent().find('.link-sub>li');
			var linkHeight = ($lis.length + 1) * $thisHeight
			$thisLink.parent().animate({
				height: linkHeight + 'px'
			},500);
		}
	})

	// 右边侧边栏点击滑动效果
	var $platform = $('.platform');
	$platform.on('click', 'li', function() {
		var $thisLi = $(this);
		var $iconArrow = $thisLi.find('.icon-arrow');
		if(!!$iconArrow) {
			$iconArrow.toggleClass('up');
		}

		$thisLi.find('.select').toggleClass('active');
	})

	//handle-bar操作
	var $handbars = $('.handle-bar');
	$handbars.on('click', '.handle-box', function() {
		var $thisBar = $(this);
		var $thisData = $(this).data('handle');
		if($thisData === 'fullscreen' && screenfull.enabled) {
			var screenfullPoint = $('.right-content');
				screenfullPoint.toggleClass('fullscreen');
				screenfull.toggle(screenfullPoint[0]);

		}
	}) 
})