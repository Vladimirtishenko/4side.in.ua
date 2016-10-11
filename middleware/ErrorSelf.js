var Contact = require('../model/contact').Contact;

function ErrorSelf(res, err, next){
	if(err){
		if(typeof err == 'string'){err = {}, err.status = '404'}

		Contact.find({},
            function(error, result) {
                if (error) {
		            return ErrorSelf(res, error, next);
		        }

                res.render('err', {err: err, data: result});
            });

	}
}

ErrorSelf.prototype.name = "ErrorSelf"

module.exports.ErrorSelf = ErrorSelf;