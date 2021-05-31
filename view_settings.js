import {
	AspectRatioControlContainer,
	Button,
	Label,
	StackContainer
} from "./base.js";
import { MusicTrainerState } from "./state.js";

export class Settings extends AspectRatioControlContainer {
	constructor(back) {
		super(2);

		this.back = back;

		this.stack = new StackContainer("down");
		this.setChild(this.stack);

		this.title = new Label("Inställningar");
		this.title.margin.setMargin(10);
		this.stack.appendChild(this.title, 0.10);

		// TODO Language

		// TODO Instrument
		this.instrument_stack = new StackContainer("right");
		this.stack.appendChild(this.instrument_stack, 0.10);

		this.button_notes = new Button("Noter");
		this.button_notes.margin.setMargin(10);
		this.button_notes.addEventListener("click", () => {
			MusicTrainerState.instrument = "notes";
			MusicTrainerState.persist();
		});
		this.instrument_stack.appendChild(this.button_notes, 0.33);

		this.button_piano = new Button("Piano");
		this.button_piano.margin.setMargin(10);
		this.button_piano.addEventListener("click", () => {
			MusicTrainerState.instrument = "piano";
			MusicTrainerState.persist();
		});
		this.instrument_stack.appendChild(this.button_piano, 0.33);

		this.button_violin = new Button("Fiol");
		this.button_violin.margin.setMargin(10);
		this.button_violin.addEventListener("click", () => {
			MusicTrainerState.instrument = "violin";
			MusicTrainerState.persist();
		});
		this.instrument_stack.appendChild(this.button_violin, 0.33);

		this.label_space_1 = new Label("");
		this.stack.appendChild(this.label_space_1, 0.10);

		this.button_reset_progress = new Button("!! Starta om !!");
		this.button_reset_progress.margin.setMargin(10);
		this.button_reset_progress.addEventListener("click", () => {
			MusicTrainerState.result_reset();
		});
		this.stack.appendChild(this.button_reset_progress, 0.10);

		this.label_space_2 = new Label("");
		this.stack.appendChild(this.label_space_2, 0.10);

		this.button_back = new Button("< Tillbaka");
		this.button_back.margin.setMargin(10);
		this.button_back.addEventListener("click", () => {
			this.getRoot().setChild(this.back);
		});
		this.stack.appendChild(this.button_back, 0.10);
	}
}