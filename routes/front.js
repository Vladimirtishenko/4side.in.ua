var Portfolio = require('../model/portfolio').Portfolio;
var ErrorSelf = require('../middleware/ErrorSelf').ErrorSelf;

module.exports.get = function(req, res, next) {
    Portfolio.find({},
        function(err, result) {
            if(err){
                return ErrorSelf(res, err, next);
            }
            res.render('index', {
                data: result
            });
        }).limit(8).sort({date: -1});
}
