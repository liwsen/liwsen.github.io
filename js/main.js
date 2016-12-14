define(function(require, exports, module){
    var $ = require('jquery'); 

    // exports.init = function(options) {
    //     var DEFAULTS = {};
    //     this.options = $.extend({}, DEFAULTS, options);
    // }; 

    // 菜单按钮
    $('#menu_btn').on('click', function(event) {
    	event.preventDefault();
    	event.stopPropagation();
    	var $menu = $('#menu');
    	if(!$menu.hasClass('show')){
    		$menu.addClass('show');
	        $(document).one('click', function(event) {
	        	$menu.removeClass('show');
	        });
    	}else{
    		$menu.removeClass('show');
    	}
    });
    // 阻止冒泡
    $('#menu').on('click', function(event) {
    	event.stopPropagation();
    });

});