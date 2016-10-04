var Contact = React.createClass({
	getInitialState: function(){
		return {
			content: this.props.content,
			lang: this.props.lang,
			translator: this.props.translator,
			template: ContactTemplate
		}
	},
	componentWillReceiveProps: function(nextProps){
		this.setState({
			template: ContactTemplate,
			content: nextProps.content
		})
	},
	edit: function(){
		this.setState({
			template: EditTemplate
		})
	},
	arrayOfDatas: function(){
		var property = this.state.content[0],
			data = {};

		for(var key in property){
			data[key] = property[key];
		}

		return data;
	},
	render: function () {
		var data = this.arrayOfDatas();
		return (
			<this.state.template title={this.props.title} translator={this.state.translator} edit={this.edit} lang={this.state.lang} getData={data} />
		);
	}
	
})

var ContactTemplate = React.createClass({

	parseVariable: function(arr){
		var el = (arr && arr.split(";")) ? arr.split(";").map(function(item, i){
				return <p key={i}>{item}</p>
			}) : "";

		return el;
	},

	render: function() {
		var data = this.props.getData,
			phones = this.parseVariable(data.phone);
			adress = this.parseVariable(data['adress_'+this.props.lang]);
		return( 
			<div className="Contact height-full">
				<h1 className="title-for-block">{this.props.title}</h1>
				<div className="outer-members">
					<i className="fa fa-pencil edit-about-block" onClick={this.props.edit}></i>
						<div className="area-for-content">
							<div className="area-for-content__helpers">
								{phones}
								{adress}
								<p>{data.mail}</p>
							</div>
						</div>
						<div className="area-for-content">
							<img src={data.src ? data.src : '/images/map_image_template.gif'} />
						</div>
				</div>
			</div>
		);
	}
})

var EditTemplate = React.createClass({
	getInitialState: function(){
		return {
			imagesTemplate: this.props.getData.src,
			imagesFile: null
		}
	},
	editContact: function(event){
		event.preventDefault();
		
		var input = event.target.querySelectorAll('input[type="text"], input[type="hidden"]'),
			data,
			url = '/manage/Contact',
			method = 'POST',
			type,
			actionName = 'Contact';


		if(this.state.imagesFile){
			data = {};
			data['upload'] = this.state.imagesFile;
			for (var i = 0; i < input.length; i++) {
				data[input[i].name] = input[i].value;
			};
			type = null;
		} else {
			data = ''
			data += 'src='+this.state.imagesTemplate+'&'
			for (var i = 0; i < input.length; i++) {
				data += input[i].name+'='+input[i].value+'&';
			};
			data = data.slice(0, -1);
			type = 'application/x-www-form-urlencoded';
		}

		_controller_.OnlyAddNoResponseData(url, data, method, type, actionName);

	},
	imageChange: function(event){
		var file = event.target.files[0],
			self = this;

		var reader = new FileReader();

		reader.onload = (function(theFile) {
		return function(e) {

			self.setState({
				imagesTemplate: e.target.result,
				imagesFile: theFile
			})

		};
		})(file);

		reader.readAsDataURL(file);
	},
	render: function() {
		var data = this.props.getData,
			translator = this.props.translator;
		return (
			<div className="Contact height-full">
				<h1 className="title-for-block">{this.props.title}</h1>
				<div className="outer-levels-step padding-block">
					<form onSubmit={this.editContact}>
						<div className="outer-table">
							<div className="left-to-gen-image">
								<label htmlFor="hidden_file">
									<img className="add-gen-photo" src={this.state.imagesTemplate} />
									<input type="file" onChange={this.imageChange} name="upload" id="hidden_file"/>
								</label>
							</div>
							<div className="right-to-desctiption">
								<p>{translator.PHONE_RULES}</p>
								<input type="hidden" name='id' defaultValue={data._id}/>
								<input type="text" className="title-portfolio" name="phone" placeholder="Телефоны" defaultValue={data.phone || ""} required="required"/>
								<input type="text" className="description-portfolio" name="adress_ru" placeholder="Адресс на русском" defaultValue={data.adress_ru || ""} required="required"/>
								<input type="text" className="description-portfolio" name="adress_en" placeholder="Адресс на английском" defaultValue={data.adress_en || ""} required="required"/>
								<input type="text" className="technology-portfolio" name="mail" placeholder="Email" defaultValue={data.mail || ""} required="required"/>
							</div>
						</div>
					<button type="submit" className="button button-center">{translator.SAVE}</button>
					</form>
				</div>
			</div>
		);
	}
});

allMyComponents['Contact'] = Contact;