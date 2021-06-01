import {
	AspectRatioControlContainer,
	Button,
	Label,
	StackContainer
} from "./base.mjs";
import { g_excercises } from "./questions.mjs";
import { ExcerciseLevels } from "./view_levels.mjs";

export class Excercises extends AspectRatioControlContainer {
	constructor(back) {
		super(2);

		this.back = back;

		this.stack = new StackContainer("down");
		this.setChild(this.stack);

		this.title = new Label("Övningar");
		this.title.margin.setMargin(10);
		this.stack.appendChild(this.title, 0.10);

		let x = 0;
		let stack = null;
		for(let excercise of g_excercises) {
			if(x == 2) {
				x = 0;
			}
			if(x == 0) {
				stack = new StackContainer("right");
				stack.margin.left = 10;
				this.stack.appendChild(stack, 0.1);
			}

			let button = new Button(excercise.name);
			button.font = "30px Arial";
			if(x == 0) {
				button.margin.right = 5;
			} else {
				button.margin.left = 5;
			}
			button.margin.bottom = 10;
			button.addEventListener("click", () => {
				this.getRoot().setChild(new ExcerciseLevels(this, excercise));
			});
			stack.appendChild(button, 0.5);
			x++;
		}

		this.button_back = new Button("< Tillbaka");
		this.button_back.margin.setMargin(10);
		this.button_back.addEventListener("click", () => {
			this.getRoot().setChild(this.back);
		});
		this.stack.appendChild(this.button_back, 0.10);
	}
}
