var searchPlaces = function () {
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
                window.location.replace('/view/portal');
            } else {
                alert('no boardings found');
            }
        },
        error: function () {
            alert('search failed');
        },
        processData: false,
        type: 'POST',
        url: '/api/search-boarding'
    });
}

var displayPlaces = function (places) {
    var html = '';
    for (var place of places) {
        const row = '<tr>'
            + '<th scope="row">' + place.placeId + '</th>'
            + '<td>' + place.rental + '</td>'
            + '<td>' + place.capacity + '</td>'
            + '<td>' + place.advance + '</td>'
            + '<td>' + place.address + '</td>'
            + '<td>' + place.rental + '</td>'
            + '<td><a href="">Make reservation</a></td>'
            + '</tr>'

        html += row;
    }

    $('#displayarea').html(html);
}