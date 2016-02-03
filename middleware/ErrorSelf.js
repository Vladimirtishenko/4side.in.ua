function ErrorSelf(res, err, next){
	if(err){
		if(typeof err == 'string'){err = {}, err.status = '404'}
		res.render('err', {err: err});
	}

}

ErrorSelf.prototype.name = "ErrorSelf"

module.exports.ErrorSelf = ErrorSelf;