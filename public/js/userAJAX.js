$.get('/user/following', (following) => {
    var $f = $('<div class="following-list"');
    $f.append('<ul>');
    following.forEach((f1) => {
        $f.append(`<li> ${f1} </li>`);
    });
    $f.append('</ul>');
    console.log($f);
    $('.user-container').html($f);
});