// Prevent element default
$("#loginbtn").click(function (event) {
    event.preventDefault();

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
                window.location.replace('/dashboard');
            }
        },
        error: function () {
            console.error("login failed");
        },
        processData: false,
        type: 'POST',
        url: '/api/login'
    });
});