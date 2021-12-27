import { _ } from "./translation.mjs";
import { ImageBack } from "./images.mjs";
import {
	color_ramp,
	Label,
	MenuView
} from "./base.mjs";
import { Scales } from "./scale.mjs";

export class ScaleMenu extends MenuView {
	constructor(back, cb_accept) {
		super();

		this.back = back;
		this.cb_accept = cb_accept;

		let scales = Object.values(Scales);

		this.colors = color_ramp("#66ee66", "#006600", scales.length + 1);
		this.colors[scales.length + 1] = "black";
		this.colors[scales.length + 2] = "black";

		this.add_view_title(_("Select scale"));
		this.calc_menuitem_size(scales.length + 1);

		for (let scale of Object.values(Scales)) {
			this.add_view_menuitem(_(scale.name), scale.id, new Label(""), () => {
				cb_accept(scale);
			});
		}

		this.add_view_menuitem(_("Back"), _("To the main menu"), new ImageBack(), () => {
			this.getRoot().setChild(this.back);
		});
	}
}
