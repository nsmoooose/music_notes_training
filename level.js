import { Widget } from "./base.js";

export class LevelInfo extends Widget {
	constructor(rectangle) {
		super(rectangle);
	}

	draw(ctx) {
		let state = this.getRoot().state;

		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.rect(this.rectangle.x, this.rectangle.y, this.rectangle.w, this.rectangle.h);
		ctx.stroke();

		let average = 0;
		if(state.level_results.length > 0) {
			let sum = 0;
			state.level_results.forEach(element => (sum += element));
			average = Math.trunc(sum / state.level_results.length * 100);
		}

		ctx.font = "30px Arial";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		if(average < 50) {
			ctx.fillStyle = "#bb0000";
		} else if(average < 80) {
			ctx.fillStyle = "#bbbb00";
		} else {
			ctx.fillStyle = "#00bb00";
		}
		ctx.fillText("Nivå: " + state.level, this.rectangle.x, this.rectangle.y);
		ctx.fillText("Resultat: " + average + "%", this.rectangle.x, this.rectangle.y + 30);
		ctx.fillText("Nästa nivå: " + state.level_results.length + "%", this.rectangle.x, this.rectangle.y + 60);
	}
}
