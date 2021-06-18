import {
	AspectRatioControlContainer,
	Button,
	Label,
	MenuOption,
	StackContainer
} from "./base.mjs";
import { ImageBack } from "./images.mjs";
import { g_excercises } from "./questions.mjs";
import { ExcerciseLevels } from "./view_levels.mjs";

export class Excercises extends AspectRatioControlContainer {
	constructor(back) {
		super(2);

		this.back = back;

		let colors = [
			"#66ee66",
			"#44cc44",
			"#22aa22",
			"#008800",
			"#006600",
			"black"
		];
		let text_color = "#ffffff"

		this.background_fillStyle = "black";

		this.stack = new StackContainer("down");
		this.setChild(this.stack);

		this.title = new Label("Övningar");
		this.title.margin.setMargin(30);
		this.title.background_fillStyle = colors[0];
		this.title.text_fillStyle = "white";
		this.stack.appendChild(this.title, 0.20);

		let index = 1;
		for(let excercise of g_excercises) {
			let menu = new MenuOption(excercise.name, excercise.description, new Label(""));
			menu.background_fillStyle = colors[index + 1];
			menu.content_fillStyle = colors[index];
			menu.border_fillStyle = colors[index];
			menu.content_text_color = text_color;
			menu.addEventListener("click", () => {
				this.getRoot().setChild(new ExcerciseLevels(this, excercise));
			});
			this.stack.appendChild(menu, 0.14);
			index += 1;
		}

		let menu = new MenuOption("Tillbaka", "Till huvudmenyn", new ImageBack());
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
