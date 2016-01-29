var About = React.createClass({

		getInitialState: function (){
			return {
				content: this.props.content
			}
		},

		editState: function (event) {

			var NumberBlock = event.target.parentNode.getAttribute('name'),
				self = this;

			this.state.content.abouts.forEach(function (item, i) {
				if(item.number == NumberBlock){
					self.state.content.abouts.splice(i, 1);
				}
			})

			this.setState({
				content: this.state.content
			})
		},


		componentWillReceiveProps: function(nextProps){
			this.setState({
				content: nextProps.content
			})
		},

		newAddInformation: function (descr, num) {
			var data = 'description='+descr+'&src='+null+'&number='+num,
				url = '/manage/About',
				method = 'POST',
				type = 'application/x-www-form-urlencoded';

			_controller_.OnlyAddNoResponseData(url, data, method, type, "About");
		},

		newAddImages: function(event){
			var files = event.target.files[0],
				num = event.target.parentNode.getAttribute('name');
				url = '/manage/About',
				method = 'POST',
				self = this,
				type = null,
				actionName = 'About';
				
				 var reader = new FileReader();

				  reader.onload = (function(theFile) {
				    return function(e) {
				      	
				      	self.state.content.abouts.push({description: null, src: e.target.result, number: parseInt(num)})
				      	self.setState({
							content: self.state.content
						})

				    };
				  })(files);

			      reader.readAsDataURL(files);

			 _controller_.OnlyAddNoResponseData(url, {upload:files, number: parseInt(num)}, method, type, actionName); 

		},

		render: function () {
			var ArrayOfTemplateComponents = [],
				ArrayOfComponents = [],
				relate;

			for (var i = 1; i <= 6; i++) {
				if(relate = this.inArray(i)){
					ArrayOfTemplateComponents.push(<TemplateForAboutBusy key={i+Math.random()} infoAdd={this.newAddInformation} edit={this.editState} content={relate} keys={i} />);
				} else {
					ArrayOfTemplateComponents.push(<TemplateForAbout key={i+Math.random()} imgAdd={this.newAddImages} infoAdd={this.newAddInformation} keys={i}/>);
				}
				if(i%2 == 0){
					ArrayOfComponents.push(<TemplateOuterForAbout key={i+Math.random()} element={ArrayOfTemplateComponents} />);
					ArrayOfTemplateComponents = [];
				}
			};

			return (
				<div className="About height-full">
					<h1 className="title-for-block">{this.props.title}</h1>
					<div className="outer-all-about-block">
						{ArrayOfComponents}
					</div>
				</div>
			)
		},
		inArray: function(number){
			var ArrayOfContent = this.state.content;
			var returnArray = ArrayOfContent.abouts.filter(function (item, i) {
				if(item.number == number){
					return item;
				}
			});

			if(returnArray.length > 0){
				return returnArray;
			} else {
				return null;
			}
		}

	})

	var TemplateForAboutBusy = React.createClass({
		render: function () {
			var description = this.props.content[0].description ? <p className="padding-text">{this.props.content[0].description}</p> : null,
				src = this.props.content[0].src ? <img src={this.props.content[0].src} /> : null;
			return (
				<div className="area-for-content" name={this.props.keys}>
					{description ? description : src}
					<i className="fa fa-pencil edit-about-block" onClick={this.props.edit}></i>
				</div>
			);
		}
	})

	var TemplateOuterForAbout = React.createClass({
		render: function () {
			return (
				<div className="block-for-slides-campany">{this.props.element}</div>
			);
		}
	})

	var TemplateForAbout = React.createClass({
		getInitialState: function(){
			return {
				background: TemplateReady
			}
		},
		addText: function () {
			this.setState({
				background: TemplateToText
			})
		},
		returnPrevState: function(){
			this.setState({
				background: TemplateReady
			})
		},
		contentUpgrade: function(event){
			event.preventDefault();
			var descr = event.target.querySelector('[name="description"]').value,
				num = event.target.querySelector('[name="number"]').value;

			this.props.infoAdd(descr, num);
		},
		render: function () {
			return (
				<this.state.background edit={this.returnPrevState} addImage={this.props.imgAdd} contentUpgrade={this.contentUpgrade} addText={this.addText} name={this.props.keys}/>	
			);
		}
	})

	var TemplateReady = React.createClass({

		render: function (){
			return (
				<div className="area-for-content">
					<div className="padding-area">
						<button onClick={this.props.addText} className="button button-no-with">Добавить текст</button>
						<p className="-or">или</p>
						<label htmlFor="hidden_file" className="button button-no-with" name={this.props.name}>
							Добавить изображение
							<input onChange={this.props.addImage} name='upload' type="file" id="hidden_file" />
						</label>
					</div>
				</div>
			);
		}
	})

	var TemplateToText = React.createClass({
		render: function(){
			return (
				<div className="area-for-content" name={this.props.name}>
					<i className="fa fa-long-arrow-left edit-about-block" onClick={this.props.edit}></i>
					<form className="to-text-form" onSubmit={this.props.contentUpgrade}>
						<p>Добавить текст</p>
						<textarea className="area-of-text" name="description"></textarea>
						<input type="hidden" name="number" value={this.props.name} />
						<button type="submit" className="button button-no-with">Сохранить</button>
					</form>
				</div>
			)
		}
	});

allMyComponents['About'] = About;