/****************************
Insert current year to footer
****************************/

$(function() {
    var thisYear = new Date();
    $('#current-date').text(thisYear.getFullYear());
});

/****************************
    Custom smooth scroll
****************************/
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});

/****************************
   Link to top hide/show
****************************/
var isVisible = false;
$(window).scroll(function(){
     var shouldBeVisible = $(window).scrollTop()>200;
     if (shouldBeVisible && !isVisible) {
          isVisible = true;
          $('#link-to-top').addClass('shown');
     } else if (isVisible && !shouldBeVisible) {
          isVisible = false;
          $('#link-to-top').removeClass('shown');
    }
});


/****************************
  Contact form verification
****************************/
// regexp to execute verif
var nameReg = /^[A-Za-z]+$/;
var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
var msgReg = /.*/;

function verifyInput(input, testString, place, msg) {
    if($(input).val() == "") {
        markErrorInput(input);
        insertMessage(place, 'Veillez remplir ce champs, svp');
    }
    else if(!testString.test($(input).val())) {
        markErrorInput(input);
        insertMessage(place, msg);
    }
    else {
        markSuccessInput(input);
        insertMessage(place, ' ');
    }
}

// make particular input border red in case of failure
function markErrorInput(input) {
    $(input).css('border-color', 'red');
}
// make particular input border green in case of success
function markSuccessInput(input) {
    $(input).css('border-color', 'green');
}

function insertMessage(place, msg) {
    $(place).text(msg);
}

$('#firstname').focusout(function() {
    verifyInput(this, nameReg, '#name-msg', 'Utilisez que des lettres, svp');
});

$('#email').focusout(function() {
    verifyInput(this, emailReg, '#email-msg', 'Veillez mettre un email correct, svp');
});

$('#msg').focusout(function() {
    verifyInput(this, msgReg, '#msg-msg', 'Veillez mettre un email correct, svp');
});

$('#contact-form').on('submit', function(event) {
    event.preventDefault();
    verifyInput('#firstname', nameReg, '#name-msg', 'Utilisez que des lettres, svp');
    verifyInput('#email', emailReg, '#email-msg', 'Veillez mettre un email correct, svp');
    verifyInput('#msg', msgReg, '#msg-msg', 'Veillez mettre un email correct, svp');
});
