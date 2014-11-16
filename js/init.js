/*
	Directive by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.init({
		reset: 'full',
		breakpoints: {
			global:		{ range: '*', href: 'css/style.css', containers: '51em', grid: { gutters: 30 } },
			wide:		{ range: '-1680', href: 'css/style-wide.css' },
			normal:		{ range: '-1280', href: 'css/style-normal.css', containers: '48em' },
			narrow:		{ range: '-980', href: 'css/style-narrow.css', containers: '95%', grid: { gutters: 30 } },
			narrower:	{ range: '-840', href: 'css/style-narrower.css', containers: '95%!', grid: { zoom: 2, gutters: 20 } },
			mobile:		{ range: '-736', href: 'css/style-mobile.css', containers: '90%!', grid: { gutters: 20 }, viewport: { scalable: false } },
			mobilep:	{ range: '-480', href: 'css/style-mobilep.css', containers: '100%!', grid: { zoom: 3 } }
		}
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');
			
			$window.on('load', function() {
				$body.removeClass('is-loading');
			});
			
		// Forms (IE<10).
			var $form = $('form');
			if ($form.length > 0) {
				
				$form.find('.form-button-submit')
					.on('click', function() {
						$(this).parents('form').submit();
						return false;
					});
		
				if (skel.vars.IEVersion < 10) {
					$.fn.n33_formerize=function(){var _fakes=new Array(),_form = $(this);_form.find('input[type=text],textarea').each(function() { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { $(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function() { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
					$form.n33_formerize();
				}

			}


			$( "#image1" ).mouseenter(function() {
				$(this).find('img').attr('src', "images/pic11.jpeg");
			});
			$( "#image1" ).mouseleave(function() {
				$(this).find('img').attr('src', "images/pic01.jpg");
			});

			$( "#image2" ).mouseenter(function() {
				$(this).find('img').attr('src', "images/pic22.jpg");
			});
			$( "#image2" ).mouseleave(function() {
				$(this).find('img').attr('src', "images/pic02.jpg");
			});

			$( "#image3" ).mouseenter(function() {
				$(this).find('img').attr('src', "images/pic33.jpg");
			});
			$( "#image3" ).mouseleave(function() {
				$(this).find('img').attr('src', "images/pic03.jpg");
			});


	});

})(jQuery);

$(window).scroll(show);
function show() {
	var win = $(window);
	var top = win.scrollTop();
	var heighthalf = win.height()/3;
	var image1 = $("#image1");
	var image2 = $("#image2");
	var image3 = $("#image3");
    var posY1 = image1.offset().top - top;
    var posY2 = image2.offset().top - top;
    var posY3 = image3.offset().top - top;
   	if (posY1 <heighthalf){
   		image1.find('img').attr('src', "images/pic11.jpeg");
   	}
   	if (posY2 <heighthalf){
   		image2.find('img').attr('src', "images/pic22.jpg");
   	}
   	if (posY3 <heighthalf){
   		image3.find('img').attr('src', "images/pic33.jpg");
   	}
   	   	if (posY1 >heighthalf){
   		image1.find('img').attr('src', "images/pic01.jpg");
   	}
   	if (posY2 >heighthalf){
   		image2.find('img').attr('src', "images/pic02.jpg");
   	}
   	if (posY3 >heighthalf){
   		image3.find('img').attr('src', "images/pic03.jpg");
   	}
}
show();