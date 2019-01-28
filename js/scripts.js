
'use strict';
( function ( document, window, index ){
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName.substring(fileName.length-18,fileName.length);
				//label.querySelector( 'span' ).innerHTML = 'הקובץ נבחר';
			else
				label.innerHTML = labelVal;
		});
		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
}( document, window, 0 ));





jQuery(window).scroll(function () {
	var currentScroll = jQuery(window).scrollTop();
    if (currentScroll > 90) { jQuery('.topBar').addClass('topNavBkg'); } else { jQuery('.topBar').removeClass('topNavBkg'); }
});

jQuery( ".xBtn, .closeBigMenu, .mainMenu ul li a" ).click(function() {
	closeBigMenu();
	//jQuery("body").css("overflow", "");
});

function closeBigMenu(){
	jQuery(".main-menu-warpper").fadeOut( 500, function() { });
	jQuery(".section1").fadeIn( 500, function() { });
	jQuery('.topBar').addClass('topNavBkg');
}

jQuery( ".humborger_top" ).click(function() {
	jQuery(".main-menu-warpper").fadeIn( 500, function() { });
	jQuery('.topBar').removeClass('topNavBkg');
	//jQuery(".section1").fadeOut( 500, function() { });
	//jQuery("body").css("overflow", "hidden");
});


jQuery(function () {
    jQuery('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = jQuery(this.hash);
            target = target.length ? target : jQuery('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                jQuery('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});


/*
function removeActives(section) {
    jQuery('.s1, .s2, .s3, .s4, .s5, .s6, .s66, .s7').removeClass("active");
    var num = ".s" + section;
    jQuery(num).addClass("active");
}

$(window).scroll(function () {
    var currentScroll = $(window).scrollTop();
    var ss1 = $('#section1').height() - 80;
    var ss2 = ss1 + $('#section2').height();
    var ss3 = ss2 + $('#section3').height();
    var ss4 = ss3 + $('#section4').height();
    var ss5 = ss4 + $('#section5').height();
	var ss6 = ss5 + $('#section6').height();
   
    if (currentScroll > ss6) { $('.registrationBtn').fadeOut('slow'); } else {$('.registrationBtn').fadeIn('slow');}
});
*/



function SubmitData() {
    var fname = document.ContactForm.full_name.value;
	var address = document.ContactForm.address.value;
    var phone = document.ContactForm.phone.value;
	
	var fileName = document.getElementById("file-1").value;

  	var RegExpressionTel = /^[0-9-\s]*$/; 
	$('.feedback').html('&nbsp;').attr('tabindex', '');
	
    if (fname.length < 2) {
        //alert("אנא מלא שם פרטי");
		$('#full_name').addClass("error").attr('placeholder', 'שם מלא (שדה חובה)');
		$('#full_name_feedback').html('שדה "שם מלא" הינו שדה חובה');
        //document.ContactForm.full_name.focus();
		$( "#full_name_feedback" ).attr('tabindex', 0).focus();
        return false;
    }
	else if (address.length == 0) {
		//$('#full_name_feedback').html('&nbsp;');
        //alert("אנא מלא את מספר תעודת הזהות שלך ");
		$('#address_feedback').html('שדה "מגורים" הינו שדה חובה');
		$('#address').addClass("error").attr('placeholder', 'מגורים (שדה חובה)');
        document.ContactForm.address.focus();
        return false;
    }
   	else if (phone.length == 0) {
		$('#phone').addClass("error").attr('placeholder', 'שם טלפון (שדה חובה)');
        //alert("אנא מלא מספר טלפון");
		//$('#id_feedback').html('&nbsp;');
		$('#phone_feedback').html('אנא מלא מספר טלפון');
        document.ContactForm.phone.focus();
        return false;
    }

    else if (phone.length < 9) {
        //alert(" מספר טלפון חייב להכיל לפחות 9 ספרות");
		$('#phone').addClass("error");
		$('#phone_feedback').html('מספר טלפון חייב להכיל לפחות 9 ספרות');
        document.ContactForm.phone.focus();
        return false;
    }
    //else if (isNaN(phone)) {
	else if (!RegExpressionTel.test(phone)) {
		$('#phone').addClass("error");
        //alert("מספר טלפון יכול להכיל ספרות בלבד");
		$('#phone_feedback').html('מספר טלפון יכול להכיל ספרות בלבד');
        document.ContactForm.phone.focus();
        return false;
    }
	else if(fileName.length == 0){
		//$('#phone_feedback').html('&nbsp;');
		//alert("אנא הוסף קובץ צילום תעודת זהות");
		$('#file_feedback').html('אנא הוסף קובץ צילום תעודת זהות');
		return false;
	}
	else if (!hasExtension(['.pdf', '.doc', '.docx', '.odt', '.ppt', '.pptx'])) {
		
		$('#file_feedback').html('אנא העלה רק קבצי תמונות עם הסיומת pdf, doc, docx, odt, ppt, pptx');
		//alert("אנא העלה רק קבצי תמונות עם הסיומת jpg, png, gif");		
	}
	
    else {
        document.ContactForm.submit();
    }
}

/*$('#full_name').blur(function() { 
	if ($(this).val().length < 2) {
		$(this).addClass('error');
		//$('#errorMessage').css({'display':'block'}).text('שדה "שם מלא" הינו שדה חובה');
	} else {
		$('#full_name_feedback').html('&nbsp;');
		$(this).removeClass('error');
		//$('#errorMessage').css({'display':'none'}).text('');
	}
});*/



function hasExtension( exts) {
    var fileName = document.getElementById("file-1").value;

	if(fileName !== ""){
    	return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
	} else{
		return true;
	}
}

function hasExtension2( exts) {
    var fileName2 = document.getElementById("file-2").value;
	if(fileName2 !== ""){
    	return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName2);
	} else{
		return true;
	}
}


