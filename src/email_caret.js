export default class email_caret {

    constructor(opt) {
        this.el = opt['el'];
        this.start = 0;
        this.end = 0;
        this.select = false;

        this.init();
    }

    up() {

        this.start = this.el.selectionStart;
        this.end = this.el.selectionEnd;

        if (this.start !== 0 || this.end !== 0) {
            let koef = this.start / this.end;
            if (koef !== 1) {
                this.select = true;

                return false;

            }
        }

        this.select = false;
        return false;

    }

    set(p1, p2) {
        let self = this;
        self.el.style.caretColor = 'transparent';
        let color = self.el.style.color || '#000';

        if (/Android/i.test(navigator.userAgent)) {
            setTimeout(function() {
                self.el.setSelectionRange(p1, p2);
                self.el.style.caretColor = color;
            }, 0);
        } else {
            self.el.setSelectionRange(p1, p2);
            self.el.style.caretColor = color;
        }


    }

    init() {

        let self = this;

        self.el.addEventListener('input', function(evt) {
            if (self.select) { return false; }
            self.up();
        });

        self.el.addEventListener('select', function(evt) {
            evt.preventDefault();
            self.up();
        });

    }

}