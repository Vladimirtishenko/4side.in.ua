function Site(){this.xhr=function(){var e;try{e=new ActiveXObject("Msxml2.XMLHTTP")}catch(t){try{e=new ActiveXObject("Microsoft.XMLHTTP")}catch(n){e=!1}}return e||"undefined"==typeof XMLHttpRequest||(e=new XMLHttpRequest),e}}function Modal(){var e=this;this.Myscroll=null,this.buttonOpen=document.querySelector(".brif-for-site"),this.buttonClose=document.querySelector(".side-modal-close"),this.blurElement=document.querySelector(".container-all-outer"),this.openElementModal=document.querySelector(".side-modal-outer"),this.form=document.getElementById("modal-letter"),this.buttonOpen.addEventListener("click",e.openHandler.bind(e)),this.buttonClose.addEventListener("click",e.closeHandler.bind(e)),this.form.addEventListener("submit",e.letterSend.bind(e))}function Slider(e,t){function n(){i.height=window.innerHeight,i.width=window.innerWidth,i.running("resize")}var i=this;this.list=t?t:null,this.countSlide=this.list?this.list.children.length-1:null,this.element=e?e:null,this.height=window.innerHeight,this.width=window.innerWidth,this.controlsBuild=!1,this.currentSlide=0,this.move=0,this.preloader=document.querySelector(".-absolute-preloader"),this.listImages=this.list?this.list.querySelectorAll("img"):null,window.addEventListener("resize",n)}function SandwichMenu(e){var t=this;this.state=!0,e.addEventListener("click",t.actions.bind(this,e,t))}function GalleryAjax(){if("object"==typeof local_data){var e=this,t=new Image;t.src="/images/proloader_opacity.gif",this.preload=document.createElement("div"),this.preload.appendChild(t),local_data.gallery.src.splice(0,1),this.galery=local_data.gallery.src,this.container=document.querySelector(".side-work-gallery"),this.state=!0,window.addEventListener("scroll",e.loadGallery.bind(e))}}function Grid(){"function"==typeof Masonry?new Masonry(".grid",{itemSelector:".grid-item",columnWidth:1,percentPosition:!0}):null}function allHandlerToload(){Grid()}var site_=new Site;Modal.prototype.openHandler=function(){this.blurElement.classList.add("-blur"),this.openElementModal.style.display="table",this.animate(this.openElementModal)},Modal.prototype.closeHandler=function(){var e=this;this.blurElement.classList.remove("-blur"),this.openElementModal.classList.remove("-animate-modal"),setTimeout(function(){e.openElementModal.style.display="none",e.Myscroll=null},1e3)},Modal.prototype.animate=function(e){var t=this;setTimeout(function(){e.classList.add("-animate-modal"),t.Myscroll=new IScroll("#wrapper",{mouseWheel:!0})},1)},Modal.prototype.letterSend=function(e){e.preventDefault();for(var t=e.target.querySelectorAll("input, textarea"),n="",i=["name","number","email"],r=document.querySelector(".hide-message"),s=0;s<t.length;s++)if(i.indexOf(t[s].name)>-1&&t[s].value)n+=t[s].name+"="+t[s].value+"&",t[s].classList.remove("no-validate");else{if(-1!=i.indexOf(t[s].name))return void t[s].classList.add("no-validate");n+=t[s].name+"="+t[s].value+"&"}var a=site_.xhr();a.onreadystatechange=function(){200==a.status&&4==a.readyState&&(200!=JSON.parse(a.responseText).status?r.innerHTML="Ваше сообщение не отправлено попробуйте позже":r.innerHTML="Ваше сообщение отправлено, мы вам перезвоним",e.target.reset())},a.open("POST","/mail",!0),a.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),a.send(n.slice(0,-1))},new Modal,Slider.prototype.running=function(e){function t(e,t){e.style.width=n.width+"px",e.setAttribute("data-slides-number",t)}var n=this;if(n.element||n.list){this.controlsBuild||this.createControls(),e&&(this.move=this.currentSlide*-n.width,this.list.style.cssText+="transition-duration: 1s; transform: translateX("+this.move+"px)"),[].forEach.call(n.list.children,t),this.list.style.width=this.width*(this.list.children.length+.5)+"px",this.touchEvents();for(var i=0;i<this.listImages.length;i++){var r=new Image;r.src=this.listImages[i].src,r.onload=function(){n.preloader.classList.contains("hiddens-preloader")||n.preloader.classList.add("hiddens-preloader")}}}},Slider.prototype.touchEvents=function(){function e(e){var t=e.changedTouches[0];startx=parseInt(t.clientX),i=startx}function t(e){var t=e.changedTouches[0];if(endx=parseInt(t.clientX),r=endx,i>r&&i-r>50){var s=n.currentSlide+1>n.countSlide?0:n.currentSlide+1;n._clickSlideHandlers(parseInt(s))}else if(r>i&&r-i>50){var s=n.currentSlide-1<0?n.countSlide:n.currentSlide-1;n._clickSlideHandlers(parseInt(s))}}var n=this;this.list.addEventListener("touchstart",e,!1),this.list.addEventListener("touchend",t,!1);var i=0,r=0},Slider.prototype.createControls=function(){for(var e=document.querySelector(".controls-slider"),t="",n=this,i=0;i<this.list.children.length;i++)t+=0==i?"<span class='-active-slide' data-slide="+i+"></span>":"<span data-slide="+i+"></span>";e.insertAdjacentHTML("afterbegin",t),e.addEventListener("click",n._clickSlideHandlers.bind(n)),this.controlsBuild=!0},Slider.prototype._clickSlideHandlers=function(e){function t(e,t){var i=document.querySelector(".-active-slide");r.list.style.cssText+="transition-duration: "+t+"s;-webkit-transition-duration: "+t+"s;-o-transition-duration: "+t+"s;-moz-transition-duration: "+t+"s;",r.list.style.cssText+="transform: translateX("+e+"px)-moz-transform:  translateX("+e+"px)-ms-transform:  translateX("+e+"px)-webkit-transform:  translateX("+e+"px)-o-transform:  translateX("+e+"px)",r.currentSlide=n,r.move=e,i.parentNode.querySelector("span[data-slide='"+n+"']").classList.add("-active-slide"),i.classList.remove("-active-slide")}var n,i=e.target?e.target:e,r=this;if(isNaN(i)){if(!i.getAttribute("data-slide"))return;if(n=parseInt(i.getAttribute("data-slide")),n==this.currentSlide)return}else if(n=i,n==this.currentSlide)return;if(n>this.currentSlide)if(this.currentSlide+1<n){var s=parseInt(-r.width*n);t(s,.5)}else{var s=parseInt(r.move)+parseInt(-r.width);t(s,.8)}else if(this.currentSlide-1>n){var s=parseInt(-r.width*n);t(s,.5)}else{var s=parseInt(r.move)+parseInt(r.width);t(s,.8)}};var _Slider_=new Slider(document.querySelector(".slider-side"),document.querySelector(".slider-list"));_Slider_.running(),SandwichMenu.prototype.actions=function(e,t){function n(e){for(var n=0;n<e.length;n++)e[n].label&&(e[n].state.style.cssText=i(e[n].operator,e[n].label)),function(n){setTimeout(function(){e[n].state.style.cssText=i(e[n].operator,e[n].delay),t.state=!0},400)}(n)}function i(e,t){var n={one:"transition: .4s; transform: translateY("+e+"12px) rotate(0deg)",two:"transition: .4s; transform: translateY(0px) rotate(0deg)",three:"transition: .4s; transform: translateY("+e+"12px) rotate("+e+"45deg)",four:"opacity: "+e};return n[t]}if(t.state){t.state=!1;var r=e.querySelector(".first-line"),s=e.querySelector(".two-line"),a=e.querySelector(".third-line");e.classList.contains("-open")?(n([{operator:"",state:r,delay:"two",label:"one"},{operator:"-",state:a,delay:"two",label:"one"},{operator:1,state:s,delay:"four"}]),e.classList.remove("-open"),document.querySelector(".container-fixed-menu").style.cssText="opacity: 0",document.querySelector(".container-all-outer").style.cssText="transform: translateX(0)"):(n([{operator:"",state:r,delay:"three",label:"one"},{operator:"-",state:a,delay:"three",label:"one"},{operator:0,state:s,delay:"four"}]),e.classList.add("-open"),document.querySelector(".container-fixed-menu").style.cssText="opacity: 1",document.querySelector(".container-all-outer").style.cssText="transform: translateX(-200px)")}};var _SandwichMenu_=new SandwichMenu(document.querySelector(".menu-to-site"));GalleryAjax.prototype.loadGallery=function(){var e=this;if(document.body.offsetHeight-500<window.scrollY+window.innerHeight&&this.state&&this.galery.length>0){this.state=!1,e.container.appendChild(e.preload);var t=new Image;t.src=this.galery[0],this.galery.splice(0,1),t.onload=function(){e.container.removeChild(e.container.lastElementChild),e.container.appendChild(t),e.state=!0}}},new GalleryAjax,window.addEventListener("load",allHandlerToload);