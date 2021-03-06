$(document).ready(function() {

	// START GENERAL JS //
	resizeWrapper();
	$('.slider-arrow').css('left', ($('.active-nav').width()/2 - 15)*$('.active-nav').data('nav'));
	setTimeout(function() {
		$('body').css('visibility', 'visible');
	}, 300);

	$(window).on('resize', function() {
		resizeWrapper();
		$('.slider-arrow').css('left', ($('.active-nav').width()/2 - 15)*$('.active-nav').data('nav'));
	})

	$('body').on('click', '#logout', function() {
		$('#logout-form').submit();
	});

	$('body').on('click', '.open-close-menu', function() {
		if ($('body .outer-circular-menu').hasClass('closed')) {
			$('body .outer-circular-menu').removeClass('closed');
			setTimeout(function() {
				$('body .menu-bubble-1').fadeIn(500);
			}, 150);
			setTimeout(function() {
				$('body .menu-bubble-2').fadeIn(500);
			}, 250);
			setTimeout(function() {
				$('body .menu-bubble-3').fadeIn(500);
			}, 350);
			setTimeout(function() {
				$('body .open-close-menu').removeClass('glyphicon-menu-right').addClass('glyphicon-menu-left');
				$('body .open-close-menu').addClass('open');
			}, 750);
		} else {
			$('body .outer-circular-menu').addClass('closed');
			if (!$('body .menu-bubble-statistics').hasClass('closed')) $('body .menu-bubble-statistics').addClass('closed');
			$('body .menu-second-bubble-1').fadeOut(500);
			$('body .menu-second-bubble-2').fadeOut(500);
			$('body .menu-bubble-3').fadeOut(500);
			setTimeout(function() {
				$('body .menu-bubble-2').fadeOut(500);
			}, 100);
			setTimeout(function() {
				$('body .menu-bubble-1').fadeOut(500);
			}, 200);
			setTimeout(function() {
				$('body .open-close-menu').removeClass('glyphicon-menu-left').addClass('glyphicon-menu-right');
				$('body .open-close-menu').removeClass('open');
			}, 700);
		}
	});

	$('body').on('click', '.menu-bubble-statistics', function() {
		if ($('body .menu-bubble-statistics').hasClass('closed')) {
			$('body .menu-bubble-statistics').removeClass('closed');
			setTimeout(function() {
				$('body .menu-second-bubble-1').fadeIn(500);
			}, 150);
			setTimeout(function() {
				$('body .menu-second-bubble-2').fadeIn(500);
			}, 250);
		} else {
			$('body .menu-bubble-statistics').addClass('closed');
			setTimeout(function() {
				$('body .menu-second-bubble-2').fadeOut(500);
			}, 150);
			setTimeout(function() {
				$('body .menu-second-bubble-1').fadeOut(500);
			}, 250);
		}
	});

	$('body').on('mouseenter', '.menu-second-bubble-wrapper', function() {
		$(this).find('img').attr('src', $(this).find('img').attr('src').split('.')[0] + '-blue.png');
	});

	$('body').on('mouseleave', '.menu-second-bubble-wrapper', function() {
		$(this).find('img').attr('src', $(this).find('img').attr('src').split('-')[0] + '-' + $(this).find('img').attr('src').split('-')[1] + '.png');
	});

	// END GENERAL JS //

// ######################################################################################################################################

	// START HOMEPAGE JS //
	$('body').on('click', '.homepage-slider-nav', function() {
		if (!$('.active-slide').hasClass('slide-' + $(this).data('nav'))) {
			$('.active-slide').fadeOut(500);
			var slideNumber = $(this).data('nav');
			setTimeout(function() {
				$('.active-slide').removeClass('active-slide');
				$('.slide-' + slideNumber).fadeIn(500);
			}, 500);
			setTimeout(function() {	
				$('.slide-' + slideNumber).addClass('active-slide');
			}, 1000);

			$('.slider-arrow').animate({
				left: ($('.active-nav').width()/2 - 15) + $('.active-nav').width()*(slideNumber-1)
			}, 750);
		}

	});
	// END HOMEPAGE JS //

// ######################################################################################################################################

	// START REGISTRATION PAGE JS //
	var error;

	$('body').on('click', '.go-to-optional-registration', function() {
		error = '<div class="error-message"><ul>';
		var r = '.register-form .registration-mandatory ';
		if ($(r+'#password').val() != $(r+'#repeat-password').val()) error += '<li>The two passwords do not match !</li>';
		$(r+'input').each(function(){
			if ($(this).val() == '') error += "<li>Please fill in all the required fields !</li>"
		});

		scrollToTop();
		
		if (error == '<div class="error-message"><ul>') {
			error = '';
			$('.error-message').remove();
			$('.registration-mandatory').fadeOut(500);
			setTimeout(function(){
				resizeWrapper();
				$('.registration-optional').fadeIn(500);
			}, 500)
		} else {
			error += "</ul></div>";
			$('.error-message').remove();
			$('.register-main-wrapper h2').before(error);
			var windowHeight = $(window).height() - 200;
			if ($('.main-wrapper').hasClass('adjusted-height')) $('.main-wrapper').height(windowHeight + $('.error-message').height());
		}
	});

	$('body').on('click', '.go-to-mandatory-registration', function() {
		error = '<div class="error-message"><ul>';
		scrollToTop();
		$('.registration-optional').fadeOut(500);
		setTimeout(function(){
			$('.registration-mandatory').fadeIn(500);
		}, 500)
	});	

	$('body').on('click', '.submit-registration', function() {
		if (error == '') $('.register-form').submit();
		else {
			scrollToTop();
			$('.registration-optional').fadeOut(500);
			setTimeout(function(){
				$('.registration-mandatory').fadeIn(500);
			}, 500)
		}
	}) 
	// END REGISTRATION PAGE JS//

// ######################################################################################################################################

	// START PRODUCTS PAGE JS //

	// END PRODUCTS PGAE JS //
});

var timeOut;
function scrollToTop() {
  if (document.body.scrollTop != 0 || document.documentElement.scrollTop != 0){
    window.scrollBy(0, -50);
    timeOut = setTimeout('scrollToTop()', 10);
  } else clearTimeout(timeOut);
}

function resizeWrapper() {
	var windowHeight = $(window).height()-200;
	$('.main-wrapper').css('min-height', windowHeight);
}


// START PROFILE PAGE


$('body').on('click', '.submit-edit-info', function() {
	$('.edit-profile-info-form').submit();
});


// if($('body').on('click','.edit-profile-info-form#password-edit').val()!=$('body').on('click','edit-profile-info-form#repeat-password-edit').val())
// 	console.log('password dont match');


var er;
$('body').on('click', '.mail', function() {
var re = '.edit-profile-info-form';
		if ($(re+'#password-edit').val() != $(re+'#repeat-password-edit').val()) er += '<li>The two passwords do not match !</li>';
		console.log(er);
	});
// END PROFILE PAGE
