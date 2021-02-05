import { Rectangle } from "./base.js"

export class InstrumentNotes {
    constructor(canvas) {
        this.canvas = canvas;
        this.top_offset = 700;
        this.margin = 50;
        this.note_rects = [];
        this.notes = ["C", "D", "E", "F", "G", "A", "B"];
        this.note_width = (this.canvas.width - (2 * this.margin)) / (this.notes.length - 1);

        for(let i=0; i < this.notes.length; i++) {
            let x = this.note_width * i + this.margin;
            let y = this.top_offset;
            let r = new Rectangle(x - this.note_width / 2, y - this.note_width / 2, this.note_width, this.note_width);
            r.note = this.notes[i];
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

    draw() {
        let ctx = self.canvas.getContext("2d");

        ctx.font = "30px Arial";
        ctx.lineWidth = 1;

        for(let i=0; i < this.notes.length; i++) {
            let x = this.note_width * i + this.margin;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.strokeText(this.notes[i], x, this.top_offset);
        }
    }
}