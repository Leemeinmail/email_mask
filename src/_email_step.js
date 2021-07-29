export default class email_step {

    constructor(opt) {
        this.name = (opt['name']) ? opt['name'] : '';
        this.val = [];
        //this.val = (opt['value']) ? opt['value'] : '';
        this.plc = (opt['plc']) ? opt['plc'] : '_';
        this.valid_symbols = (opt['valid_regx']) ? opt['valid_regx'] : /[0-9A-Za-z]/;
        this.min_length = (opt['min_length']) ? opt['min_length'] : 3;
        this.max_length = (opt['max_length']) ? opt['max_length'] : 3;
        this.next_step_symbols = (opt['next_step_symbols']) ? opt['next_step_symbols'] : [' '];
        this.separator = (opt['separator']) ? opt['separator'] : '';
    }

    add(val) {
        this.val += val;
    }

    set(val) {
        this.val = val;
    }

    get_full_val() {

        let value = '';

        let diff = this.min_length - this.length();

        if (diff > 0) {
            value += this.separator + this.val + this.plc.repeat(diff);
        } else {
            value += this.separator + this.val;
        }

        return value;

    }

    get_only_val() {
        return this.val;
    }

    delet_last() {
        if (this.length() > 0) {
            this.val = this.val.substring(0, this.length() - 1);
        }
        return this.length();
    }

    clear() {
        this.val = '';
    }

    check_min_value() {
        if (this.length() >= this.min_length) {
            return true;
        }
        return false;
    }

    check_next_step_symb(symb) {
        if (this.next_step_symbols.indexOf(symb) == -1) {
            return false;
        }
        return true;
    }

    validate(symb) {

        if (symb.search(this.valid_symbols) == -1) {
            return false;
        }

        return true;

    }

    length() {
        return this.val.length;
    }

    full_length() {
        return this.val.length + this.separator.length;
    }

}