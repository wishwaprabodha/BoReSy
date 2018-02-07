// Prevent element default
var login = function () {
    var data = {
        email: $('#email').val(),
        password: $('#password').val()
    }

    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                window.location.replace('/portal');
            } else {
                alert('email or password not match');
            }
        },
        error: function () {
            alert('login failed');
        },
        processData: false,
        type: 'POST',
        url: '/api/auth'
    });
}