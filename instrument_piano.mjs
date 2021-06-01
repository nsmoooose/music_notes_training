import {
	Rectangle,
	Widget
} from "./base.mjs";

export class InstrumentPiano extends Widget {
	constructor() {
		super();
		this.line_width = 3;
	}

	click(x, y) {
		let key_width = this.rectangle.w / 7;
		let note_rects = [];

		const notes_2 = [
			["C♯", "D♭"],
			["D♯", "E♭"],
			null,
			["F♯", "G♭"],
			["G♯", "A♭"],
			["A♯", "B♭"],
		];
		for(let i = 0; i < 6; i++) {
			if(i == 2) {
				continue;
			}
			let x = (i + 1) * key_width + this.rectangle.x - key_width / 4;
			let y = this.rectangle.y;
			let r = new Rectangle(x, y, key_width / 2, this.rectangle.h * 0.6);
			r.note = notes_2[i];
			note_rects.push(r);
		}

		const notes = ["C", "D", "E", "F", "G", "A", "B"];
		for(let i = 0; i < 7; i++) {
			let x = i * key_width + this.rectangle.x;
			let y = this.rectangle.y;
			let r = new Rectangle(x, y, key_width, this.rectangle.h);
			r.note = notes[i];
			note_rects.push(r);
		}

		for(let r of note_rects) {
			if(r.contains(x, y)) {
				return r.note;
			}
		}
	}

	draw(ctx) {
		if(InstrumentPiano.filter != null) {
			ctx.filter = InstrumentPiano.filter;
		}
		let rectangle = this.margin.getRectangle(this.rectangle);
		let key_width = rectangle.w / 7;

		ctx.lineWidth = this.line_width;

		for(let i=0; i < 7; i++) {
			ctx.strokeStyle = "gray";
			ctx.beginPath();
			let x = i * key_width + rectangle.x;
			let y = rectangle.y;
			ctx.rect(x, y, key_width, rectangle.h);
			ctx.stroke();
			ctx.fillStyle = "white";
			ctx.fillRect(x + this.line_width / 2, y + this.line_width / 2, key_width - this.line_width, rectangle.h - this.line_width);
		}

		for(let i=0; i < 6; i++) {
			if(i == 2) {
				continue;
			}
			ctx.fillStyle = "rgb(0, 0, 0)";
			ctx.fillRect(
				(i + 1) * key_width + rectangle.x - key_width / 4, rectangle.y,
				key_width / 2, rectangle.h * 0.6);
		}
		ctx.filter = "none";
	}
}

InstrumentPiano.filter = null;
