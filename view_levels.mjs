import { color_ramp } from "./base.mjs";
import {
	LevelProgress,
	MenuOption,
	MenuView
} from "./base.mjs";
import { ImageBack } from "./images.mjs";
import { g_excercises } from "./questions.mjs";
import { MusicTrainerState } from "./state.mjs";
import { MusicTrainer } from "./view_training.mjs";
import { _ } from "./translation.mjs";

export class ExcerciseLevels extends MenuView {
	constructor(back, excercise) {
		super(2);
		this.back = back;

		this.colors = color_ramp("#6666ee", "#000044", 16);
		this.colors[excercise.levels.length + 1] = "black";
		this.colors[excercise.levels.length + 2] = "black";

		this.add_view_title(_("Levels"));

		this.calc_menuitem_size(excercise.levels.length + 1);

		for(let level of excercise.levels) {
			let results = level.id in MusicTrainerState.results ? MusicTrainerState.results[level.id].answers : 0;
			let pass = level.id in MusicTrainerState.results ? MusicTrainerState.results[level.id].pass : 0;
			this.add_view_menuitem(level.name, excercise.description, new LevelProgress(results, pass), () => {
				MusicTrainerState.excercise = g_excercises.indexOf(excercise) + 1;
				MusicTrainerState.level = excercise.levels.indexOf(level) + 1;
				MusicTrainerState.persist();
				this.getRoot().setChild(new MusicTrainer());
			});
		}

		this.add_view_menuitem(_("Back"), _("To the main menu"), new ImageBack(), () => {
			this.getRoot().setChild(this.back);
		});
	}
}
