import email_step from './email_step.js';
import email_caret from './email_caret.js';

export default class email_input {

    constructor(opt) {

        this.input = opt['input'];
        this.set_coords = 0;
        this.device = '';
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

    foreach_steps(func = function() {}) {
        for (let i = 0; i < this.steps.length; i++) {
            func(this.steps[i], i);
        }
    }

    find_step() {

        let caret_position = this.caret.get();
        let step_lengths = [];
        let step = 0;

        this.foreach_steps(function(step, index) {

            let val = 0;

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
        }

        //console.log( step_lengths );
        //console.log( caret_position );

        return step;

    }

    find_position_in_step() {

        let caret_position = this.caret.get();

        let step_num = this.find_step();

        let position = 0;

        if (step_num == 0) {
            position = caret_position.start;
        } else {
            let before_steps_length = 0;

            this.foreach_steps(function(step, index) {

                if (index < step_num) {
                    before_steps_length += step.length(true);
                }

            });

            //console.log(caret_position);
            //console.log(before_steps_length);

            position = caret_position.start - before_steps_length;
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

    init() {

        let self = this;

        /*для тестирование позиции каретки и др*/
        self.input.addEventListener('click', function(evt) {
            //console.log( self.find_position_in_step() );
        });

        self.input.addEventListener('input', function(evt) {
            evt.preventDefault(); 
            evt.stopPropagation();
            console.log('input');
            self.input.style.caretColor = 'transparent';
            setTimeout(function(){
                self.render();
            },0);
            setTimeout(function(){
                self.caret.set(self.set_coords);
                self.input.style.caretColor = self.input.style.color;
            },0);
            return false;
        });

        self.input.addEventListener('textInput', function(evt) {
            /*evt.preventDefault(); 
            evt.stopPropagation();
            self.input.style.caretColor = 'transparent';
            console.log('textInput');
            setTimeout(function(){
                self.render();
            },10);
            setTimeout(function(){
                self.caret.set(self.set_coords);
                self.input.style.caretColor = self.input.style.color;
            },20);
            return false;*/
        });

        self.input.addEventListener('mouseover', function(evt) {
            evt.preventDefault();
            self.print_placeholder();
        });

        self.input.addEventListener('mouseout', function(evt) {
            evt.preventDefault();
            self.clear_placeholder();
        });

        self.input.addEventListener('keydown', function(evt) {

            //evt.preventDefault();
            //console.log('keydown');

            let symb = evt.key;
            let step = self.find_step();
            let cursor_position = self.caret.get();
            let pos = self.find_position_in_step();

            if( cursor_position.selected ){ return false; }

            switch (evt.keyCode) {

                case 8:
                    //console.log('remove');
                    self.steps[step].remove(pos);
                    //self.render();
                    self.set_coords = cursor_position.start - 1;
                    //self.caret.set(self.set_coords);
                    break;

                case 39:
                    //self.render();
                    self.set_coords = cursor_position.start;
                    //self.caret.set(self.set_coords);
                    break;

                case 37:
                    //self.render();
                    self.set_coords = cursor_position.start;
                    //self.caret.set(self.set_coords);
                    break;

                default:

                    //console.log( symb );

                    if (self.steps[step].check_next_lvl(symb, pos)) {
                        console.log('next lvl');
                        //self.render();
                        self.set_coords = cursor_position.start + 1;
                        //self.caret.set(self.set_coords);
                        return false;
                    }
                    if (!self.steps[step].valid(symb)) {
                        return false;
                    }

                    let correct_caret = 1;

                    /* fix */
                    if (
                        self.steps[step].length() == 0 &&
                        pos > 0
                    ) {
                        correct_caret = 0;
                        pos = 0;
                    }

                    self.steps[step].set(pos, symb);
                    //self.render();
                    self.set_coords = cursor_position.start + correct_caret;
                    //self.caret.set(self.set_coords);

                    break;
            }

            //return false;

        });

    }

}