import { Scales } from "./scale.mjs";

export class Question {
	constructor(note) {
		/* Scientific pitch notation:
		   https://en.wikipedia.org/wiki/Scientific_pitch_notation  */
		this.note = note;
	}
}

export const Hints = {
	instrument_notes_show_flat: 1 << 0,
	instrument_notes_show_sharp: 1 << 1
};

export class Level {
	constructor(id, name, scale, questions, hints) {
		hints = hints || 0;
		this.id = id;
		this.name = name;
		this.scale = scale;
		this.questions = questions;
		this.hints = hints;
	}
}

export class Excercise {
	constructor(id, name, description, levels) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.levels = levels;
	}
}

function generate_questions(scale, octaves) {
	let questions = [];
	for (const octave of octaves) {
		for (const note of scale.notes) {
			questions.push(new Question(note.substr(0, 1) + octave + note.substr(1)));
		}
	}
	return questions;
}

export let g_excercises = [
	new Excercise("c907f608-0b1f-4a88-8bb2-f32c354fe1b5", "Rena noter", "Enkla noter utan konstigheter", [
		new Level("8a807dc8-81da-4625-8928-5330af09d940", "Ettstrukna oktaven", Scales["♮"], [
			new Question("C4"),
			new Question("D4"),
			new Question("E4"),
			new Question("F4"),
			new Question("G4"),
			new Question("A4"),
			new Question("B4"),
		]),
		new Level("8ce445fe-0698-4a1b-9361-4bf110a0b79c", "Lilla oktaven", Scales["♮"], [
			new Question("C3"),
			new Question("D3"),
			new Question("E3"),
			new Question("F3"),
			new Question("G3"),
			new Question("A3"),
			new Question("B3"),
		]),
		new Level("203425b0-dc1c-4005-a6a9-999dfaabb0fb", "Tvåstrukna oktaven", Scales["♮"], [
			new Question("C5"),
			new Question("D5"),
			new Question("E5"),
			new Question("F5"),
			new Question("G5"),
			new Question("A5"),
			new Question("B5"),
		]),
		new Level("fd3c9e42-010d-4a98-92fa-d1dded166182", "Stora oktaven", Scales["♮"], [
			new Question("C2"),
			new Question("D2"),
			new Question("E2"),
			new Question("F2"),
			new Question("G2"),
			new Question("A2"),
			new Question("B2"),
		]),
		new Level("a8f6ddd5-a9e7-4c8c-ac37-93990fdbebfe", "Trestrukna oktaven", Scales["♮"], [
			new Question("C6"),
			new Question("D6"),
			new Question("E6"),
			new Question("F6"),
			new Question("G6"),
			new Question("A6"),
			new Question("B6"),
		]),
		new Level("0b8297cc-7c2e-43b6-8c8d-b71689bf9647", "Kontra oktaven", Scales["♮"], [
			new Question("C1"),
			new Question("D1"),
			new Question("E1"),
			new Question("F1"),
			new Question("G1"),
			new Question("A1"),
			new Question("B1"),
		]),
		new Level("d4fd3d99-a77b-4416-8682-a09f637743c6", "Fyrstrukna oktaven", Scales["♮"], [
			new Question("C7"),
			new Question("D7"),
			new Question("E7"),
			new Question("F7"),
			new Question("G7"),
			new Question("A7"),
			new Question("B7"),
		]),
		new Level("f294dd38-8036-44d5-9e31-0391762ab6c3", "Allt för piano", Scales["♮"], [
			new Question("A0"),
			new Question("B0"),

			new Question("C1"),
			new Question("D1"),
			new Question("E1"),
			new Question("F1"),
			new Question("G1"),
			new Question("A1"),
			new Question("B1"),

			new Question("C2"),
			new Question("D2"),
			new Question("E2"),
			new Question("F2"),
			new Question("G2"),
			new Question("A2"),
			new Question("B2"),

			new Question("C3"),
			new Question("D3"),
			new Question("E3"),
			new Question("F3"),
			new Question("G3"),
			new Question("A3"),
			new Question("B3"),

			new Question("C4"),
			new Question("D4"),
			new Question("E4"),
			new Question("F4"),
			new Question("G4"),
			new Question("A4"),
			new Question("B4"),

			new Question("C5"),
			new Question("D5"),
			new Question("E5"),
			new Question("F5"),
			new Question("G5"),
			new Question("A5"),
			new Question("B5"),

			new Question("C6"),
			new Question("D6"),
			new Question("E6"),
			new Question("F6"),
			new Question("G6"),
			new Question("A6"),
			new Question("B6"),

			new Question("C7"),
			new Question("D7"),
			new Question("E7"),
			new Question("F7"),
			new Question("G7"),
			new Question("A7"),
			new Question("B7"),

			new Question("C8")
		])
	]),
	new Excercise("7acf818a-d4d6-4c52-bffc-15fbfab9a879", "b och #", "Höjningar och sänkningar", [
		new Level("e19dbc29-9765-4622-b4ff-ed112a07abe6", "Ettstruket + #", Scales["♮"], [
			new Question("C4"),
			new Question("D4"),
			new Question("E4"),
			new Question("F4"),
			new Question("G4"),
			new Question("A4"),
			new Question("B4"),
			new Question("C4♯"),
			new Question("D4♯"),
			new Question("F4♯"),
			new Question("G4♯"),
			new Question("A4♯"),
		], Hints.instrument_notes_show_sharp),
		new Level("7c77d684-bd46-4148-a92c-79d28694c5bc", "Ettstruket + b", Scales["♮"], [
			new Question("C4"),
			new Question("D4"),
			new Question("E4"),
			new Question("F4"),
			new Question("G4"),
			new Question("A4"),
			new Question("B4"),
			new Question("D4♭"),
			new Question("E4♭"),
			new Question("G4♭"),
			new Question("A4♭"),
			new Question("B4♭"),
		], Hints.instrument_notes_show_flat),
		new Level("2de499bd-f7d6-4e61-93de-4d887f28289b", "Lilla + #", Scales["♮"], [
			new Question("C3"),
			new Question("D3"),
			new Question("E3"),
			new Question("F3"),
			new Question("G3"),
			new Question("A3"),
			new Question("B3"),
			new Question("C3♯"),
			new Question("D3♯"),
			new Question("F3♯"),
			new Question("G3♯"),
			new Question("A3♯"),
		], Hints.instrument_notes_show_sharp),
		new Level("969d08ea-f32c-465c-b6ce-20cda51944c4", "Lilla + b", Scales["♮"], [
			new Question("C3"),
			new Question("D3"),
			new Question("E3"),
			new Question("F3"),
			new Question("G3"),
			new Question("A3"),
			new Question("B3"),
			new Question("D3♭"),
			new Question("E3♭"),
			new Question("G3♭"),
			new Question("A3♭"),
			new Question("B3♭"),
		], Hints.instrument_notes_show_flat),
		new Level("2366e46f-5902-48ec-a83f-87818742b4e7", "Tvåstruket + #", Scales["♮"], [
			new Question("C5"),
			new Question("D5"),
			new Question("E5"),
			new Question("F5"),
			new Question("G5"),
			new Question("A5"),
			new Question("B5"),
			new Question("C5♯"),
			new Question("D5♯"),
			new Question("F5♯"),
			new Question("G5♯"),
			new Question("A5♯"),
		], Hints.instrument_notes_show_sharp),
		new Level("124fbf91-d042-4583-85ce-23b3fed265cd", "Tvåstruket + b", Scales["♮"], [
			new Question("C5"),
			new Question("D5"),
			new Question("E5"),
			new Question("F5"),
			new Question("G5"),
			new Question("A5"),
			new Question("B5"),
			new Question("D5♭"),
			new Question("E5♭"),
			new Question("G5♭"),
			new Question("A5♭"),
			new Question("B5♭"),
		], Hints.instrument_notes_show_flat)
	]),
	new Excercise("400a02dc-848a-48da-93f6-c3ba70d3ab3c", "Tonarter", "Dur och moll, har du koll?", [
		new Level("a1ac84ae-eeb8-4957-b6ec-0156b986b7d0", "1# - G dur / e moll", Scales["1♯"], generate_questions(Scales["1♯"], ["3", "4", "5"])),
		new Level("8100e15b-d744-48c4-a87e-f49ad141ef27", "2# - D dur / b moll", Scales["2♯"], generate_questions(Scales["2♯"], ["3", "4", "5"])),
		new Level("0e139044-0475-4cdd-9eac-864fa8edb723", "3# - A dur / fiss moll", Scales["3♯"], generate_questions(Scales["3♯"], ["3", "4", "5"])),
		new Level("392f2447-50c3-490b-a521-054539351538", "4# - E dur / ciss moll", Scales["4♯"], generate_questions(Scales["4♯"], ["3", "4", "5"])),
		new Level("0e9461d7-d069-4783-9ac3-fd949025cea7", "5# - B dur / giss moll", Scales["5♯"], generate_questions(Scales["5♯"], ["3", "4", "5"])),
		new Level("ed26f3f8-2af5-40aa-bd8b-f0d913999e60", "6# - Fiss dur / diss moll", Scales["6♯"], generate_questions(Scales["6♯"], ["3", "4", "5"])),

		new Level("79deb61f-653b-4b86-ad15-c6f6c7c9954b", "1b - F dur / d moll", Scales["1♭"], generate_questions(Scales["1♭"], ["3", "4", "5"])),
		new Level("1f718633-d0b1-4b7a-8034-bcc1eb773bca", "2b - Bess dur / g moll", Scales["2♭"], generate_questions(Scales["2♭"], ["3", "4", "5"])),
		new Level("0dd03007-dc7c-47e0-b8d2-9ac272a9c983", "3b - Ess dur / c moll", Scales["3♭"], generate_questions(Scales["3♭"], ["3", "4", "5"])),
		new Level("bb31cb5f-b87d-497e-8df3-a46196078f47", "4b - Ass dur / f moll", Scales["4♭"], generate_questions(Scales["4♭"], ["3", "4", "5"])),
		new Level("9a7534c1-2525-435c-b29f-0746a35310ae", "5b - Dess dur / ess moll", Scales["5♭"], generate_questions(Scales["5♭"], ["3", "4", "5"])),
		new Level("67277345-25c8-4736-b956-8a3400ed4ad0", "6b - Gess dur / ess moll", Scales["6♭"], generate_questions(Scales["6♭"], ["3", "4", "5"])),
	])
];
