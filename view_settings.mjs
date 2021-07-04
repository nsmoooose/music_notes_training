import {
	AspectRatioControlContainer,
	Label,
	MenuOption,
	StackContainer
} from "./base.mjs";
import { Checkbox } from "./images.mjs";
import { ImageBack } from "./images.mjs";
import { MusicTrainerState } from "./state.mjs";

export class Settings extends AspectRatioControlContainer {
	constructor(back) {
		super(2);

		this.back = back;

		let colors = [
			"#6666ee",
			"#4444cc",
			"#2222aa",
			"#000099",
			"#aa0000",
			"#000077",
			"#000066",
			"#000055",
			"#000044",
		];
		let text_color = "#ffffff";

		let margin = 3;
		this.background_fillStyle = "black";

		this.stack = new StackContainer("down");
		this.setChild(this.stack);

		this.title = new Label("Inställningar");
		this.title.margin.setMargin(30);
		this.title.background_fillStyle = colors[0];
		this.title.text_fillStyle = text_color;
		this.stack.appendChild(this.title, 0.20);

		// TODO Language

		let instruments = [
			{id: "notes", name: "Noter", description: "Lär dig noternas namn"},
			{id: "piano", name: "Piano", description: "Tangenterna placering"},
			{id: "violin", name: "Fiol", description: "Var ska jag trycka"}
		];

		colors[instruments.length + 1 + 1] = "black";
		colors[instruments.length + 1 + 2] = "black";

		let index = 1;
		for(let instrument of instruments) {
			let checkbox = new Checkbox();
			checkbox.checked = MusicTrainerState.instrument == instrument.id;
			let menu = new MenuOption(instrument.name, instrument.description, checkbox);
			menu.background_fillStyle = colors[index + 1];
			menu.content_fillStyle = colors[index];
			menu.border_fillStyle = colors[index];
			menu.content_text_color = text_color;
			menu.addEventListener("click", () => {
				MusicTrainerState.instrument = instrument.id;
				MusicTrainerState.persist();
				/* Ugly to create a new settings view. Should update existing
				   controls. Back button animation will glitch a little as well. */
				this.getRoot().setChild(new Settings(this.back));
			});
			this.stack.appendChild(menu, 0.1);
			index += 1;
		}

		let menu = new MenuOption("!! Starta om !!", "Din lagrade statistik försvinner", new Label(""));
		menu.background_fillStyle = colors[index + 1];
		menu.content_fillStyle = colors[index];
		menu.border_fillStyle = colors[index];
		menu.content_text_color = text_color;
		menu.addEventListener("click", () => {
			MusicTrainerState.reset();
			this.getRoot().setChild(this.back);
		});
		this.stack.appendChild(menu, 0.1);
		index += 1;

		menu = new MenuOption("Tillbaka", "Till huvudmenyn", new ImageBack());
		menu.background_fillStyle = colors[index + 1];
		menu.content_fillStyle = colors[index];
		menu.border_fillStyle = colors[index];
		menu.content_text_color = text_color;
		menu.addEventListener("click", () => {
			this.getRoot().setChild(this.back);
		});
		this.stack.appendChild(menu, 0.14);
	}
}