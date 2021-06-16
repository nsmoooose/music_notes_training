import {
	AspectRatioControlContainer,
	Button,
	Label,
	StackContainer
} from "./base.mjs";
import { Excercises } from "./view_excercises.mjs";
import { Settings } from "./view_settings.mjs";

import {
	MusicTrainer
} from "./view_training.mjs";

export class MainMenu extends AspectRatioControlContainer {
	constructor() {
		super(2);

		let margin = 0;
		let radius = {tl: 0, tr: 0, bl: 80, br: 0};

		let color1 = "#ff8888";
		let color2 = "#ee6666";
		let color3 = "#cc4444";
		let color4 = "#aa2222";
		let text_color = "#ffffff"

		this.background_fillStyle = "black";

		this.stack = new StackContainer("down");
		this.setChild(this.stack);

		this.title = new Label("Not träning");
		this.title.margin.setMargin(margin);
		this.title.background_fillStyle = "black";
		this.title.text_fillStyle = "white";
		this.stack.appendChild(this.title, 0.10);

		this.button_train = new Button("Fortsätt träna");
		this.button_train.margin.setMargin(margin);
		this.button_train.background_fillStyle = color2;
		this.button_train.button_color = color1;
		this.button_train.border_color = color1;
		this.button_train.text_color = text_color;
		this.button_train.border_radius = radius;
		this.button_train.addEventListener("click", () => {
			this.getRoot().setChild(new MusicTrainer(this));
		});
		this.stack.appendChild(this.button_train, 0.10);

		this.button_excercises = new Button("Övningar");
		this.button_excercises.margin.setMargin(margin);
		this.button_excercises.background_fillStyle = color3;
		this.button_excercises.button_color = color2;
		this.button_excercises.border_color = color2;
		this.button_excercises.text_color = text_color;
		this.button_excercises.border_radius = radius;
		this.button_excercises.addEventListener("click", () => {
			this.getRoot().setChild(new Excercises(this));
		});
		this.stack.appendChild(this.button_excercises, 0.10);

		this.button_options = new Button("Inställningar");
		this.button_options.margin.setMargin(margin);
		this.button_options.background_fillStyle = color4;
		this.button_options.button_color = color3;
		this.button_options.border_color = color3;
		this.button_options.text_color = text_color;
		this.button_options.border_radius = radius;
		this.button_options.addEventListener("click", () => {
			this.getRoot().setChild(new Settings(this));
		});
		this.stack.appendChild(this.button_options, 0.10);

		this.button_help = new Button("Hjälp");
		this.button_help.margin.setMargin(margin);
		this.button_help.background_fillStyle = "black";
		this.button_help.button_color = color4;
		this.button_help.border_color = color4;
		this.button_help.text_color = text_color;
		this.button_help.border_radius = radius;
		this.stack.appendChild(this.button_help, 0.10);
	}
}
