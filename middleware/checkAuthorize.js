module.exports = function(req, res, next){
	if(!req.session.user){
		res.redirect(301, '/login');
  		res.end();
	}
	next();
}