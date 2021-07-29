export default class email_caret {

    constructor(opt) {
        this.el = opt['el'];
    }

    get(){

        let coords = {
            start: this.el.selectionStart,
            end: this.el.selectionEnd,
            selected: false
        }

        if( this.el.selectionStart !== 0 && this.el.selectionEnd !== 0 ){
            let koef = this.el.selectionStart / this.el.selectionEnd;
        
            if( koef !== 1 ){
                coords.selected = true;
            }
        }

        return coords;
    }

    set(p){
        this.el.setSelectionRange( p, p );
    }
}