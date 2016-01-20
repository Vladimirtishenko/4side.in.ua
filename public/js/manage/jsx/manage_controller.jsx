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
		xhr.send(null)

	}

	this.OnlyAddNoResponseData = function(string, dataStore, method, type, actionName){

		var xhr = this.crossdomainXHR(),
			data,
			self = this;
		

		if(typeof dataStore == 'object'){
			data = new FormData();
			for(var val in dataStore){
				data.append(val, dataStore[val]);
			};
		} else {
			data = dataStore;
		}

		xhr.onreadystatechange = function () {
			if(xhr.readyState == 4 && xhr.status == 200){
				if(JSON.parse(xhr.responseText).status == '200'){
					self.Menu(string, actionName, "GET")
				}
			}
		}

		xhr.open(method, string, true);
		if(type){
			xhr.setRequestHeader("Content-Type", type);
		}
		xhr.send(data);
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
				menu: MenuItem,
				block: null,
				content: null,
				title: 'Портфолио'
			};
		},
		contextReplace: function () {
			event.preventDefault();

			var context = event.target.getAttribute('name');
			var title = event.target.getAttribute('data-rus-title');
			var StateMenuAray = MenuItem.map(function (item, i) {
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
					<SideBar menu={this.state.menu} context={this.contextReplace} />
					<Main block={this.state.block} content={this.state.content} title={this.state.title}/>
				</div>
			);
		},
		componentDidMount: function () {
			var self = this;
			window.addEventListener("message", self.asynXhr.bind(self));
		},
		asynXhr: function (event) {
			var contextToRender = allMyComponents[event.data.name];

			event.data.content.newvariable = Math.random();

			this.setState({
				block: contextToRender,
				content: event.data.content
			})
		}
	});

	var SideBar = React.createClass({
		render: function () {
			var MenuArray = this.props.menu ? this.props.menu : null,
				Menu = MenuArray ? MenuArray.map(function (item, i) {
					return item.active ? <li key={i} className="active-list"><span>{item.name_rus}</span></li> : <li key={i}><a onClick={this.props.context} name={item.context} data-rus-title={item.name_rus} href={item.link}>{item.name_rus}</a></li>
				}.bind(this)) : null;

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
						{this.props.block ? <this.props.block content={this.props.content} title={this.props.title} /> : <img src="/images/preloader_1.gif" className="preload-for-main-block" />}
					</div>
				</div>
			)
		}
	});

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

	React.render(<Outer />, document.getElementById('container-for-content'));

};