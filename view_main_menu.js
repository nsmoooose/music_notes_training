import {
	AspectRatioControlContainer,
	Button,
	Label,
	Rectangle,
	StackContainer
} from "./base.js";
import { Settings } from "./view_settings.js";

import {
    MusicTrainer
} from "./view_training.js";

export class MainMenu extends AspectRatioControlContainer {
    constructor() {
        super(2);

        this.stack = new StackContainer(new Rectangle(), "down");
        this.setChild(this.stack);

        this.title = new Label(new Rectangle(), "Not träning");
        this.title.margin.setMargin(10);
        this.stack.appendChild(this.title, 0.10);

        this.button_train = new Button(new Rectangle(), "Fortsätt träna");
        this.button_train.margin.setMargin(10);
        this.button_train.addEventListener("click", () => {
            this.getRoot().setChild(new MusicTrainer(this));
        });
        this.stack.appendChild(this.button_train, 0.10);

        this.button_options = new Button(new Rectangle(), "Inställningar");
        this.button_options.margin.setMargin(10);
        this.button_options.addEventListener("click", () => {
            this.getRoot().setChild(new Settings(this));
        });
        this.stack.appendChild(this.button_options, 0.10);

        this.button_help = new Button(new Rectangle(), "Hjälp");
        this.button_help.margin.setMargin(10);
        this.stack.appendChild(this.button_help, 0.10);
    }
}
