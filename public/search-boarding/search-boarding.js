var searchBoardings = function () {
    var data = {
        gender: $('#gender').val(),
        min_rental: $('#min_rental').val(),
        max_rental: $('#max_rental').val()
    }

    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                displayPlaces(response.data);
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

var makeReservation = function (placeId) {
    alert('reservation successfull, placeId: ' + placeId);
}

var displayPlaces = function (places) {
    var html = '';
    for (var place of places) {
        const row = '<tr>'
            + '<th scope="row">' + place.placeid + '</th>'
            + '<td>' + place.rental + '</td>'
            + '<td>' + place.capacity + '</td>'
            + '<td>' + place.advance + '</td>'
            + '<td>' + place.address + '</td>'
            + '<td>' + place.rental + '</td>'
            + '<td><button class="btn btn-primary" onClick="makeReservation(' + place.placeid + ')">Make reservation</a></td>'
            + '</tr>'

        html += row;
    }

    $('#displayarea').html(html);
}