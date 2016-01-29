function responseResult(err, res) {
    if (err) {
        res.send({
            'status': 500,
            'message': err
        });
        return;
    }
    res.send({
        'status': 200
    });
}

responseResult.prototype.name = "responseResult";

module.exports.responseResult = responseResult;