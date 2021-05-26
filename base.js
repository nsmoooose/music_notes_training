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
	constructor() {
		super();
		this.parent = null;
		this.rectangle = new Rectangle();
		this.margin = new Margin(0, 0, 0, 0);
		this.visible = true;

		this.background_fillStyle = null;
	}

	draw(ctx) {
		if(this.background_fillStyle != null) {
			ctx.fillStyle = this.background_fillStyle;
			ctx.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.w, this.rectangle.h);
		}
	}

	getRoot() {
		if(this.parent == null) {
			return this;
		}
		return this.parent.getRoot();
	}

	getState() {
		return this.getRoot().state;
	}

	setState(state) {
		this.getRoot().state = state;
	}

	resize(width, height) {
		this.rectangle.w = width;
		this.rectangle.h = height;
	}

	move(x, y) {
		this.rectangle.x = x;
		this.rectangle.y = y;
	}

	update(/* delta */) {}

	on_click(x, y) {
		if(this.visible == true && this.rectangle.contains(x, y)) {
			this.dispatchEvent("click", null);
		}
	}
}

export class SingleControlContainer extends Widget {
	constructor() {
		super();
		this.child = null;
	}

	draw(ctx) {
		super.draw(ctx);
		if(this.child && this.child.visible) {
			this.child.draw(ctx);
		}
	}

	resize(width, height) {
		super.resize(width, height);
		if(this.child) {
			this.child.resize(width, height);
		}
	}

	setChild(child) {
		this.child = child;
		child.parent = this;
		child.resize(this.rectangle.w, this.rectangle.h);
	}

	on_click(x, y) {
		if(this.child) {
			this.child.on_click(x, y);
		}
	}

	update(delta) {
		if(this.child) {
			this.child.update(delta);
		}
	}
}

export class State {
	constructor() {
		this.now = 0;
	}
}

export class Root extends SingleControlContainer {
	constructor() {
		super();
		this.state = new State();
	}
}

export class AspectRatioControlContainer extends SingleControlContainer {
	/*
	ratio = positive ratio means that the containing control will be
		    higher than wider. A ratio of 1 means that width is equal
			to the height.
	*/
	constructor(ratio) {
		super();
		this.ratio = ratio;
	}

	resize(width, height) {
		super.resize(width, height);
		if(this.child) {
			if(width * this.ratio <= height) {
				this.child.resize(width, width * this.ratio);
			} else {
				this.child.rectangle.x = this.rectangle.x + (width - (height / this.ratio)) / 2;
				this.child.rectangle.y = this.rectangle.y;
				this.child.resize(height / this.ratio, height);
			}
		}
	}
}

export class Container extends Widget {
	constructor() {
		super();
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
		super.draw(ctx);
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
			widget.on_click(x, y);
		}
	}
}

export class StackContainer extends Container {
	constructor(direction) {
		super();
		this.direction = direction;
	}

	appendChild(child, amount) {
		super.appendChild(child);
		child.stackAmount = amount;
	}

	resize(width, height) {
		super.resize(width, height);

		let rectangle = this.margin.getRectangle(this.rectangle);

		if(this.direction == "down") {
			let y = rectangle.y;

			for(let widget of this.children) {
				widget.rectangle.x = rectangle.x;
				widget.rectangle.y = y;
				widget.resize(rectangle.w, rectangle.h * widget.stackAmount);

				y += widget.rectangle.h;
			}
		} else if(this.direction == "right") {
			let x = rectangle.x;

			for(let widget of this.children) {
				widget.rectangle.x = x;
				widget.rectangle.y = rectangle.y;
				widget.resize(rectangle.w * widget.stackAmount, rectangle.h);

				x += widget.rectangle.w;
			}
		}
	}
}

export class Margin {
	constructor(top, right, bottom, left) {
		this.top = top;
		this.right = right;
		this.bottom = bottom;
		this.left = left;
	}

	getRectangle(rectangle) {
		return new Rectangle(
			rectangle.x + this.left,
			rectangle.y + this.top,
			rectangle.w - this.left - this.right,
			rectangle.h - this.top - this.bottom
		);
	}

	setMargin(margin) {
		this.top = margin;
		this.right = margin;
		this.bottom = margin;
		this.left = margin;
	}
}

export class Rectangle {
	constructor(x, y, w, h) {
		this.x = x || 0;
		this.y = y || 0;
		this.w = w || 0;
		this.h = h || 0;
	}

	contains(x, y) {
		return this.x <= x && x <= this.x + this.w &&
               this.y <= y && y <= this.y + this.h;
	}
}

export class Label extends Widget {
	static filter = null;

	constructor(text) {
		super();
		this.text = text;
		this.font = null;
		this.textAlign = "center";
		this.textBaseline = "middle";
		this.text_fillStyle = "#000000";
	}

	draw(ctx) {
		super.draw(ctx);
		let rectangle = this.margin.getRectangle(this.rectangle);
		ctx.lineWidth = 1;
		if(this.font == null) {
			ctx.font = rectangle.h + "px Arial";
		} else  {
			ctx.font = this.font;
		}
		ctx.textAlign = this.textAlign;
		ctx.textBaseline = this.textBaseline;
		ctx.fillStyle = this.text_fillStyle;
		let x = rectangle.x;
		if(this.textAlign == "center") {
			x = rectangle.x + rectangle.w / 2;
		} else if(this.textAlign == "right") {
			x = rectangle.x + rectangle.w;
		}

		let y = this.rectangle.y;
		if(this.textBaseline == "middle") {
			y = rectangle.y + rectangle.h / 2;
		} else if(this.textBaseline == "bottom") {
			y = rectangle.y + rectangle.h;
		}

		if(Label.filter != null) {
			ctx.filter = Label.filter;
		}
		ctx.fillText(this.text, x, y);
		ctx.filter = "none";
	}
}

export class Button extends Widget {
	static filter = null;

	constructor(text) {
		super();
		this.text = text;
	}

	draw(ctx) {
		super.draw(ctx);
		let rectangle = this.margin.getRectangle(this.rectangle);
		const padding = 0.3;

		if(Button.filter != null) {
			ctx.filter = Button.filter;
		}
		ctx.strokeStyle = "#000000";
		ctx.lineWidth = 1;
		ctx.fillStyle = "#ccc";
		this.roundRect(ctx, rectangle.x, rectangle.y, rectangle.w, rectangle.h, 5, true);
		ctx.filter = "none";

		if(this.font == null) {
			ctx.font = rectangle.h - padding * rectangle.h + "px Arial";
		} else  {
			ctx.font = this.font;
		}
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "#000000";
		ctx.fillText(this.text,
			rectangle.x + rectangle.w / 2,
			rectangle.y + rectangle.h / 2);
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

export class ProgressBar extends Widget {
	constructor() {
		super();
		this.progress = 0;
		this.style = "black";
	}

	setProgress(progress) {
		this.progress = progress;
	}

	draw(ctx) {
		super.draw();
		let rectangle = this.margin.getRectangle(this.rectangle);
		ctx.beginPath();
		ctx.strokeStyle = this.style;
		ctx.fillStyle = this.style;
		ctx.rect(rectangle.x, rectangle.y, rectangle.w, rectangle.h);
		ctx.stroke();
		ctx.beginPath();
		ctx.rect(
			rectangle.x + 2,
			rectangle.y + 2,
			Math.max(rectangle.w * this.progress - 4, 1),
			rectangle.h - 4);
		ctx.fill();
	}
}

export class OptionsButton extends Button {
	draw(ctx) {
		super.draw(ctx);
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
