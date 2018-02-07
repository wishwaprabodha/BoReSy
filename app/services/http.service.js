var sendResponse = function (res, statusCode, error, data) {
    res.status(statusCode);
    if (error) {
        console.error(error);
        res.send({
            success: false,
            error: error
        })
    } else {
        res.send({
            success: true,
            data: data
        })
    }
}

module.exports = {
    sendResponse: sendResponse
}