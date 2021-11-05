import { Scales } from "./scale.mjs";

export class Song {
	constructor(name, author, scale, notes) {
		this.name = name;
		this.author = author;
		this.scale = scale;
		this.notes = notes;
	}
}

export const Songs = [
	new Song("Listen to your heart", "Roxette", Scales["2♯"], [
		"B3", "D4", "A4", "G4", "F4♯", "E4", "D4", "F4♯"
	])
];
