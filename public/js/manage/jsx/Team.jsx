var Team = React.createClass({
	
	getInitialState: function(){
		return {
			content: this.props.content,
			lang: this.props.lang,
			translator: this.props.translator
		}
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({
			content: nextProps.content
		})
	},

	render: function () {
		var ArrayTeam = this.state.content.length > 0 ? this.state.content.map(function(item, i){
			return <TemplateTeam key={i} data={item} translator={this.state.translator} lang={this.state.lang} context={TemplateWithoutInput} />
		}.bind(this)): null;

		return (
			<div className="Team height-full">
				<h1 className="title-for-block">{this.props.title}</h1>
				<div className="outer-members">
					{ArrayTeam}
					<TemplateWithInput translator={this.state.translator} lang={this.state.lang}/>
				</div>
			</div>
		)
	}
})

var TemplateTeam = React.createClass({
	
	getInitialState: function(){
		return {
			context: this.props.context,
			data: this.props.data
		}
	},

	replaceTemplate: function(){
		this.setState({
			context: TemplateWithInput,
			data: this.props.data
		})
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({
			data: nextProps.data,
			context: TemplateWithoutInput
		})
	},

	deleteItem: function(){
		var _id = this.props.data._id,
			type = 'application/x-www-form-urlencoded',
			url = '/manage/Team',
			actionName = 'Team';

	_controller_.OnlyDelete(_id, null, type, actionName, url);

	},

	render: function(){	
		return (<this.state.context delets={this.deleteItem} replace={this.replaceTemplate} translator={this.props.translator} lang={this.props.lang} data={this.state.data} />);
	}	
})

var TemplateWithoutInput = React.createClass({


	render: function (){
		return (
			<div className="outer-of-team">
				<div className="members-item">
					<i className="fa fa-pencil edit-about-block" onClick={this.props.replace}></i>
					<i className="fa fa-trash edit-about-block-right" onClick={this.props.delets}></i>
					<img src={this.props.data.src} />
					<h3>{this.props.data['name_'+this.props.lang]}</h3>
					<h4>{this.props.data.profession}</h4>
					<p>{this.props.data['description_'+this.props.lang]}</p>
				</div>
			</div>
		);
	}
})

var TemplateWithInput = React.createClass({

	getInitialState: function(){
		return {
			images: this.props.data ? this.props.data.src : "/images/add-user.png"
		}
	},

	addNewUser: function(event){
		event.preventDefault();

		var variables = event.target.querySelectorAll('input'),
			data = {},
			url = '/manage/Team',
			method = 'POST',
			type = null,
			actionName = 'Team',
			self = this;

		for (var i = 0; i < variables.length; i++) {
			if(variables[i].getAttribute('type') == 'file'){
				data[variables[i].getAttribute('name')] = variables[i].files[0]
			} else {
				data[variables[i].getAttribute('name')] = variables[i].value
			}
		};

		event.target.reset();
		self.imageReset()
		

		_controller_.OnlyAddNoResponseData(url, data, method, type, actionName);

	},

	imageReset: function(){
		this.setState({
			images: "/images/add-user.png"
		});
	},


	fileReaderImage: function(event){

		var reader = new FileReader(),
			self = this,
			files = event.target.files[0];

		reader.onload = (function(theFile) {
		return function(e) {

		  	self.setState({
				images: e.target.result
			})

		};
		})(files);

		reader.readAsDataURL(files);


	},

	render: function (){
		var translator = this.props.translator;
		console.log(translator.NAME_RU);
		return (
			<div className="outer-of-team">
				<div className="peloader-to-add"><img src="/images/preloader_1.gif" /></div>
				<form onSubmit={this.addNewUser} className="for-for-team-edit-or-add">
					<label htmlFor="hidden_file">
						<img src={this.state.images} />
						<input type="file" onChange={this.fileReaderImage} name="upload" id="hidden_file" required={this.props.data ? "" : "required"}/>
					</label>
					<input type="text" name="name_ru" placeholder={translator.NAME_RU} defaultValue={this.props.data ? this.props.data.name_ru : ""} required="required" />
					<input type="text" name="name_en" placeholder={translator.NAME_EN} defaultValue={this.props.data ? this.props.data.name_en : ""} required="required" />
					<input type="text" name="profession" placeholder={translator.CAREER} defaultValue={this.props.data ? this.props.data.profession : ""} required="required" />
					<input type="text" name="description_ru" placeholder={translator.DESCRIPTION_RU} defaultValue={this.props.data ? this.props.data.description_ru : ""} required="required" />
					<input type="text" name="description_en" placeholder={translator.DESCRIPTION_EN} defaultValue={this.props.data ? this.props.data.description_en : ""} required="required" />
					<input type="hidden" name="id" defaultValue={this.props.data ? this.props.data._id : ""} />
					<button type="submit"> + </button>
				</form>
			</div>
		);
	}
})

allMyComponents['Team'] = Team;