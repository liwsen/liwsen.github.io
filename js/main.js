// 所有模块都通过 define 来定义
define(function(require, exports, module) {

	// 通过 require 引入依赖
	require('zepto');
	require('zepto-fx');
	var $ = Zepto;

	// 通过 exports 对外提供接口
	// exports.done = function(){
	// 	console.log('test abc...');
	// };
	// 或者通过 module.exports 提供整个接口
	// module.exports = ...

	var w = 600;
	var h = 750;
	// 初始化
	exports.init = function(){
		//导航栏
		var $nav = $('#nav');
		var T;
		$nav.off().on('mouseover', function(event) {
			event.preventDefault();
			clearTimeout(T);
			$(this).find('.navList').removeClass('navlistOut').addClass('navlistIn').show();
		})
		.on('mouseout', function(event) {
			event.preventDefault();
			var $list = $(this).find('.navList');
			$list.removeClass('navlistIn').addClass('navlistOut');
			T = setTimeout(function(){
				$list.hide();
			}, 450);
		});
		return this;
	};

	// width
	exports.width = function(){
		var _w = this.height() * w / h;
		return _w;
	}
	// height
	exports.height = function(){
		var win_w = window.innerWidth;
		var win_h = window.innerHeight;
		if(win_w < win_h && win_w > w){
			return win_h/2;
		}else{
			if(win_w < w){
				$('.headerWrapper').css({
					'position': 'relative',
					'float': 'none'
				});
				return win_w * h / w;
			}
			return win_h;
		}
	}
	
	//头部设置
	exports.header = function(){
		var my = this;
		var fn_head = function(){
			$('.headerWrapper').css({
				'width': my.width(),
				'height': my.height()
			});
			$('.mainWrapper,.footerWrapper').css({
				'marginLeft': my.width()
			});
		};
		fn_head();
		$(window).resize(fn_head);
		my.headerSide();
	};
	
	//图片切换
	exports.headerSide = function(){
		var my = this;
		var $item = $('.headerSide').find('.item');
		var i = 0;
		$item.css({'z-index': 1}).eq(i).css({'z-index': 2});
		setInterval(function(){
			if(i < $item.length - 1){
				i++;
			}else{
				i = 0;
			}
			$item.eq(i).css({'opacity': 0, 'z-index': 3});
			$item.eq(i).animate({opacity: 1}, 500, 'ease-in', function(){
				$(this).css({'z-index': 2});
				$item.eq(i-1).css({'z-index': 1});
			});
		}, 6000);
	};

});