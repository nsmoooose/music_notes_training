import {
	AspectRatioControlContainer,
	Label,
	MenuOption,
	StackContainer
} from "./base.mjs";
import {
	ImageHelp,
	ImageSettings
} from "./images.mjs";
import { Excercises } from "./view_excercises.mjs";
import { Settings } from "./view_settings.mjs";

import {
	MusicTrainer
} from "./view_training.mjs";

export class MainMenu extends AspectRatioControlContainer {
	constructor() {
		super(2);

		let color0 = "#ffaaaa";
		let color1 = "#ff8888";
		let color2 = "#ee6666";
		let color3 = "#cc4444";
		let color4 = "#aa2222";
		let text_color = "#ffffff"

		this.background_fillStyle = "black";

		this.stack = new StackContainer("down");
		this.setChild(this.stack);

		this.title = new Label("Not träning");
		this.title.margin.setMargin(30);
		this.title.background_fillStyle = color0;
		this.title.text_fillStyle = "white";
		this.stack.appendChild(this.title, 0.20);

		this.button_train = new MenuOption("Träna", "Fortsätt där du slutade", new Label(""));
		this.button_train.background_fillStyle = color2;
		this.button_train.content_fillStyle = color1;
		this.button_train.border_fillStyle = color1;
		this.button_train.content_text_color = text_color;
		this.button_train.addEventListener("click", () => {
			this.getRoot().setChild(new MusicTrainer(this));
		});
		this.stack.appendChild(this.button_train, 0.14);

		this.button_excercises = new MenuOption("Övningar", "Noter, Fiss, Bess", new Label(""));
		this.button_excercises.background_fillStyle = color3;
		this.button_excercises.content_fillStyle = color2;
		this.button_excercises.border_fillStyle = color2;
		this.button_excercises.content_text_color = text_color;
		this.button_excercises.addEventListener("click", () => {
			this.getRoot().setChild(new Excercises(this));
		});
		this.stack.appendChild(this.button_excercises, 0.14);

		this.button_options = new MenuOption("Inställningar", "Språk och instrument", new ImageSettings());
		this.button_options.background_fillStyle = color4;
		this.button_options.content_fillStyle = color3;
		this.button_options.border_fillStyle = color3;
		this.button_options.content_text_color = text_color;
		this.button_options.addEventListener("click", () => {
			this.getRoot().setChild(new Settings(this));
		});
		this.stack.appendChild(this.button_options, 0.14);

		this.button_help = new MenuOption("Hjälp", "Frågor och svar hittar du här", new ImageHelp());
		this.button_help.background_fillStyle = "black";
		this.button_help.content_fillStyle = color4;
		this.button_help.border_fillStyle = color4;
		this.button_help.content_text_color = text_color;
		this.stack.appendChild(this.button_help, 0.14);
	}
}
