import {
	$,
    Root
} from "./base.js";
import { MainMenu } from "./view_main_menu.js";

let g_root = new Root();
g_root.setChild(new MainMenu());

window.addEventListener("load", () => {
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

	window.setInterval(() => {
		let ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let step = g_root.state.step();
		g_root.update(step);
		g_root.draw(ctx);
	}, 100);
});
