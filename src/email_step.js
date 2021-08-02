export default class email_step {

    constructor(opt) {
        this.name = (opt['name']) ? opt['name'] : '';
        this.plc = (opt['plc']) ? opt['plc'] : '_';
        this.valid_regx = (opt['valid_regx']) ? opt['valid_regx'] : /[0-9A-Za-z]/;
        this.min_length = (opt['min_length']) ? opt['min_length'] : 1;
        this.max_length = (opt['max_length']) ? opt['max_length'] : 99;
        this.next_step_symbols = (opt['next_step_symbols']) ? opt['next_step_symbols'] : [];
        this.separator = (opt['separator']) ? opt['separator'] : '';
        this.val = [];

        for (let i = 0; i < this.max_length; i++) {
            this.val[i] = ' ';
        }

    }

    set(pos, val) {
        this.val.splice(pos, 0, val);
    };

    set_string(str) {
        let symbs_args = str.split('');

        for (let i = 0; i < symbs_args.length; i++) {
            if (this.valid(symbs_args[i])) {
                this.val[i] = symbs_args[i];
            } else {
                return false;
            }
        }

        return true;

    }

    remove(pos) {
        this.val.splice(pos, 1);
    }

    valid(val) {
        if (val.length > 1 || val.search(this.valid_regx) == -1) {
            return false;
        }
        return true;
    }

    print_value() {

        let value = '';

        for (let i = 0; i < this.val.length; i++) {
            if (this.val[i] !== ' ') {
                value += this.val[i];
            }
        }

        let diff = this.min_length - value.length;

        if (diff > 0) {
            value += this.plc.repeat(diff);
        }

        return value + this.separator;

    };

    clear_value() {
        let value = '';
        for (let i = 0; i < this.val.length; i++) {
            if (this.val[i] !== ' ') {
                value += this.val[i];
            }
        }
        return value;
    }

    length(full = false) {
        if (!full) {
            return this.clear_value().length;
        } else {
            return this.print_value().length;
        }

    }

    check_next_lvl(symb, pos) {

        if (
            this.next_step_symbols.indexOf(symb) !== -1 &&
            this.length() == pos &&
            this.length() >= this.min_length
        ) {
            return true;
        }

        return false;
    }

}