import email_step from './email_step.js';
import email_caret from './email_caret.js';

export default class email_input {

    constructor(input) {

        this.input = input;
        this.caret = new email_caret({
            el: input
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
        let step_num = 0;

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
            step_num = 0;
        } else if (cursor_position >= step_lengths[0] && cursor_position < step_lengths[1]) {
            step_num = 1;
        } else if (cursor_position >= step_lengths[1]) {
            step_num = 2;
        }

        return step_num;

    }

    find_position_in_step(caret_position, step_num) {

        if (step_num == 0) {
            return caret_position;
        }

        let before_steps_length = 0;

        this.foreach_steps(function(step, index) {
            if (index < step_num) {
                before_steps_length += step.length(true);
            }
        });

        return caret_position - before_steps_length;

    }

    value_length(full = false) {

        let length = 0;

        this.foreach_steps(function(step) {
            length += step.length(full);
        });

        return length;
    }

    get_print_value() {

        let value = '';

        this.foreach_steps(function(step) {
            value += step.print_value();
        });

        return value;

    }

    render() {

        this.input.value = this.get_print_value();

    }

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

    print_placeholder() {

        if (this.value_length() == 0) {
            this.input.placeholder = this.get_print_value();
        }

    }

    clear_placeholder() {
        if (this.value_length() == 0) {
            this.input.placeholder = '';
        }
    }

    init() {

        let self = this;

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

        self.input.addEventListener('input', function(evt) {
            evt.preventDefault();

            self.input.setAttribute('autocorrect', 'off');
            self.input.setAttribute('autocapitalize', 'off');

            if (!self.status) {
                self.render();
                return false;
            }

            if (self.caret.select) {
                self.render();
                self.caret.set(self.caret.start, self.caret.start);
                self.caret.up(); //обновляю вручную тк было выделение
                return false;
            }

            let symb = evt.data,
                position_in_step,
                current_step;

            switch (symb) {

                case null:
                    current_step = self.find_step(self.caret.start + 1);
                    position_in_step = self.find_position_in_step(self.caret.start + 1, current_step);

                    self.steps[current_step].remove(position_in_step - 1);
                    self.render();
                    self.caret.set(self.caret.start, self.caret.start);
                    break;

                default:
                    current_step = self.find_step(self.caret.start - 1);
                    position_in_step = self.find_position_in_step(self.caret.start - 1, current_step);

                    if (self.steps[current_step].check_next_lvl(symb, position_in_step)) {
                        self.render();
                        self.caret.set(self.caret.start, self.caret.start);
                        return false;
                    }

                    if (symb == ' ') {
                        self.render();
                        self.caret.set(self.caret.start + 1, self.caret.start + 1);
                    }

                    if (!self.steps[current_step].valid(symb)) {
                        self.render();
                        self.caret.set(self.caret.start - 1, self.caret.start - 1);
                        return false;
                    }

                    if (
                        self.steps[current_step].length() == 0 &&
                        position_in_step > 0
                    ) {
                        position_in_step = 0;
                        self.caret.start -= 1;
                    }

                    self.steps[current_step].set(position_in_step, symb);
                    self.render();
                    self.caret.set(self.caret.start, self.caret.start);

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

        self.input.addEventListener('click', function(evt) {

            if (self.value_length() == 0) {
                self.render();
                self.caret.set(self.caret.start, self.caret.start);
                return false;
            }

        });

    }

}