function Authorize(){
	this.Forms = document.getElementById('form-authorize');
	this.Forms.addEventListener('submit', this.tryValidate.bind(this))
}

Authorize.prototype.tryValidate = function(event) {
	event.preventDefault();
	var ArrayOfElement = event.target.querySelectorAll('input'),
		self = this,
		validateInput = [].filter.call(ArrayOfElement, self.eachInput);

		if(validateInput.length == ArrayOfElement.length){
			self.xhrValidate(validateInput);
		} 

};

Authorize.prototype.xhrValidate = function(arrayOfArguments){
	var xhr = new XMLHttpRequest(),
		str = '';


	 arrayOfArguments.forEach(function(item, i){
	 	str += item.name+'='+item.value+'&';
	 })

	 xhr.onreadystatechange = function(){
	 	if(xhr.status == 200 && xhr.readyState == 4){
	 		if(JSON.parse(xhr.responseText).status == 200){
	 			window.location.href = '/manage';
	 		}
	 	} else {

	 	}
	 }

	 xhr.open('POST', '/login',  true);
	 xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
	 xhr.send(str.slice(0,-1));


}

Authorize.prototype.eachInput = function(item, i){
	if(!item.value){
		item.style.background = "pink";
	} else {
		return item;
	}
}

new Authorize();