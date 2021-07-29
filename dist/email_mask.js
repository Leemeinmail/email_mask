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

    this.name = opt['name'] ? opt['name'] : '';
    this.val = opt['value'] ? opt['value'] : '';
    this.plc = opt['plc'] ? opt['plc'] : '_';
    this.valid_symbols = opt['valid_regx'] ? opt['valid_regx'] : /[0-9A-Za-z]/;
    this.min_length = opt['min_length'] ? opt['min_length'] : 3;
    this.max_length = opt['max_length'] ? opt['max_length'] : 3;
    this.next_step_symbols = opt['next_step_symbols'] ? opt['next_step_symbols'] : [' '];
    this.separator = opt['separator'] ? opt['separator'] : '';
  }

  _createClass(email_step, [{
    key: "add",
    value: function add(val) {
      this.val += val;
    }
  }, {
    key: "set",
    value: function set(val) {
      this.val = val;
    }
  }, {
    key: "get_full_val",
    value: function get_full_val() {
      var value = '';
      var diff = this.min_length - this.length();

      if (diff > 0) {
        value += this.separator + this.val + this.plc.repeat(diff);
      } else {
        value += this.separator + this.val;
      }

      return value;
    }
  }, {
    key: "get_only_val",
    value: function get_only_val() {
      return this.val;
    }
  }, {
    key: "delet_last",
    value: function delet_last() {
      if (this.length() > 0) {
        this.val = this.val.substring(0, this.length() - 1);
      }

      return this.length();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.val = '';
    }
  }, {
    key: "check_min_value",
    value: function check_min_value() {
      if (this.length() >= this.min_length) {
        return true;
      }

      return false;
    }
  }, {
    key: "check_next_step_symb",
    value: function check_next_step_symb(symb) {
      if (this.next_step_symbols.indexOf(symb) == -1) {
        return false;
      }

      return true;
    }
  }, {
    key: "validate",
    value: function validate(symb) {
      if (symb.search(this.valid_symbols) == -1) {
        return false;
      }

      return true;
    }
  }, {
    key: "length",
    value: function length() {
      return this.val.length;
    }
  }, {
    key: "full_length",
    value: function full_length() {
      return this.val.length + this.separator.length;
    }
  }]);

  return email_step;
}();


;// CONCATENATED MODULE: ./src/email_input.js
function email_input_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function email_input_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function email_input_createClass(Constructor, protoProps, staticProps) { if (protoProps) email_input_defineProperties(Constructor.prototype, protoProps); if (staticProps) email_input_defineProperties(Constructor, staticProps); return Constructor; }



var email_input = /*#__PURE__*/function () {
  function email_input(opt) {
    email_input_classCallCheck(this, email_input);

    this.input = opt['input'];
    this.step = 0;
    this.steps = [];
    this.value = '';

    if (opt['step0'] != undefined && opt['step0'] !== null) {
      this.steps[0] = new email_step({
        name: opt['step0']['name'] ? opt['step0']['name'] : 'name',
        val: opt['step0']['val'] ? opt['step0']['val'] : '',
        plc: opt['step0']['plc'] ? opt['step0']['plc'] : '_',
        valid_regx: opt['step0']['regx'] ? opt['step0']['regx'] : /[0-9A-Za-z!#$%&'*+/./=?^_`{|}~\-]/,
        min_length: opt['step0']['min_length'] ? opt['step0']['min_length'] : 1,
        max_length: opt['step0']['max_length'] ? opt['step0']['max_length'] : 999,
        next_step_symbols: opt['step0']['next_symb'] ? opt['step0']['next_symb'] : [' ', '@'],
        separator: opt['step0']['separ'] ? opt['step0']['separ'] : ''
      });
    } else {
      this.steps[0] = new email_step({
        name: 'name',
        val: '',
        plc: '_',
        valid_regx: /[0-9A-Za-z!#$%&'*+/./=?^_`{|}~\-]/,
        min_length: 1,
        max_length: 999,
        next_step_symbols: [' ', '@'],
        separator: ''
      });
    }

    if (opt['step1'] != undefined && opt['step1'] !== null) {
      this.steps[1] = new email_step({
        name: opt['step1']['name'] ? opt['step1']['name'] : 'domain',
        val: opt['step1']['val'] ? opt['step1']['val'] : '',
        plc: opt['step1']['plc'] ? opt['step1']['plc'] : '_',
        valid_regx: opt['step1']['regx'] ? opt['step1']['regx'] : /[0-9A-Za-z]/,
        min_length: opt['step1']['min_length'] ? opt['step1']['min_length'] : 1,
        max_length: opt['step1']['max_length'] ? opt['step1']['max_length'] : 999,
        next_step_symbols: opt['step1']['next_symb'] ? opt['step1']['next_symb'] : [' ', '.'],
        separator: opt['step1']['separ'] ? opt['step1']['separ'] : '@'
      });
    } else {
      this.steps[1] = new email_step({
        name: 'domain',
        val: '',
        plc: '_',
        valid_regx: /[0-9A-Za-z]/,
        min_length: 1,
        max_length: 999,
        next_step_symbols: [' ', '.'],
        separator: '@'
      });
    }

    if (opt['step2'] != undefined && opt['step2'] !== null) {
      this.steps[2] = new email_step({
        name: opt['step2']['name'] ? opt['step2']['name'] : 'zone',
        val: opt['step2']['val'] ? opt['step2']['val'] : '',
        plc: opt['step2']['plc'] ? opt['step2']['plc'] : '_',
        valid_regx: opt['step2']['regx'] ? opt['step2']['regx'] : /[0-9A-Za-z]/,
        min_length: opt['step2']['min_length'] ? opt['step2']['min_length'] : 1,
        max_length: opt['step2']['max_length'] ? opt['step2']['max_length'] : 999,
        next_step_symbols: opt['step2']['next_symb'] ? opt['step2']['next_symb'] : [],
        separator: opt['step2']['separ'] ? opt['step2']['separ'] : '.'
      });
    } else {
      this.steps[2] = new email_step({
        name: 'zone',
        val: '',
        plc: '_',
        valid_regx: /[0-9A-Za-z]/,
        min_length: 1,
        max_length: 999,
        next_step_symbols: [],
        separator: '.'
      });
    }

    this.init();
  }

  email_input_createClass(email_input, [{
    key: "get_value",
    value: function get_value() {
      var mask = "";

      for (var i = 0; i < this.steps.length; i++) {
        mask += this.steps[i].get_full_val();
      }

      return mask;
    }
  }, {
    key: "mask_length_full",
    value: function mask_length_full() {
      var sum = 0;

      for (var i = 0; i < this.steps.length; i++) {
        sum += this.steps[i].length();

        if (this.step >= i) {
          sum += this.steps[i].separator.length;
        }
      }

      return sum;
    }
  }, {
    key: "mask_length_only_value",
    value: function mask_length_only_value() {
      var sum = 0;

      for (var i = 0; i < this.steps.length; i++) {
        sum += this.steps[i].length();
      }

      return sum;
    }
  }, {
    key: "set_cursor",
    value: function set_cursor(p1, p2) {
      var self = this;
      self.input.style.caretColor = 'transparent';
      setTimeout(function () {
        self.input.setSelectionRange(p1 ? p1 : self.mask_length_full(), p2 ? p2 : self.mask_length_full());
        self.input.style.caretColor = self.input.style.color;
      }, 0);
    }
  }, {
    key: "render",
    value: function render() {
      this.input.value = this.get_value();
      this.set_cursor();
    }
  }, {
    key: "render_placeholer",
    value: function render_placeholer() {
      this.input.placeholder = this.get_value();
    }
  }, {
    key: "clear_placeholer",
    value: function clear_placeholer() {
      this.input.placeholder = '';
    }
    /*error(){
        let self = this;
        let border_color = self.input.style.borderColor;
          self.input.style.borderColor = 'red';
          setTimeout(function(){
            self.input.style.borderColor = border_color;
        },1500);
    }*/

  }, {
    key: "check_step",
    value: function check_step() {
      var step_data = {
        cursor_pos: 0,
        cursor_pos_in_step: 0,
        step: 0
      };
      var r = {};
      r.caretPositionStart = this.input.selectionStart;
      r.caretPositionEnd = this.input.selectionEnd;
      r.step0 = this.steps[0].full_length();
      r.step1 = this.steps[1].full_length() + r.step0;
      r.step2 = this.steps[2].full_length() + r.step1;
      r.full_value = this.steps[0].full_length() + this.steps[1].full_length() + this.steps[2].full_length();

      if (r.caretPositionStart <= r.step0) {
        step_data['cursor_pos'] = r.caretPositionStart;
        step_data['step'] = 0;
        step_data['cursor_pos_in_step'] = r.caretPositionStart;
      } else if (r.caretPositionStart >= r.step0 && r.caretPositionStart <= r.step1) {
        step_data['cursor_pos'] = r.caretPositionStart;
        step_data['step'] = 1;
        step_data['cursor_pos_in_step'] = r.caretPositionStart - r.step0;
      } else if (r.caretPositionStart >= r.step1 && r.caretPositionStart <= r.step2) {
        step_data['cursor_pos'] = r.caretPositionStart;
        step_data['step'] = 2;
        step_data['cursor_pos_in_step'] = r.caretPositionStart - r.step1;
      }

      return step_data;
    }
  }, {
    key: "init",
    value: function init() {
      var self = this;
      self.input.addEventListener('focus', function (evt) {
        evt.preventDefault();
        self.render();
      });
      self.input.addEventListener('mouseup', function (evt) {
        evt.preventDefault();

        if (self.mask_length_only_value() <= 0) {
          self.render_placeholer();
        }

        self.render();
      });
      self.input.addEventListener('mouseover', function (evt) {
        evt.preventDefault();

        if (self.mask_length_only_value() <= 0) {
          self.render_placeholer();
        }
      });
      self.input.addEventListener('mouseout', function (evt) {
        evt.preventDefault();

        if (self.mask_length_only_value() <= 0) {
          self.clear_placeholer();
        }
      });
      self.input.addEventListener('paste', function (evt) {
        evt.preventDefault();
        var cd = evt.clipboardData || window.clipboardData;
        var paste_data = cd.getData('text');
        paste_data.replace(/\s+/g, ' ').trim();

        if (paste_data.search(/@/) !== -1) {
          var split_stroke = paste_data.split('@');
          self.steps[0].val = split_stroke[0];
          split_stroke = split_stroke[1].split('.');

          if (paste_data.search(/\./) !== -1) {
            self.steps[1].val = split_stroke[0];
            self.steps[2].val = split_stroke[1];
            self.step = 2;
            self.render();
          }
        }
      });
      self.input.addEventListener('keydown', function (evt) {
        /*if( evt.keyCode == 39 ){
            setTimeout(function(){
                let current_step = self.check_step();
                console.log( current_step );
            },10);
        }else if( evt.keyCode == 37 ){
            setTimeout(function(){
                let current_step = self.check_step();
                console.log( current_step );
            },10);
        }else if( evt.keyCode == 8 ){
            setTimeout(function(){
                let current_step = self.check_step();
                console.log( current_step );
            },10);
        }*/

        /*
        если каретка не совпадает с кол-вом символов, определяю шаг, удаляю из него нужный символ
        меняю шаг.
        */
        if (evt.keyCode == 8 && self.input.selectionStart !== self.mask_length_full()) {
          evt.preventDefault();
          var current_step = self.check_step();
          console.log(current_step);
          self.steps[current_step.step].val = self.steps[current_step.step].val.slice();
          self.steps[current_step.step].val = self.steps[current_step.step].val.slice(0, current_step.cursor_pos_in_step - 1) + self.steps[current_step.step].val.slice(current_step.cursor_pos_in_step);
          self.step = current_step.step;
          self.render();
        } //return false;

      });
      self.input.addEventListener('input', function (evt) {
        evt.preventDefault();
        var symb = evt.data; //проверяю если это удаление, и значение в шаге 0, то перехожу на пред шаг

        if (symb == null) {
          //console.log(1);
          var symbols_in_step = self.steps[self.step].delet_last();

          if (symbols_in_step == 0 && self.step > 0) {
            self.step--;
          }

          self.render();
        } //проверяю если значение больше минимального и вводимый символ 
        //это символ перехода, перехожу на след шаг
        else if (self.steps[self.step].check_min_value() && self.steps[self.step].check_next_step_symb(symb)) {
          //console.log(2);
          self.step++;
          self.render();
        } //валидация символа, если прошел, то добавляю в значение и отрисовываю
        //если нет то просто отрисовываю предыдущее значение
        else if (self.steps[self.step].validate(symb)) {
          //console.log(3);
          self.steps[self.step].add(symb);
          self.render();
        } else {
          //console.log(4);
          self.render();
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