function Variables (Arrays) {
	
	var variables = {};

	for(var val in Arrays){
		variables[val] = Arrays[val];
	}

	return variables;

}

Variables.prototype.name = "Variables";

module.exports.Variables = Variables;