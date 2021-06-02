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

		let margin = 3;

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
		this.button_train.addEventListener("click", () => {
			this.getRoot().setChild(new MusicTrainer(this));
		});
		this.stack.appendChild(this.button_train, 0.10);

		this.button_excercises = new Button("Övningar");
		this.button_excercises.margin.setMargin(margin);
		this.button_excercises.addEventListener("click", () => {
			this.getRoot().setChild(new Excercises(this));
		});
		this.stack.appendChild(this.button_excercises, 0.10);

		this.button_options = new Button("Inställningar");
		this.button_options.margin.setMargin(margin);
		this.button_options.addEventListener("click", () => {
			this.getRoot().setChild(new Settings(this));
		});
		this.stack.appendChild(this.button_options, 0.10);

		this.button_help = new Button("Hjälp");
		this.button_help.margin.setMargin(margin);
		this.stack.appendChild(this.button_help, 0.10);
	}
}
