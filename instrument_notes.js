import {
	Rectangle,
	Widget
} from "./base.js";

export class InstrumentNotes extends Widget {
	constructor(rectangle) {
		super(rectangle);
		this.note_rects = [];
		this.notes = ["C", "D", "E", "F", "G", "A", "B"];
		this.note_width = this.rectangle.w / (this.notes.length - 1);

		for(let i=0; i < this.notes.length; i++) {
			let x = this.rectangle.x + this.note_width * i;
			let y = this.rectangle.y;
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

	draw(ctx) {
		ctx.font = "100px Arial";
		ctx.lineWidth = 1;

		for(let i=0; i < this.notes.length; i++) {
			let x = this.rectangle.x + this.note_width * i;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.strokeText(this.notes[i], x, this.rectangle.y);
		}
	}
}