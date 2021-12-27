import {
	Label,
	MenuView,
} from "./base.mjs";
import {
	ImageHelp,
	ImageSettings
} from "./images.mjs";
import { _ } from "./translation.mjs";
import { Excercises } from "./view_excercises.mjs";
import { Notes } from "./view_notes.mjs";
import { Settings } from "./view_settings.mjs";
import { MusicTrainer } from "./view_training.mjs";
import { SongsMenu } from "./view_songs.mjs";
import { ScaleMenu } from "./view_scale.mjs";

export class MainMenu extends MenuView {
	constructor() {
		super();

		this.colors = [
			"#ffaaaa",
			"#ff8888",
			"#ee6666",
			"#cc4444",
			"#aa2222",
			"#880000",
			"#660000",
		];

		this.add_view_title(_("Note training"));
		this.calc_menuitem_size(6);

		this.add_view_menuitem(_("Train"), _("Continue where you left"), new Label(""), () => {
			this.getRoot().setChild(new MusicTrainer());
		});
		this.add_view_menuitem(_("Exercises"), _("Notes, F#, Bb"), new Label(""), () => {
			this.getRoot().setChild(new Excercises(this));
		});
		this.add_view_menuitem(_("Notes"), _("Plain notes with MIDI feedback"), new Label(""), () => {
			this.getRoot().setChild(new ScaleMenu(this, (scale) => {
				this.getRoot().setChild(new Notes(scale));
			}))
		});
		this.add_view_menuitem(_("Songs"), _("Songs with MIDI feedback"), new Label(""), () => {
			this.getRoot().setChild(new SongsMenu(this));
		});
		this.add_view_menuitem(_("Settings"), _("Language and instrument"), new ImageSettings(), () => {
			this.getRoot().setChild(new Settings(this));
		});
		this.add_view_menuitem(_("Help"), _("Questions and answers are here"), new ImageHelp(), () => {
			window.location = "help-sv.html";
		});
	}
}
