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

  // var commentInput = document.getElementById('comments');
  // $(function() {
  //   $('#comments').keyup(function() {
  //     if (commentInput.value.length != 0) {
  //       $('.comment-button').prop('disabled', false);
  //       $('.comment-button').removeClass('tweet-danger');
  //       $('.comment-button').css('cursor', 'pointer');
  //     } else {
  //       $('.comment-button').prop('disabled', true);
  //       $('.comment-button').addClass('tweet-danger'); 
  //       $('.comment-button').css('cursor', 'not-allowed');
  //     }
  //   });
  // });
});

function remove(_this) {
    $(_this).parents('.tweet').remove();
}