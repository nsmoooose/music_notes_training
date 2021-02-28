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
};

export class Button extends EventTarget {
    constructor(rectangle, text) {
        super();
        this.rectangle = rectangle;
        this.text = text;
    }

    draw(ctx) {
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
        if (typeof radius === 'number') {
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