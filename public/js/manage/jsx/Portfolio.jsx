var Portfolio = React.createClass({
		
	getInitialState: function(){
		return {
			template: MainTemplateTable
		}
	},

	changeTemplate: function(){
		this.setState({
			template: addTemplate
		})
	},

	render: function () {
		return (
			<div className="Portfolio height-full">
				<h1 className="title-for-block">{this.props.title}</h1>
				{this.state.template ? <this.state.template change={this.changeTemplate}/> : <MainTemplateTable />}
			</div>
		)
	}
});

var MainTemplateTable = React.createClass({
	render: function(){
		return(
			<div className="outer-tebles">
				<button onClick={this.props.change} className="btn btn-info add-portfolio">Добавить работу</button>
				<table className="table-for-portfolio table">
					<tr className="info">  
						<th>#</th>
						<th>Название</th>
						<th>Действия</th>
					</tr>
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
			imagesTemp: '/images/add_gen_photo.png'
		}
	},

	deletePhoto: function(){
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

				self.state.imagesContent.push(<span name={Random}><img src={e.target.result}/><i onClick={self.deletePhoto}></i></span>);

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

	tempImageToGallery: function(){
		var file = event.target.files[0],
			self = this;

		var reader = new FileReader();

		reader.onload = (function(theFile) {
		return function(e) {

			self.setState({
				imagesTemp: e.target.result
			})

		};
		})(file);

		reader.readAsDataURL(file);

	},

	addFormGalery: function(){

	},

	onDragOver: function(){
		event.preventDefault();
		event.stopPropagation();
		if(!this.refs.target.getDOMNode().classList.contains("-drag-start")){
			this.refs.target.getDOMNode().classList.add("-drag-start")
		}
	},

	onDrops: function(){
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

	onDragLeave: function(){
		event.preventDefault();
		event.stopPropagation();
		this.refs.target.getDOMNode().classList.remove("-drag-start")
	},

	render: function(){
		return (
			<form onSubmit={this.addFormGalery}>
				<div className="outer-to-add">
					<div className="outer-levels-step">
						<div className="left-to-gen-image">
							<label htmlFor="hidden_file">
								<img className="add-gen-photo" src={this.state.imagesTemp} />
								<input onChange={this.tempImageToGallery} type="file" name="upload" id="hidden_file" />
							</label>
						</div>
						<div className="right-to-desctiption">
							<input type="text" className="title-portfolio" name="title" placeholder="Название проекта" />
							<input type="text" className="description-portfolio" name="description" placeholder="Описание проекта" />
							<input type="text" className="technology-portfolio" name="technology" placeholder="Технологии" />
							<input type="text" className="origin-portfolio" name="origin" placeholder="Особенности" />
						</div>
					</div>
					<div className="outer-all-photos">
						<h4>Добавить галерею</h4>
						<div draggable='true' ref="target" className="add-many-images" onDragOver={this.onDragOver} onDrop={this.onDrops} onDragLeave={this.onDragLeave}>
							<div className="area-of-drop">
								<h2>Перетащить файл сюда</h2>
								<p>или</p>
								<input onChange={this.addPhoto} type="file" name="uploads" multiple/>
							</div>
						</div>
						<div className="area-of-many-images">
							{this.state.imagesContent}
						</div>
					</div>
					<button className="save-form btn btn-info" type="submit">Сохранить</button>
				</div>
			</form>
		);
	}
})

allMyComponents['Portfolio'] = Portfolio;