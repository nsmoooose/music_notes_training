import { Rectangle } from "./base.js"

export class InstrumentPiano {
    constructor(canvas) {
        this.canvas = canvas;
        this.top_offset = 600;
        this.height = 270;
        this.key_width = 40;
        this.line_width = 3;
        this.note_rects = [];

        let left_offset = canvas.width / 2 - (7 * this.key_width / 2);
        const notes = ["C", "D", "E", "F", "G", "A", "B"];
        for(let i=0; i < 7; i++) {
            let x = i * this.key_width + left_offset;
            let y = this.top_offset;
            let r = new Rectangle(x, y, this.key_width, this.height);
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

    draw() {
        let ctx = self.canvas.getContext("2d");
        ctx.lineWidth = this.line_width;

        let left_offset = canvas.width / 2 - (7 * this.key_width / 2);
        for(let i=0; i < 7; i++) {
            ctx.beginPath();
            let x = i * this.key_width + left_offset;
            let y = this.top_offset;
            ctx.rect(x, y, this.key_width, this.height);
            ctx.stroke();
        }

        for(let i=0; i < 6; i++) {
            if(i == 2) {
                continue;
            }
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillRect(
                (i + 1) * this.key_width + left_offset - this.key_width / 4, this.top_offset,
                this.key_width / 2, this.height * 0.6);
        }
    }
}
