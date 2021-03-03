import {
    Widget
} from "./base.js"

export class Staff {
    constructor(canvas) {
        this.canvas = canvas;
        this.top_offset = 50;
        this.left_offset = 30;
        this.line_space = 20;
        this.line_width = 1;
        this.top_note = "C8";
    }

    draw_tone(note) {
        const notes = ["C", "D", "E", "F", "G", "A", "B"];

        const octave_note_index = notes.indexOf(note[0]);
        const octave = parseInt(note[1]);

        const diff =
            (parseInt(this.top_note[1]) - octave) * 7 * this.line_space / 2 -
            octave_note_index * this.line_space / 2;

        let ctx = this.canvas.getContext("2d");
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.ellipse(canvas.width / 2, this.top_offset + diff, 12.5, 10, 0, 0, Math.PI * 2);
        ctx.stroke();
    }

    draw() {
        let ctx = this.canvas.getContext("2d");
        ctx.lineWidth = this.line_width;

        let width = canvas.width - this.left_offset * 2;
        for(let i=0; ; i++) {
            let y = this.top_offset + i * this.line_space;
            if((i >= 0 && i <= 8) ||
                i == 14 ||
               (i >= 20 && i <= 25)) {
                ctx.beginPath();
                ctx.moveTo(canvas.width / 2 - 30, y);
                ctx.lineTo(canvas.width / 2 + 30, y);
                ctx.stroke();
            } else if((i >= 9 && i <= 13) ||
                      (i >= 15 && i <= 19)) {
                ctx.beginPath();
                ctx.moveTo(this.left_offset, y);
                ctx.lineTo(this.left_offset + width, y);
                ctx.stroke();
            } else {
                break;
            }
        }
    }
}
