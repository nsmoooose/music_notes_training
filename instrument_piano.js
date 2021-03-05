import {
    Rectangle,
    Widget
} from "./base.js"

export class InstrumentPiano extends Widget {
    constructor(rectangle) {
        super(rectangle);
        this.key_width = this.rectangle.w / 7;
        this.line_width = 3;
        this.note_rects = [];

        const notes = ["C", "D", "E", "F", "G", "A", "B"];
        for(let i=0; i < 7; i++) {
            let x = i * this.key_width + this.rectangle.x;
            let y = this.rectangle.y;
            let r = new Rectangle(x, y, this.key_width, this.rectangle.h);
            r.note = notes[i];
            this.note_rects.push(r);
        }
    }

    click(x, y) {
        for(let r of this.note_rects) {
            if(r.contains(x, y)) {
                return r.note;
            }
        }
    }

    draw(ctx) {
        ctx.lineWidth = this.line_width;

        for(let i=0; i < 7; i++) {
            ctx.beginPath();
            let x = i * this.key_width + this.rectangle.x;
            let y = this.rectangle.y;
            ctx.rect(x, y, this.key_width, this.rectangle.h);
            ctx.stroke();
        }

        for(let i=0; i < 6; i++) {
            if(i == 2) {
                continue;
            }
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(
                (i + 1) * this.key_width + this.rectangle.x - this.key_width / 4, this.rectangle.y,
                this.key_width / 2, this.rectangle.h * 0.6);
        }
    }
}
