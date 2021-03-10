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
import { LevelInfo } from "./level.js";

class MusicTrainerState {
	constructor() {
		this.now = 0;
		this.level = 1;
		this.level_results = [];
		this.load();
	}

	result_reset() {
		this.level_results = [];
		this.persist();
	}

	load() {
		let x = sessionStorage.getItem("results");
		if(x != null) {
			x = JSON.parse(x);
			if(x.version == 1) {
				this.level = x.level;
				this.level_results = x.level_results;
			}
		}
	}

	persist() {
		let x = {"version": 1, "level": this.level, "level_results": this.level_results};
		let s = JSON.stringify(x);
		sessionStorage.setItem("results", s);
	}
}

class MusicTrainer extends Container {
	constructor(rectangle) {
		super(rectangle);

		this.state = new MusicTrainerState();
		this.answers_correct = 0;
		this.answers_fail = 0;
		this.current_question = null;
		this.set_level(this.state.level);
		this.new_question();

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

		this.button_level_up = new Button(new Rectangle(580, 320, 200, 40), "Level up");
		this.button_level_up.addEventListener("click", () => {
			this.set_level(this.state.level + 1);
		});
		this.button_level_up.visible = false;
		this.appendChild(this.button_level_up);

		this.instrument = new InstrumentPiano(new Rectangle(50, 600, 700, 370));
		this.appendChild(this.instrument);

		this.appendChild(new LevelInfo(new Rectangle(580, 200, 200, 100)));
	}

	on_click(x, y) {
		super.on_click(x, y);

		if(this.current_question == null) {
			return;
		}

		const answer = this.instrument.click(x, y);
		if(answer == null) {
			return;
		}
		if(answer == this.current_question.note[0]) {
			this.answers_correct++;
			this.label_correct.text = "Correct: " + this.answers_correct;
			this.state.level_results.push(1.0);
			this.new_question();
		} else {
			this.answers_fail++;
			this.label_fails.text = "Fails: " + this.answers_fail;
			this.state.level_results.push(0.0);
		}
		if(this.state.level_results.length > 100) {
			this.state.level_results.shift();
		}

		let sum = 0;
		this.state.level_results.forEach(element => (sum += element));
		let average = Math.trunc(sum / this.state.level_results.length * 100);
		if(average > 80 && this.state.level_results.length == 100) {
			this.button_level_up.visible = true;
		} else {
			this.button_level_up.visible = false;
		}

		this.state.persist();
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

	set_level(level) {
		this.questions = g_questions.filter((q) => (q.level == level));
		if(level != this.state.level) {
			this.state.result_reset();
			this.state.level = level;
		}
	}

	new_question() {
		if(this.questions.length == 0) {
			return;
		}
		this.current_question = this.questions[Math.floor(Math.random() * this.questions.length)];
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
