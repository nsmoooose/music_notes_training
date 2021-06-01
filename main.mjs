import {
	$,
	Button,
	Label,
	Root
} from "./base.mjs";
import { MainMenu } from "./view_main_menu.mjs";
import { InstrumentPiano } from "./instrument_piano.mjs";
import { InstrumentNotes } from "./instrument_notes.mjs";
import { Staff } from "./staff.mjs";

/* Níce but slow on mobile.
 "drop-shadow(9px 9px 3px #aaa)" 
 */
const filter = null;

Label.filter = filter;
Button.filter = filter;
InstrumentPiano.filter = filter;
Staff.filter = filter;

let g_root = new Root();
g_root.setChild(new MainMenu());

function step(ts) {
	let delta = ts / 1000 - g_root.state.now;
	g_root.state.now = ts / 1000;

	let canvas = $("canvas");

	let ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	g_root.update(delta);
	g_root.draw(ctx);
	window.requestAnimationFrame(step);
}

window.addEventListener("load", () => {
	if ("serviceWorker" in navigator) {
		navigator
			.serviceWorker.register("service_worker.js")
			.then(res => console.log("service worker registered"))
			.catch(err => console.log("service worker not registered", err));
	}

	let canvas = $("canvas");

	canvas.addEventListener("click", (event) => {
		const rect = canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		if(g_root.rectangle.contains(x, y)) {
			g_root.on_click(x, y);
		}
	});

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	window.addEventListener("resize", (event) => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		g_root.resize(canvas.width, canvas.height);
	});

	g_root.resize(canvas.width, canvas.height);

	window.requestAnimationFrame(step);
});
