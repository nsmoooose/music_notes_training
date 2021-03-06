import { InstrumentPiano } from "./instrument_piano.js";
import { InstrumentNotes } from "./instrument_notes.js";
import { Staff } from "./staff.js";
import {
	$,
	Button,
	Container,
	Label,
	Rectangle
} from "./base.js";
import { g_questions } from "./questions.js";

class MusicTrainerState {
	constructor() {
		this.now = 0;
	}
}

class MusicTrainer extends Container {
	constructor(rectangle) {
		super(rectangle);

		this.state = new MusicTrainerState();
		this.answers_correct = 0;
		this.answers_fail = 0;
		this.current_question = g_questions[Math.floor(Math.random() * g_questions.length)];

		this.label_correct = new Label(new Rectangle(20, 60, 100, 50), "Correct: 0");
		this.label_correct.font = "60px Arial";
		this.label_correct.textAlign = "left";
		this.label_correct.fillStyle = "#00bb00";
		this.appendChild(this.label_correct);

		this.label_fails = new Label(new Rectangle(20, 150, 100, 50), "Fails: 0");
		this.label_fails.font = "60px Arial";
		this.label_fails.textAlign = "left";
		this.label_fails.fillStyle = "#ff0000";
		this.appendChild(this.label_fails);

		this.staff = new Staff(new Rectangle(100, 50, 400, 520), 250);
		this.appendChild(this.staff);

		this.button_instrument_notes = new Button(new Rectangle(580, 20, 200, 40), "Notes");
		this.button_instrument_notes.addEventListener("click", () => {
			this.removeChildByValue(this.instrument);
			this.instrument = new InstrumentNotes(new Rectangle(50, 700, 700, 370));
			this.appendChild(this.instrument);
		});
		this.appendChild(this.button_instrument_notes);

		this.button_instrument_piano = new Button(new Rectangle(580, 80, 200, 40), "Piano");
		this.button_instrument_piano.addEventListener("click", () => {
			this.removeChildByValue(this.instrument);
			this.instrument = new InstrumentPiano(new Rectangle(50, 600, 700, 370));
			this.appendChild(this.instrument);
		});
		this.appendChild(this.button_instrument_piano);

		this.instrument = new InstrumentPiano(new Rectangle(50, 600, 700, 370));
		this.appendChild(this.instrument);
	}

	on_click(x, y) {
		super.on_click(x, y);

		const answer = this.instrument.click(x, y);
		if(answer == null) {
			return;
		}
		if(answer == this.current_question.note[0]) {
			this.current_question = g_questions[Math.floor(Math.random() * g_questions.length)];
			this.answers_correct++;
			this.label_correct.text = "Correct: " + this.answers_correct;
		} else {
			this.answers_fail++;
			this.label_fails.text = "Fails: " + this.answers_fail;
		}
	}

	draw(ctx) {
		super.draw(ctx);

		if(this.current_question) {
			this.staff.draw_tone(ctx, this.current_question.note);
		}
	}

	step() {
		this.state.now += 0.1;
	}
}

let g_trainer = new MusicTrainer(new Rectangle(0, 0, 800, 1000));

window.addEventListener("load", () => {
	let canvas = $("canvas");

	canvas.addEventListener("click", (event) => {
		const rect = canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		if(g_trainer.rectangle.contains(x, y)) {
			g_trainer.on_click(x, y);
		}
	});
	/*
	canvas.addEventListener("mousemove", (event) => {
		const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        console.log("x: " + x + " y: " + y)
	});
    */

	window.setInterval(() => {
		let ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		g_trainer.step();
		g_trainer.draw(ctx);
	}, 100);
});
