$("#signupbtn").click(function (event) {
    event.preventDefault();

    var data = {
        fullName: $('#fullname').val(),
        address: $('#address').val(),
        contact: $('#contact').val(),
        nic: $('#nic').val(),
        email: $('#email').val(),
        username: $('#username').val(),
        password: $('#password').val()
    }

    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                window.location.replace('/dashboard');
            }
        },
        error: function () {
            console.error("login failed");
        },
        processData: false,
        type: 'POST',
        url: '/api/signup'
    });
});