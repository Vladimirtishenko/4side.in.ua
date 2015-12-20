function Site() {

}


function Slider(element, list) {

    var self = this;

    this.list = list;
    this.element = element;
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.controlsBuild = false;
    this.currentSlide = 0;
    this.move = 0;

    if (window.innerHeight > 600 && window.innerHeight < 790) {
        element.style.height = window.innerHeight + "px";
    } else {
        element.removeAttribute("style");
    }

    window.addEventListener("resize", resizeHandler);

    function resizeHandler() {
        self.height = window.innerHeight;
        self.width = window.innerWidth;
        self.running();
    }

}

Slider.prototype.running = function() {

    var self = this;

    if (!this.controlsBuild)
        this.createControls();


    [].forEach.call(self.list.children, staticSize)

    function staticSize(item, i) {
        item.style.width = self.width + "px";
        item.setAttribute("data-slides-number", i)
    }

    this.list.style.width = this.width * this.list.children.length + "px";

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

Slider.prototype._clickSlideHandlers = function() {
    var target = event.target,
        self = this,
        clicked;

    if (target.getAttribute("data-slide")) {
        clicked = parseInt(target.getAttribute("data-slide"))
    } else {
        return;
    }


    if (clicked > this.currentSlide) {

        if ((this.currentSlide + 1) < clicked) {
            var move = parseInt((-self.width) * clicked);
            toSlideAnimation(move, 0.5);
        } else {
            var move = parseInt(self.move) + parseInt(-self.width)
            toSlideAnimation(move, 1);
        }

    } else {
        if ((this.currentSlide - 1) > clicked) {
            var move = parseInt((-self.width) * clicked)
            toSlideAnimation(move, 0.5);
        } else {
            var move = parseInt(self.move) + parseInt(self.width)
            toSlideAnimation(move, 1);
        }
    }

    function toSlideAnimation(move, speed) {

        var activeBeforeSlide = document.querySelector(".-active-slide");

        self.list.style.cssText += "transition-timing-function: cubic-bezier(0, 0, 0.58, 1.0); transition-duration: "+speed+"s; ";
        self.list.style.cssText += "transform: translateX(" + move + "px)";
        self.currentSlide = clicked;
        self.move = move;

        activeBeforeSlide.classList.remove("-active-slide");
        target.classList.add("-active-slide");

    }

}


var _Slider_ = new Slider(document.querySelector(".slider-side"), document.querySelector(".slider-list"));
_Slider_.running();
