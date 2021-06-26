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
	constructor(id, name, questions, hints) {
		hints = hints || 0;
		this.id = id;
		this.name = name;
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

export let g_excercises = [
	new Excercise("c907f608-0b1f-4a88-8bb2-f32c354fe1b5", "Rena noter", "Enkla noter utan konstigheter", [
		new Level("8a807dc8-81da-4625-8928-5330af09d940", "Ettstrukna oktaven", [
			new Question("C4"),
			new Question("D4"),
			new Question("E4"),
			new Question("F4"),
			new Question("G4"),
			new Question("A4"),
			new Question("B4"),
		]),
		new Level("8ce445fe-0698-4a1b-9361-4bf110a0b79c", "Lilla oktaven", [
			new Question("C3"),
			new Question("D3"),
			new Question("E3"),
			new Question("F3"),
			new Question("G3"),
			new Question("A3"),
			new Question("B3"),
		]),
		new Level("203425b0-dc1c-4005-a6a9-999dfaabb0fb", "Tvåstrukna oktaven", [
			new Question("C5"),
			new Question("D5"),
			new Question("E5"),
			new Question("F5"),
			new Question("G5"),
			new Question("A5"),
			new Question("B5"),
		]),
		new Level("fd3c9e42-010d-4a98-92fa-d1dded166182", "Stora oktaven", [
			new Question("C2"),
			new Question("D2"),
			new Question("E2"),
			new Question("F2"),
			new Question("G2"),
			new Question("A2"),
			new Question("B2"),
		]),
		new Level("a8f6ddd5-a9e7-4c8c-ac37-93990fdbebfe", "Trestrukna oktaven", [
			new Question("C6"),
			new Question("D6"),
			new Question("E6"),
			new Question("F6"),
			new Question("G6"),
			new Question("A6"),
			new Question("B6"),
		]),
		new Level("0b8297cc-7c2e-43b6-8c8d-b71689bf9647", "Kontra oktaven", [
			new Question("C1"),
			new Question("D1"),
			new Question("E1"),
			new Question("F1"),
			new Question("G1"),
			new Question("A1"),
			new Question("B1"),
		]),
		new Level("d4fd3d99-a77b-4416-8682-a09f637743c6", "Fyrstrukna oktaven", [
			new Question("C7"),
			new Question("D7"),
			new Question("E7"),
			new Question("F7"),
			new Question("G7"),
			new Question("A7"),
			new Question("B7"),
		]),
		new Level("f294dd38-8036-44d5-9e31-0391762ab6c3", "Allt för piano", [
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
		new Level("e19dbc29-9765-4622-b4ff-ed112a07abe6", "Ettstruket + #", [
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
		new Level("7c77d684-bd46-4148-a92c-79d28694c5bc", "Ettstruket + b", [
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
		new Level("2de499bd-f7d6-4e61-93de-4d887f28289b", "Lilla + #", [
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
		new Level("969d08ea-f32c-465c-b6ce-20cda51944c4", "Lilla + b", [
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
		new Level("2366e46f-5902-48ec-a83f-87818742b4e7", "Tvåstruket + #", [
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
		new Level("124fbf91-d042-4583-85ce-23b3fed265cd", "Tvåstruket + b", [
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
	new Excercise("400a02dc-848a-48da-93f6-c3ba70d3ab3c", "Tonarter", "Dur och moll, har du koll?", [])
];
