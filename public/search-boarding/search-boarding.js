var searchBoardings = function () {
    const gender = $('#gender').val();
    const minRental = $('#minrental').val();
    const maxRental = $('#maxrental').val();

    $.ajax({
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
        type: 'GET',
        url: '/api/boardings?gender=' + gender + '&minRental=' + minRental + '&maxRental=' + maxRental
    });
}

var makeReservation = function (boardingId) {
    var data = {
        boardingId: boardingId
    }
    
    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                window.location.replace('/portal');
                alert('reservation added');
            } else {
                alert('reservation not added');
            }
        },
        error: function () {
            alert('reservation failed');
        },
        processData: false,
        type: 'POST',
        url: '/api/reservations'
    });
}

var displayPlaces = function (boardings) {
    var html = '';
    for (var boarding of boardings) {
        const row = '<tr>'
            + '<th scope="row">' + boarding.id + '</th>'
            + '<td>' + boarding.rental + '</td>'
            + '<td>' + boarding.capacity + '</td>'
            + '<td>' + boarding.advance + '</td>'
            + '<td>' + boarding.address + '</td>'
            + '<td>' + boarding.gender + '</td>'
            + '<td><button class="btn btn-primary" onClick="makeReservation(' + boarding.id + ')">Make reservation</a></td>'
            + '</tr>'

        html += row;
    }

    $('#displayarea').html(html);
}