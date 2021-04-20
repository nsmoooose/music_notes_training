export function $(id) {
	return document.getElementById(id);
}

export class EventTarget {
	constructor() {
		this.listeners = {};
	}

	addEventListener(type, callback) {
		if (!(type in this.listeners)) {
			this.listeners[type] = [];
		}
		this.listeners[type].push(callback);
	}

	removeEventListener(type, callback) {
		if (!(type in this.listeners)) {
			return;
		}
		var stack = this.listeners[type];
		for (var i = 0, l = stack.length; i < l; i++) {
			if (stack[i] === callback){
				stack.splice(i, 1);
				return;
			}
		}
	}

	dispatchEvent(type, event) {
		if (!(type in this.listeners)) {
			return true;
		}
		var stack = this.listeners[type].slice();
		for (var i = 0, l = stack.length; i < l; i++) {
			stack[i].call(this, event);
		}
	}
}

export class Widget extends EventTarget {
	constructor(rectangle) {
		super();
		this.parent = null;
		this.rectangle = rectangle;
		this.visible = true;
	}

	getRoot() {
		if(this.parent == null) {
			return this;
		}
		return this.parent.getRoot();
	}

	resize(width, height) {
		this.rectangle.w = width;
		this.rectangle.h = height;
	}

	move(x, y) {
		this.rectangle.x = x;
		this.rectangle.y = y;
	}

	update(delta) {
	}
}

export class Container extends Widget {
	constructor(rectangle) {
		super(rectangle);
		this.children = [];
	}

	appendChild(child) {
		this.children.push(child);
		child.parent = this;
	}

	removeChildByValue(child) {
		let i = this.children.indexOf(child);
		this.children.splice(i, 1);
		child.parent = null;
	}

	draw(ctx) {
		for (const widget of this.children) {
			if(widget.visible == false) {
				continue;
			}
			widget.draw(ctx);
		}
	}

	update(delta) {
		for (const widget of this.children) {
			widget.update(delta);
		}
	}

	on_click(x, y) {
		for (const widget of this.children) {
			if(widget.visible == true && widget.rectangle.contains(x, y)) {
				widget.dispatchEvent("click", null);
			}
		}
	}
}

export class Rectangle {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	contains(x, y) {
		return this.x <= x && x <= this.x + this.w &&
               this.y <= y && y <= this.y + this.h;
	}
}

export class Label extends Widget {
	constructor(rectangle, text) {
		super(rectangle);
		this.text = text;

		this.font = "30px Arial";
		this.textAlign = "center";
		this.textBaseline = "middle";
		this.fillStyle = "#000000";
	}

	draw(ctx) {
		ctx.lineWidth = 1;
		ctx.font = this.font;
		ctx.textAlign = this.textAlign;
		ctx.textBaseline = this.textBaseline;
		ctx.fillStyle = this.fillStyle;
		let x = this.rectangle.x;
		if(this.textAlign == "center") {
			x = this.rectangle.x + this.rectangle.w / 2;
		} else if(this.textAlign == "right") {
			x = this.rectangle.x + this.rectangle.w;
		}

		let y = this.rectangle.y;
		if(this.textBaseline == "middle") {
			y = this.rectangle.y + this.rectangle.h / 2;
		} else if(this.textBaseline == "bottom") {
			y = this.rectangle.y + this.rectangle.h;
		}

		ctx.fillText(this.text, x, y);
	}
}

export class Button extends Widget {
	constructor(rectangle, text) {
		super(rectangle);
		this.text = text;
	}

	draw(ctx) {
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 1;
		ctx.fillStyle = "#ccc";
		this.roundRect(ctx, this.rectangle.x, this.rectangle.y, this.rectangle.w, this.rectangle.h, 5, true);
		ctx.font = "30px Arial";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "#000000";
		ctx.fillText(this.text,
			this.rectangle.x + this.rectangle.w / 2,
			this.rectangle.y + this.rectangle.h / 2);
	}

	click(x, y) {
		if(this.rectangle.contains(x, y)) {
			this.dispatchEvent("click", null);
		}
	}

	roundRect(ctx, x, y, width, height, radius, fill) {
		if (typeof radius === "number") {
			radius = {tl: radius, tr: radius, br: radius, bl: radius};
		} else {
			var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
			for (var side in defaultRadius) {
				radius[side] = radius[side] || defaultRadius[side];
			}
		}
		ctx.beginPath();
		ctx.moveTo(x + radius.tl, y);
		ctx.lineTo(x + width - radius.tr, y);
		ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
		ctx.lineTo(x + width, y + height - radius.br);
		ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
		ctx.lineTo(x + radius.bl, y + height);
		ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
		ctx.lineTo(x, y + radius.tl);
		ctx.quadraticCurveTo(x, y, x + radius.tl, y);
		ctx.closePath();
		if (fill) {
			ctx.fill();
		}
		ctx.stroke();
	}
}

export class OptionsButton extends Button {
	draw(ctx) {
		let cx = this.rectangle.w / 2 + this.rectangle.x;
		let cy = this.rectangle.h / 2 + this.rectangle.y;

		let r = Math.min(this.rectangle.w, this.rectangle.h) / 2;
		let r2 = r * 0.8;
		let r3 = r * 0.4;
		ctx.beginPath();
		ctx.lineWidth = Math.min(this.rectangle.w, this.rectangle.h) * 0.02;
		ctx.strokeStyle = "#aaaaaa";
		ctx.fillStyle = "#aaaaaa";

		let segments = 22;
		let segment_angle = Math.PI * 2 / segments;
		for(let i = 0; i < segments; i++) {
			let x = Math.sin(i * segment_angle) * r + cx;
			let y = Math.cos(i * segment_angle) * r + cy;
			ctx.lineTo(x, y);

			x = Math.sin(i * segment_angle) * r2 + cx;
			y = Math.cos(i * segment_angle) * r2 + cy;
			ctx.lineTo(x, y);

			i++;
			x = Math.sin(i * segment_angle) * r2 + cx;
			y = Math.cos(i * segment_angle) * r2 + cy;
			ctx.lineTo(x, y);

			x = Math.sin(i * segment_angle) * r + cx;
			y = Math.cos(i * segment_angle) * r + cy;
			ctx.lineTo(x, y);
		}
		ctx.closePath();
		ctx.stroke();
		ctx.fill();

		ctx.beginPath();
		ctx.arc(cx, cy, r3, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fillStyle = "white";
		ctx.fill();
	}
}
