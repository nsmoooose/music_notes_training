import {
	Rectangle,
	Widget
} from "./base.js";

export class InstrumentPiano extends Widget {
	constructor(rectangle) {
		super(rectangle);
		this.line_width = 3;
	}

	click(x, y) {
		let key_width = this.rectangle.w / 7;
		let note_rects = [];
		const notes = ["C", "D", "E", "F", "G", "A", "B"];
		for(let i=0; i < 7; i++) {
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
		let key_width = this.rectangle.w / 7;

		ctx.lineWidth = this.line_width;

		for(let i=0; i < 7; i++) {
			ctx.beginPath();
			let x = i * key_width + this.rectangle.x;
			let y = this.rectangle.y;
			ctx.rect(x, y, key_width, this.rectangle.h);
			ctx.stroke();
		}

		for(let i=0; i < 6; i++) {
			if(i == 2) {
				continue;
			}
			ctx.fillStyle = "rgb(0, 0, 0)";
			ctx.fillRect(
				(i + 1) * key_width + this.rectangle.x - key_width / 4, this.rectangle.y,
				key_width / 2, this.rectangle.h * 0.6);
		}
	}
}
