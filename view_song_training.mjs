import {
	AspectRatioControlContainer,
	MenuOption,
	StackContainer
} from "./base.mjs";
import {
	ImageBack,
	MidiSupported
} from "./images.mjs";
import { Staff } from "./staff.mjs";
import { _ } from "./translation.mjs";
import { MainMenu } from "./view_main_menu.mjs";
import {
	MidiConstants,
	MidiPianoNotes
} from "./midi.mjs";

export class SongTraining extends AspectRatioControlContainer {
	constructor(song) {
		super(0.5);

		this.background_fillStyle = "black";

		this.stack = new StackContainer("down");
		this.setChild(this.stack);

		this.midi = new MidiSupported();
		this.midi.margin.setMargin(20);

		this.level_label = new MenuOption(_("Notes"), _("Plain notes with MIDI feedback"), this.midi);
		this.level_label.background_fillStyle = "#ffffff";
		this.level_label.content_fillStyle = "black";
		this.level_label.border_fillStyle = "black";
		this.level_label.content_text_color = "#ffffff";
		this.stack.appendChild(this.level_label, 0.1);

		this.staff = new Staff();
		this.staff.scale = song.scale;
		this.staff.margin.setMargin(0);
		this.staff.background_fillStyle = "#ffffff"
		this.stack.appendChild(this.staff, 0.8);

		this.staff.notes = song.notes;

		let menu = new MenuOption(_("Back"), _("To the main menu"), new ImageBack());
		menu.background_fillStyle = "black";
		menu.content_fillStyle = "black";
		menu.border_fillStyle = "black";
		menu.content_text_color = "#ffffff";
		menu.addEventListener("click", () => {
			this.getRoot().setChild(new MainMenu());
		});
		this.stack.appendChild(menu, 0.1);

		if (navigator.requestMIDIAccess) {
			navigator.requestMIDIAccess().then((midi_access) => {
				for (let input of midi_access.inputs.values()) {
					this.midi.connected = true;
					input.onmidimessage = this.on_midimessage.bind(this);
				}
			});
		}
	}

	feedback_note_add(note) {
		if (Array.isArray(note)) {
			this.staff.feedback_notes.push(note[0]);
		} else {
			this.staff.feedback_notes.push(note);
		}
	}

	feedback_note_delete(note) {
		if (Array.isArray(note)) {
			for (let n of note) {
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
				if (note in MidiPianoNotes) {
					let n = MidiPianoNotes[note];
					if (velocity > 0) {
						this.feedback_note_add(n);
					} else {
						this.feedback_note_delete(n);
					}
				}
				break;
			case MidiConstants.CHANNEL1_NOTE_OFF:
				if (note in MidiPianoNotes) {
					let n = MidiPianoNotes[note];
					this.feedback_note_delete(n);
				}
				break;
		}
	}
}
