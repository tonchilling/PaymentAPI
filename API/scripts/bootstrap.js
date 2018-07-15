/*!
 * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
    throw new Error('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.')
}

+function ($) {
    var version = $.fn.jquery.split(' ')[0].split('.')
    if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
    }
}(jQuery);


+function () {

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

    function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.6): util.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Util = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Private TransitionEnd Helpers
         * ------------------------------------------------------------------------
         */

        var transition = false;

        var MAX_UID = 1000000;

        var TransitionEndEvent = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        };

        // shoutout AngusCroll (https://goo.gl/pxwQGp)
        function toType(obj) {
            return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        }

        function isElement(obj) {
            return (obj[0] || obj).nodeType;
        }

        function getSpecialTransitionEndEvent() {
            return {
                bindType: transition.end,
                delegateType: transition.end,
                handle: function handle(event) {
                    if ($(event.target).is(this)) {
                        return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
                    }
                    return undefined;
                }
            };
        }

        function transitionEndTest() {
            if (window.QUnit) {
                return false;
            }

            var el = document.createElement('bootstrap');

            for (var name in TransitionEndEvent) {
                if (el.style[name] !== undefined) {
                    return {
                        end: TransitionEndEvent[name]
                    };
                }
            }

            return false;
        }

        function transitionEndEmulator(duration) {
            var _this = this;

            var called = false;

            $(this).one(Util.TRANSITION_END, function () {
                called = true;
            });

            setTimeout(function () {
                if (!called) {
                    Util.triggerTransitionEnd(_this);
                }
            }, duration);

            return this;
        }

        function setTransitionEndSupport() {
            transition = transitionEndTest();

            $.fn.emulateTransitionEnd = transitionEndEmulator;

            if (Util.supportsTransitionEnd()) {
                $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
            }
        }

        /**
         * --------------------------------------------------------------------------
         * Public Util Api
         * --------------------------------------------------------------------------
         */

        var Util = {

            TRANSITION_END: 'bsTransitionEnd',

            getUID: function getUID(prefix) {
                do {
                    // eslint-disable-next-line no-bitwise
                    prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
                } while (document.getElementById(prefix));
                return prefix;
            },
            getSelectorFromElement: function getSelectorFromElement(element) {
                var selector = element.getAttribute('data-target');

                if (!selector) {
                    selector = element.getAttribute('href') || '';
                    selector = /^#[a-z]/i.test(selector) ? selector : null;
                }

                return selector;
            },
            reflow: function reflow(element) {
                return element.offsetHeight;
            },
            triggerTransitionEnd: function triggerTransitionEnd(element) {
                $(element).trigger(transition.end);
            },
            supportsTransitionEnd: function supportsTransitionEnd() {
                return Boolean(transition);
            },
            typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
                for (var property in configTypes) {
                    if (configTypes.hasOwnProperty(property)) {
                        var expectedTypes = configTypes[property];
                        var value = config[property];
                        var valueType = value && isElement(value) ? 'element' : toType(value);

                        if (!new RegExp(expectedTypes).test(valueType)) {
                            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
                        }
                    }
                }
            }
        };

        setTransitionEndSupport();

        return Util;
    }(jQuery);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.6): alert.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Alert = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'alert';
        var VERSION = '4.0.0-alpha.6';
        var DATA_KEY = 'bs.alert';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 150;

        var Selector = {
            DISMISS: '[data-dismiss="alert"]'
        };

        var Event = {
            CLOSE: 'close' + EVENT_KEY,
            CLOSED: 'closed' + EVENT_KEY,
            CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
            ALERT: 'alert',
            FADE: 'fade',
            SHOW: 'show'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Alert = function () {
            function Alert(element) {
                _classCallCheck(this, Alert);

                this._element = element;
            }

            // getters

            // public

            Alert.prototype.close = function close(element) {
                element = element || this._element;

                var rootElement = this._getRootElement(element);
                var customEvent = this._triggerCloseEvent(rootElement);

                if (customEvent.isDefaultPrevented()) {
                    return;
                }

                this._removeElement(rootElement);
            };

            Alert.prototype.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY);
                this._element = null;
            };

            // private

            Alert.prototype._getRootElement = function _getRootElement(element) {
                var selector = Util.getSelectorFromElement(element);
                var parent = false;

                if (selector) {
                    parent = $(selector)[0];
                }

                if (!parent) {
                    parent = $(element).closest('.' + ClassName.ALERT)[0];
                }

                return parent;
            };

            Alert.prototype._triggerCloseEvent = function _triggerCloseEvent(element) {
                var closeEvent = $.Event(Event.CLOSE);

                $(element).trigger(closeEvent);
                return closeEvent;
            };

            Alert.prototype._removeElement = function _removeElement(element) {
                var _this2 = this;

                $(element).removeClass(ClassName.SHOW);

                if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
                    this._destroyElement(element);
                    return;
                }

                $(element).one(Util.TRANSITION_END, function (event) {
                    return _this2._destroyElement(element, event);
                }).emulateTransitionEnd(TRANSITION_DURATION);
            };

            Alert.prototype._destroyElement = function _destroyElement(element) {
                $(element).detach().trigger(Event.CLOSED).remove();
            };

            // static

            Alert._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function () {
                    var $element = $(this);
                    var data = $element.data(DATA_KEY);

                    if (!data) {
                        data = new Alert(this);
                        $element.data(DATA_KEY, data);
                    }

                    if (config === 'close') {
                        data[config](this);
                    }
                });
            };

            Alert._handleDismiss = function _handleDismiss(alertInstance) {
                return function (event) {
                    if (event) {
                        event.preventDefault();
                    }

                    alertInstance.close(this);
                };
            };

            _createClass(Alert, null, [{
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }]);

            return Alert;
        }();

        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */

        $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Alert._jQueryInterface;
        $.fn[NAME].Constructor = Alert;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Alert._jQueryInterface;
        };

        return Alert;
    }(jQuery);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.6): button.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Button = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'button';
        var VERSION = '4.0.0-alpha.6';
        var DATA_KEY = 'bs.button';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];

        var ClassName = {
            ACTIVE: 'active',
            BUTTON: 'btn',
            FOCUS: 'focus'
        };

        var Selector = {
            DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
            DATA_TOGGLE: '[data-toggle="buttons"]',
            INPUT: 'input',
            ACTIVE: '.active',
            BUTTON: '.btn'
        };

        var Event = {
            CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
            FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Button = function () {
            function Button(element) {
                _classCallCheck(this, Button);

                this._element = element;
            }

            // getters

            // public

            Button.prototype.toggle = function toggle() {
                var triggerChangeEvent = true;
                var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

                if (rootElement) {
                    var input = $(this._element).find(Selector.INPUT)[0];

                    if (input) {
                        if (input.type === 'radio') {
                            if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
                                triggerChangeEvent = false;
                            } else {
                                var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

                                if (activeElement) {
                                    $(activeElement).removeClass(ClassName.ACTIVE);
                                }
                            }
                        }

                        if (triggerChangeEvent) {
                            input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
                            $(input).trigger('change');
                        }

                        input.focus();
                    }
                }

                this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));

                if (triggerChangeEvent) {
                    $(this._element).toggleClass(ClassName.ACTIVE);
                }
            };

            Button.prototype.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY);
                this._element = null;
            };

            // static

            Button._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function () {
                    var data = $(this).data(DATA_KEY);

                    if (!data) {
                        data = new Button(this);
                        $(this).data(DATA_KEY, data);
                    }

                    if (config === 'toggle') {
                        data[config]();
                    }
                });
            };

            _createClass(Button, null, [{
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }]);

            return Button;
        }();

        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */

        $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
            event.preventDefault();

            var button = event.target;

            if (!$(button).hasClass(ClassName.BUTTON)) {
                button = $(button).closest(Selector.BUTTON);
            }

            Button._jQueryInterface.call($(button), 'toggle');
        }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
            var button = $(event.target).closest(Selector.BUTTON)[0];
            $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Button._jQueryInterface;
        $.fn[NAME].Constructor = Button;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Button._jQueryInterface;
        };

        return Button;
    }(jQuery);


    /* ========================================================================
     * Bootstrap: carousel.js v3.3.1
     * http://getbootstrap.com/javascript/#carousel
     * ========================================================================
     * Copyright 2011-2014 Twitter, Inc.
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * ======================================================================== */


    +function ($) {
        'use strict';

        // CAROUSEL CLASS DEFINITION
        // =========================

        var Carousel = function (element, options) {
            this.$element = $(element)
            this.$indicators = this.$element.find('.carousel-indicators')
            this.options = options
            this.paused =
            this.sliding =
            this.interval =
            this.$active =
            this.$items = null

            this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

            this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
              .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
              .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
        }

        Carousel.VERSION = '3.3.1'

        Carousel.TRANSITION_DURATION = 600

        Carousel.DEFAULTS = {
            interval: 5000,
            pause: 'hover',
            wrap: true,
            keyboard: true
        }

        Carousel.prototype.keydown = function (e) {
            if (/input|textarea/i.test(e.target.tagName)) return
            switch (e.which) {
                case 37: this.prev(); break
                case 39: this.next(); break
                default: return
            }

            e.preventDefault()
        }

        Carousel.prototype.cycle = function (e) {
            e || (this.paused = false)

            this.interval && clearInterval(this.interval)

            this.options.interval
              && !this.paused
              && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

            return this
        }

        Carousel.prototype.getItemIndex = function (item) {
            this.$items = item.parent().children('.item')
            return this.$items.index(item || this.$active)
        }

        Carousel.prototype.getItemForDirection = function (direction, active) {
            var delta = direction == 'prev' ? -1 : 1
            var activeIndex = this.getItemIndex(active)
            var itemIndex = (activeIndex + delta) % this.$items.length
            return this.$items.eq(itemIndex)
        }

        Carousel.prototype.to = function (pos) {
            var that = this
            var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

            if (pos > (this.$items.length - 1) || pos < 0) return

            if (this.sliding) return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
            if (activeIndex == pos) return this.pause().cycle()

            return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
        }

        Carousel.prototype.pause = function (e) {
            e || (this.paused = true)

            if (this.$element.find('.next, .prev').length && $.support.transition) {
                this.$element.trigger($.support.transition.end)
                this.cycle(true)
            }

            this.interval = clearInterval(this.interval)

            return this
        }

        Carousel.prototype.next = function () {
            if (this.sliding) return
            return this.slide('next')
        }

        Carousel.prototype.prev = function () {
            if (this.sliding) return
            return this.slide('prev')
        }

        Carousel.prototype.slide = function (type, next) {
            var $active = this.$element.find('.item.active')
            var $next = next || this.getItemForDirection(type, $active)
            var isCycling = this.interval
            var direction = type == 'next' ? 'left' : 'right'
            var fallback = type == 'next' ? 'first' : 'last'
            var that = this

            if (!$next.length) {
                if (!this.options.wrap) return
                $next = this.$element.find('.item')[fallback]()
            }

            if ($next.hasClass('active')) return (this.sliding = false)

            var relatedTarget = $next[0]
            var slideEvent = $.Event('slide.bs.carousel', {
                relatedTarget: relatedTarget,
                direction: direction
            })
            this.$element.trigger(slideEvent)
            if (slideEvent.isDefaultPrevented()) return

            this.sliding = true

            isCycling && this.pause()

            if (this.$indicators.length) {
                this.$indicators.find('.active').removeClass('active')
                var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
                $nextIndicator && $nextIndicator.addClass('active')
            }

            var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
            if ($.support.transition && this.$element.hasClass('slide')) {
                $next.addClass(type)
                $next[0].offsetWidth // force reflow
                $active.addClass(direction)
                $next.addClass(direction)
                $active
                  .one('bsTransitionEnd', function () {
                      $next.removeClass([type, direction].join(' ')).addClass('active')
                      $active.removeClass(['active', direction].join(' '))
                      that.sliding = false
                      setTimeout(function () {
                          that.$element.trigger(slidEvent)
                      }, 0)
                  })
                  .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
            } else {
                $active.removeClass('active')
                $next.addClass('active')
                this.sliding = false
                this.$element.trigger(slidEvent)
            }

            isCycling && this.cycle()

            return this
        }


        // CAROUSEL PLUGIN DEFINITION
        // ==========================

        function Plugin(option) {
            return this.each(function () {
                var $this = $(this)
                var data = $this.data('bs.carousel')
                var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
                var action = typeof option == 'string' ? option : options.slide

                if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
                if (typeof option == 'number') data.to(option)
                else if (action) data[action]()
                else if (options.interval) data.pause().cycle()
            })
        }

        var old = $.fn.carousel

        $.fn.carousel = Plugin
        $.fn.carousel.Constructor = Carousel


        // CAROUSEL NO CONFLICT
        // ====================

        $.fn.carousel.noConflict = function () {
            $.fn.carousel = old
            return this
        }


        // CAROUSEL DATA-API
        // =================

        var clickHandler = function (e) {
            var href
            var $this = $(this)
            var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
            if (!$target.hasClass('carousel')) return
            var options = $.extend({}, $target.data(), $this.data())
            var slideIndex = $this.attr('data-slide-to')
            if (slideIndex) options.interval = false

            Plugin.call($target, options)

            if (slideIndex) {
                $target.data('bs.carousel').to(slideIndex)
            }

            e.preventDefault()
        }

        $(document)
          .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
          .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

        $(window).on('load', function () {
            $('[data-ride="carousel"]').each(function () {
                var $carousel = $(this)
                Plugin.call($carousel, $carousel.data())
            })
        })

    }(jQuery);



    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.6): dropdown.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Dropdown = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'dropdown';
        var VERSION = '4.0.0-alpha.6';
        var DATA_KEY = 'bs.dropdown';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
        var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
        var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
        var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

        var Event = {
            HIDE: 'hide' + EVENT_KEY,
            HIDDEN: 'hidden' + EVENT_KEY,
            SHOW: 'show' + EVENT_KEY,
            SHOWN: 'shown' + EVENT_KEY,
            CLICK: 'click' + EVENT_KEY,
            CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
            FOCUSIN_DATA_API: 'focusin' + EVENT_KEY + DATA_API_KEY,
            KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
            BACKDROP: 'dropdown-backdrop',
            DISABLED: 'disabled',
            SHOW: 'show'
        };

        var Selector = {
            BACKDROP: '.dropdown-backdrop',
            DATA_TOGGLE: '[data-toggle="dropdown"]',
            FORM_CHILD: '.dropdown form',
            ROLE_MENU: '[role="menu"]',
            ROLE_LISTBOX: '[role="listbox"]',
            NAVBAR_NAV: '.navbar-nav',
            VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Dropdown = function () {
            function Dropdown(element) {
                _classCallCheck(this, Dropdown);

                this._element = element;

                this._addEventListeners();
            }

            // getters

            // public

            Dropdown.prototype.toggle = function toggle() {
                if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
                    return false;
                }

                var parent = Dropdown._getParentFromElement(this);
                var isActive = $(parent).hasClass(ClassName.SHOW);

                Dropdown._clearMenus();

                if (isActive) {
                    return false;
                }

                if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

                    // if mobile we use a backdrop because click events don't delegate
                    var dropdown = document.createElement('div');
                    dropdown.className = ClassName.BACKDROP;
                    $(dropdown).insertBefore(this);
                    $(dropdown).on('click', Dropdown._clearMenus);
                }

                var relatedTarget = {
                    relatedTarget: this
                };
                var showEvent = $.Event(Event.SHOW, relatedTarget);

                $(parent).trigger(showEvent);

                if (showEvent.isDefaultPrevented()) {
                    return false;
                }

                this.focus();
                this.setAttribute('aria-expanded', true);

                $(parent).toggleClass(ClassName.SHOW);
                $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

                return false;
            };

            Dropdown.prototype.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY);
                $(this._element).off(EVENT_KEY);
                this._element = null;
            };

            // private

            Dropdown.prototype._addEventListeners = function _addEventListeners() {
                $(this._element).on(Event.CLICK, this.toggle);
            };

            // static

            Dropdown._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function () {
                    var data = $(this).data(DATA_KEY);

                    if (!data) {
                        data = new Dropdown(this);
                        $(this).data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (data[config] === undefined) {
                            throw new Error('No method named "' + config + '"');
                        }
                        data[config].call(this);
                    }
                });
            };

            Dropdown._clearMenus = function _clearMenus(event) {
                if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
                    return;
                }

                var backdrop = $(Selector.BACKDROP)[0];
                if (backdrop) {
                    backdrop.parentNode.removeChild(backdrop);
                }

                var toggles = $.makeArray($(Selector.DATA_TOGGLE));

                for (var i = 0; i < toggles.length; i++) {
                    var parent = Dropdown._getParentFromElement(toggles[i]);
                    var relatedTarget = {
                        relatedTarget: toggles[i]
                    };

                    if (!$(parent).hasClass(ClassName.SHOW)) {
                        continue;
                    }

                    if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'focusin') && $.contains(parent, event.target)) {
                        continue;
                    }

                    var hideEvent = $.Event(Event.HIDE, relatedTarget);
                    $(parent).trigger(hideEvent);
                    if (hideEvent.isDefaultPrevented()) {
                        continue;
                    }

                    toggles[i].setAttribute('aria-expanded', 'false');

                    $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
                }
            };

            Dropdown._getParentFromElement = function _getParentFromElement(element) {
                var parent = void 0;
                var selector = Util.getSelectorFromElement(element);

                if (selector) {
                    parent = $(selector)[0];
                }

                return parent || element.parentNode;
            };

            Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
                if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();

                if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
                    return;
                }

                var parent = Dropdown._getParentFromElement(this);
                var isActive = $(parent).hasClass(ClassName.SHOW);

                if (!isActive && event.which !== ESCAPE_KEYCODE || isActive && event.which === ESCAPE_KEYCODE) {

                    if (event.which === ESCAPE_KEYCODE) {
                        var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
                        $(toggle).trigger('focus');
                    }

                    $(this).trigger('click');
                    return;
                }

                var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

                if (!items.length) {
                    return;
                }

                var index = items.indexOf(event.target);

                if (event.which === ARROW_UP_KEYCODE && index > 0) {
                    // up
                    index--;
                }

                if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
                    // down
                    index++;
                }

                if (index < 0) {
                    index = 0;
                }

                items[index].focus();
            };

            _createClass(Dropdown, null, [{
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }]);

            return Dropdown;
        }();

        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */

        $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + ' ' + Event.FOCUSIN_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
            e.stopPropagation();
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Dropdown._jQueryInterface;
        $.fn[NAME].Constructor = Dropdown;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Dropdown._jQueryInterface;
        };

        return Dropdown;
    }(jQuery);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.6): modal.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Modal = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'modal';
        var VERSION = '4.0.0-alpha.6';
        var DATA_KEY = 'bs.modal';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 300;
        var BACKDROP_TRANSITION_DURATION = 150;
        var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

        var Default = {
            backdrop: true,
            keyboard: true,
            focus: true,
            show: true
        };

        var DefaultType = {
            backdrop: '(boolean|string)',
            keyboard: 'boolean',
            focus: 'boolean',
            show: 'boolean'
        };

        var Event = {
            HIDE: 'hide' + EVENT_KEY,
            HIDDEN: 'hidden' + EVENT_KEY,
            SHOW: 'show' + EVENT_KEY,
            SHOWN: 'shown' + EVENT_KEY,
            FOCUSIN: 'focusin' + EVENT_KEY,
            RESIZE: 'resize' + EVENT_KEY,
            CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
            KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
            MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
            MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
            CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
            SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
            BACKDROP: 'modal-backdrop',
            OPEN: 'modal-open',
            FADE: 'fade',
            SHOW: 'show'
        };

        var Selector = {
            DIALOG: '.modal-dialog',
            DATA_TOGGLE: '[data-toggle="modal"]',
            DATA_DISMISS: '[data-dismiss="modal"]',
            FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Modal = function () {
            function Modal(element, config) {
                _classCallCheck(this, Modal);

                this._config = this._getConfig(config);
                this._element = element;
                this._dialog = $(element).find(Selector.DIALOG)[0];
                this._backdrop = null;
                this._isShown = false;
                this._isBodyOverflowing = false;
                this._ignoreBackdropClick = false;
                this._isTransitioning = false;
                this._originalBodyPadding = 0;
                this._scrollbarWidth = 0;
            }

            // getters

            // public

            Modal.prototype.toggle = function toggle(relatedTarget) {
                return this._isShown ? this.hide() : this.show(relatedTarget);
            };

            Modal.prototype.show = function show(relatedTarget) {
                var _this9 = this;

                if (this._isTransitioning) {
                    throw new Error('Modal is transitioning');
                }

                if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
                    this._isTransitioning = true;
                }
                var showEvent = $.Event(Event.SHOW, {
                    relatedTarget: relatedTarget
                });

                $(this._element).trigger(showEvent);

                if (this._isShown || showEvent.isDefaultPrevented()) {
                    return;
                }

                this._isShown = true;

                this._checkScrollbar();
                this._setScrollbar();

                $(document.body).addClass(ClassName.OPEN);

                this._setEscapeEvent();
                this._setResizeEvent();

                $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
                    return _this9.hide(event);
                });

                $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
                    $(_this9._element).one(Event.MOUSEUP_DISMISS, function (event) {
                        if ($(event.target).is(_this9._element)) {
                            _this9._ignoreBackdropClick = true;
                        }
                    });
                });

                this._showBackdrop(function () {
                    return _this9._showElement(relatedTarget);
                });
            };

            Modal.prototype.hide = function hide(event) {
                var _this10 = this;

                if (event) {
                    event.preventDefault();
                }

                if (this._isTransitioning) {
                    throw new Error('Modal is transitioning');
                }

                var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);
                if (transition) {
                    this._isTransitioning = true;
                }

                var hideEvent = $.Event(Event.HIDE);
                $(this._element).trigger(hideEvent);

                if (!this._isShown || hideEvent.isDefaultPrevented()) {
                    return;
                }

                this._isShown = false;

                this._setEscapeEvent();
                this._setResizeEvent();

                $(document).off(Event.FOCUSIN);

                $(this._element).removeClass(ClassName.SHOW);

                $(this._element).off(Event.CLICK_DISMISS);
                $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

                if (transition) {
                    $(this._element).one(Util.TRANSITION_END, function (event) {
                        return _this10._hideModal(event);
                    }).emulateTransitionEnd(TRANSITION_DURATION);
                } else {
                    this._hideModal();
                }
            };

            Modal.prototype.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY);

                $(window, document, this._element, this._backdrop).off(EVENT_KEY);

                this._config = null;
                this._element = null;
                this._dialog = null;
                this._backdrop = null;
                this._isShown = null;
                this._isBodyOverflowing = null;
                this._ignoreBackdropClick = null;
                this._originalBodyPadding = null;
                this._scrollbarWidth = null;
            };

            // private

            Modal.prototype._getConfig = function _getConfig(config) {
                config = $.extend({}, Default, config);
                Util.typeCheckConfig(NAME, config, DefaultType);
                return config;
            };

            Modal.prototype._showElement = function _showElement(relatedTarget) {
                var _this11 = this;

                var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

                if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
                    // don't move modals dom position
                    document.body.appendChild(this._element);
                }

                this._element.style.display = 'block';
                this._element.removeAttribute('aria-hidden');
                this._element.scrollTop = 0;

                if (transition) {
                    Util.reflow(this._element);
                }

                $(this._element).addClass(ClassName.SHOW);

                if (this._config.focus) {
                    this._enforceFocus();
                }

                var shownEvent = $.Event(Event.SHOWN, {
                    relatedTarget: relatedTarget
                });

                var transitionComplete = function transitionComplete() {
                    if (_this11._config.focus) {
                        _this11._element.focus();
                    }
                    _this11._isTransitioning = false;
                    $(_this11._element).trigger(shownEvent);
                };

                if (transition) {
                    $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
                } else {
                    transitionComplete();
                }
            };

            Modal.prototype._enforceFocus = function _enforceFocus() {
                var _this12 = this;

                $(document).off(Event.FOCUSIN) // guard against infinite focus loop
                .on(Event.FOCUSIN, function (event) {
                    if (document !== event.target && _this12._element !== event.target && !$(_this12._element).has(event.target).length) {
                        _this12._element.focus();
                    }
                });
            };

            Modal.prototype._setEscapeEvent = function _setEscapeEvent() {
                var _this13 = this;

                if (this._isShown && this._config.keyboard) {
                    $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
                        if (event.which === ESCAPE_KEYCODE) {
                            _this13.hide();
                        }
                    });
                } else if (!this._isShown) {
                    $(this._element).off(Event.KEYDOWN_DISMISS);
                }
            };

            Modal.prototype._setResizeEvent = function _setResizeEvent() {
                var _this14 = this;

                if (this._isShown) {
                    $(window).on(Event.RESIZE, function (event) {
                        return _this14._handleUpdate(event);
                    });
                } else {
                    $(window).off(Event.RESIZE);
                }
            };

            Modal.prototype._hideModal = function _hideModal() {
                var _this15 = this;

                this._element.style.display = 'none';
                this._element.setAttribute('aria-hidden', 'true');
                this._isTransitioning = false;
                this._showBackdrop(function () {
                    $(document.body).removeClass(ClassName.OPEN);
                    _this15._resetAdjustments();
                    _this15._resetScrollbar();
                    $(_this15._element).trigger(Event.HIDDEN);
                });
            };

            Modal.prototype._removeBackdrop = function _removeBackdrop() {
                if (this._backdrop) {
                    $(this._backdrop).remove();
                    this._backdrop = null;
                }
            };

            Modal.prototype._showBackdrop = function _showBackdrop(callback) {
                var _this16 = this;

                var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

                if (this._isShown && this._config.backdrop) {
                    var doAnimate = Util.supportsTransitionEnd() && animate;

                    this._backdrop = document.createElement('div');
                    this._backdrop.className = ClassName.BACKDROP;

                    if (animate) {
                        $(this._backdrop).addClass(animate);
                    }

                    $(this._backdrop).appendTo(document.body);

                    $(this._element).on(Event.CLICK_DISMISS, function (event) {
                        if (_this16._ignoreBackdropClick) {
                            _this16._ignoreBackdropClick = false;
                            return;
                        }
                        if (event.target !== event.currentTarget) {
                            return;
                        }
                        if (_this16._config.backdrop === 'static') {
                            _this16._element.focus();
                        } else {
                            _this16.hide();
                        }
                    });

                    if (doAnimate) {
                        Util.reflow(this._backdrop);
                    }

                    $(this._backdrop).addClass(ClassName.SHOW);

                    if (!callback) {
                        return;
                    }

                    if (!doAnimate) {
                        callback();
                        return;
                    }

                    $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
                } else if (!this._isShown && this._backdrop) {
                    $(this._backdrop).removeClass(ClassName.SHOW);

                    var callbackRemove = function callbackRemove() {
                        _this16._removeBackdrop();
                        if (callback) {
                            callback();
                        }
                    };

                    if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
                        $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
                    } else {
                        callbackRemove();
                    }
                } else if (callback) {
                    callback();
                }
            };

            // ----------------------------------------------------------------------
            // the following methods are used to handle overflowing modals
            // todo (fat): these should probably be refactored out of modal.js
            // ----------------------------------------------------------------------

            Modal.prototype._handleUpdate = function _handleUpdate() {
                this._adjustDialog();
            };

            Modal.prototype._adjustDialog = function _adjustDialog() {
                var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

                if (!this._isBodyOverflowing && isModalOverflowing) {
                    this._element.style.paddingLeft = this._scrollbarWidth + 'px';
                }

                if (this._isBodyOverflowing && !isModalOverflowing) {
                    this._element.style.paddingRight = this._scrollbarWidth + 'px';
                }
            };

            Modal.prototype._resetAdjustments = function _resetAdjustments() {
                this._element.style.paddingLeft = '';
                this._element.style.paddingRight = '';
            };

            Modal.prototype._checkScrollbar = function _checkScrollbar() {
                this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
                this._scrollbarWidth = this._getScrollbarWidth();
            };

            Modal.prototype._setScrollbar = function _setScrollbar() {
                var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

                this._originalBodyPadding = document.body.style.paddingRight || '';

                if (this._isBodyOverflowing) {
                    document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
                }
            };

            Modal.prototype._resetScrollbar = function _resetScrollbar() {
                document.body.style.paddingRight = this._originalBodyPadding;
            };

            Modal.prototype._getScrollbarWidth = function _getScrollbarWidth() {
                // thx d.walsh
                var scrollDiv = document.createElement('div');
                scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
                document.body.appendChild(scrollDiv);
                var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
                return scrollbarWidth;
            };

            // static

            Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
                return this.each(function () {
                    var data = $(this).data(DATA_KEY);
                    var _config = $.extend({}, Modal.Default, $(this).data(), (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config);

                    if (!data) {
                        data = new Modal(this, _config);
                        $(this).data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (data[config] === undefined) {
                            throw new Error('No method named "' + config + '"');
                        }
                        data[config](relatedTarget);
                    } else if (_config.show) {
                        data.show(relatedTarget);
                    }
                });
            };

            _createClass(Modal, null, [{
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }, {
                key: 'Default',
                get: function get() {
                    return Default;
                }
            }]);

            return Modal;
        }();

        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */

        $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
            var _this17 = this;

            var target = void 0;
            var selector = Util.getSelectorFromElement(this);

            if (selector) {
                target = $(selector)[0];
            }

            var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

            if (this.tagName === 'A' || this.tagName === 'AREA') {
                event.preventDefault();
            }

            var $target = $(target).one(Event.SHOW, function (showEvent) {
                if (showEvent.isDefaultPrevented()) {
                    // only register focus restorer if modal will actually get shown
                    return;
                }

                $target.one(Event.HIDDEN, function () {
                    if ($(_this17).is(':visible')) {
                        _this17.focus();
                    }
                });
            });

            Modal._jQueryInterface.call($(target), config, this);
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Modal._jQueryInterface;
        $.fn[NAME].Constructor = Modal;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Modal._jQueryInterface;
        };

        return Modal;
    }(jQuery);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.6): scrollspy.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var ScrollSpy = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'scrollspy';
        var VERSION = '4.0.0-alpha.6';
        var DATA_KEY = 'bs.scrollspy';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];

        var Default = {
            offset: 10,
            method: 'auto',
            target: ''
        };

        var DefaultType = {
            offset: 'number',
            method: 'string',
            target: '(string|element)'
        };

        var Event = {
            ACTIVATE: 'activate' + EVENT_KEY,
            SCROLL: 'scroll' + EVENT_KEY,
            LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
            DROPDOWN_ITEM: 'dropdown-item',
            DROPDOWN_MENU: 'dropdown-menu',
            NAV_LINK: 'nav-link',
            NAV: 'nav',
            ACTIVE: 'active'
        };

        var Selector = {
            DATA_SPY: '[data-spy="scroll"]',
            ACTIVE: '.active',
            LIST_ITEM: '.list-item',
            LI: 'li',
            LI_DROPDOWN: 'li.dropdown',
            NAV_LINKS: '.nav-link',
            DROPDOWN: '.dropdown',
            DROPDOWN_ITEMS: '.dropdown-item',
            DROPDOWN_TOGGLE: '.dropdown-toggle'
        };

        var OffsetMethod = {
            OFFSET: 'offset',
            POSITION: 'position'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var ScrollSpy = function () {
            function ScrollSpy(element, config) {
                var _this18 = this;

                _classCallCheck(this, ScrollSpy);

                this._element = element;
                this._scrollElement = element.tagName === 'BODY' ? window : element;
                this._config = this._getConfig(config);
                this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
                this._offsets = [];
                this._targets = [];
                this._activeTarget = null;
                this._scrollHeight = 0;

                $(this._scrollElement).on(Event.SCROLL, function (event) {
                    return _this18._process(event);
                });

                this.refresh();
                this._process();
            }

            // getters

            // public

            ScrollSpy.prototype.refresh = function refresh() {
                var _this19 = this;

                var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

                var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

                var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

                this._offsets = [];
                this._targets = [];

                this._scrollHeight = this._getScrollHeight();

                var targets = $.makeArray($(this._selector));

                targets.map(function (element) {
                    var target = void 0;
                    var targetSelector = Util.getSelectorFromElement(element);

                    if (targetSelector) {
                        target = $(targetSelector)[0];
                    }

                    if (target && (target.offsetWidth || target.offsetHeight)) {
                        // todo (fat): remove sketch reliance on jQuery position/offset
                        return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
                    }
                    return null;
                }).filter(function (item) {
                    return item;
                }).sort(function (a, b) {
                    return a[0] - b[0];
                }).forEach(function (item) {
                    _this19._offsets.push(item[0]);
                    _this19._targets.push(item[1]);
                });
            };

            ScrollSpy.prototype.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY);
                $(this._scrollElement).off(EVENT_KEY);

                this._element = null;
                this._scrollElement = null;
                this._config = null;
                this._selector = null;
                this._offsets = null;
                this._targets = null;
                this._activeTarget = null;
                this._scrollHeight = null;
            };

            // private

            ScrollSpy.prototype._getConfig = function _getConfig(config) {
                config = $.extend({}, Default, config);

                if (typeof config.target !== 'string') {
                    var id = $(config.target).attr('id');
                    if (!id) {
                        id = Util.getUID(NAME);
                        $(config.target).attr('id', id);
                    }
                    config.target = '#' + id;
                }

                Util.typeCheckConfig(NAME, config, DefaultType);

                return config;
            };

            ScrollSpy.prototype._getScrollTop = function _getScrollTop() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
            };

            ScrollSpy.prototype._getScrollHeight = function _getScrollHeight() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            };

            ScrollSpy.prototype._getOffsetHeight = function _getOffsetHeight() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.offsetHeight;
            };

            ScrollSpy.prototype._process = function _process() {
                var scrollTop = this._getScrollTop() + this._config.offset;
                var scrollHeight = this._getScrollHeight();
                var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

                if (this._scrollHeight !== scrollHeight) {
                    this.refresh();
                }

                if (scrollTop >= maxScroll) {
                    var target = this._targets[this._targets.length - 1];

                    if (this._activeTarget !== target) {
                        this._activate(target);
                    }
                    return;
                }

                if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
                    this._activeTarget = null;
                    this._clear();
                    return;
                }

                for (var i = this._offsets.length; i--;) {
                    var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

                    if (isActiveTarget) {
                        this._activate(this._targets[i]);
                    }
                }
            };

            ScrollSpy.prototype._activate = function _activate(target) {
                this._activeTarget = target;

                this._clear();

                var queries = this._selector.split(',');
                queries = queries.map(function (selector) {
                    return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
                });

                var $link = $(queries.join(','));

                if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
                    $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
                    $link.addClass(ClassName.ACTIVE);
                } else {
                    // todo (fat) this is kinda sus...
                    // recursively add actives to tested nav-links
                    $link.parents(Selector.LI).find('> ' + Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
                }

                $(this._scrollElement).trigger(Event.ACTIVATE, {
                    relatedTarget: target
                });
            };

            ScrollSpy.prototype._clear = function _clear() {
                $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
            };

            // static

            ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function () {
                    var data = $(this).data(DATA_KEY);
                    var _config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' && config;

                    if (!data) {
                        data = new ScrollSpy(this, _config);
                        $(this).data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (data[config] === undefined) {
                            throw new Error('No method named "' + config + '"');
                        }
                        data[config]();
                    }
                });
            };

            _createClass(ScrollSpy, null, [{
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }, {
                key: 'Default',
                get: function get() {
                    return Default;
                }
            }]);

            return ScrollSpy;
        }();

        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */

        $(window).on(Event.LOAD_DATA_API, function () {
            var scrollSpys = $.makeArray($(Selector.DATA_SPY));

            for (var i = scrollSpys.length; i--;) {
                var $spy = $(scrollSpys[i]);
                ScrollSpy._jQueryInterface.call($spy, $spy.data());
            }
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = ScrollSpy._jQueryInterface;
        $.fn[NAME].Constructor = ScrollSpy;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return ScrollSpy._jQueryInterface;
        };

        return ScrollSpy;
    }(jQuery);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.6): tab.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Tab = function ($) {

        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */

        var NAME = 'tab';
        var VERSION = '4.0.0-alpha.6';
        var DATA_KEY = 'bs.tab';
        var EVENT_KEY = '.' + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $.fn[NAME];
        var TRANSITION_DURATION = 150;

        var Event = {
            HIDE: 'hide' + EVENT_KEY,
            HIDDEN: 'hidden' + EVENT_KEY,
            SHOW: 'show' + EVENT_KEY,
            SHOWN: 'shown' + EVENT_KEY,
            CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
        };

        var ClassName = {
            DROPDOWN_MENU: 'dropdown-menu',
            ACTIVE: 'active',
            DISABLED: 'disabled',
            FADE: 'fade',
            SHOW: 'show'
        };

        var Selector = {
            A: 'a',
            LI: 'li',
            DROPDOWN: '.dropdown',
            LIST: 'ul:not(.dropdown-menu), ol:not(.dropdown-menu), nav:not(.dropdown-menu)',
            FADE_CHILD: '> .nav-item .fade, > .fade',
            ACTIVE: '.active',
            ACTIVE_CHILD: '> .nav-item > .active, > .active',
            DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
            DROPDOWN_TOGGLE: '.dropdown-toggle',
            DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
        };

        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

        var Tab = function () {
            function Tab(element) {
                _classCallCheck(this, Tab);

                this._element = element;
            }

            // getters

            // public

            Tab.prototype.show = function show() {
                var _this20 = this;

                if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
                    return;
                }

                var target = void 0;
                var previous = void 0;
                var listElement = $(this._element).closest(Selector.LIST)[0];
                var selector = Util.getSelectorFromElement(this._element);

                if (listElement) {
                    previous = $.makeArray($(listElement).find(Selector.ACTIVE));
                    previous = previous[previous.length - 1];
                }

                var hideEvent = $.Event(Event.HIDE, {
                    relatedTarget: this._element
                });

                var showEvent = $.Event(Event.SHOW, {
                    relatedTarget: previous
                });

                if (previous) {
                    $(previous).trigger(hideEvent);
                }

                $(this._element).trigger(showEvent);

                if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
                    return;
                }

                if (selector) {
                    target = $(selector)[0];
                }

                this._activate(this._element, listElement);

                var complete = function complete() {
                    var hiddenEvent = $.Event(Event.HIDDEN, {
                        relatedTarget: _this20._element
                    });

                    var shownEvent = $.Event(Event.SHOWN, {
                        relatedTarget: previous
                    });

                    $(previous).trigger(hiddenEvent);
                    $(_this20._element).trigger(shownEvent);
                };

                if (target) {
                    this._activate(target, target.parentNode, complete);
                } else {
                    complete();
                }
            };

            Tab.prototype.dispose = function dispose() {
                $.removeClass(this._element, DATA_KEY);
                this._element = null;
            };

            // private

            Tab.prototype._activate = function _activate(element, container, callback) {
                var _this21 = this;

                var active = $(container).find(Selector.ACTIVE_CHILD)[0];
                var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

                var complete = function complete() {
                    return _this21._transitionComplete(element, active, isTransitioning, callback);
                };

                if (active && isTransitioning) {
                    $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
                } else {
                    complete();
                }

                if (active) {
                    $(active).removeClass(ClassName.SHOW);
                }
            };

            Tab.prototype._transitionComplete = function _transitionComplete(element, active, isTransitioning, callback) {
                if (active) {
                    $(active).removeClass(ClassName.ACTIVE);

                    var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

                    if (dropdownChild) {
                        $(dropdownChild).removeClass(ClassName.ACTIVE);
                    }

                    active.setAttribute('aria-expanded', false);
                }

                $(element).addClass(ClassName.ACTIVE);
                element.setAttribute('aria-expanded', true);

                if (isTransitioning) {
                    Util.reflow(element);
                    $(element).addClass(ClassName.SHOW);
                } else {
                    $(element).removeClass(ClassName.FADE);
                }

                if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

                    var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
                    if (dropdownElement) {
                        $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
                    }

                    element.setAttribute('aria-expanded', true);
                }

                if (callback) {
                    callback();
                }
            };

            // static

            Tab._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function () {
                    var $this = $(this);
                    var data = $this.data(DATA_KEY);

                    if (!data) {
                        data = new Tab(this);
                        $this.data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (data[config] === undefined) {
                            throw new Error('No method named "' + config + '"');
                        }
                        data[config]();
                    }
                });
            };

            _createClass(Tab, null, [{
                key: 'VERSION',
                get: function get() {
                    return VERSION;
                }
            }]);

            return Tab;
        }();

        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */

        $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
            event.preventDefault();
            Tab._jQueryInterface.call($(this), 'show');
        });

        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $.fn[NAME] = Tab._jQueryInterface;
        $.fn[NAME].Constructor = Tab;
        $.fn[NAME].noConflict = function () {
            $.fn[NAME] = JQUERY_NO_CONFLICT;
            return Tab._jQueryInterface;
        };

        return Tab;
    }(jQuery);



    /*
* Project: Bootstrap Notify = v3.1.5
* Description: Turns standard Bootstrap alerts into "Growl-like" notifications.
* Author: Mouse0270 aka Robert McIntosh
* License: MIT License
* Website: https://github.com/mouse0270/bootstrap-growl
*/

    /* global define:false, require: false, jQuery:false */

    (function (factory) {
        if (typeof define === 'function' && define.amd) {
            // AMD. Register as an anonymous module.
            define(['jquery'], factory);
        } else if (typeof exports === 'object') {
            // Node/CommonJS
            factory(require('jquery'));
        } else {
            // Browser globals
            factory(jQuery);
        }
    }(function ($) {
        // Create the defaults once
        var defaults = {
            element: 'body',
            position: null,
            type: "info",
            allow_dismiss: true,
            allow_duplicates: true,
            newest_on_top: false,
            showProgressbar: false,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: 5000,
            timer: 1000,
            url_target: '_blank',
            mouse_over: null,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
            onShow: null,
            onShown: null,
            onClose: null,
            onClosed: null,
            onClick: null,
            icon_type: 'class',
            template: '<div data-notify="container" class="col-xs-11 col-sm-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'
        };

        String.format = function () {
            var args = arguments;
            var str = arguments[0];
            return str.replace(/(\{\{\d\}\}|\{\d\})/g, function (str) {
                if (str.substring(0, 2) === "{{") return str;
                var num = parseInt(str.match(/\d/)[0]);
                return args[num + 1];
            });
        };

        function isDuplicateNotification(notification) {
            var isDupe = false;

            $('[data-notify="container"]').each(function (i, el) {
                var $el = $(el);
                var title = $el.find('[data-notify="title"]').html().trim();
                var message = $el.find('[data-notify="message"]').html().trim();

                // The input string might be different than the actual parsed HTML string!
                // (<br> vs <br /> for example)
                // So we have to force-parse this as HTML here!
                var isSameTitle = title === $("<div>" + notification.settings.content.title + "</div>").html().trim();
                var isSameMsg = message === $("<div>" + notification.settings.content.message + "</div>").html().trim();
                var isSameType = $el.hasClass('alert-' + notification.settings.type);

                if (isSameTitle && isSameMsg && isSameType) {
                    //we found the dupe. Set the var and stop checking.
                    isDupe = true;
                }
                return !isDupe;
            });

            return isDupe;
        }

        function Notify(element, content, options) {
            // Setup Content of Notify
            var contentObj = {
                content: {
                    message: typeof content === 'object' ? content.message : content,
                    title: content.title ? content.title : '',
                    icon: content.icon ? content.icon : '',
                    url: content.url ? content.url : '#',
                    target: content.target ? content.target : '-'
                }
            };

            options = $.extend(true, {}, contentObj, options);
            this.settings = $.extend(true, {}, defaults, options);
            this._defaults = defaults;
            if (this.settings.content.target === "-") {
                this.settings.content.target = this.settings.url_target;
            }
            this.animations = {
                start: 'webkitAnimationStart oanimationstart MSAnimationStart animationstart',
                end: 'webkitAnimationEnd oanimationend MSAnimationEnd animationend'
            };

            if (typeof this.settings.offset === 'number') {
                this.settings.offset = {
                    x: this.settings.offset,
                    y: this.settings.offset
                };
            }

            //if duplicate messages are not allowed, then only continue if this new message is not a duplicate of one that it already showing
            if (this.settings.allow_duplicates || (!this.settings.allow_duplicates && !isDuplicateNotification(this))) {
                this.init();
            }
        }

        $.extend(Notify.prototype, {
            init: function () {
                var self = this;

                this.buildNotify();
                if (this.settings.content.icon) {
                    this.setIcon();
                }
                if (this.settings.content.url != "#") {
                    this.styleURL();
                }
                this.styleDismiss();
                this.placement();
                this.bind();

                this.notify = {
                    $ele: this.$ele,
                    update: function (command, update) {
                        var commands = {};
                        if (typeof command === "string") {
                            commands[command] = update;
                        } else {
                            commands = command;
                        }
                        for (var cmd in commands) {
                            switch (cmd) {
                                case "type":
                                    this.$ele.removeClass('alert-' + self.settings.type);
                                    this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass('progress-bar-' + self.settings.type);
                                    self.settings.type = commands[cmd];
                                    this.$ele.addClass('alert-' + commands[cmd]).find('[data-notify="progressbar"] > .progress-bar').addClass('progress-bar-' + commands[cmd]);
                                    break;
                                case "icon":
                                    var $icon = this.$ele.find('[data-notify="icon"]');
                                    if (self.settings.icon_type.toLowerCase() === 'class') {
                                        $icon.removeClass(self.settings.content.icon).addClass(commands[cmd]);
                                    } else {
                                        if (!$icon.is('img')) {
                                            $icon.find('img');
                                        }
                                        $icon.attr('src', commands[cmd]);
                                    }
                                    self.settings.content.icon = commands[command];
                                    break;
                                case "progress":
                                    var newDelay = self.settings.delay - (self.settings.delay * (commands[cmd] / 100));
                                    this.$ele.data('notify-delay', newDelay);
                                    this.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', commands[cmd]).css('width', commands[cmd] + '%');
                                    break;
                                case "url":
                                    this.$ele.find('[data-notify="url"]').attr('href', commands[cmd]);
                                    break;
                                case "target":
                                    this.$ele.find('[data-notify="url"]').attr('target', commands[cmd]);
                                    break;
                                default:
                                    this.$ele.find('[data-notify="' + cmd + '"]').html(commands[cmd]);
                            }
                        }
                        var posX = this.$ele.outerHeight() + parseInt(self.settings.spacing) + parseInt(self.settings.offset.y);
                        self.reposition(posX);
                    },
                    close: function () {
                        self.close();
                    }
                };

            },
            buildNotify: function () {
                var content = this.settings.content;
                this.$ele = $(String.format(this.settings.template, this.settings.type, content.title, content.message, content.url, content.target));
                this.$ele.attr('data-notify-position', this.settings.placement.from + '-' + this.settings.placement.align);
                if (!this.settings.allow_dismiss) {
                    this.$ele.find('[data-notify="dismiss"]').css('display', 'none');
                }
                if ((this.settings.delay <= 0 && !this.settings.showProgressbar) || !this.settings.showProgressbar) {
                    this.$ele.find('[data-notify="progressbar"]').remove();
                }
            },
            setIcon: function () {
                if (this.settings.icon_type.toLowerCase() === 'class') {
                    this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon);
                } else {
                    if (this.$ele.find('[data-notify="icon"]').is('img')) {
                        this.$ele.find('[data-notify="icon"]').attr('src', this.settings.content.icon);
                    } else {
                        this.$ele.find('[data-notify="icon"]').append('<img src="' + this.settings.content.icon + '" alt="Notify Icon" />');
                    }
                }
            },
            styleDismiss: function () {
                this.$ele.find('[data-notify="dismiss"]').css({
                    position: 'absolute',
                    right: '10px',
                    top: '5px',
                    zIndex: this.settings.z_index + 2
                });
            },
            styleURL: function () {
                this.$ele.find('[data-notify="url"]').css({
                    backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)',
                    height: '100%',
                    left: 0,
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                    zIndex: this.settings.z_index + 1
                });
            },
            placement: function () {
                var self = this,
                    offsetAmt = this.settings.offset.y,
                    css = {
                        display: 'inline-block',
                        margin: '0px auto',
                        position: this.settings.position ? this.settings.position : (this.settings.element === 'body' ? 'fixed' : 'absolute'),
                        transition: 'all .5s ease-in-out',
                        zIndex: this.settings.z_index
                    },
                    hasAnimation = false,
                    settings = this.settings;

                $('[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])').each(function () {
                    offsetAmt = Math.max(offsetAmt, parseInt($(this).css(settings.placement.from)) + parseInt($(this).outerHeight()) + parseInt(settings.spacing));
                });
                if (this.settings.newest_on_top === true) {
                    offsetAmt = this.settings.offset.y;
                }
                css[this.settings.placement.from] = offsetAmt + 'px';

                switch (this.settings.placement.align) {
                    case "left":
                    case "right":
                        css[this.settings.placement.align] = this.settings.offset.x + 'px';
                        break;
                    case "center":
                        css.left = 0;
                        css.right = 0;
                        break;
                }
                this.$ele.css(css).addClass(this.settings.animate.enter);
                $.each(Array('webkit-', 'moz-', 'o-', 'ms-', ''), function (index, prefix) {
                    self.$ele[0].style[prefix + 'AnimationIterationCount'] = 1;
                });

                $(this.settings.element).append(this.$ele);

                if (this.settings.newest_on_top === true) {
                    offsetAmt = (parseInt(offsetAmt) + parseInt(this.settings.spacing)) + this.$ele.outerHeight();
                    this.reposition(offsetAmt);
                }

                if ($.isFunction(self.settings.onShow)) {
                    self.settings.onShow.call(this.$ele);
                }

                this.$ele.one(this.animations.start, function () {
                    hasAnimation = true;
                }).one(this.animations.end, function () {
                    self.$ele.removeClass(self.settings.animate.enter);
                    if ($.isFunction(self.settings.onShown)) {
                        self.settings.onShown.call(this);
                    }
                });

                setTimeout(function () {
                    if (!hasAnimation) {
                        if ($.isFunction(self.settings.onShown)) {
                            self.settings.onShown.call(this);
                        }
                    }
                }, 600);
            },
            bind: function () {
                var self = this;

                this.$ele.find('[data-notify="dismiss"]').on('click', function () {
                    self.close();
                });

                if ($.isFunction(self.settings.onClick)) {
                    this.$ele.on('click', function (event) {
                        if (event.target != self.$ele.find('[data-notify="dismiss"]')[0]) {
                            self.settings.onClick.call(this, event);
                        }
                    });
                }

                this.$ele.mouseover(function () {
                    $(this).data('data-hover', "true");
                }).mouseout(function () {
                    $(this).data('data-hover', "false");
                });
                this.$ele.data('data-hover', "false");

                if (this.settings.delay > 0) {
                    self.$ele.data('notify-delay', self.settings.delay);
                    var timer = setInterval(function () {
                        var delay = parseInt(self.$ele.data('notify-delay')) - self.settings.timer;
                        if ((self.$ele.data('data-hover') === 'false' && self.settings.mouse_over === "pause") || self.settings.mouse_over != "pause") {
                            var percent = ((self.settings.delay - delay) / self.settings.delay) * 100;
                            self.$ele.data('notify-delay', delay);
                            self.$ele.find('[data-notify="progressbar"] > div').attr('aria-valuenow', percent).css('width', percent + '%');
                        }
                        if (delay <= -(self.settings.timer)) {
                            clearInterval(timer);
                            self.close();
                        }
                    }, self.settings.timer);
                }
            },
            close: function () {
                var self = this,
                    posX = parseInt(this.$ele.css(this.settings.placement.from)),
                    hasAnimation = false;

                this.$ele.attr('data-closing', 'true').addClass(this.settings.animate.exit);
                self.reposition(posX);

                if ($.isFunction(self.settings.onClose)) {
                    self.settings.onClose.call(this.$ele);
                }

                this.$ele.one(this.animations.start, function () {
                    hasAnimation = true;
                }).one(this.animations.end, function () {
                    $(this).remove();
                    if ($.isFunction(self.settings.onClosed)) {
                        self.settings.onClosed.call(this);
                    }
                });

                setTimeout(function () {
                    if (!hasAnimation) {
                        self.$ele.remove();
                        if ($.isFunction(self.settings.onClosed)) {
                            self.settings.onClosed.call(this);
                        }
                    }
                }, 600);
            },
            reposition: function (posX) {
                var self = this,
                    notifies = '[data-notify-position="' + this.settings.placement.from + '-' + this.settings.placement.align + '"]:not([data-closing="true"])',
                    $elements = this.$ele.nextAll(notifies);
                if (this.settings.newest_on_top === true) {
                    $elements = this.$ele.prevAll(notifies);
                }
                $elements.each(function () {
                    $(this).css(self.settings.placement.from, posX);
                    posX = (parseInt(posX) + parseInt(self.settings.spacing)) + $(this).outerHeight();
                });
            }
        });

        $.notify = function (content, options) {
          
            var plugin = new Notify(this, content, options);
            return plugin.notify;
        };
        $.notifyDefaults = function (options) {
            defaults = $.extend(true, {}, defaults, options);
            return defaults;
        };

        $.notifyClose = function (selector) {

            if (typeof selector === "undefined" || selector === "all") {
                $('[data-notify]').find('[data-notify="dismiss"]').trigger('click');
            } else if (selector === 'success' || selector === 'info' || selector === 'warning' || selector === 'danger') {
                $('.alert-' + selector + '[data-notify]').find('[data-notify="dismiss"]').trigger('click');
            } else if (selector) {
                $(selector + '[data-notify]').find('[data-notify="dismiss"]').trigger('click');
            }
            else {
                $('[data-notify-position="' + selector + '"]').find('[data-notify="dismiss"]').trigger('click');
            }
        };

        $.notifyCloseExcept = function (selector) {

            if (selector === 'success' || selector === 'info' || selector === 'warning' || selector === 'danger') {
                $('[data-notify]').not('.alert-' + selector).find('[data-notify="dismiss"]').trigger('click');
            } else {
                $('[data-notify]').not(selector).find('[data-notify="dismiss"]').trigger('click');
            }
        };


    }));
  

}();
