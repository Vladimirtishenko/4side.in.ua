function Controller () {

	this.crossdomainXHR = function () {
		var xmlhttp;
		try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
		try {
		  xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
		  xmlhttp = false;
		}
		}
		if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
		xmlhttp = new XMLHttpRequest();
		}
		return xmlhttp;
	}

	this.Menu = function (string, nameAction, method) {

		var xhr = this.crossdomainXHR(),
			url = string ? string : "/manage",
			method = method ? method : "POST"

		xhr.onreadystatechange = function () {
			if(xhr.readyState == 4 && xhr.status == 200){
				if(string){
					window.postMessage({name: nameAction, content: JSON.parse(xhr.responseText)}, "/")
				} else {
					View(JSON.parse(xhr.responseText));
				}
			}
		}

		xhr.open(method, url, true);
		xhr.send(null);

	}

	this.OnlyAddNoResponseData = function(string, dataStore, method, type, actionName){

		var xhr = this.crossdomainXHR(),
			data,
			self = this;
		

		if(typeof dataStore == 'object'){
			data = new FormData();
			for(var val in dataStore){
				if(val == 'upload_galery_image'){
					for (var i = 0; i < dataStore[val].length; i++) {
						data.append(val, dataStore[val][i]);
					};
				} else {
					data.append(val, dataStore[val]);
				}
			};
		} else {
			data = dataStore;
		}

		xhr.onreadystatechange = function () {
			if(xhr.readyState == 4 && xhr.status == 200){
				if(JSON.parse(xhr.responseText).status == '200'){
					self.Menu(string, actionName, "GET")
				} else if(JSON.parse(xhr.responseText).status == '500'){
					window.postMessage({error: JSON.parse(xhr.responseText)}, "/")
				} else {
					console.log("no think");
				}
			}
		}

		xhr.open(method, string, true);
		if(type){
			xhr.setRequestHeader("Content-Type", type);
		}
		xhr.send(data);
	}

	this.OnlyDelete = function(id, galeryId, type, actionName, string){
		
		var xhr = this.crossdomainXHR(),
			self = this;

		xhr.onreadystatechange = function () {
			if(xhr.readyState == 4 && xhr.status == 200){
				console.log(xhr.responseText);
				if(JSON.parse(xhr.responseText).status == '200'){
					self.Menu(string, actionName, "GET")
				}
			}
		}

		xhr.open('DELETE', string, true);
		xhr.setRequestHeader("Content-Type", type);
		xhr.send('id='+id+'&galeryId='+galeryId);

	}

	this.Menu();

}

var _controller_ = new Controller();

function View (MenuItem) {
	
	System.config({
	    baseURL: '/js/manage/js/'
	 });


	allMyComponents = {};

	var Outer = React.createClass({

		getInitialState: function(){
			return {
				menu: MenuItem.result,
				block: null,
				content: null,
				lang: MenuItem.lang,
				translator: MenuItem.translator,
				title: 'Портфолио',
				errorBlock: 'hidden-error',
				errorMessage: null
			};
		},
		contextReplace: function (event) {
			event.preventDefault();

			var context = event.target.getAttribute('name');
			var title = event.target.getAttribute('data-rus-title');
			var StateMenuAray = this.state.menu.map(function (item, i) {
				if(item.context == context) {
					item.active = true
				} else {
					item.active = false
				}
				return item;
			});

			
			var	url = '/manage/' + context,
				actionName = context;

			_controller_.Menu(url, actionName, "GET");


			this.setState({
				menu: StateMenuAray,
				title: title
			})


		},
		render: function () {
			return (
				<div className="outer-all-container">
					<SideBar menu={this.state.menu} lang={this.state.lang} context={this.contextReplace} />
					<Main block={this.state.block} lang={this.state.lang} translator={this.state.translator} content={this.state.content} title={this.state.title}/>
					<Error show={this.state.errorBlock} error={this.state.errorMessage}/>
				</div>
			);
		},
		componentDidMount: function () {
			var self = this;
			window.addEventListener("message", self.asynXhr);
		},
		asynXhr: function (event) {
			if(event.data.content && event.data.name){
				var contextToRender = allMyComponents[event.data.name];
				this.setState({
					block: contextToRender,
					content: event.data.content.result,
					lang: event.data.content.lang,
					translator: event.data.content.translator,
					errorBlock: 'hidden-error',
					errorMessage: null
				})
			} else if(event.data.error){
				this.setState({
					errorBlock: '',
					errorMessage: event.data.error
				})
			}
			
		}
	});

	var SideBar = React.createClass({
		render: function () {
			var MenuArray = this.props.menu ? this.props.menu : null,
				Menu = MenuArray ? MenuArray.map(function (item, i) {
					return item.active ? <li key={i} className="active-list"><span>{item["name_"+this.props.lang]}</span></li> : <li key={i}><a onClick={this.props.context} name={item.context} data-rus-title={item["name_"+this.props.lang]} href="#">{item["name_"+this.props.lang]}</a></li>
				}, this) : null;

			return (
				<nav className="side-bar">
					<img src="/images/logo-black.png" className="image-of-logo" />
					<ul>
						{MenuArray ? Menu : <li><img src="/images/preload.gif" /></li>}
					</ul>
				</nav>
			)
		}
	});

	var Main = React.createClass({
		render: function () {
			return (
				<div className="outer-main-block">
					<div className="general-block">
						{this.props.block ? <this.props.block content={this.props.content} translator={this.props.translator} lang={this.props.lang} title={this.props.title} /> : <img src="/images/preloader_1.gif" className="preload-for-main-block" />}
					</div>
				</div>
			)
		}
	});

	var Error = React.createClass({
		render: function(){
			var shadow = "error-block-top "+this.props.show;
			var message = this.props.error && this.props.error.message ? this.props.error.message.code : null;

			return (<div className={shadow} ><p className="error-block-message">Этот сервис сейчас недоступен обновите страницу или попробуйте позже <br /> Приложение вернуло ошибку с текстом: <b>{message}</b></p></div>);
		}
	})

	/*

		This all Portfolio components

		Consist of:

		@Portfolio
	

	*/

	System.import('Portfolio.min.js?hash='+Math.random().toString().slice(2));
	

	/*

		This all Team components

		Consist of:

		@Team
	

	*/

	System.import('Team.min.js?hash='+Math.random().toString().slice(2));

	/*

		This all About components

		Consist of:

		@About
		@TemplateForAboutBusy
		@TemplateOuterForAbout
		@TemplateForAbout
		@TemplateReady
		@TemplateToText

	*/

	System.import('About.min.js?hash='+Math.random().toString().slice(2));

	/*

		This all Contact components

		Consist of:

		@Contact
		

	*/

	System.import('Contact.min.js?hash='+Math.random().toString().slice(2));


	/*

		This all PortfolioElse components

		Consist of:

		@PortfolioElse
		

	*/

	System.import('PortfolioElse.min.js?hash='+Math.random().toString().slice(2));


	ReactDOM.render(<Outer />, document.getElementById('container-for-content'));

};