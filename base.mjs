export function $(id) {
	return document.getElementById(id);
}

export function is_int(s) {
	return !isNaN(parseInt(s, 10));
}

export function color_ramp(from, to, count) {
	const f = [parseInt(from.substring(1, 3), 16), parseInt(from.substring(3, 5), 16), parseInt(from.substring(5, 7), 16)];
	const t = [parseInt(to.substring(1, 3), 16), parseInt(to.substring(3, 5), 16), parseInt(to.substring(5, 7), 16)];
	const d = [(t[0] - f[0]) / count, (t[1] - f[1]) / count, (t[2] - f[2]) / count];
	let r = [];
	for (let x = 0; x < count; x++) {
		r.push("#" +
			Math.abs(Math.trunc(f[0] + x * d[0])).toString(16).padStart(2, "0") +
			Math.abs(Math.trunc(f[1] + x * d[1])).toString(16).padStart(2, "0") +
			Math.abs(Math.trunc(f[2] + x * d[2])).toString(16).padStart(2, "0"));
	}
	return r;
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
			if (stack[i] === callback) {
				stack.splice(i, 1);
				return;
			}
		}
	}

	dispatchEvent(type, event) {
		if (!(type in this.listeners)) {
			return false;
		}
		var stack = this.listeners[type].slice();
		for (var i = 0, l = stack.length; i < l; i++) {
			stack[i].call(this, event);
		}
		return true;
	}

	dispose() {
		this.listeners = {};
	}
}

export class Gfx {
	static round_rect(ctx, stroke_style, fill_style, rectangle, radius, fill) {
		ctx.strokeStyle = stroke_style;
		ctx.lineWidth = 1;
		ctx.fillStyle = fill_style;
		if (typeof radius === "number") {
			radius = { tl: radius, tr: radius, br: radius, bl: radius };
		} else {
			var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
			for (var side in defaultRadius) {
				radius[side] = radius[side] || defaultRadius[side];
			}
		}
		ctx.beginPath();
		ctx.moveTo(rectangle.x + radius.tl, rectangle.y);
		ctx.lineTo(rectangle.x + rectangle.w - radius.tr, rectangle.y);
		ctx.quadraticCurveTo(rectangle.x + rectangle.w, rectangle.y, rectangle.x + rectangle.w, rectangle.y + radius.tr);
		ctx.lineTo(rectangle.x + rectangle.w, rectangle.y + rectangle.h - radius.br);
		ctx.quadraticCurveTo(rectangle.x + rectangle.w, rectangle.y + rectangle.h, rectangle.x + rectangle.w - radius.br, rectangle.y + rectangle.h);
		ctx.lineTo(rectangle.x + radius.bl, rectangle.y + rectangle.h);
		ctx.quadraticCurveTo(rectangle.x, rectangle.y + rectangle.h, rectangle.x, rectangle.y + rectangle.h - radius.bl);
		ctx.lineTo(rectangle.x, rectangle.y + radius.tl);
		ctx.quadraticCurveTo(rectangle.x, rectangle.y, rectangle.x + radius.tl, rectangle.y);
		ctx.closePath();
		if (fill) {
			ctx.fill();
		}
		ctx.stroke();
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

		this.border = false;
		this.border_fillStyle = "black";
		this.content_fillStyle = "#ccc";
		this.border_radius = 5;
	}

	draw(ctx) {
		if (this.background_fillStyle != null) {
			ctx.fillStyle = this.background_fillStyle;
			ctx.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.w, this.rectangle.h);
		}
		if (this.border) {
			let rectangle = this.margin.getRectangle(this.rectangle);
			Gfx.round_rect(ctx, this.border_fillStyle, this.content_fillStyle, rectangle, this.border_radius, true);
		}
	}

	getRoot() {
		if (this.parent == null) {
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

	update(/* delta */) { }

	on_click(x, y) {
		let handled = false;
		if (this.visible == true && this.rectangle.contains(x, y)) {
			handled = this.dispatchEvent("click", null);
		}
		return handled;
	}
}

export class SingleControlContainer extends Widget {
	constructor() {
		super();
		this.child = null;
	}

	draw(ctx) {
		super.draw(ctx);
		if (this.child && this.child.visible) {
			this.child.draw(ctx);
		}
	}

	resize(width, height) {
		super.resize(width, height);
		if (this.child) {
			this.child.resize(width, height);
		}
	}

	setChild(child) {
		if (this.child) {
			this.child.dispose();
		}
		this.child = child;
		child.parent = this;
		child.resize(this.rectangle.w, this.rectangle.h);
	}

	on_click(x, y) {
		if (this.child) {
			return this.child.on_click(x, y);
		}
		return false;
	}

	update(delta) {
		if (this.child) {
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
		if (this.child) {
			if (width * this.ratio <= height) {
				this.child.rectangle.x = 0;
				this.child.rectangle.y = 0;
				this.child.resize(width, (width * this.ratio) | 0);
			} else {
				this.child.rectangle.x = (this.rectangle.x + (width - (height / this.ratio)) / 2) | 0;
				this.child.rectangle.y = this.rectangle.y;
				this.child.resize((height / this.ratio) | 0, height);
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
		child.dispose();
	}

	draw(ctx) {
		super.draw(ctx);
		for (const widget of this.children) {
			if (widget.visible == false) {
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
		let handled = false;
		for (const widget of this.children) {
			handled = widget.on_click(x, y);
			if (handled) {
				return handled;
			}
		}
		return super.on_click(x, y);
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

		if (this.direction == "down") {
			let y = rectangle.y;

			for (let widget of this.children) {
				widget.rectangle.x = rectangle.x;
				widget.rectangle.y = y;
				widget.resize(rectangle.w, (rectangle.h * widget.stackAmount) | 0);

				y += widget.rectangle.h;
			}
		} else if (this.direction == "right") {
			let x = rectangle.x;

			for (let widget of this.children) {
				widget.rectangle.x = x;
				widget.rectangle.y = rectangle.y;
				widget.resize((rectangle.w * widget.stackAmount) | 0, rectangle.h);

				x += widget.rectangle.w;
			}
		} else if (this.direction == "none") {
			for (let widget of this.children) {
				widget.rectangle.x = rectangle.x;
				widget.rectangle.y = rectangle.y;
				widget.resize(rectangle.w, rectangle.h);
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
			(rectangle.x + this.left / 100 * rectangle.w) | 0,
			(rectangle.y + this.top / 100 * rectangle.h) | 0,
			(rectangle.w - (this.left / 100 * rectangle.w) - (this.right / 100 * rectangle.w)) | 0,
			(rectangle.h - (this.top / 100 * rectangle.h) - (this.bottom / 100 * rectangle.h)) | 0
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
		if (this.font == null) {
			ctx.font = rectangle.h + "px Arial";
		} else {
			ctx.font = this.font;
		}
		ctx.textAlign = this.textAlign;
		ctx.textBaseline = this.textBaseline;
		ctx.fillStyle = this.text_fillStyle;
		let x = rectangle.x;
		if (this.textAlign == "center") {
			x = (rectangle.x + rectangle.w / 2) | 0;
		} else if (this.textAlign == "right") {
			x = rectangle.x + rectangle.w;
		}

		let y = this.rectangle.y;
		if (this.textBaseline == "middle") {
			y = (rectangle.y + rectangle.h / 2) | 0;
		} else if (this.textBaseline == "bottom") {
			y = rectangle.y + rectangle.h;
		}

		ctx.fillText(this.text, x, y);
	}
}

export class Button extends Widget {
	constructor(text) {
		super();
		this.text = text;
		this.text_color = "black";
		this.border = true;
	}

	draw(ctx) {
		super.draw(ctx);
		let rectangle = this.margin.getRectangle(this.rectangle);
		const padding = 0.3;

		if (this.font == null) {
			ctx.font = ((rectangle.h - padding * rectangle.h) | 0) + "px Arial";
		} else {
			ctx.font = this.font;
		}
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = this.text_color;
		ctx.fillText(this.text,
			(rectangle.x + rectangle.w / 2) | 0,
			(rectangle.y + rectangle.h / 2) | 0);
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
			Math.max(rectangle.w * this.progress - 4, 1) | 0,
			rectangle.h - 4);
		ctx.fill();
	}
}

export class MenuOption extends StackContainer {
	constructor(title, help, image) {
		super("none");

		this.border = true;
		this.border_radius = { tl: 0, tr: 0, bl: 10, br: 0 };

		image.margin.left = 20;
		image.margin.right = 20;
		image.margin.top = 20;
		image.margin.bottom = 30;

		/* A stack in the right direction with an image icon on the right side. */
		let stack1 = new StackContainer("right");
		stack1.appendChild(new Widget(), 0.7);
		stack1.appendChild(image, 0.3);
		this.appendChild(stack1);

		/* A stack in down direction with two labels describing their use. */
		let stack2 = new StackContainer("down");
		this.appendChild(stack2);

		this.label_title = new Label(title);
		this.label_title.margin.top = 17;
		this.label_title.margin.bottom = 17;
		this.label_title.margin.left = 8;
		this.label_title.textAlign = "left";
		stack2.appendChild(this.label_title, 0.7);

		this.label_help = new Label(help);
		this.label_help.margin.top = 17;
		this.label_help.margin.bottom = 17;
		this.label_help.margin.left = 20;
		this.label_help.textAlign = "left";
		stack2.appendChild(this.label_help, 0.3);
	}

	set content_text_color(value) {
		this.label_title.text_fillStyle = value;
		this.label_help.text_fillStyle = value;
	}

	resize(width, height) {
		super.resize(width, height);
		this.border_radius.bl = height;
	}
}

export class LevelProgress extends Widget {
	constructor(answers, pass) {
		super();
		this.answers = answers;
		this.pass = pass;
	}

	draw(ctx) {
		let rectangle = this.margin.getRectangle(this.rectangle);

		ctx.font = rectangle.h + "px Arial";
		let x = (rectangle.x + rectangle.w / 2) | 0;
		let y = (rectangle.y + rectangle.h / 2) | 0;
		ctx.fillStyle = "#aaaaaa";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		let text = this.answers == 0 ? "-" : ((this.pass / this.answers * 100) | 0) + "%";
		ctx.fillText(text, x, y);
	}
}

export class MenuView extends AspectRatioControlContainer {
	constructor() {
		super(2);

		this.stack = new StackContainer("down");
		this.setChild(this.stack);

		this.text_color = "#ffffff";
		this.background_fillStyle = "black";
		this.colors = [];

		this.title_size = 0.20;
		this.menuitem_size = 0.14;
	}

	calc_menuitem_size(count) {
		this.menuitem_size = (1.0 - this.title_size) / count;
	}

	add_view_title(title) {
		let x = new Label(title);
		x.margin.setMargin(30);
		x.background_fillStyle = this.colors[0];
		x.text_fillStyle = this.text_color;
		this.stack.appendChild(x, this.title_size);
	}

	add_view_menuitem(title, desc, ctrl, cb) {
		let x = new MenuOption(title, desc, ctrl);
		x.background_fillStyle = this.colors[this.stack.children.length + 1];
		x.content_fillStyle = this.colors[this.stack.children.length];
		x.border_fillStyle = this.colors[this.stack.children.length];
		x.content_text_color = this.text_color;
		x.addEventListener("click", cb);
		this.stack.appendChild(x, this.menuitem_size);
	}
}
