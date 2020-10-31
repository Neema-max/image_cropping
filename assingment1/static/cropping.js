let x = 0,
    y = 0,
    x2 = 200,
    y2 = 200;
//$(document).on('submit', '#submit', function(e) {
//    alert("haa ayaa idhr");
//    e.preventDefault();
//    var formData = {
//        x = x,
//        y = y,
//        x2 = x2,
//        y2 = y2,
//    }
//    $.ajax({
//        type: 'POST',
//        url: '.',
//        data: formData,
//cache: false,
//contentType: false,
//processData: false,
//success: function(data) {
//    if (data.result == 'success') {
//        window.location.href = '..';
// $('.crop').attr('src', data.path);
// $('.crop').Jcrop({
//     onChange: showPreview,
//     onSelect: showPreview,
//     aspectRatio: 1,
// });
//
// function showPreview(coords) {
//     console.log(coords.w);
// }
//    } else {
//        $('#error').css({ 'display': 'block' });
//        $('#error').html(data.message);
//    }
//},
//error: function() {
//    contact_right_message_sent.text('Sorry! Something went wrong.');
//}
//});
//});
var id = 0;

function abc() {
    // alert('1');
    let form = document.getElementById('g_form');
    var formData = new FormData(form);
    formData.append('val', 1);
    console.log(formData);
    $.ajax({
        type: 'POST',
        url: '.',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(data) {
            if (data.result == 'success') {
                //window.location.href = '..';
                id = data.id;
                // alert('2');
                $('.crop').attr('src', data.path);
                $('.crop').Jcrop({
                    onChange: showPreview,
                    onSelect: showPreview,
                    aspectRatio: 1,
                });

                function showPreview(c) {
                    x = c.x;
                    y = c.y;
                    x2 = c.x2;
                    y2 = c.y2;
                    $('.x').val(x);
                    $('.y').val(y);
                    $('.x2').val(x2);
                    $('.y2').val(y2);
                }
            } else {
                $('#error').css({ 'display': 'block' });
                $('#error').html(data.message);
            }
        },
        error: function() {
            contact_right_message_sent.text('Sorry! Something went wrong.');
        }
    });
}
//$(document).on('submit', '#submit', function(e) {
//    e.preventDefault();
//        var formData = {
//            x = x,
//            y = y,
//            x2 = x2,
//            y2 = y2,
//        }
//        $.ajax({
//            type: 'POST',
//            url: '.',
//            data: formData,
//        })
//});



$(document).on('submit', '#submit', function(e) {
    e.preventDefault();
    //alert(4);
    let d = document.getElementById('submit');
    var data = {
        'val': 2,
        'x': x,
        'x2': x2,
        'y': y,
        'y2': y2,
        'id': id,
        csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
    }
    console.log(data);
    $.ajax({
        type: 'POST',
        url: '.',
        data: data,
        success: function(data) {
            window.location.href = '/success/' + id;
            //    alert(5)
        },
    });
});