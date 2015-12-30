function Site() {

}


function Slider(element, list) {

    var self = this;

    this.list = list;
    this.countSlide = this.list.children.length -1;
    this.element = element;
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.controlsBuild = false;
    this.currentSlide = 0;
    this.move = 0;
    this.preloader = document.querySelector(".-absolute-preloader");
    this.listImages = this.list.querySelectorAll("img");

    window.addEventListener("resize", resizeHandler);

    function resizeHandler() {
        self.height = window.innerHeight;
        self.width = window.innerWidth;
        self.running("resize");
    }

}

Slider.prototype.running = function(options) {

    var self = this;

    if (!this.controlsBuild){
        this.createControls();
    }

    if(options){
    	this.move = this.currentSlide * (-self.width);
    	this.list.style.cssText += "transition-duration: 1s; transform: translateX("+this.move+"px)";
    }
    

    [].forEach.call(self.list.children, staticSize)

    function staticSize(item, i) {
        item.style.width = self.width + "px";
        item.setAttribute("data-slides-number", i)
    }

    
    this.list.style.width = this.width * (this.list.children.length + 0.5) + "px";

    this.touchEvents();

    for (var i = 0; i < this.listImages.length; i++) {
        var img = new Image();
        img.src = this.listImages[i].src;
        img.onload = function(){
            if(!self.preloader.classList.contains("hiddens-preloader")){
                self.preloader.classList.add("hiddens-preloader")
            }
        }
    };
}

Slider.prototype.touchEvents = function(){

    var self = this;

    this.list.addEventListener("touchstart", touchStart, false);
    this.list.addEventListener("touchend", touchEnd, false);

    var startPosition = 0;
    var endPosition = 0;

    function touchStart(event){
        var touchobj = event.changedTouches[0] // reference first touch point (ie: first finger)
        startx = parseInt(touchobj.clientX) // get x position of touch point relative to left edge of browser
        startPosition = startx;
    }

    function touchEnd(event){
        var touchobj = event.changedTouches[0] // reference first touch point for this event
        endx = parseInt(touchobj.clientX)
        endPosition = endx;
        if(startPosition > endPosition && (startPosition - endPosition) > 150){
            var clicked = ((self.currentSlide + 1) > self.countSlide) ? 0 : self.currentSlide + 1;
            self._clickSlideHandlers(parseInt(clicked))
        } else if(endPosition > startPosition && (endPosition - startPosition) > 150) {
            var clicked = ((self.currentSlide - 1) < 0) ? self.countSlide : self.currentSlide - 1;
            self._clickSlideHandlers(parseInt(clicked))
        }
    }

}

Slider.prototype.createControls = function() {
    var constrols = document.querySelector(".controls-slider"),
        items = "",
        self = this;

    for (var i = 0; i < this.list.children.length; i++) {
        items += (i == 0) ? "<span class='-active-slide' data-slide=" + i + "></span>" : "<span data-slide=" + i + "></span>";
    };

    constrols.insertAdjacentHTML("afterbegin", items);
    constrols.addEventListener("click", self._clickSlideHandlers.bind(self));
    this.controlsBuild = true;
}

Slider.prototype._clickSlideHandlers = function(event) {
    var target = event.target ? event.target : event,
        self = this,
        clicked;


    if (!isNaN(target)) {
        clicked = target;
        if(clicked == this.currentSlide) return;
    } 
    else if(target.getAttribute("data-slide")){
        clicked = parseInt(target.getAttribute("data-slide"))
        if(clicked == this.currentSlide) return;
    }    
    else {
        return;
    }


    if (clicked > this.currentSlide) {

        if ((this.currentSlide + 1) < clicked) {
            var move = parseInt((-self.width) * clicked);
            toSlideAnimation(move, 0.5);
        } else {
            var move = parseInt(self.move) + parseInt(-self.width)
            toSlideAnimation(move, 0.8);
        }

    } else {
        if ((this.currentSlide - 1) > clicked) {
            var move = parseInt((-self.width) * clicked)
            toSlideAnimation(move, 0.5);
        } else {
            var move = parseInt(self.move) + parseInt(self.width)
            toSlideAnimation(move, 0.8);
        }
    }

    function toSlideAnimation(move, speed) {

        var activeBeforeSlide = document.querySelector(".-active-slide");

        self.list.style.cssText += "transition-duration: " + speed + "s; ";
        self.list.style.cssText += "transform: translateX(" + move + "px)";
        self.currentSlide = clicked;
        self.move = move;

        activeBeforeSlide.parentNode.querySelector("span[data-slide='"+clicked+"']").classList.add("-active-slide");
        activeBeforeSlide.classList.remove("-active-slide");

    }

}


var _Slider_ = new Slider(document.querySelector(".slider-side"), document.querySelector(".slider-list"));
_Slider_.running();


function SandwichMenu(element) {
    var self = this;

    this.state = true;

    element.addEventListener("click", self.actions.bind(this, element, self))
}

SandwichMenu.prototype.actions = function(element, self) {

	if(!self.state) return;

	self.state = false;

    var first = element.querySelector(".first-line"),
        second = element.querySelector(".two-line"),
        third = element.querySelector(".third-line");

    if (element.classList.contains("-open")) {


        cssAnimate([{
            operator: "",
            state: first,
            delay: "two",
            label: "one"
        }, {
            operator: "-",
            state: third,
            delay: "two",
            label: "one"
        }, {
            operator: 1,
            state: second,
            delay: "four"
        }]);

        element.classList.remove("-open")
        document.querySelector(".container-all-outer").style.cssText = "transform: translateX(0)";

    } else {

        cssAnimate([{
            operator: "",
            state: first,
            delay: "three",
            label: "one"
        }, {
            operator: "-",
            state: third,
            delay: "three",
            label: "one"
        }, {
            operator: 0,
            state: second,
            delay: "four"
        }])

        element.classList.add("-open");

        document.querySelector(".container-all-outer").style.cssText = "transform: translateX(-200px)";
    }

    function cssAnimate(objects) {

        for (var i = 0; i < objects.length; i++) {

            if (objects[i].label) {
                objects[i].state.style.cssText = createCss(objects[i].operator, objects[i].label);
            }

            (function(i) {
                setTimeout(function() {
                    objects[i].state.style.cssText = createCss(objects[i].operator, objects[i].delay);
                    self.state = true;
                }, 400)
            })(i);
        };

    }

    function createCss(operator, step) {

        var objectStep = {
            one: "transition: .4s; transform: translateY(" + operator + "12px) rotate(0deg)",
            two: "transition: .4s; transform: translateY(0px) rotate(0deg)",
            three: "transition: .4s; transform: translateY(" + operator + "12px) rotate(" + operator + "45deg)",
            four: "opacity: " + operator
        }
        return objectStep[step];

    }

}

var _SandwichMenu_ = new SandwichMenu(document.querySelector(".menu-to-site"));

function Grid() {
    var msnry = new Masonry( '.grid', {
      itemSelector: '.grid-item',
      columnWidth: 1,
      percentPosition: true
    });
}


function allHandlerToload(){
    Grid(); // Load Grig Portfolio Layout
}

window.addEventListener("DOMContentLoaded", allHandlerToload)
