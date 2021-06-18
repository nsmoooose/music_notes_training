import { Widget } from "./base.mjs";

export class ImageSettings extends Widget {
	constructor() {
		super();
		this.start_angle = 0;
	}

	update(delta) {
		this.start_angle += delta * 0.1;
	}

	draw(ctx) {
		super.draw(ctx);

		ctx.globalAlpha = 0.3;

		let rectangle = this.margin.getRectangle(this.rectangle);

		let cx = rectangle.w / 2 + rectangle.x;
		let cy = rectangle.h / 2 + rectangle.y;

		let r = Math.min(rectangle.w, rectangle.h) / 2;
		let r2 = r * 0.8;
		let r3 = r * 0.4;
		ctx.beginPath();
		ctx.lineWidth = Math.min(rectangle.w, rectangle.h) * 0.02;
		ctx.strokeStyle = "#ffffff";

		let segments = 22;
		let segment_angle = Math.PI * 2 / segments;
		for(let i = 0; i < segments; i++) {
			let v = this.start_angle + i * segment_angle;
			let v_sin = Math.sin(v);
			let v_cos = Math.cos(v);
			let x = v_sin * r + cx;
			let y = v_cos * r + cy;
			ctx.lineTo(x, y);

			x = v_sin * r2 + cx;
			y = v_cos * r2 + cy;
			ctx.lineTo(x, y);

			i++;
			v = this.start_angle + i * segment_angle;
			v_sin = Math.sin(v);
			v_cos = Math.cos(v);
			x = v_sin * r2 + cx;
			y = v_cos * r2 + cy;
			ctx.lineTo(x, y);

			x = v_sin * r + cx;
			y = v_cos * r + cy;
			ctx.lineTo(x, y);
		}
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		ctx.beginPath();
		ctx.arc(cx, cy, r3, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();

		ctx.globalAlpha = 1.0;
	}
}
