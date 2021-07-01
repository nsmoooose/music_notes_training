import {
	AspectRatioControlContainer,
	Label,
	LevelProgress,
	MenuOption,
	StackContainer
} from "./base.mjs";
import { ImageBack } from "./images.mjs";
import { g_excercises } from "./questions.mjs";
import { MusicTrainerState } from "./state.mjs";
import { MusicTrainer } from "./view_training.mjs";

export class ExcerciseLevels extends AspectRatioControlContainer {
	constructor(back, excercise) {
		super(2);

		MusicTrainerState.load();

		this.back = back;

		let colors = [
			"#6666ee",
			"#4444cc",
			"#2222aa",
			"#000099",
			"#000088",
			"#000077",
			"#000066",
			"#000055",
			"#000044",
		];
		let text_color = "#ffffff";

		this.background_fillStyle = "black";

		this.stack = new StackContainer("down");
		this.setChild(this.stack);

		this.title = new Label("Övningar");
		this.title.margin.setMargin(30);
		this.title.background_fillStyle = colors[0];
		this.title.text_fillStyle = text_color;
		this.stack.appendChild(this.title, 0.20);

		colors[excercise.levels.length + 1] = "black";
		colors[excercise.levels.length + 2] = "black";

		let index = 1;
		for(let level of excercise.levels) {
			let results = level.id in MusicTrainerState.results ? MusicTrainerState.results[level.id].answers : 0;
			let pass = level.id in MusicTrainerState.results ? MusicTrainerState.results[level.id].pass : 0;
			let menu = new MenuOption(level.name, excercise.description, new LevelProgress(results, pass));
			menu.background_fillStyle = colors[index + 1];
			menu.content_fillStyle = colors[index];
			menu.border_fillStyle = colors[index];
			menu.content_text_color = text_color;

			menu.addEventListener("click", () => {
				MusicTrainerState.excercise = g_excercises.indexOf(excercise) + 1;
				MusicTrainerState.level = excercise.levels.indexOf(level) + 1;
				MusicTrainerState.persist();
				this.getRoot().setChild(new MusicTrainer(this));
			});
			this.stack.appendChild(menu, (1.0 - 0.20 - 0.14) / excercise.levels.length);
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
