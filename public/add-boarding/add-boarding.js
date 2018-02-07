var addBoarding = function () {
    var data = {
        rental: $('#rental').val(),
        capacity: $('#capacity').val(),
        advance: $('#advance').val(),
        address: $('#address').val(),
        gender: $('#gender').val()
    }

    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                alert('boarding added');
                window.location.replace('/portal');
            } else {
                alert('boarding not added');
            }
        },
        error: function () {
            alert('boarding not added');
        },
        processData: false,
        type: 'POST',
        url: '/api/boardings'
    });
}