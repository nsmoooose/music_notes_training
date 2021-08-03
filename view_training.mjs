import { InstrumentPiano } from "./instrument_piano.mjs";
import { InstrumentNotes } from "./instrument_notes.mjs";
import { InstrumentViolin } from "./instrument_violin.mjs";
import { Staff } from "./staff.mjs";
import {
	is_int,
	AspectRatioControlContainer,
	MenuOption,
	StackContainer
} from "./base.mjs";
import { g_excercises } from "./questions.mjs";
import { MusicTrainerState } from "./state.mjs";
import { MainMenu } from "./view_main_menu.mjs";
import {
	ImageBack,
	MidiSupported
 } from "./images.mjs";
import {
	MidiConstants,
	MidiPianoNotes
} from "./midi.mjs";
import { _ } from "./translation.mjs";

function note_without_octave(note) {
	return note.substring(0, 1) + note.substring(2, 3);
}

export class MusicTrainer extends AspectRatioControlContainer {
	constructor() {
		super(2);

		this.background_fillStyle = "black";

		let margin = 3;

		this.questions = [];

		MusicTrainerState.load();

		this.stack = new StackContainer("down");
		this.setChild(this.stack);

		this.midi = new MidiSupported();
		this.midi.margin.setMargin(20);

		this.level_label = new MenuOption("Nivå", "", this.midi);
		this.level_label.background_fillStyle = "#ffffff";
		this.level_label.content_fillStyle = "black";
		this.level_label.border_fillStyle = "black";
		this.level_label.content_text_color = "#ffffff";
		this.stack.appendChild(this.level_label, 0.1);

		this.staff = new Staff();
		this.staff.margin.setMargin(margin);
		this.staff.background_fillStyle = "#ffffff"
		this.stack.appendChild(this.staff, 0.4);

		switch(MusicTrainerState.instrument) {
		case "piano": this.instrument = new InstrumentPiano(); break;
		case "notes": this.instrument = new InstrumentNotes(); break;
		case "violin": this.instrument = new InstrumentViolin(); break;
		default: this.instrument = new InstrumentPiano(); break;
		}
		this.instrument.margin.setMargin(margin);
		this.instrument.background_fillStyle = "#ffffff"
		this.stack.appendChild(this.instrument, 0.4);

		let menu = new MenuOption(_("Back"), _("To the main menu"), new ImageBack());
		menu.background_fillStyle = "black";
		menu.content_fillStyle = "black";
		menu.border_fillStyle = "black";
		menu.content_text_color = "#ffffff";
		menu.addEventListener("click", () => {
			this.getRoot().setChild(new MainMenu());
		});
		this.stack.appendChild(menu, 0.1);

		this.excercise = g_excercises[MusicTrainerState.excercise - 1];
		this.level = this.excercise.levels[MusicTrainerState.level - 1];
		this.level_label.label_title.text = this.level.name;
		this.level_label.label_help.text = this.excercise.description;
		this.staff.scale = this.level.scale;
		this.new_question();

		if(navigator.requestMIDIAccess) {
			navigator.requestMIDIAccess().then((midi_access) => {
				for(let input of midi_access.inputs.values()) {
					this.midi.connected = true;
					input.onmidimessage = this.on_midimessage.bind(this);
				}
			});
		}
	}

	feedback_note_add(note) {
		if(Array.isArray(note)) {
			this.staff.feedback_notes.push(note[0]);
		} else {
			this.staff.feedback_notes.push(note);
		}
	}

	feedback_note_delete(note) {
		if(Array.isArray(note)) {
			for(let n of note) {
				this.staff.feedback_notes = this.staff.feedback_notes.filter(v => v != n);
			}
		}
		else {
			this.staff.feedback_notes = this.staff.feedback_notes.filter(v => v != note);
		}
	}

	on_midimessage(message) {
		let command = message.data[0];
		let note = message.data[1];
		let velocity = (message.data.length > 2) ? message.data[2] : 0;

		switch (command) {
		case MidiConstants.CHANNEL1_NOTE_ON:
			if(note in MidiPianoNotes) {
				let n = MidiPianoNotes[note];
				if (velocity > 0) {
					this.feedback_note_add(n);
					this.process_answer(n);
				} else {
					this.feedback_note_delete(n);
				}
			}
			break;
		case MidiConstants.CHANNEL1_NOTE_OFF:
			if(note in MidiPianoNotes) {
				let n = MidiPianoNotes[note];
				this.feedback_note_delete(n);
			}
			break;
		}
	}

	on_click(x, y) {
		let handled = super.on_click(x, y);
		if(handled) {
			return handled;
		}

		if(this.questions.length <= 0) {
			return true;
		}

		const answer = this.instrument.click(x, y);
		if(answer == null) {
			return true;
		}

		this.process_answer(answer);
	}

	process_answer(answer) {
		let correct_answer = null;
		let current_question = this.questions[0];

		if(Array.isArray(answer)) {
			if(answer[0].length >= 1 && is_int(parseInt(answer[0][1], 10))) {
				correct_answer = current_question.note;
			} else {
				correct_answer = note_without_octave(current_question.note);
			}
		} else if(answer.length >= 1 && is_int(parseInt(answer[1], 10))) {
			correct_answer = current_question.note;
		} else {
			correct_answer = note_without_octave(current_question.note);
		}

		this.questions.shift();

		if(answer == correct_answer || (Array.isArray(answer) && answer.indexOf(correct_answer) != -1)) {
			MusicTrainerState.add_answer(this.level.id, true);
			this.new_question();
			this.staff.extra_note_size = 50;
			this.staff.note_color = [0, 255, 0];
		} else {
			MusicTrainerState.add_answer(this.level.id, false);
			this.new_question();
			this.staff.extra_note_size = 50;
			this.staff.note_color = [255, 0, 0];
		}

		MusicTrainerState.persist();
		return true;
	}

	new_question() {
		if(this.level.questions.length == 0) {
			return;
		}
		while(this.questions.length < 5) {
			this.questions.push(this.level.questions[Math.floor(Math.random() * this.level.questions.length)]);
		}
		this.staff.notes = Array.from(this.questions, element => element.note);
	}
}
