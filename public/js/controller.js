function Site() {
    this.xhr = function() {
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
        if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
            xmlhttp = new XMLHttpRequest();
        }
        return xmlhttp;
    }
}

var site_ = new Site();

function Modal() {

    var self = this;

    this.Myscroll = null;

    this.buttonOpen = document.querySelector('.brif-for-site');
    this.buttonClose = document.querySelector('.side-modal-close');
    this.blurElement = document.querySelector('.container-all-outer');
    this.openElementModal = document.querySelector('.side-modal-outer');
    this.form = document.getElementById('modal-letter');

    this.buttonOpen.addEventListener('click', self.openHandler.bind(self));
    this.buttonClose.addEventListener('click', self.closeHandler.bind(self));
    this.form.addEventListener('submit', self.letterSend.bind(self));

}

Modal.prototype.openHandler = function() {
    this.blurElement.classList.add('-blur');
    this.openElementModal.style.display = 'table';
    this.animate(this.openElementModal);
}

Modal.prototype.closeHandler = function() {
    var self = this;
    this.blurElement.classList.remove('-blur');
    this.openElementModal.classList.remove('-animate-modal');
    setTimeout(function() {
        self.openElementModal.style.display = 'none';
        self.Myscroll = null;
    }, 1000)
}

Modal.prototype.animate = function(openElementModal) {
    var self = this;
    setTimeout(function() {
        openElementModal.classList.add('-animate-modal');
        self.Myscroll = new IScroll('#wrapper', { mouseWheel: true });
    }, 1)
}

Modal.prototype.letterSend = function(event) {
    event.preventDefault();
    var elementToSend = event.target.querySelectorAll('input, textarea'),
        data = '',
        validate = ['name', 'number', 'email'],
        messageInfo = document.querySelector('.hide-message');
    for (var i = 0; i < elementToSend.length; i++) {
        if (validate.indexOf(elementToSend[i].name) > -1 && elementToSend[i].value) {
            data += elementToSend[i].name + "=" + elementToSend[i].value + "&";
            elementToSend[i].classList.remove('no-validate');
        } else if (validate.indexOf(elementToSend[i].name) == -1) {
            data += elementToSend[i].name + "=" + elementToSend[i].value + "&";
        } else {
            elementToSend[i].classList.add('no-validate');
            return;
        }
    };

    var xhr = site_.xhr();

    xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4) {
            if (JSON.parse(xhr.responseText).status != 200) {
                messageInfo.innerHTML = 'Ваше сообщение не отправлено попробуйте позже';
            } else {
                messageInfo.innerHTML = 'Ваше сообщение отправлено, мы вам перезвоним';
            }
            event.target.reset();
        }
    }

    xhr.open('POST', '/mail', true);
    xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded');
    xhr.send(data.slice(0, -1));

}

new Modal();

function Slider(element, list) {
    var self = this;

    this.list = list ? list : null;
    this.countSlide = this.list ? this.list.children.length - 1 : null;
    this.element = element ? element : null;
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.controlsBuild = false;
    this.currentSlide = 0;
    this.move = 0;
    this.preloader = document.querySelector(".-absolute-preloader");
    this.listImages = this.list ? this.list.querySelectorAll("img") : null;

    window.addEventListener("resize", resizeHandler);

    function resizeHandler() {
        self.height = window.innerHeight;
        self.width = window.innerWidth;
        self.running("resize");
    }

}

Slider.prototype.running = function(options) {

    var self = this;

    if (!self.element && !self.list) return;

    if (!this.controlsBuild) {
        this.createControls();
    }

    if (options) {
        this.move = this.currentSlide * (-self.width);
        this.list.style.cssText += "transition-duration: 1s; transform: translateX(" + this.move + "px)";
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
        img.onload = function() {
            if (!self.preloader.classList.contains("hiddens-preloader")) {
                self.preloader.classList.add("hiddens-preloader")
            }
        }
    };
}

Slider.prototype.touchEvents = function() {

    var self = this;

    this.list.addEventListener("touchstart", touchStart, false);
    this.list.addEventListener("touchend", touchEnd, false);

    var startPosition = 0;
    var endPosition = 0;

    function touchStart(event) {
        var touchobj = event.changedTouches[0] // reference first touch point (ie: first finger)
        startx = parseInt(touchobj.clientX) // get x position of touch point relative to left edge of browser
        startPosition = startx;
    }

    function touchEnd(event) {
        var touchobj = event.changedTouches[0] // reference first touch point for this event
        endx = parseInt(touchobj.clientX)
        endPosition = endx;
        if (startPosition > endPosition && (startPosition - endPosition) > 50) {
            var clicked = ((self.currentSlide + 1) > self.countSlide) ? 0 : self.currentSlide + 1;
            self._clickSlideHandlers(parseInt(clicked))
        } else if (endPosition > startPosition && (endPosition - startPosition) > 50) {
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
        if (clicked == this.currentSlide) return;
    } else if (target.getAttribute("data-slide")) {
        clicked = parseInt(target.getAttribute("data-slide"))
        if (clicked == this.currentSlide) return;
    } else {
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

        console.log(transition(t));
        console.log(transform(t));


        self.list.style.cssText += transition(speed) + transform(move);
        self.currentSlide = clicked;
        self.move = move;

        activeBeforeSlide.parentNode.querySelector("span[data-slide='" + clicked + "']").classList.add("-active-slide");
        activeBeforeSlide.classList.remove("-active-slide");

    }


    function transition(t) {
        t = (typeof t === "undefined") ? 0 : t; 
        var tr = '-webkit-transition-duration: '+t+'s;' + 
             '-moz-transition-duration: '+t+'s;' + 
             '-ms-transition-duration: '+t+'s;' + 
             '-o-transition-duration: '+t+'s;' +
             'transition-duration: '+t+'s;';
        return tr
    }

    function transform(t) {
        t = (typeof t === "undefined") ? 0 : t; 
        var tr = '-webkit-transform: translateX('+ t + 'px);' + 
             '-moz-transform: translateX('+ t + 'px);' + 
             '-ms-transform: translateX('+ t + 'px);' + 
             '-o-transform: translateX('+ t + 'px);' +
             'transform: translateX('+ t + 'px);';
        return tr
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

    if (!self.state) return;

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
        document.querySelector(".container-fixed-menu").style.cssText = "opacity: 0";
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
        document.querySelector(".container-fixed-menu").style.cssText = "opacity: 1";
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

function GalleryAjax() {

    if (typeof local_data != 'object') return;

    var self = this,
        preloadImage = new Image();

    preloadImage.src = '/images/proloader_opacity.gif';

    this.preload = document.createElement('div');
    this.preload.appendChild(preloadImage);

    local_data.gallery.src.splice(0, 1);

    this.galery = local_data.gallery.src;

    this.container = document.querySelector('.side-work-gallery');
    this.state = true;

    window.addEventListener('scroll', self.loadGallery.bind(self));

}

GalleryAjax.prototype.loadGallery = function() {

    var self = this;

    if (document.body.offsetHeight - 500 < window.scrollY + window.innerHeight && this.state && this.galery.length > 0) {
        this.state = false;
        self.container.appendChild(self.preload);
        var img = new Image();
        img.src = this.galery[0];
        this.galery.splice(0, 1);
        img.onload = function() {
            self.container.removeChild(self.container.lastElementChild);
            self.container.appendChild(img);
            self.state = true;
        }
    }

}

new GalleryAjax();

function Grid() {

    var msnry = (typeof Masonry == 'function') ? new Masonry('.grid', {
        itemSelector: '.grid-item',
        columnWidth: 1,
        percentPosition: true
    }) : null;
}


function allHandlerToload() {
    Grid(); // Load Grig Portfolio Layout
}

window.addEventListener("load", allHandlerToload)
