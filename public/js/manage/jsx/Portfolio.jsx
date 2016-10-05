var Portfolio = React.createClass({
		
	getInitialState: function(){
		return {
			template: MainTemplateTable,
			content: this.props.content,
			lang: this.props.lang,
			translator: this.props.translator,
			id: null
		}
	},

	changeTemplate: function(edit, event){
		var id = (event && event.target && event.target.getAttribute('data-id-number')) || null;
		this.setState({
			template: edit,
			id: id
		})
	},

	componentWillReceiveProps: function(nextProps){
		this.setState({
			template: MainTemplateTable,
			content: nextProps.content
		})
	},

	render: function () {
		return (
			<div className="Portfolio height-full">
				<h1 className="title-for-block">{this.props.title}</h1>
				<this.state.template id={this.state.id} data={this.state.content} translator={this.state.translator} lang={this.state.lang} change={this.changeTemplate}/>
			</div>
		)
	}
});

var MainTemplateTable = React.createClass({
	
	deleteItem: function(event){
		var _id = event.target.getAttribute("data-id-path"),
			categoryId = event.target.getAttribute("data-id-category"),
			type = 'application/x-www-form-urlencoded',
			url = '/manage/Portfolio',
			actionName = 'Portfolio';

		_controller_.OnlyDelete(_id, categoryId, type, actionName, url);
	},

	render: function(){
		var translator = this.props.translator,
			edit = this.props.change.bind(null, EditTemplate),
			add = this.props.change.bind(null, addTemplate),
			TableArray = this.props.data.length > 0 ? this.props.data.map(function(item, i){
				return (
						<tr key={i}>
							<td>{i + 1}</td>
							<td>{item['title_'+this.props.lang]}</td>
							<td><img src={item.src} /></td>
							<td>
								<i className="fa fa-pencil" data-id-number={i} data-id-path={item._id} data-id-category={item.gallery_id} onClick={edit}></i>
								<i className="fa fa-trash" data-id-path={item._id} data-id-category={item.gallery_id} onClick={this.deleteItem}></i>
							</td>
						</tr>
					);
		}, this) : null;	
		return(
			<div className="outer-tebles">
				<button onClick={add} className="button add-portfolio">{translator.ADD_WORK}</button>
				<table className="table-for-portfolio table">
					<thead>
						<tr className="default">  
							<th>#</th>
							<th>{translator.NAME_OF_PROJECT}</th>
							<th>{translator.PREVIEW}</th>
							<th>{translator.ACTIONS}</th>
						</tr>
					</thead>
					<tbody>
						{TableArray}
					</tbody>
				</table>
			</div>
		);
	}
})

var addTemplate = React.createClass({
	
	getInitialState: function(){
		return {
			imagesContent: [],
			imagesArray: {},
			imagesTempString: '/images/addTempPhoto.png',
			imagesTempTitleString: '/images/addTitlePhoto.png',
			imageTemp: null,
			imageTitle: null
		}
	},

	deletePhoto: function(event){
		var identify = event.target.parentNode.getAttribute('name'),
			self = this;

		delete this.state.imagesArray[identify];

		var newPreloadPhoto = this.state.imagesContent.filter(eachContent);

		function eachContent(item, i){
			if(item.props.name != identify){
				return item
			}
		}

		this.setState({
			imagesContent: newPreloadPhoto,
			imagesArray: this.state.imagesArray
		})

	},

	addPhoto: function(event, files){


		var Files = (event && event.target && event.target.files) ? event.target.files : files,
			self = this;

		for (var i = 0; i < Files.length; i++) {
			
			var reader = new FileReader();

			reader.onload = (function(theFile) {
			return function(e) {

				var Random = Math.random().toString().slice(2);

				self.state.imagesArray[Random] = theFile;

				self.state.imagesContent.push(<span key={i+Math.random()} name={Random}><img src={e.target.result}/><i onClick={self.deletePhoto}></i></span>);

			  	self.setState({
					imagesContent: self.state.imagesContent,
					imagesArray: self.state.imagesArray
				})

			};
			})(Files[i]);

			reader.readAsDataURL(Files[i]);
			
		};

		if(event && event.target){
			event.target.value = ''
		}


	},

	tempImageToGallery: function(strings, event){

		var file = event.target.files[0],
			self = this;

		var reader = new FileReader();

		reader.onload = (function(theFile) {
		return function(e) {

			if(strings == 'title'){
				self.setState({
					imagesTempTitleString: e.target.result,
					imageTitle: theFile
				})
			} else {
				self.setState({
					imagesTempString: e.target.result,
					imageTemp: theFile
				})
			}

		};
		})(file);

		reader.readAsDataURL(file);

	},

	addFormGalery: function(event){
		event.preventDefault();
		var input = event.target.querySelectorAll('input[type="text"]'),
			data = {},
			url = '/manage/Portfolio',
			method = 'POST',
			type = null,
			actionName = 'Portfolio';

		for (var i = 0; i < input.length; i++) {
			data[input[i].name] = input[i].value;
		};

		data['upload_temp_image'] = this.state.imageTemp;
		data['upload_title_image'] = this.state.imageTitle;
		data['upload_galery_image'] = [];


		for (var i in this.state.imagesArray) {
			data['upload_galery_image'].push(this.state.imagesArray[i])
		};

		_controller_.OnlyAddNoResponseData(url, data, method, type, actionName);

	},

	onDragOver: function(event){
		event.preventDefault();
		event.stopPropagation();
		if(!this.refs.target.getDOMNode().classList.contains("-drag-start")){
			this.refs.target.getDOMNode().classList.add("-drag-start")
		}
	},

	onDrops: function(event){
		event.preventDefault();

		this.refs.target.getDOMNode().classList.remove("-drag-start")

		var files;
        if (event.dataTransfer) {
          files = event.dataTransfer.files;
        } else if (event.target) {
          files = event.target.files;
        }

        this.addPhoto(null,files);

	},

	onDragLeave: function(event){
		event.preventDefault();
		event.stopPropagation();
		this.refs.target.getDOMNode().classList.remove("-drag-start")
	},

	render: function(){
		var translator = this.props.translator;
		return (
			<form onSubmit={this.addFormGalery}>
				<div className="outer-to-add">
					<div className="outer-levels-step">
						<div className="left-to-gen-image">
							<label htmlFor="hidden_file">
								<img className="add-gen-photo" src={this.state.imagesTempString} />
								<input onChange={this.tempImageToGallery.bind(this, 'temp')} type="file" name="upload" id="hidden_file" required="required"/>
							</label>
							<label htmlFor="hidden_files">
								<img className="add-gen-photo" src={this.state.imagesTempTitleString} />
								<input onChange={this.tempImageToGallery.bind(this, 'title')} type="file" name="upload" id="hidden_files" required="required"/>
							</label>
						</div>
						<div className="right-to-desctiption">
							<input type="text" className="title-portfolio" name="title_ru" placeholder={translator.NAME_OF_PROJECT_RU} required="required"/>
							<input type="text" className="title-portfolio" name="title_en" placeholder={translator.NAME_OF_PROJECT_EN} required="required"/>
							<input type="text" className="description-portfolio" name="description_ru" placeholder={translator.DESCRIPTION_RU} required="required"/>
							<input type="text" className="description-portfolio" name="description_en" placeholder={translator.DESCRIPTION_EN} required="required"/>
							<input type="text" className="technology-portfolio" name="technology" placeholder={translator.TECHNOLOGY} required="required"/>
							<input type="text" className="origin-portfolio" name="origin_ru" placeholder={translator.FEAUTURES_RU} required="required"/>
							<input type="text" className="origin-portfolio" name="origin_en" placeholder={translator.FEAUTURES_EN} required="required"/>
						</div>
					</div>
					<div className="outer-all-photos">
						<h4>{translator.ADD_GALLERY}</h4>
						<div draggable='true' ref="target" className="add-many-images" onDragOver={this.onDragOver} onDrop={this.onDrops} onDragLeave={this.onDragLeave}>
							<div className="area-of-drop">
								<h2>{translator.MOVE_FILE}</h2>
								<p>{translator.OR}</p>
								<input onChange={this.addPhoto} type="file" name="uploads" multiple/>
							</div>
						</div>
						<div className="area-of-many-images">
							{this.state.imagesContent}
						</div>
					</div>
					<button className="save-form button" type="submit">{translator.SAVE}</button>
				</div>
			</form>
		);
	}
})

var EditTemplate = React.createClass({
	updateDescription: function(event){
		event.preventDefault();
		var input = event.target.querySelectorAll('input[type="text"]'),
			data = 'id='+this.props.data[this.props.id]._id,
			url = '/manage/Portfolio',
			method = 'POST',
			type = 'application/x-www-form-urlencoded',
			actionName = 'Portfolio';

		for (var i = 0; i < input.length; i++) {
			data += '&'+input[i].getAttribute('name')+'='+input[i].value
		};

		_controller_.OnlyAddNoResponseData(url, data, method, type, actionName);
	},
	render: function(){
		var translator = this.props.translator,
			data = this.props.data[this.props.id];
		return (
			<form onSubmit={this.updateDescription}>
				<div className="outer-to-add">
					<div className="outer-levels-step">
						<div className="right-to-desctiption">
							<input type="text" className="title-portfolio" name="title_ru" placeholder={translator.NAME_OF_PROJECT_RU} defaultValue={data.title_ru} required="required"/>
							<input type="text" className="title-portfolio" name="title_en" placeholder={translator.NAME_OF_PROJECT_EN} defaultValue={data.title_en} required="required"/>
							<input type="text" className="description-portfolio" name="description_ru" placeholder={translator.DESCRIPTION_RU} defaultValue={data.description_ru} required="required"/>
							<input type="text" className="description-portfolio" name="description_en" placeholder={translator.DESCRIPTION_EN} defaultValue={data.description_en} required="required"/>
							<input type="text" className="technology-portfolio" name="technology" placeholder={translator.TECHNOLOGY} defaultValue={data.technology} required="required"/>
							<input type="text" className="origin-portfolio" name="origin_ru" placeholder={translator.FEAUTURES_RU} defaultValue={data.origin_ru} required="required"/>
							<input type="text" className="origin-portfolio" name="origin_en" placeholder={translator.FEAUTURES_EN} defaultValue={data.origin_en} required="required"/>
						</div>
					</div>
					<button className="save-form button" type="submit">{translator.SAVE}</button>
				</div>
			</form>
		)
	}
})

allMyComponents['Portfolio'] = Portfolio;