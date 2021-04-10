import {
	Widget
} from "./base.js";

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

		let speed = 6;
		let now = this.getRoot().state.now * speed;
		let radius_x = 12.5 + Math.sin(now) * 2 + 2;
		let radius_y = 10 + Math.sin(now) * 2;
		let rotation = -0.2;
		ctx.ellipse(this.rectangle.x + this.center, this.rectangle.y + diff, radius_x, radius_y, rotation, 0, Math.PI * 2);
		ctx.stroke();
	}

	draw(ctx) {
		ctx.lineWidth = this.line_width;
		ctx.fillStyle = "#000000";

		let p = new Path2D();
		let m1 = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix().translate(this.rectangle.x, this.rectangle.y + 145);
		let treble_clef = new Path2D("m51.688 5.25c-5.427-0.1409-11.774 12.818-11.563 24.375 0.049 3.52 1.16 10.659 2.781 19.625-10.223 " +
			"10.581-22.094 21.44-22.094 35.688-0.163 13.057 7.817 29.692 26.75 29.532 2.906-0.02 5.521-0.38 7.844-1 1.731 9.49 2.882 " +
			"16.98 2.875 20.44 0.061 13.64-17.86 14.99-18.719 7.15 3.777-0.13 6.782-3.13 6.782-6.84 0-3.79-3.138-6.88-7.032-6.88-2.141 " +
			"0-4.049 0.94-5.343 2.41-0.03 0.03-0.065 0.06-0.094 0.09-0.292 0.31-0.538 0.68-0.781 1.1-0.798 1.35-1.316 3.29-1.344 6.06 " +
			"0 11.42 28.875 18.77 28.875-3.75 0.045-3.03-1.258-10.72-3.156-20.41 20.603-7.45 15.427-38.04-3.531-38.184-1.47 0.015-2.887 " +
			"0.186-4.25 0.532-1.08-5.197-2.122-10.241-3.032-14.876 7.199-7.071 13.485-16.224 13.344-33.093 0.022-12.114-4.014-21.828-8.312-21.969zm1.281 " +
			"11.719c2.456-0.237 4.406 2.043 4.406 7.062 0.199 8.62-5.84 16.148-13.031 23.719-0.688-4.147-1.139-7.507-1.188-9.5 0.204-13.466 " +
			"5.719-20.886 9.813-21.281zm-7.719 44.687c0.877 4.515 1.824 9.272 2.781 14.063-12.548 4.464-18.57 21.954-0.781 29.781-10.843-9.231-5.506-20.158 " +
			"2.312-22.062 1.966 9.816 3.886 19.502 5.438 27.872-2.107 0.74-4.566 1.17-7.438 1.19-7.181 0-21.531-4.57-21.531-21.875 0-14.494 10.047-20.384 " +
			"19.219-28.969zm6.094 21.469c0.313-0.019 0.652-0.011 0.968 0 13.063 0 17.99 20.745 4.688 27.375-1.655-8.32-3.662-17.86-5.656-27.375z");
		p.addPath(treble_clef, m1);
		ctx.fill(p);

		p = new Path2D();
		m1 = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix().translate(this.rectangle.x, this.rectangle.y + 265).scale(0.13);
		let bass_clef = new Path2D("m190.85 451.25c11.661 14.719 32.323 24.491 55.844 24.491 36.401 0 65.889-23.372 " +
			"65.889-52.214s-29.488-52.214-65.889-52.214c-20.314 4.1522-28.593 9.0007-33.143-2.9091 17.976-54.327 " +
			"46.918-66.709 96.546-66.709 65.914 0 96.969 59.897 96.969 142.97-18.225 190.63-205.95 286.75-246.57 " +
			"316.19 5.6938 13.103 5.3954 12.631 5.3954 12.009 189.78-86.203 330.69-204.43 330.69-320.74 " +
			"0-92.419-58.579-175.59-187.72-172.8-77.575 0-170.32 86.203-118 171.93zm328.1-89.88c0 17.852 14.471 32.323 " +
			"32.323 32.323s32.323-14.471 32.323-32.323-14.471-32.323-32.323-32.323-32.323 14.471-32.323 32.323zm0 136.75c0 " +
			"17.852 14.471 32.323 32.323 32.323s32.323-14.471 32.323-32.323-14.471-32.323-32.323-32.323-32.323 14.471-32.323 32.323z");
		p.addPath(bass_clef, m1)
		ctx.fill(p);

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
