var Portfolio = require('../model/portfolio').Portfolio;

module.exports.get = function(req, res, next) {
    Portfolio.find({},
        function(err, result) {
            if (err) return next(err);
            res.render('index', {
                data: result
            });
        }).limit(9);
}
