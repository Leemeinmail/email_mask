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
    this.valid_regx = opt['valid_regx'] ? opt['valid_regx'] : /[0-9A-Za-z@]/;
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
    key: "set_string",
    value: function set_string(str) {
      var symbs_args = str.split('');

      for (var i = 0; i < symbs_args.length; i++) {
        if (this.valid(symbs_args[i])) {
          this.val[i] = symbs_args[i];
        } else {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "get_symbol",
    value: function get_symbol() {}
  }, {
    key: "remove",
    value: function remove(pos) {
      this.val.splice(pos, 1);
    }
  }, {
    key: "valid",
    value: function valid(val) {
      if (val.length > 1 || val.search(this.valid_regx) == -1) {
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
    this.start = 0;
    this.end = 0;
    this.select = false;
    this.init();
  }

  email_caret_createClass(email_caret, [{
    key: "up",
    value: function up() {
      this.start = this.el.selectionStart;
      this.end = this.el.selectionEnd;

      if (this.start !== 0 || this.end !== 0) {
        var koef = this.start / this.end;

        if (koef !== 1) {
          this.select = true;
          return false;
        }
      }

      this.select = false;
      return false;
    }
  }, {
    key: "set",
    value: function set(p1, p2) {
      var self = this; //self.el.style.caretColor = 'transparent';

      self.el.style.caretColor = 'red';
      setTimeout(function () {
        self.el.setSelectionRange(p1, p2);
        self.el.style.caretColor = self.el.style.color;
      }, 0);
    }
  }, {
    key: "init",
    value: function init() {
      var self = this; //обновлять вручную если было выделено

      self.el.addEventListener('input', function (evt) {
        if (self.select) {
          return false;
        }

        self.up();
      });
      self.el.addEventListener('select', function (evt) {
        evt.preventDefault();
        self.up();
      });
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
    this.status = true;
    this.steps[0] = new email_step({
      separator: '@',
      next_step_symbols: ['@', ' '],
      valid_regx: /[0-9A-Za-z!#$%&'*+/./=?^_`{|}~\-]/
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
    value: function find_step(cursor_position) {
      var step_lengths = [];
      var step = NaN;
      this.foreach_steps(function (step, index) {
        var val = 0;

        if (index > 0) {
          val = step.length(true) + step_lengths[index - 1];
        } else {
          val = step.length(true);
        }

        step_lengths[index] = val;
      });

      if (cursor_position >= 0 && cursor_position < step_lengths[0]) {
        //console.log('step 1');
        step = 0;
      } else if (cursor_position >= step_lengths[0] && cursor_position < step_lengths[1]) {
        //console.log('step 2');
        step = 1;
      } else if (cursor_position >= step_lengths[1]) {
        //console.log('step 3');
        step = 2;
      } //console.log( step_lengths );
      //console.log( cursor_position );
      //console.log( "step in func: " + step );
      //console.log( (cursor_position >= 0 && cursor_position <= step_lengths[0]) );
      //console.log( (cursor_position > step_lengths[0] && cursor_position <= step_lengths[1]) );


      return step;
    }
  }, {
    key: "find_position_in_step",
    value: function find_position_in_step(caret_position, step_num) {
      var position = 0;

      if (step_num == 0) {
        position = caret_position;
      } else {
        var before_steps_length = 0;
        this.foreach_steps(function (step, index) {
          if (index < step_num) {
            before_steps_length += step.length(true);
          }
        }); //console.log("find pos caret:" + caret_position);
        //console.log("find pos before:" + before_steps_length);

        position = caret_position - before_steps_length;
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
    key: "set_caret",
    value: function set_caret(p1, p2) {
      var self = this;
      self.input.style.color = 'transparent';
      setTimeout(function () {
        //console.log('set caret');
        self.caret.set(p1, p2);
        self.input.style.color = self.input.style.color;
      }, 0);
    }
  }, {
    key: "split_paste_string",
    value: function split_paste_string(string) {
      var split_email = [];
      var slice_text = '';

      if (string.search(/@/) !== -1) {
        slice_text = string.split('@');
        split_email[0] = slice_text[0];

        if (slice_text[1].search(/\./) !== -1) {
          slice_text = slice_text[1].split('.');
          split_email[1] = slice_text[0];
          split_email[2] = slice_text[1];
          return split_email;
        }
      }

      return false;
    }
  }, {
    key: "init",
    value: function init() {
      var self = this;
      /*для тестирование позиции каретки и др*/
      //self.input.addEventListener('click', function(evt) {
      //});

      self.input.addEventListener('paste', function (evt) {
        evt.preventDefault();
        var paste_data = evt.clipboardData || window.clipboardData;
        var paste_text = paste_data.getData('text');
        paste_text.replace(/\s+/g, ' ').trim();
        var paste_email = self.split_paste_string(paste_text);

        if (paste_email) {
          for (var i = 0; i < paste_email.length; i++) {
            var res = self.steps[i].set_string(paste_email[i]);

            if (!res) {
              return false;
            }
          }
        }

        self.render();
      });
      /*отменяю ввод любых символов*/

      self.input.addEventListener('input', function (evt) {
        evt.preventDefault(); //console.log('input'); 

        self.input.setAttribute('autocorrect', 'off');
        self.input.setAttribute('autocapitalize', 'off');

        if (!self.status) {
          self.render();
          return false;
        }

        var symb = evt.data;
        var step = 0;
        var pos = 0;

        if (self.caret.select) {
          self.caret.up();
          self.render();
          return false;
        }

        switch (symb) {
          case null:
            step = self.find_step(self.caret.start + 1);
            pos = self.find_position_in_step(self.caret.start + 1, step); //console.log("step in rem:" + step);
            //console.log("pos in rem:" + pos);

            self.steps[step].remove(pos - 1);
            self.render();
            self.caret.set(self.caret.start, self.caret.start);
            break;

          default:
            step = self.find_step(self.caret.start - 1);
            pos = self.find_position_in_step(self.caret.start - 1, step); //console.log('def');
            //console.log( "step in def:" + step );
            //console.log( "pos in def:" + pos );

            if (self.steps[step].check_next_lvl(symb, pos)) {
              //console.log('next lvl');
              self.render();
              self.caret.set(self.caret.start, self.caret.start);
              return false;
            }

            if (symb == ' ') {
              self.render();
              self.caret.set(self.caret.start + 1, self.caret.start + 1);
            }

            if (!self.steps[step].valid(symb)) {
              console.log('not_valid');
              self.render();
              self.caret.set(self.caret.start - 1, self.caret.start - 1);
              return false;
            }

            if (self.steps[step].length() == 0 && pos > 0) {
              pos = 0;
              self.caret.start -= 1;
              console.log('fix');
            }

            self.steps[step].set(pos, symb);
            self.render();
            self.caret.set(self.caret.start, self.caret.start); //console.log('valid');

            console.log(self.steps);
            break;
        }

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
    }
  }]);

  return email_input;
}();


;// CONCATENATED MODULE: ./src/index.js


/******/ 	return __webpack_exports__;
/******/ })()
;
});