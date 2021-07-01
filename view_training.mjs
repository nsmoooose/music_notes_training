import { InstrumentPiano } from "./instrument_piano.mjs";
import { InstrumentNotes } from "./instrument_notes.mjs";
import { InstrumentViolin } from "./instrument_violin.mjs";
import { Staff } from "./staff.mjs";
import {
	AspectRatioControlContainer,
	Button,
	Label,
	ProgressBar,
	StackContainer
} from "./base.mjs";
import { g_excercises } from "./questions.mjs";
import { MusicTrainerState } from "./state.mjs";
import { MainMenu } from "./view_main_menu.mjs";
import { MidiSupported } from "./images.mjs";

function note_without_octave(note) {
	return note.substring(0, 1) + note.substring(2, 3);
}

export class MusicTrainer extends AspectRatioControlContainer {
	constructor() {
		super(2);

		this.background_fillStyle = "black";

		let margin = 3;

		this.current_question = null;

		MusicTrainerState.load();

		this.stack = new StackContainer("down");
		this.stack.background_fillStyle = "white";
		this.setChild(this.stack);

		this.header_stack = new StackContainer("right");
		this.stack.appendChild(this.header_stack, 0.05);

		this.button_back = new Button("<");
		this.button_back.margin.setMargin(margin);
		this.button_back.addEventListener("click", () => {
			this.getRoot().setChild(new MainMenu());
		});
		this.header_stack.appendChild(this.button_back, 0.15);

		this.label_level = new Label("");
		this.label_level.textAlign = "center";
		this.label_level.margin.setMargin(10);
		this.header_stack.appendChild(this.label_level, 0.7);

		this.midi = new MidiSupported();
		this.midi.margin.setMargin(20);
		this.header_stack.appendChild(this.midi, 0.15);

		this.progress = new ProgressBar();
		this.progress.margin.setMargin(margin);
		this.progress.setProgress(MusicTrainerState.level_results.length / 100);
		this.stack.appendChild(this.progress, 0.03);

		this.staff = new Staff();
		this.staff.margin.setMargin(margin);
		this.stack.appendChild(this.staff, 0.545);

		switch(MusicTrainerState.instrument) {
		case "piano": this.instrument = new InstrumentPiano(); break;
		case "notes": this.instrument = new InstrumentNotes(); break;
		case "violin": this.instrument = new InstrumentViolin(); break;
		default: this.instrument = new InstrumentPiano(); break;
		}
		this.instrument.margin.setMargin(margin);
		this.stack.appendChild(this.instrument, 0.375);

		this.set_level(MusicTrainerState.excercise, MusicTrainerState.level);
		this.new_question();

		if(navigator.requestMIDIAccess) {
			navigator.requestMIDIAccess().then(this.on_midi_success);
		}
	}

	on_midi_success(midi_access) {
		this.midi.connected = true;
	}

	on_click(x, y) {
		let handled = super.on_click(x, y);
		if(handled) {
			return handled;
		}

		if(this.current_question == null) {
			return true;
		}

		const answer = this.instrument.click(x, y);
		if(answer == null) {
			return true;
		}
		let correct_answer = note_without_octave(this.current_question.note);
		if(answer == correct_answer || (Array.isArray(answer) && answer.indexOf(correct_answer) != -1)) {
			MusicTrainerState.add_answer(this.level.id, true);
			MusicTrainerState.level_results.push(1.0);
			this.new_question();
			this.staff.extra_note_size = 50;
			this.staff.note_color = [0, 255, 0];
		} else {
			MusicTrainerState.add_answer(this.level.id, false);
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
			this.set_level(MusicTrainerState.excercise, MusicTrainerState.level + 1);
		}

		MusicTrainerState.persist();
		return true;
	}

	draw(ctx) {
		super.draw(ctx);

		if(this.current_question) {
			this.staff.draw_tone(ctx, this.current_question.note);
		}
	}

	set_level(excercise, level) {
		this.excercise = g_excercises[excercise - 1];
		this.level = this.excercise.levels[level - 1];
		this.label_level.text = this.level.name;
		if(level != MusicTrainerState.level) {
			MusicTrainerState.level_results = [];
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
