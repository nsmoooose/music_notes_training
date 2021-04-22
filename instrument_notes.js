import {
	Rectangle,
	Widget
} from "./base.js";

export class InstrumentNotes extends Widget {
	constructor(rectangle) {
		super(rectangle);
		/*
		this.notes = [
			"C", "D", "E", "F", "G", "A", "B",
			"C♯", "D♭", "D♯", "E♭", "F♯", "G♭",
			"G♯", "A♭",	"A♯", "B♭"
		];
		*/
		this.notes = [
			"C", "C♯", "D♭", "D", "D♯", "E♭", "E",
			"F", "F♯", "G♭", "G", "G♯", "A♭", "A",
			"A♯", "B♭", "B"
		];

		this.w = 5;
		this.h = 4;
	}

	calc_rects() {
		const note_width = this.rectangle.w / this.w;
		const note_height = this.rectangle.h / this.h;
		let rects = [];
		let i = 0;
		for(let row=0; row < this.h; row++) {
			for(let col=0; col < this.w; col++) {
				if(i >= this.notes.length) {
					return rects;
				}
				const x = this.rectangle.x + note_width * col;
				const y = this.rectangle.y + note_height * row;
				let r = new Rectangle(
					x,
					y,
					note_width,
					note_height
				);
				r.note = this.notes[i];
				rects.push(r);

				i++;
			}
		}
		return rects;
	}

	click(x, y) {
		const note_rects = this.calc_rects();
		for(let r of note_rects) {
			if(r.contains(x, y)) {
				return r.note;
			}
		}
	}

	draw(ctx) {
		ctx.font = Math.abs(this.rectangle.h / this.h * 0.6) + "px Arial";
		ctx.lineWidth = Math.min(this.rectangle.h, this.rectangle.w) * 0.003;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		for(let r of this.calc_rects()) {
			ctx.beginPath();
			ctx.rect(r.x, r.y, r.w, r.h);
			ctx.stroke();

			const x = r.x + r.w / 2;
			const y = r.y + r.h / 2;
			ctx.strokeText(r.note, x, y);
		}
	}
}