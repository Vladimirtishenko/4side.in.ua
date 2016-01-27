var Contact = React.createClass({
	getInitialState: function(){
		return {
			content: this.props.content,
			template: ContactTemplate
		}
	},
	edit: function(){
		this.setState({
			template: EditTemplate
		})
	},
	arrayOfDatas: function(){
		var images = (this.props.content && this.props.content.src) ? this.props.content : '/images/map_image_template.gif',
			phonesArray = (this.props.content && this.props.content.phones) ? this.props.data.phones.join(";") : null,
			mail = (this.props.content && this.props.content.mail) ? this.props.content.mail : null,
			adress = (this.props.content && this.props.content.adress) ? this.props.content.adress : null,
			phones = phonesArray ? phonesArray.map(function(item, i){
				return <p key={i}>{item}</p>
			}) : null;

		return {images: images, mail: mail, adress: adress, phones: phones};
	},
	render: function () {
		var data = this.arrayOfDatas();
		return (
			<this.state.template title={this.props.title} edit={this.edit} getData={data} />
		);
	}
	
})

var ContactTemplate = React.createClass({
	render: function() {
		var data = this.props.getData;
		return( 
			<div className="Contact height-full">
				<h1 className="title-for-block">{this.props.title}</h1>
				<div className="outer-members">
					<i className="fa fa-pencil edit-about-block" onClick={this.props.edit}></i>
					<div className="block-for-slides-campany">
						<div className="area-for-content">
							{data.phones}
							<p>{data.adress}</p>
							<p>{data.mail}</p>
						</div>
						<div className="area-for-content">
							<img src={data.images} />
						</div>
					</div>
				</div>
			</div>
		);
	}
})

var EditTemplate = React.createClass({
	getInitialState: function(){
		return {
			imagesTemplate: this.props.getData.images
		}
	},
	editContact: function(){

	},
	imageChange: function(){

	},
	render: function() {
		var data = this.props.getData;
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
								<p>Перечислить телефоны разделяя знаком ';' без пробелов между номерами.</p>
								<input type="text" className="title-portfolio" name="phone" placeholder="Телефоны" required="required"/>
								<input type="text" className="description-portfolio" name="adress" placeholder="Адресс" required="required"/>
								<input type="text" className="technology-portfolio" name="mail" placeholder="Email" required="required"/>
							</div>
						</div>
					<button type="submit" className="button button-center">Сохранить</button>
					</form>
				</div>
			</div>
		);
	}
});

allMyComponents['Contact'] = Contact;