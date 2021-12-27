import {
	AspectRatioControlContainer,
	Label,
	MenuOption,
	StackContainer
} from "./base.mjs";
import { Checkbox } from "./images.mjs";
import { ImageBack } from "./images.mjs";
import { MusicTrainerState } from "./state.mjs";
import {
	_,
	language_set
} from "./translation.mjs";
import { MainMenu } from "./view_main_menu.mjs";

export class Settings extends AspectRatioControlContainer {
	constructor() {
		super(2);

		let colors = [
			"#44ee44",
			"#44ee44",
			"#44cc44",
			"#4444cc",
			"#2222aa",
			"#000099",
			"#aa0000",
			"#000000",
			"#000000",
		];
		let text_color = "#ffffff";

		this.background_fillStyle = "black";

		this.stack = new StackContainer("down");
		this.setChild(this.stack);

		this.title = new Label(_("Settings"));
		this.title.margin.setMargin(30);
		this.title.background_fillStyle = colors[0];
		this.title.text_fillStyle = text_color;
		this.stack.appendChild(this.title, 0.20);

		let index = 1;

		let languages = [
			{ id: "en", name: "English", description: "" },
			{ id: "sv", name: "Svenska", description: "" }
		];

		for (let language of languages) {
			let checkbox = new Checkbox();
			checkbox.checked = MusicTrainerState.language == language.id;
			let menu = new MenuOption(language.name, language.description, checkbox);
			menu.background_fillStyle = colors[index + 1];
			menu.content_fillStyle = colors[index];
			menu.border_fillStyle = colors[index];
			menu.content_text_color = text_color;
			menu.addEventListener("click", () => {
				MusicTrainerState.language = language.id;
				MusicTrainerState.persist();
				language_set(language.id);
				/* Ugly to create a new settings view. Should update existing
				   controls. Back button animation will glitch a little as well. */
				this.getRoot().setChild(new Settings());
			});
			this.stack.appendChild(menu, 0.1);
			index += 1;
		}

		let instruments = [
			{ id: "notes", name: _("Notes"), description: _("Learn the notes names") },
			{ id: "piano", name: _("Piano"), description: _("Key placement") },
			{ id: "violin", name: _("Violin"), description: _("Where to push string") }
		];

		for (let instrument of instruments) {
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
				this.getRoot().setChild(new Settings());
			});
			this.stack.appendChild(menu, 0.1);
			index += 1;
		}

		let menu = new MenuOption(_("!! Restart !!"), _("Your progress will be lost"), new Label(""));
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

		menu = new MenuOption(_("Back"), _("To the main menu"), new ImageBack());
		menu.background_fillStyle = colors[index + 1];
		menu.content_fillStyle = colors[index];
		menu.border_fillStyle = colors[index];
		menu.content_text_color = text_color;
		menu.addEventListener("click", () => {
			this.getRoot().setChild(new MainMenu());
		});
		this.stack.appendChild(menu, 0.14);
	}
}
