$(document).ready(function() {
    var docHeight = $(document).height();
    var footerHeight = $('footer').outerHeight();
    var footerTop = $('footer').position().top + footerHeight;

    if (footerTop < docHeight) {
      $('footer').css('margin-top', 10 + (docHeight - footerTop) + 'px');
    }
 

var tweetInput = document.getElementById('status');
  $(function() {
    $('#status').keyup(function() {
      if (tweetInput.value.length != 0) {
        $('.tweet-button').prop('disabled', false);
        $('.tweet-button').removeClass('tweet-danger');
        $('.tweet-button').css('cursor', 'pointer');
      } else {
        $('.tweet-button').prop('disabled', true);
        $('.tweet-button').addClass('tweet-danger'); 
        $('.tweet-button').css('cursor', 'not-allowed');
      }
    });
  });

  var comment = document.getElementById('comments');
  $(function() {
    $('.tweet-comment').keyup(function() {
      if (comment.value.length != 0) {
        $('.comment-button').css('cursor', 'pointer');
      } else {
        $('.comment-button').css('cursor', 'default');
      }
    });
  });
});

function remove(_this) {
    $(_this).parents('.tweet').remove();
}

function isEmpty() {
  var comment = document.getElementById('comments').value;
  if (comment == "") return false;  
  return true;
}