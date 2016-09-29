var About = React.createClass({

	getInitialState: function (){
		return {
			content: this.props.content,
			append: false,
			editNumber: null,
		}
	},

	editState: function (event) {

		this.setState({
			append: true,
			editNumber: event.target.parentNode.getAttribute('name')
		})
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({
			content: nextProps.content
		})
	},

	saveInfo: function(event){

		event.preventDefault();

		var variables = event.target.querySelectorAll('textarea');
			data = 'src='+null+'&number='+this.state.editNumber+'&description='+true,
			url = '/manage/About',
			method = 'POST',
			type = 'application/x-www-form-urlencoded',
			actionName = 'About';

		for (var i = 0; i < variables.length; i++) {
				data += '&'+variables[i].getAttribute('name')+'='+variables[i].value
		};

		this.setState({
			append: false,
			editNumber: null
		})

		_controller_.OnlyAddNoResponseData(url, data, method, type, actionName);
	},

	newAddImages: function(event){

		var files = event.target.files[0],
			url = '/manage/About',
			method = 'POST',
			self = this,
			type = null,
			actionName = 'About';

		self.setState({
			append: false,
			editNumber: null
		})

		 _controller_.OnlyAddNoResponseData(url, {upload:files, number: parseInt(this.state.editNumber)}, method, type, actionName); 
	},

	closeEditZone: function(){
		this.setState({
			append: false,
			editNumber: null
		})
	},

	render: function () {

		var ArrayOfTemplateComponents = [],
			emptyObj = {},
			objOfEdit;

		for (var i = 0; i < 6; i++) {
				ArrayOfTemplateComponents.push(
					<TemplateForAbout 
						info={this.state.content.abouts[i] && this.state.content.abouts[i].number == i ? this.state.content.abouts[i] : emptyObj} 
						edit={this.editState} 
						key={i+Math.random()} 
						keys={i}/>
				)
				
				if(this.state.editNumber && this.state.content.abouts[i] && this.state.editNumber == this.state.content.abouts[i].number){
					objOfEdit = this.state.content.abouts[i];
				}
		};

		return (
			<div className="About height-full">
				{this.state.append 
					? 
					<TemplateEdit 
						saveImg={this.newAddImages} 
						data={objOfEdit} 
						saveInfo={this.saveInfo} 
						closeEditZone={this.closeEditZone} 
						number={this.state.editNumber} /> 
					: ""
				}
				<h1 className="title-for-block">{this.props.title}</h1>
				<div className="outer-all-about-block">
					{ArrayOfTemplateComponents}
				</div>
			</div>
		)
	}
})

var TemplateForAbout = React.createClass({
	render: function () {
		var description = this.props.info.description ? <p className="padding-text">{this.props.info.description_ru}</p> : null,
			src = this.props.info.src ? <img src={this.props.info.src} /> : null;
		return (
			<div className="area-for-content" name={this.props.keys}>
				{description ? description : src ? src : <p className="padding-text">Block are empty</p>}
				<i className="fa fa-pencil edit-about-block" onClick={this.props.edit}></i>
			</div>
		);
	} 
})

var TemplateEdit = React.createClass({
	render: function () {

		var data = this.props.data ? this.props.data : {},
			description_ru = this.props.data.description_ru ? this.props.data.description_ru : "",
			description_en = this.props.data.description_en ? this.props.data.description_en : "";

		return (
			<div className="block-for-slides-campany">
				<div className="to-text-form">
					<form className="to-text-form-inner" onSubmit={this.props.saveInfo}>
						<p>Добавить текст</p>
						<div className="for-button-absolute">
							<button type="submit" className="button-save"></button>
							<span className="button-close" onClick={this.props.closeEditZone}></span>
						</div>
						<textarea rows="5" className="area-of-text" name="description_en" placeholder="Description English" defaultValue={description_en} required></textarea>
						<textarea rows="5" className="area-of-text" name="description_ru" placeholder="Описание на русском" defaultValue={description_ru} required></textarea>
						<p className="-or">или</p>
					</form>
					<label htmlFor="hidden_file" className="button button-no-with">
						Добавить изображение
						<input onChange={this.props.saveImg} name='upload' type="file" id="hidden_file" />
					</label>
				</div>	
			</div>
		);
	}
})

allMyComponents['About'] = About;