
let displayNagishut = false;
jQuery('.menu-btnN').click(function () {
    if (displayNagishut === true) {
        jQuery('.menuNagishut').removeClass("slideInRightNagish").addClass(" slideInLeftNagish ");
        displayNagishut = false;
    } else if (displayNagishut === false) {
        jQuery('.menuNagishut').removeClass("slideInLeftNagish").addClass(" slideInRightNagish ");
        displayNagishut = true;
    }
});

$(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

	var startTabNavigation = false;
		jQuery(".homeLink  a").attr( 'id' , "homeLink" );
		/*jQuery('#main-content').find('div , article, p , span , a , h1 , h2 , h3 , h4 , h5 , h6 , li, label').each(function(){
			var a = parseInt( jQuery(this).css('font-size') );
			//console.log('set font-size' + a);
			jQuery(this).attr( 'initial-font-size' , parseInt( jQuery(this).css('font-size') ) );
		});*/

		jQuery('.blackNwhite').click(function(){
			if( jQuery('body').hasClass('black-white') ){
				jQuery('body').removeClass('black-white');
				jQuery('body').css("-webkit-filter", "");
				jQuery('body').css("filter", "");
				jQuery(this).parent().removeClass('selected');
			}else{
				jQuery('body').addClass('black-white');
				jQuery('body').css('-webkit-filter', 'grayscale(100%)');
				jQuery('body').css('filter', 'grayscale(100%)');
				jQuery(this).parent().addClass('selected');
			}
		});
		
		jQuery('.link-underline').click(function(){
			if( jQuery('body').hasClass('underline') ){
					jQuery('body').removeClass('underline');
					jQuery("*").each(function () {
						jQuery('a').css('text-decoration', '');
					});
					jQuery(this).parent().removeClass('selected');
				}else{
					jQuery('body').addClass('underline');
					jQuery("*").each(function () {
						jQuery('a').css('text-decoration', 'underline');
					});
					jQuery(this).parent().addClass('selected');
				}
		});

	function setKeyboardNav(){
		jQuery('body').addClass('accessible');
			jQuery('.turn-on').parent().addClass('selected');
			jQuery('.turn-on').text('כבה ניווט מקלדת');
			startTabNavigation = true;
			$('.jump-link').show();
		//	setTimeout(function(){ $('.jump-link').eq(0).focus(); },100);	
			$(".sub-menu-item a").focus(function(){			 
				$(this).parent().parent().addClass("subMenuFocus");
			})
			$(".sub-menu-item:last-child a").blur(function(){
				$(this).parent().parent().removeClass("subMenuFocus");
		})	
	}

	jQuery('.turn-on').click(function(){
		if( jQuery('body').hasClass('accessible') ){
			jQuery('body').removeClass('accessible');
			jQuery(this).parent().removeClass('selected');
			jQuery('.turn-on').text('הפעל ניווט מקלדת');
			startTabNavigation = false;
			//addAlert( 'ניווט מקלדת כבוי' );
		}else{
			setKeyboardNav();
			//addAlert( 'ניווט מקלדת מופעל' );
	
		}
	});
	
	jQuery('.contrast-white').click(function(){
		jQuery('.contrast-dark').parent().removeClass('selected');
		
		jQuery('body').removeClass('dark-theme');
		jQuery('body').addClass('white-theme');
		jQuery(this).parent().addClass('selected');

	});						
	jQuery('.contrast-dark').click(function(){
		
		jQuery('.contrast-white').parent().removeClass('selected');
		jQuery('body').removeClass('white-theme');
		jQuery('body').addClass('dark-theme');
		jQuery(this).parent().addClass('selected');
	});
	
	jQuery('.contrast-normal').click(function(){
		jQuery('.contrast-dark').parent().removeClass('selected');
		jQuery('.contrast-white').parent().removeClass('selected');
		jQuery('body').removeClass('dark-theme');
		jQuery('body').removeClass('white-theme');
	});

	jQuery('.change-font').click(function(){
		if( jQuery('body').hasClass('change-font') ){
			jQuery('body').removeClass('change-font');
			jQuery(this).parent().removeClass('selected');
		}else{
			jQuery('body').addClass('change-font');
			jQuery(this).parent().addClass('selected');
			
		}
	});
	




$(document).on('keypress' , '[role="button"]' , function( e ){
	if( e.keyCode == 13 || e.keyCode == 32 ){
		$(this).trigger('click');
	}			
});

$(document).keydown(function(e){
	if(!e.shiftKey && e.keyCode == 9) {  // TAB NO SHIFT

		if( $('input , textarea').is(':focus') ) return;

		if(!startTabNavigation){
			startTabNavigation = true;
			$('.jump-link').show();
			setTimeout(function(){ $('.jump-link').eq(0).focus(); },100);					
		}
	}

	//console.log(e.keyCode);
	if( e.keyCode == 121 ) {  // F10
		$('body').addClass('accessible');
		//$('.turn-on').parent().addClass('selected');
		$('.turn-on').text('כבה ניווט מקלדת');
		$(document).scrollTop(0);
		//$('#menuNagishut').show();
		//$('#accessibility-menu li span').attr('tabindex','7');
		$('#accessibility-menu li span').eq(0).focus();
		//$('#accessibility-menu').attr('tabindex','0');
		//setTimeout(function(){ $('#accessibility-menu').addClass('open'); } , 10);	
		$("#accessibility-menu").removeClass("slideInLeftNagish").addClass("slideInRightNagish");
	}
});


jQuery(document).ready(function($) {
	$(".menu-links-nagish li:first-child span").focus(function(){
		$(this).parent().parent().parent().parent().removeClass("slideInLeftNagish").addClass("slideInRightNagish");
    })

	$(".menu-links-nagish li:last-child span").blur(function(){
		$(this).parent().parent().parent().parent().removeClass("slideInRightNagish").addClass("slideInLeftNagish");
	})
});	

function setNagFocus(){
	$('.menuNagishut').removeClass("slideInLeftNagish").addClass("slideInRightNagish");
	$('.turn-on').focus();
	setKeyboardNav();
}


$(document).ready(function () {
    var zoom = 1;
    var screenW = $(window).width();

    window.onresize = function () {
        screenW = $(window).width();
    }

    $(".text-big").click(function () {
        if (zoom == 1) {
            if (screenW > 919) {

                $('body').css('background-size', '120%');
                $('#warper').css('transform', ' scale(1.2)');
                $('#warper').css('-moz-transform', 'scale(1.2, 1.2)');			
				$('#eventSec').addClass("posRel");
				$('.section3').addClass("sec3PosRemove");
            }

            if (screenW <= 919 && screenW >= 620) {
                //      alert("gfggg");
                $('body').css('background-size', '150%');
                $('#warper').css('transform', ' scale(1.1)');
                $('#warper').css('-moz-transform', 'scale(1.1, 1.1)');
            }

            if (screenW < 620) {
                $('body').css('background-size', '168%');
                $('#warper').css('transform', ' scale(1.1)');
                $('#warper').css('-moz-transform', 'scale(1.1, 1.1)');
            }
        }

        if (zoom == 2) {
            if (screenW > 919) {
                $('body').css('background-size', '140%');
                $('#warper').css('transform', ' scale(1.4)');
                $('#warper').css('-moz-transform', 'scale(1.4, 1.4)');
            }
            if (screenW <= 919 && screenW >= 620) {
                $('body').css('background-size', '162%');
                $('#warper').css('transform', ' scale(1.2)');
                $('#warper').css('-moz-transform', 'scale(1.2, 1.2)');
            }
            if (screenW < 620) {
                $('body').css('background-size', '182%');
                $('#warper').css('transform', ' scale(1.2)');
                $('#warper').css('-moz-transform', 'scale(1.2, 1.2)');
            }
        }
        if (zoom == 3) {
            if (screenW > 919) {
                $('body').css('background-size', '150%');
                $('#warper').css('transform', ' scale(1.5)');
                $('#warper').css('-moz-transform', 'scale(1.5, 1.5)');
            }
            if (screenW <= 919 && screenW >= 620) {

            }
            if (screenW < 620) {
                $('body').css('background-size', '196%');
                $('#warper').css('transform', ' scale(1.3)');
                $('#warper').css('-moz-transform', 'scale(1.3, 1.3)');
            }
        }
        zoom++;
        if (zoom == 4) {
            zoom = 3;
        }
    });

    $(".text-small").click(function () {
        if (zoom == 1) {
            if (screenW > 620) {
                $('body').css('background-size', 'auto');
                $('#warper').css('transform', ' scale(1)');
                $('#warper').css('-moz-transform', 'scale(1, 1)');
				//$('.section3').removeClass("sec3PosRemove");
			//	$('#eventSec').removeClass("posRel");
			//	('#eventSec').removeClass("posRel").addClass("dateBarFixed");
            } else {
                $('body').css('background-size', 'auto');
                $('#warper').css('transform', ' scale(1)');
                $('#warper').css('-moz-transform', 'scale(1, 1)');
				//$('.section3').removeClass("sec3PosRemove");
			//	$('#eventSec').removeClass("posRel").addClass("dateBarFixed");
            }
        } if (zoom == 2) {
            if (screenW > 919) {
                $('body').css('background-size', '120%');
                $('#warper').css('transform', ' scale(1.2)');
                $('#warper').css('-moz-transform', 'scale(1.2, 1.2)');
            }
            if (screenW <= 919 && screenW >= 620) {
                $('body').css('background-size', '150%');
                $('#warper').css('transform', ' scale(1.1)');
                $('#warper').css('-moz-transform', 'scale(1.1, 1.1)');
            }
            if (screenW < 620) {
                $('body').css('background-size', '168%');
                $('#warper').css('transform', ' scale(1.1)');
                $('#warper').css('-moz-transform', 'scale(1.1, 1.1)');
            }
        }
        if (zoom == 3) {
            if (screenW > 919) {
                $('body').css('background-size', '140%');
                $('#warper').css('transform', ' scale(1.4)');
                $('#warper').css('-moz-transform', 'scale(1.4, 1.4)');
            }
            if (screenW < 620) {
                $('body').css('background-size', '182%');
                $('#warper').css('transform', ' scale(1.2)');
                $('#warper').css('-moz-transform', 'scale(1.2, 1.2)');
            }
        }
        zoom--;
        if (zoom == 0) {
            zoom = 1;
        }
    });

    $(".text-normal").click(function () {
        $('body').css('background-size', 'auto');
        $('#warper').css('transform', ' scale(1)');
        //$('#warper').css('-moz-transform', 'scale(1, 1)');
        zoom = 1;
    });


    $(".contrast-white").click(function () {
        resetBG();
		$(".newKavImg1 img").attr("src","images/kav1_white.png");
		$(".newKavImg2 img").attr("src","images/kav2_white.png");
		$(".newKavImg3 img").attr("src","images/kav3_white.png");
		$(".newKavImg4 img").attr("src","images/kav6_white.png");
		$('body, #warper, .section1, .section2, .section3, .section4, .section5, .section4 .container').css('background', '#fff');
		$('.sec1SubTitle2, .topBar').css('background', 'none');
		$('.sec1Btn, .sec1Sep, .sec5Btn').css('background', '#ddd');
		$('.socials ul li img').css('background', '#ddd').css('border-radius', '50%');
		$('h1, div, ul, .sec1Btn').css('color', '#000');
    });

    $(".contrast-dark").click(function () {
        resetBG();		
		$(".newKavImg1 img").attr("src","images/kav1_white.png");
		$(".newKavImg2 img").attr("src","images/kav2_white.png");
		$(".newKavImg3 img").attr("src","images/kav3_white.png");
		$(".newKavImg4 img").attr("src","images/kav6_white.png");
		$(".footer_logos").css("display","none");
		$('body, #warper, .section1, .section2, .section3, .section4, .section5, .section4 .container, footer').css('background', '#000');
		$('.sec1SubTitle2, .topBar').css('background', 'none');
		$('.sec1Btn, .sec1Sep, .sec5Btn').css('background', '#333');
		//$('.socials ul li img').css('background', '#ddd').css('border-radius', '50%');
		$('h1, div, ul, .sec1Btn').css('color', '#fff');
    });

    function resetBG() {
        $("*").each(function () {
            var a = parseFloat($(this).css("font"));
            $(this).css("background-color", "");
            $(this).css("background", "");
            $(this).css("color", "");
            $(this).css("text-decoration", "");
            $(this).css("-webkit-filter", "");
            $(this).css("filter", "");
            $(this).css("border", "");
			$(this).css("outline", "");
			$(".footer_logos").css("display","");
			$(".newKavImg1 img").attr("src","images/kav1.png");
			$(".newKavImg2 img").attr("src","images/kav2.png");
			$(".newKavImg3 img").attr("src","images/kav3.png");
			$(".newKavImg4 img").attr("src","images/kav6.png");
        });
    }

    $(".contrast-normal").click(function () {
        resetBG();
    });
});

	

	

