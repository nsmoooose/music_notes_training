import {
	$,
	Root
} from "./base.mjs";
import { MusicTrainerState } from "./state.mjs";
import { language_set } from "./translation.mjs";
import { MainMenu } from "./view_main_menu.mjs";

export let g_root = null;
let lock = null;

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
	MusicTrainerState.load();
	language_set(MusicTrainerState.language);

	g_root = new Root();
	g_root.setChild(new MainMenu());

	if ("serviceWorker" in navigator) {
		navigator
			.serviceWorker.register("service_worker.js")
			.then(() => console.log("service worker registered"))
			.catch(err => console.log("service worker not registered", err));
	}

	if ("wakeLock" in navigator) {
		navigator.wakeLock.request("screen").then(v => {
			lock = v;
			console.log("wakeLock aquired");
		}).catch((err) => {
			/* This is a common error when running page from inside Visual Studio Code:
			 DOMException: Failed to execute 'request' on 'WakeLock': Access to
			 Screen Wake Lock features is disallowed by permissions policy
			 at http://127.0.0.1:3000/main.mjs:40:22 */
			console.log("service worker failed to aquire wakeLock");
		});
	}

	let canvas = $("canvas");

	canvas.addEventListener("click", (event) => {
		const rect = canvas.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		if (g_root.rectangle.contains(x, y)) {
			g_root.on_click(x, y);
		}
	});

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	window.addEventListener("resize", () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		g_root.resize(canvas.width, canvas.height);
	});

	g_root.resize(canvas.width, canvas.height);

	window.requestAnimationFrame(step);
});
