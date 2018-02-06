var signup = function () {
    var data = {
        fullname: $('#fullname').val(),
        address: $('#address').val(),
        contact: $('#contact').val(),
        nic: $('#nic').val(),
        email: $('#email').val(),
        username: $('#username').val(),
        password: $('#password').val(),
        type: $('#type').val(),
        gender: $('#gender').val()
    }

    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                alert('user added');
                window.location.replace('/view/portal');
            } else {
                alert('registration failed');
            }
        },
        error: function () {
            alert('registration failed');
        },
        processData: false,
        type: 'POST',
        url: '/api/signup'
    });
}