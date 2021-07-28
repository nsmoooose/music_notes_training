import { color_ramp } from "./base.mjs";
import {
	AspectRatioControlContainer,
	Label,
	MenuOption,
	StackContainer
} from "./base.mjs";
import { ImageBack } from "./images.mjs";
import { g_excercises } from "./questions.mjs";
import { ExcerciseLevels } from "./view_levels.mjs";
import { _ } from "./translation.mjs";

export class Excercises extends AspectRatioControlContainer {
	constructor(back) {
		super(2);

		this.back = back;

		let colors = color_ramp("#66ee66", "#006600", 8);
		let text_color = "#ffffff";

		this.background_fillStyle = "black";

		this.stack = new StackContainer("down");
		this.setChild(this.stack);

		this.title = new Label(_("Exercises"));
		this.title.margin.setMargin(30);
		this.title.background_fillStyle = colors[0];
		this.title.text_fillStyle = text_color;
		this.stack.appendChild(this.title, 0.20);

		colors[g_excercises.length + 1] = "black";
		colors[g_excercises.length + 2] = "black";

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

		let menu = new MenuOption(_("Back"), _("To the main menu"), new ImageBack());
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
