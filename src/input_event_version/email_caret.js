export default class email_caret {

    constructor(opt) {
        this.el = opt['el'];
        this.start = 0;
        this.end = 0;
        this.select = false;

        this.init();
    }

    up(){

        this.start = this.el.selectionStart;
        this.end = this.el.selectionEnd;

        if( this.start !== 0 || this.end !== 0 ){
            let koef = this.start / this.end;
            if( koef !== 1 ){
                this.select = true;
                
                return false;

            }
        }

        this.select = false;
        return false;

    }

    set(p1,p2){
        let self = this;
        self.el.style.caretColor = 'transparent';
        setTimeout(function() {
            self.el.setSelectionRange( p1, p2 );
            self.el.style.caretColor = self.el.style.color;
        }, 0);
    }

    init(){

        let self = this;

        //обновлять вручную если было выделено
        self.el.addEventListener('input', function(evt) {
            if( self.select ){ return false; }
            self.up();
        });

        self.el.addEventListener('select', function(evt) {
            evt.preventDefault();
            self.up();
        });

    }

}