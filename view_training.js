import { InstrumentPiano } from "./instrument_piano.js";
import { InstrumentNotes } from "./instrument_notes.js";
import { InstrumentViolin } from "./instrument_violin.js";
import { Staff } from "./staff.js";
import {
	AspectRatioControlContainer,
	Button,
	Label,
	ProgressBar,
	StackContainer
} from "./base.js";
import { g_levels } from "./questions.js";
import { MusicTrainerState } from "./state.js";

function note_without_octave(note) {
	return note.substring(0, 1) + note.substring(2, 3);
}

export class MusicTrainer extends AspectRatioControlContainer {
	constructor(back) {
		super(2);

		this.back = back;

		this.current_question = null;

		MusicTrainerState.load();

		this.stack = new StackContainer("down");
		this.setChild(this.stack);

		this.header_stack = new StackContainer("right");
		this.stack.appendChild(this.header_stack, 0.05);

		this.button_back = new Button("<");
		this.button_back.margin.setMargin(10);
		this.button_back.addEventListener("click", () => {
			this.getRoot().setChild(this.back);
		});
		this.header_stack.appendChild(this.button_back, 0.1);

		this.label_level = new Label("");
		this.label_level.textAlign = "center";
		this.label_level.margin.setMargin(5);
		this.header_stack.appendChild(this.label_level, 0.90);

		this.progress = new ProgressBar();
		this.progress.margin.setMargin(5);
		this.progress.setProgress(MusicTrainerState.level_results.length / 100);
		this.stack.appendChild(this.progress, 0.03);

		this.staff = new Staff();
		this.staff.margin.setMargin(10);
		this.stack.appendChild(this.staff, 0.545);

		switch(MusicTrainerState.instrument) {
			case "piano": this.instrument = new InstrumentPiano(); break;
			case "notes": this.instrument = new InstrumentNotes(); break;
			case "violin": this.instrument = new InstrumentViolin(); break;
			default: this.instrument = new InstrumentPiano(); break;
		}
		this.instrument.margin.setMargin(20);
		this.stack.appendChild(this.instrument, 0.375);

		this.set_level(MusicTrainerState.level);
		this.new_question();
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
		let correct_answer = note_without_octave(this.current_question.note);
		if(answer == correct_answer || (Array.isArray(answer) && answer.indexOf(correct_answer) != -1)) {
			MusicTrainerState.level_results.push(1.0);
			this.new_question();
			this.staff.extra_note_size = 50;
			this.staff.note_color = [0, 255, 0];
		} else {
			MusicTrainerState.level_results.push(0.0);
			this.new_question();
			this.staff.extra_note_size = 50;
			this.staff.note_color = [255, 0, 0];
		}
		if(MusicTrainerState.level_results.length > 100) {
			MusicTrainerState.level_results.shift();
		}

		this.progress.setProgress(MusicTrainerState.level_results.length / 100);

		let sum = 0;
		MusicTrainerState.level_results.forEach(element => (sum += element));
		let average = Math.trunc(sum / MusicTrainerState.level_results.length * 100);

		if(average < 50) {
			this.progress.style = "#bb0000";
		} else if(average < 80) {
			this.progress.style = "#bbbb00";
		} else {
			this.progress.style = "#00bb00";
		}

		if(average > 80 && MusicTrainerState.level_results.length == 100) {
			this.set_level(MusicTrainerState.level + 1);
		}

		MusicTrainerState.persist();
	}

	draw(ctx) {
		super.draw(ctx);

		if(this.current_question) {
			this.staff.draw_tone(ctx, this.current_question.note);
		}
	}

	set_level(level) {
		this.level = g_levels[level - 1];
		this.label_level.text = this.level.name;
		if(level != MusicTrainerState.level) {
			MusicTrainerState.result_reset();
			MusicTrainerState.level = level;
			this.new_question();
		}
	}

	new_question() {
		if(this.level.questions.length == 0) {
			return;
		}
		this.current_question = this.level.questions[Math.floor(Math.random() * this.level.questions.length)];
	}
}
