import {
	Rectangle,
	Widget
} from "./base.js";
import {
	g_levels,
	Hints
} from "./questions.js"
import { MusicTrainerState } from "./state.js";

export class InstrumentNotes extends Widget {
	constructor(rectangle) {
		super(rectangle);
		this.w = 5;
		this.h = 4;
	}

	calc_rects() {
		const all_notes = [
			["C", 0],
			["C♯", Hints.instrument_notes_show_sharp],
			["D♭", Hints.instrument_notes_show_flat],
			["D", 0],
			["D♯", Hints.instrument_notes_show_sharp],
			["E♭", Hints.instrument_notes_show_flat],
			["E", 0],
			["F", 0],
			["F♯", Hints.instrument_notes_show_sharp],
			["G♭", Hints.instrument_notes_show_flat],
			["G", 0],
			["G♯", Hints.instrument_notes_show_sharp],
			["A♭", Hints.instrument_notes_show_flat],
			["A", 0],
			["A♯", Hints.instrument_notes_show_sharp],
			["B♭", Hints.instrument_notes_show_flat],
			["B", 0],
		];


		let level = MusicTrainerState.level - 1;
		let notes = [];
		for(let note of all_notes) {
			if(note[1] != 0) {
				if(level.hints & note[1]) {
					notes.push(note[0]);
				}
			} else {
				notes.push(note[0]);
			}
		}

		const note_width = this.rectangle.w / this.w;
		const note_height = this.rectangle.h / this.h;
		let rects = [];
		let i = 0;
		for(let row=0; row < this.h; row++) {
			for(let col=0; col < this.w; col++) {
				if(i >= notes.length) {
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
				r.note = notes[i];
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
		ctx.font = Math.min(
			Math.abs(this.rectangle.h / this.h * 0.6),
			Math.abs(this.rectangle.w / this.w * 0.6)) + "px Arial";
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