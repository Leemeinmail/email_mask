import email_step from './email_step.js';
import email_caret from './email_caret.js';

export default class email_input {

    constructor(opt) {

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

    foreach_steps(func = function() {}) {
        for (let i = 0; i < this.steps.length; i++) {
            func(this.steps[i], i);
        }
    }

    find_step(cursor_position) {

        let step_lengths = [];
        let step = NaN;

        this.foreach_steps(function(step, index) {

            let val = 0;

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
        }

        //console.log( step_lengths );
        //console.log( cursor_position );
        //console.log( "step in func: " + step );
        //console.log( (cursor_position >= 0 && cursor_position <= step_lengths[0]) );
        //console.log( (cursor_position > step_lengths[0] && cursor_position <= step_lengths[1]) );

        return step;

    }

    find_position_in_step(caret_position, step_num) {

        let position = 0;

        if (step_num == 0) {
            position = caret_position;
        } else {
            let before_steps_length = 0;

            this.foreach_steps(function(step, index) {

                if (index < step_num) {
                    before_steps_length += step.length(true);
                }

            });

            //console.log("find pos caret:" + caret_position);
            //console.log("find pos before:" + before_steps_length);

            position = caret_position - before_steps_length;
        }

        return position;
    }

    get_print_value() {
        let value = '';

        this.foreach_steps(function(step) {
            value += step.print_value();
            //console.log( step );
        });

        return value;
    }

    render() {
        this.input.value = this.get_print_value();
    }

    print_placeholder() {

        let length = 0;

        this.foreach_steps(function(step) {
            length += step.length();
        });

        if (length == 0) {
            this.input.placeholder = this.get_print_value();
        }

    }

    clear_placeholder() {
        this.input.placeholder = '';
    }

    /*set_caret(p1,p2) {
        let self = this;
        self.input.style.caretColor = 'transparent';
        self.status = false;
        setTimeout(function() {
            //console.log('set caret');
            self.caret.set(p1,p2);
            self.input.style.caretColor = self.input.style.color;
            self.status = true;
        }, 0);
    }*/

    split_paste_string(string) {

        let split_email = [];
        let slice_text = '';

        if (string.search(/@/) !== -1) {

            slice_text = string.split('@');
            split_email[0] = slice_text[0]

            if (slice_text[1].search(/\./) !== -1) {

                slice_text = slice_text[1].split('.');

                split_email[1] = slice_text[0];
                split_email[2] = slice_text[1];

                return split_email;

            }

        }

        return false;

    }

    init() {

        let self = this;

        /*для тестирование позиции каретки и др*/
        //self.input.addEventListener('click', function(evt) {
        //});

        self.input.addEventListener('paste', function(evt) {
            evt.preventDefault();

            let paste_data = evt.clipboardData || window.clipboardData;
            let paste_text = paste_data.getData('text');
            paste_text.replace(/\s+/g, ' ').trim();
            let paste_email = self.split_paste_string(paste_text);

            if (paste_email) {

                for (let i = 0; i < paste_email.length; i++) {
                    let res = self.steps[i].set_string(paste_email[i]);
                    if (!res) { return false; }
                }

            }

            self.render();

        });

        /*отменяю ввод любых символов*/
        self.input.addEventListener('input', function(evt) {
            evt.preventDefault();
            //console.log('input'); 

            if (!self.status) { self.render(); return false; }

            let symb = evt.data;
            let step = 0;
            let pos = 0;

            if( self.caret.select ){ self.caret.up(); self.render(); return false; }

            switch (symb) {

                case null:
                    step = self.find_step(self.caret.start + 1);
                    pos = self.find_position_in_step(self.caret.start + 1, step);

                    console.log("step in rem:" + step);
                    console.log("pos in rem:" + pos);

                    self.steps[step].remove(pos - 1);
                    self.render();
                    self.caret.set(self.caret.start, self.caret.start);
                    break;

                default:
                    step = self.find_step(self.caret.start - 1);
                    pos = self.find_position_in_step(self.caret.start - 1, step);

                    //console.log('def');
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
                        return false;
                    }

                    if (!self.steps[step].valid(symb)) {
                        console.log('not_valid');
                        self.render();
                        self.caret.set(self.caret.start - 1, self.caret.start - 1);
                        return false;
                    }

                    if (
                        self.steps[step].length() == 0 &&
                        pos > 0
                    ) {
                        pos = 0;
                        self.caret.start -= 1;
                        console.log('fix');
                    }

                    self.steps[step].set(pos, symb);
                    self.render();
                    self.caret.set(self.caret.start, self.caret.start);

                    //console.log('valid');
                    console.log(self.steps);

                    break;

            }

            return false;
        });

        self.input.addEventListener('mouseover', function(evt) {
            evt.preventDefault();
            self.print_placeholder();
        });

        self.input.addEventListener('mouseout', function(evt) {
            evt.preventDefault();
            self.clear_placeholder();
        });

    }

}