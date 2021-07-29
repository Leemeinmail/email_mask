import email_step from './email_step.js';

export default class email_input {

    constructor(opt) {

        this.input = opt['input'];
        this.step = 0;
        this.steps = [];
        this.value = '';

        if( opt['step0'] != undefined && opt['step0'] !== null){
            this.steps[0] = new email_step({
                name: (opt['step0']['name']) ? opt['step0']['name'] : 'name',
                val: (opt['step0']['val']) ? opt['step0']['val'] : '',
                plc: (opt['step0']['plc']) ? opt['step0']['plc'] : '_',
                valid_regx: (opt['step0']['regx']) ? opt['step0']['regx'] : /[0-9A-Za-z!#$%&'*+/./=?^_`{|}~\-]/,
                min_length: (opt['step0']['min_length']) ? opt['step0']['min_length'] : 1,
                max_length: (opt['step0']['max_length']) ? opt['step0']['max_length'] : 999,
                next_step_symbols: (opt['step0']['next_symb']) ? opt['step0']['next_symb'] : [' ', '@'],
                separator: (opt['step0']['separ']) ? opt['step0']['separ'] : ''
            });
        }else{
            this.steps[0] = new email_step({
                name: 'name',
                val: '',
                plc: '_',
                valid_regx: /[0-9A-Za-z!#$%&'*+/./=?^_`{|}~\-]/,
                min_length: 1,
                max_length: 999,
                next_step_symbols: [' ', '@'],
                separator:''
            });
        }

        if( opt['step1'] != undefined && opt['step1'] !== null ){
            this.steps[1] = new email_step({
                name: (opt['step1']['name']) ? opt['step1']['name'] : 'domain',
                val: (opt['step1']['val']) ? opt['step1']['val'] : '',
                plc: (opt['step1']['plc']) ? opt['step1']['plc'] : '_',
                valid_regx: (opt['step1']['regx']) ? opt['step1']['regx'] : /[0-9A-Za-z]/,
                min_length: (opt['step1']['min_length']) ? opt['step1']['min_length'] : 1,
                max_length: (opt['step1']['max_length']) ? opt['step1']['max_length'] : 999,
                next_step_symbols: (opt['step1']['next_symb']) ? opt['step1']['next_symb'] : [' ', '.'],
                separator: (opt['step1']['separ']) ? opt['step1']['separ'] : '@'
            });
        }else{
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

        if( opt['step2'] != undefined && opt['step2'] !== null ){
            this.steps[2] = new email_step({
                name: (opt['step2']['name']) ? opt['step2']['name'] : 'zone',
                val: (opt['step2']['val']) ? opt['step2']['val'] : '',
                plc: (opt['step2']['plc']) ? opt['step2']['plc'] : '_',
                valid_regx: (opt['step2']['regx']) ? opt['step2']['regx'] : /[0-9A-Za-z]/,
                min_length: (opt['step2']['min_length']) ? opt['step2']['min_length'] : 1,
                max_length: (opt['step2']['max_length']) ? opt['step2']['max_length'] : 999,
                next_step_symbols: (opt['step2']['next_symb']) ? opt['step2']['next_symb'] : [],
                separator: (opt['step2']['separ']) ? opt['step2']['separ'] : '.'
            });
        }else{
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

    get_value() {

        let mask = "";

        for (let i = 0; i < this.steps.length; i++) {
            mask += this.steps[i].get_full_val();
        }

        return mask;

    }

    mask_length_full() {

        let sum = 0;

        for (let i = 0; i < this.steps.length; i++) {
            sum += this.steps[i].length();
            if (this.step >= i) {
                sum += this.steps[i].separator.length;
            }
        }

        return sum;

    }

    mask_length_only_value() {
        let sum = 0;

        for (let i = 0; i < this.steps.length; i++) {
            sum += this.steps[i].length();
        }

        return sum;
    }

    set_cursor( p1, p2 ) {

        let self = this;
        self.input.style.caretColor = 'transparent';
        setTimeout(function() {
            self.input.setSelectionRange(
                (p1) ? p1 : self.mask_length_full(),
                (p2) ? p2 : self.mask_length_full()
            );
            self.input.style.caretColor = self.input.style.color;
        }, 0);

    }

    render() {
        this.input.value = this.get_value();
        this.set_cursor();
    }

    render_placeholer() {
        this.input.placeholder = this.get_value();
    }

    clear_placeholer() {
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

    check_step(){

        let step_data = {
            cursor_pos:0,
            cursor_pos_in_step:0,
            step:0
        };

        let r = {};

        r.caretPositionStart = this.input.selectionStart;
        r.caretPositionEnd = this.input.selectionEnd;
        r.step0 = this.steps[0].full_length();
        r.step1 = this.steps[1].full_length() + r.step0;
        r.step2 = this.steps[2].full_length() + r.step1;
        r.full_value = this.steps[0].full_length() + this.steps[1].full_length() + this.steps[2].full_length();

        if ( r.caretPositionStart <= r.step0  ) {
            step_data['cursor_pos'] = r.caretPositionStart;
            step_data['step'] = 0;
            step_data['cursor_pos_in_step'] = r.caretPositionStart;
        }else if( r.caretPositionStart >= r.step0 && r.caretPositionStart <= r.step1 ){
            step_data['cursor_pos'] = r.caretPositionStart;
            step_data['step'] = 1;
            step_data['cursor_pos_in_step'] = r.caretPositionStart - r.step0;
        }else if( r.caretPositionStart >= r.step1 && r.caretPositionStart <= r.step2 ){
            step_data['cursor_pos'] = r.caretPositionStart;
            step_data['step'] = 2;
            step_data['cursor_pos_in_step'] = r.caretPositionStart - r.step1;
        }
    
        return step_data;
    }

    init() {

        let self = this;

        self.input.addEventListener('focus', function(evt) {
            evt.preventDefault();
            self.render();
        });

        self.input.addEventListener('mouseup', function(evt) {
            evt.preventDefault();

            if (self.mask_length_only_value() <= 0) {
                self.render_placeholer();
            }

            self.render();
        });

        self.input.addEventListener('mouseover', function(evt) {
            evt.preventDefault();

            if (self.mask_length_only_value() <= 0) {
                self.render_placeholer();
            }

        });

        self.input.addEventListener('mouseout', function(evt) {
            evt.preventDefault();

            if (self.mask_length_only_value() <= 0) {
                self.clear_placeholer();
            }

        });

        self.input.addEventListener('paste', function(evt) {
            
            evt.preventDefault();
            let cd = evt.clipboardData || window.clipboardData;
            let paste_data = cd.getData('text');
            paste_data.replace(/\s+/g, ' ').trim();

            if( paste_data.search(/@/) !== -1 ){

                let split_stroke = paste_data.split('@');

                self.steps[0].val = split_stroke[0];

                split_stroke = split_stroke[1].split('.');

                if( paste_data.search(/\./) !== -1 ){
                    self.steps[1].val = split_stroke[0];
                    self.steps[2].val = split_stroke[1];

                    self.step = 2;
                    self.render();
                }

            }

        });

        self.input.addEventListener('keydown', function(evt) {
            
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

            if( evt.keyCode == 8 && self.input.selectionStart !== self.mask_length_full() ){
                evt.preventDefault();
                let current_step = self.check_step();
                console.log( current_step );
                self.steps[current_step.step].val = self.steps[current_step.step].val.slice();
                self.steps[current_step.step].val = 
                    self.steps[current_step.step].val.slice( 0, current_step.cursor_pos_in_step - 1 ) + 
                    self.steps[current_step.step].val.slice(current_step.cursor_pos_in_step);
                self.step = current_step.step;
                self.render();
            }

            //return false;

        });

        self.input.addEventListener('input', function(evt) {

            evt.preventDefault();

            let symb = evt.data;

            //проверяю если это удаление, и значение в шаге 0, то перехожу на пред шаг
            if (symb == null) {
                //console.log(1);
                let symbols_in_step = self.steps[self.step].delet_last();

                if (symbols_in_step == 0 && self.step > 0) {
                    self.step--;
                }

                self.render();
            }

            //проверяю если значение больше минимального и вводимый символ 
            //это символ перехода, перехожу на след шаг
            else if (
                self.steps[self.step].check_min_value() &&
                self.steps[self.step].check_next_step_symb(symb)
            ) {
                //console.log(2);
                self.step++;
                self.render();
            }

            //валидация символа, если прошел, то добавляю в значение и отрисовываю
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

}