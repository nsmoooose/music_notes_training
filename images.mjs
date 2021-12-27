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
		for (let i = 0; i < segments; i++) {
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

export class ImageBack extends Widget {
	constructor() {
		super();
		this.position = 0;
	}

	update(delta) {
		this.position -= delta * 8;
	}

	draw(ctx) {
		let rectangle = this.margin.getRectangle(this.rectangle);
		if (this.position < rectangle.x || this.position > rectangle.x + rectangle.w) {
			this.position = rectangle.x + rectangle.w;
		}

		ctx.globalAlpha = 0.3;
		ctx.beginPath();
		ctx.strokeStyle = "#ffffff";
		ctx.lineWidth = rectangle.h / 10;
		ctx.lineTo(this.position, rectangle.y);
		ctx.lineTo(this.position - rectangle.h / 3, rectangle.y + rectangle.h / 2);
		ctx.lineTo(this.position, rectangle.y + rectangle.h);
		ctx.stroke();
		ctx.globalAlpha = 1.0;
	}
}

export class ImageHelp extends Widget {
	constructor() {
		super();
		this.change = 0;
	}

	update(delta) {
		this.change += delta;
	}

	draw(ctx) {
		let rectangle = this.margin.getRectangle(this.rectangle);

		let q = rectangle.h / 4;
		let xd = q * Math.sin(this.change);
		let c = rectangle.w / 2;

		ctx.globalAlpha = 0.3;
		ctx.beginPath();
		ctx.strokeStyle = "#ffffff";
		ctx.lineWidth = rectangle.h / 10;
		ctx.moveTo(rectangle.x + c - xd, rectangle.y + q);
		ctx.bezierCurveTo(
			rectangle.x + c - xd, rectangle.y,
			rectangle.x + c + xd, rectangle.y,
			rectangle.x + c + xd, rectangle.y + q);
		ctx.bezierCurveTo(
			rectangle.x + c + xd, rectangle.y + q * 2,
			rectangle.x + c, rectangle.y + q * 2,
			rectangle.x + c, rectangle.y + q * 3);
		ctx.stroke();

		ctx.beginPath();
		ctx.fillStyle = ctx.strokeStyle;
		ctx.arc(rectangle.x + c, rectangle.y + rectangle.h, rectangle.h / 15, 0, 2 * Math.PI);
		ctx.fill();

		ctx.globalAlpha = 1.0;
	}
}

export class MidiSupported extends Widget {
	constructor() {
		super();
		this.connected = false;
	}

	draw(ctx) {
		if (!navigator.requestMIDIAccess) {
			return;
		}

		let rectangle = this.margin.getRectangle(this.rectangle);

		ctx.font = rectangle.h + "px Arial";
		let x = (rectangle.x + rectangle.w / 2) | 0;
		let y = (rectangle.y + rectangle.h / 2) | 0;
		ctx.fillStyle = this.connected == true ? "#0b0" : "#ccc";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText("MIDI", x, y);
	}
}

export class Checkbox extends Widget {
	constructor() {
		super();
		this.checked = false;
	}

	draw(ctx) {
		super.draw(ctx);

		let rectangle = this.margin.getRectangle(this.rectangle);
		rectangle.w = rectangle.h = Math.min(rectangle.w, rectangle.h);
		ctx.beginPath();
		ctx.lineWidth = rectangle.w * 0.1;
		ctx.strokeStyle = "#aaaaaa";
		ctx.rect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
		ctx.stroke();

		if (this.checked) {
			let points = [
				[rectangle.x, (rectangle.y + rectangle.h / 2) | 0],
				[(rectangle.x + rectangle.w / 2) | 0, rectangle.y + rectangle.h],
				[rectangle.x + rectangle.w, rectangle.y]
			];
			ctx.beginPath();
			ctx.lineWidth = rectangle.w * 0.15;
			ctx.strokeStyle = "#ffffff";
			ctx.moveTo(points[0][0], points[0][1]);
			ctx.lineTo(points[1][0], points[1][1]);
			ctx.lineTo(points[2][0], points[2][1]);
			ctx.stroke();
		}
	}
}
