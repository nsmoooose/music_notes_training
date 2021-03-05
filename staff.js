import {
    Widget
} from "./base.js"

export class Staff extends Widget {
    constructor(rectangle, center) {
        super(rectangle);
        this.center = center;
        this.line_space = this.rectangle.h / 26;
        this.line_width = 1;
        this.top_note = "C8";
    }

    draw_tone(ctx, note) {
        const notes = ["C", "D", "E", "F", "G", "A", "B"];

        const octave_note_index = notes.indexOf(note[0]);
        const octave = parseInt(note[1]);

        const diff =
            (parseInt(this.top_note[1]) - octave) * 7 * this.line_space / 2 -
            octave_note_index * this.line_space / 2;

        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.ellipse(this.rectangle.x + this.center, this.rectangle.y + diff, 12.5, 10, 0, 0, Math.PI * 2);
        ctx.stroke();
    }

    draw(ctx) {
        ctx.lineWidth = this.line_width;

        for(let i=0; i < 26; i++) {
            let y = this.rectangle.y + i * this.line_space;
            if((i >= 0 && i <= 8) ||
                i == 14 ||
               (i >= 20 && i <= 25)) {
                ctx.beginPath();
                ctx.moveTo(this.rectangle.x + this.center - 30, y);
                ctx.lineTo(this.rectangle.x + this.center + 30, y);
                ctx.stroke();
            } else if((i >= 9 && i <= 13) ||
                      (i >= 15 && i <= 19)) {
                ctx.beginPath();
                ctx.moveTo(this.rectangle.x, y);
                ctx.lineTo(this.rectangle.x + this.rectangle.w, y);
                ctx.stroke();
            } else {
                break;
            }
        }
    }
}
