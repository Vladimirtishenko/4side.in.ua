var Team = React.createClass({
	render: function () {
		var ArrayTeam = this.props.content.team.length > 0 ? this.props.content.team.map(function(item, i){
			return <TemplateTeam data={item} context={TemplateWithoutInput} />
		}): null;
		return (
			<div className="Team height-full">
				<h1 className="title-for-block">{this.props.title}</h1>
				<div className="outer-members">
					{ArrayTeam}
					<TemplateWithInput />
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

	render: function(){	
		if(this.props.data == this.state.data)	{
			return (<this.state.context replace={this.replaceTemplate} data={this.state.data} />);
		} else {
			return (<this.props.context replace={this.replaceTemplate} data={this.props.data} />);
		}
	}	
})

var TemplateWithoutInput = React.createClass({


	render: function (){
		return (
			<div className="outer-of-team">
				<div className="members-item">
					<i className="fa fa-pencil edit-about-block" onClick={this.props.replace}></i>
					<img src={this.props.data.src} />
					<h3>{this.props.data.name}</h3>
					<h4>{this.props.data.profession}</h4>
					<p>{this.props.data.description}</p>
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

	addNewUser: function(){
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
		setTimeout(function(){self.imageReset()}, 500)
		

		_controller_.OnlyAddNoResponseData(url, data, method, type, actionName);

	},

	imageReset: function(){
		this.setState({
			images: "/images/add-user.png"
		});
	},


	fileReaderImage: function(){

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
		return (
			<div className="outer-of-team">
				<div className="peloader-to-add"><img src="/images/preloader_1.gif" /></div>
				<form onSubmit={this.addNewUser} className="for-for-team-edit-or-add">
					<label htmlFor="hidden_file">
						<img src={this.state.images} />
						<input type="file" onChange={this.fileReaderImage} name="upload" id="hidden_file" required={this.props.data ? "" : "required"}/>
					</label>
					<input type="text" name="name" placeholder="Имя" defaultValue={this.props.data ? this.props.data.name : ""} required="required" />
					<input type="text" name="profession" placeholder="Должность" defaultValue={this.props.data ? this.props.data.profession : ""} required="required" />
					<input type="text" name="description" placeholder="Описание" defaultValue={this.props.data ? this.props.data.description : ""} required="required" />
					<input type="hidden" name="id" defaultValue={this.props.data ? this.props.data._id : ""} />
					<button type="submit"> + </button>
				</form>
			</div>
		);
	}
})

allMyComponents['Team'] = Team;