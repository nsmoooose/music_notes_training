import {
	color_ramp,
	Label,
	MenuView
} from "./base.mjs";
import { ImageBack } from "./images.mjs";
import { g_excercises } from "./questions.mjs";
import { ExcerciseLevels } from "./view_levels.mjs";
import { _ } from "./translation.mjs";

export class Excercises extends MenuView {
	constructor(back) {
		super();
		this.back = back;

		this.colors = color_ramp("#66ee66", "#006600", 8);
		this.colors[g_excercises.length + 1] = "black";
		this.colors[g_excercises.length + 2] = "black";

		this.add_view_title(_("Exercises"));

		for(let excercise of g_excercises) {
			this.add_view_menuitem(excercise.name, excercise.description, new Label(""), () => {
				this.getRoot().setChild(new ExcerciseLevels(this, excercise));
			});
		}

		this.add_view_menuitem(_("Back"), _("To the main menu"), new ImageBack(), () => {
			this.getRoot().setChild(this.back);
		});
	}
}
