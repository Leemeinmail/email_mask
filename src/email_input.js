import email_step from './email_step.js';
import email_caret from './email_caret.js';

export default class email_input {

    constructor(opt) {

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

    foreach_steps(func = function() {}) {
        for (let i = 0; i < this.steps.length; i++) {
            func(this.steps[i], i);
        }
    }

    find_step( cursor_position ) {

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

    find_position_in_step( caret_position, step_num ) {

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

    set_caret(p){
        let self = this;
        self.input.style.caretColor = 'transparent';
        setTimeout(function(){
            //console.log('set caret');
            self.caret.set(p);
            self.input.style.caretColor = self.input.style.color;
        },0);
    }

    init() {

        let self = this;

        /*для тестирование позиции каретки и др*/
        self.input.addEventListener('click', function(evt) {
            let cursor_position = self.caret.get().start;
            let step = self.find_step( cursor_position + 1 );
            //console.log("click:" + self.find_step( cursor_position ) );
            //console.log("click:" + self.find_position_in_step( cursor_position, step ) );
        });

        /*отменяю ввод любых символов*/
        self.input.addEventListener('input', function(evt) {
            evt.preventDefault(); 
            //console.log('input'); 

            let symb = evt.data;
            let cursor_position = self.caret.get().start;
            let step = 0;
            let pos = 0;

            switch(symb){
                
                case null:
                    step = self.find_step( cursor_position + 1 );
                    pos = self.find_position_in_step( cursor_position + 1, step );
                    self.steps[step].remove( pos );
                    self.render();
                    self.set_caret( cursor_position );
                break;

                default:
                    step = self.find_step( cursor_position - 1 );
                    pos = self.find_position_in_step( cursor_position - 1, step );

                    //console.log( "step in def:" + step );
                    //console.log( "pos in def:" + pos );

                    if (self.steps[step].check_next_lvl(symb, pos)) {
                        //console.log('next lvl');
                        self.render();
                        self.set_caret( cursor_position );
                        return false;
                    }

                    if( symb == ' ' ){
                        self.render();
                        self.set_caret(cursor_position + 1);
                    }

                    if (!self.steps[step].valid(symb)) {
                        //console.log('not_valid');
                        return false;
                    }

                    self.steps[step].set(pos,symb);
                    self.render();
                    self.set_caret(cursor_position);

                    //console.log('valid');
                    console.log( self.steps );

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