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
	constructor(name, questions, hints) {
		hints = hints || 0;
		this.name = name;
		this.questions = questions;
		this.hints = hints;
	}
}

export class Excercise {
	constructor(name, description, levels) {
		this.name = name;
		this.description = description;
		this.levels = levels;
	}
}

export let g_excercises = [
	new Excercise("Rena noter", "Enkla noter utan konstigheter", [
		new Level("Ettstrukna oktaven", [
			new Question("C4"),
			new Question("D4"),
			new Question("E4"),
			new Question("F4"),
			new Question("G4"),
			new Question("A4"),
			new Question("B4"),
		]),
		new Level("Lilla oktaven", [
			new Question("C3"),
			new Question("D3"),
			new Question("E3"),
			new Question("F3"),
			new Question("G3"),
			new Question("A3"),
			new Question("B3"),
		]),
		new Level("Tvåstrukna oktaven", [
			new Question("C5"),
			new Question("D5"),
			new Question("E5"),
			new Question("F5"),
			new Question("G5"),
			new Question("A5"),
			new Question("B5"),
		]),
		new Level("Stora oktaven", [
			new Question("C2"),
			new Question("D2"),
			new Question("E2"),
			new Question("F2"),
			new Question("G2"),
			new Question("A2"),
			new Question("B2"),
		]),
		new Level("Trestrukna oktaven", [
			new Question("C6"),
			new Question("D6"),
			new Question("E6"),
			new Question("F6"),
			new Question("G6"),
			new Question("A6"),
			new Question("B6"),
		]),
		new Level("Kontra oktaven", [
			new Question("C1"),
			new Question("D1"),
			new Question("E1"),
			new Question("F1"),
			new Question("G1"),
			new Question("A1"),
			new Question("B1"),
		]),
		new Level("Fyrstrukna oktaven", [
			new Question("C7"),
			new Question("D7"),
			new Question("E7"),
			new Question("F7"),
			new Question("G7"),
			new Question("A7"),
			new Question("B7"),
		]),
		new Level("Allt för piano", [
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
	new Excercise("b och #", "Höjningar och sänkningar", [
		new Level("Ettstruket + #", [
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
		new Level("Ettstruket + b", [
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
		new Level("Lilla + #", [
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
		new Level("Lilla + b", [
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
		new Level("Tvåstruket + #", [
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
		new Level("Tvåstruket + b", [
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
	new Excercise("Tonarter", "Dur och moll, har du koll?", [])
];