(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("email_mask", [], factory);
	else if(typeof exports === 'object')
		exports["email_mask"] = factory();
	else
		root["email_mask"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "init": () => (/* reexport */ email_input)
});

;// CONCATENATED MODULE: ./src/email_step.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var email_step = /*#__PURE__*/function () {
  function email_step(opt) {
    _classCallCheck(this, email_step);

    this.name = opt['name'] ? opt['name'] : ''; //this.val = (opt['value']) ? opt['value'] : '';

    this.plc = opt['plc'] ? opt['plc'] : '_';
    this.valid_symbols = opt['valid_regx'] ? opt['valid_regx'] : /[0-9A-Za-z@]/;
    this.min_length = 1;
    this.max_length = 99;
    this.next_step_symbols = opt['next_step_symbols'] ? opt['next_step_symbols'] : [];
    this.separator = opt['separator'] ? opt['separator'] : '';
    this.val = [];

    for (var i = 0; i < this.max_length; i++) {
      this.val[i] = ' ';
    }
  }

  _createClass(email_step, [{
    key: "set",
    value: function set(pos, val) {
      this.val.splice(pos, 0, val);
    }
  }, {
    key: "get_symbol",
    value: function get_symbol() {}
  }, {
    key: "remove",
    value: function remove(pos) {
      this.val.splice(pos - 1, 1);
    }
  }, {
    key: "valid",
    value: function valid(val) {
      if (val.length > 1 || val.search(this.valid_symbols) == -1) {
        return false;
      }

      return true;
    }
  }, {
    key: "print_value",
    value: function print_value() {
      var value = '';

      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i] !== ' ') {
          value += this.val[i];
        }
      }

      var diff = this.min_length - value.length;

      if (diff > 0) {
        value += this.plc.repeat(diff);
      }

      return value + this.separator;
    }
  }, {
    key: "clear_value",
    value: function clear_value() {
      var value = '';

      for (var i = 0; i < this.val.length; i++) {
        if (this.val[i] !== ' ') {
          value += this.val[i];
        }
      }

      return value;
    }
  }, {
    key: "length",
    value: function length() {
      var full = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!full) {
        return this.clear_value().length;
      } else {
        return this.print_value().length;
      }
    }
  }, {
    key: "check_next_lvl",
    value: function check_next_lvl(symb, pos) {
      if (this.next_step_symbols.indexOf(symb) !== -1 && this.length() == pos && this.length() >= this.min_length) {
        return true;
      }

      return false;
    }
  }]);

  return email_step;
}();


;// CONCATENATED MODULE: ./src/email_caret.js
function email_caret_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function email_caret_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function email_caret_createClass(Constructor, protoProps, staticProps) { if (protoProps) email_caret_defineProperties(Constructor.prototype, protoProps); if (staticProps) email_caret_defineProperties(Constructor, staticProps); return Constructor; }

var email_caret = /*#__PURE__*/function () {
  function email_caret(opt) {
    email_caret_classCallCheck(this, email_caret);

    this.el = opt['el'];
  }

  email_caret_createClass(email_caret, [{
    key: "get",
    value: function get() {
      var coords = {
        start: this.el.selectionStart,
        end: this.el.selectionEnd,
        selected: false
      };

      if (this.el.selectionStart !== 0 && this.el.selectionEnd !== 0) {
        var koef = this.el.selectionStart / this.el.selectionEnd;

        if (koef !== 1) {
          coords.selected = true;
        }
      }

      return coords;
    }
  }, {
    key: "set",
    value: function set(p) {
      this.el.setSelectionRange(p, p);
    }
  }]);

  return email_caret;
}();


;// CONCATENATED MODULE: ./src/email_input.js
function email_input_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function email_input_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function email_input_createClass(Constructor, protoProps, staticProps) { if (protoProps) email_input_defineProperties(Constructor.prototype, protoProps); if (staticProps) email_input_defineProperties(Constructor, staticProps); return Constructor; }




var email_input = /*#__PURE__*/function () {
  function email_input(opt) {
    email_input_classCallCheck(this, email_input);

    this.input = opt['input'];
    this.caret = new email_caret({
      el: opt['input']
    });
    this.steps = [];
    this.steps[0] = new email_step({
      separator: '@',
      next_step_symbols: ['@', ' ']
    });
    this.steps[1] = new email_step({
      separator: '.',
      next_step_symbols: ['.', ' ']
    });
    this.steps[2] = new email_step({});
    this.init();
  }

  email_input_createClass(email_input, [{
    key: "foreach_steps",
    value: function foreach_steps() {
      var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      for (var i = 0; i < this.steps.length; i++) {
        func(this.steps[i], i);
      }
    }
  }, {
    key: "find_step",
    value: function find_step() {
      var caret_position = this.caret.get();
      var step_lengths = [];
      var step = 0;
      this.foreach_steps(function (step, index) {
        var val = 0;

        if (index > 0) {
          val = step.length(true) + step_lengths[index - 1];
        } else {
          val = step.length(true);
        }

        step_lengths[index] = val;
      });

      if (caret_position.start >= 0 && caret_position.start < step_lengths[0]) {
        console.log('step 1');
        step = 0;
      } else if (caret_position.start >= step_lengths[0] && caret_position.start < step_lengths[1]) {
        console.log('step 2');
        step = 1;
      } else if (caret_position.start >= step_lengths[1]) {
        console.log('step 3');
        step = 2;
      } //console.log( step_lengths );
      //console.log( caret_position );


      return step;
    }
  }, {
    key: "find_position_in_step",
    value: function find_position_in_step() {
      var caret_position = this.caret.get();
      var step_num = this.find_step();
      var position = 0;

      if (step_num == 0) {
        position = caret_position.start;
      } else {
        var before_steps_length = 0;
        this.foreach_steps(function (step, index) {
          if (index < step_num) {
            before_steps_length += step.length(true);
          }
        }); //console.log(caret_position);
        //console.log(before_steps_length);

        position = caret_position.start - before_steps_length;
      }

      return position;
    }
  }, {
    key: "get_print_value",
    value: function get_print_value() {
      var value = '';
      this.foreach_steps(function (step) {
        value += step.print_value(); //console.log( step );
      });
      return value;
    }
  }, {
    key: "render",
    value: function render() {
      this.input.value = this.get_print_value();
    }
  }, {
    key: "print_placeholder",
    value: function print_placeholder() {
      var length = 0;
      this.foreach_steps(function (step) {
        length += step.length();
      });

      if (length == 0) {
        this.input.placeholder = this.get_print_value();
      }
    }
  }, {
    key: "clear_placeholder",
    value: function clear_placeholder() {
      this.input.placeholder = '';
    }
  }, {
    key: "init",
    value: function init() {
      var self = this;
      /*для тестирование позиции каретки и др*/

      self.input.addEventListener('click', function (evt) {//console.log( self.find_position_in_step() );
      });
      /*отменяю ввод любых символов*/

      self.input.addEventListener('input', function (evt) {
        evt.preventDefault();
        console.log('input');
        return false;
      });
      self.input.addEventListener('mouseover', function (evt) {
        evt.preventDefault();
        self.print_placeholder();
      });
      self.input.addEventListener('mouseout', function (evt) {
        evt.preventDefault();
        self.clear_placeholder();
      });
      self.input.addEventListener('keydown', function (evt) {
        evt.preventDefault();
        console.log('keydown');
        var symb = evt.key;
        var step = self.find_step();
        var cursor_position = self.caret.get();
        var pos = self.find_position_in_step();

        if (cursor_position.selected) {
          return false;
        }

        switch (evt.keyCode) {
          case 8:
            //console.log('remove');
            self.steps[step].remove(pos);
            self.render();
            self.caret.set(cursor_position.start - 1);
            break;

          case 39:
            self.render();
            self.caret.set(cursor_position.start + 1);
            break;

          case 37:
            self.render();
            self.caret.set(cursor_position.start - 1);
            break;

          default:
            //console.log( symb );
            if (self.steps[step].check_next_lvl(symb, pos)) {
              console.log('next lvl');
              self.render();
              self.caret.set(cursor_position.start + 1);
              return false;
            }

            if (!self.steps[step].valid(symb)) {
              return false;
            }

            var correct_caret = 1;
            console.log(self.steps[step].length());
            console.log(pos);
            /* fix */

            if (self.steps[step].length() == 0 && pos > 0) {
              correct_caret = 0;
              pos = 0;
              console.log('fix');
            }

            self.steps[step].set(pos, symb);
            self.render();
            self.caret.set(cursor_position.start + correct_caret);
            break;
        }

        return false;
      });
    }
  }]);

  return email_input;
}();


;// CONCATENATED MODULE: ./src/index.js


/******/ 	return __webpack_exports__;
/******/ })()
;
});