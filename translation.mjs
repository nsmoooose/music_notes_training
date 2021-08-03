import { is_int } from "./base.mjs";

let current_language = "een";

export function _(s) {
	if(s in translations) {
		if(current_language in translations[s]) {
			return translations[s][current_language];
		}
	}
	console.log("Missing translation for: '" + s + "'");
	return s;
}

export function language_set(language) {
	current_language = language;
}

let translations = {
	"!! Restart !!": {
		"en": "!! Restart !!",
		"sv": "!! Starta om !!"
	},
	"Back": {
		"en": "Back",
		"sv": "Tillbaka"
	},
	"Continue where you left": {
		"en": "Continue where you left",
		"sv": "Fortsätt där du slutade"
	},
	"Exercises": {
		"en": "Exercises",
		"sv": "Övningar"
	},
	"Help": {
		"en": "Help",
		"sv": "Hjälp"
	},
	"Key placement": {
		"en": "Key placement",
		"sv": "Tangenternas placering"
	},
	"Language and instrument": {
		"en": "Language and instrument",
		"sv": "Språk och instrument"
	},
	"Learn the notes names": {
		"en": "Learn the notes names",
		"sv": "Lär dig noternas namn"
	},
	"Levels": {
		"en": "Levels",
		"sv": "Nivå"
	},
	"Note training": {
		"en": "Note training",
		"sv": "Not träning"
	},
	"Notes": {
		"en": "Notes",
		"sv": "Noter"
	},
	"Notes, F#, Bb": {
		"en": "Notes, F#, Bb",
		"sv": "Noter, Fiss och Bess"
	},
	"Piano": {
		"en": "Piano",
		"sv": "Piano"
	},
	"Plain notes with MIDI feedback": {
		"en": "Plain notes with MIDI feedback",
		"sv": "Noter med MIDI feedback"
	},
	"Questions and answers are here": {
		"en": "Questions and answers are here",
		"sv": "Frågor och svar hittar du här"
	},
	"Settings": {
		"en": "Settings",
		"sv": "Inställningar"
	},
	"To the main menu": {
		"en": "To the main menu",
		"sv": "Till huvudmenyn"
	},
	"Train": {
		"en": "Train",
		"sv": "Träna"
	},
	"Violin": {
		"en": "Violin",
		"sv": "Fiol"
	},
	"Where to push string": {
		"en": "Where to push string",
		"sv": "Var ska jag trycka"
	},
	"Your progress will be lost": {
		"en": "Your progress will be lost",
		"sv": "Din lagrade statistik försvinner"
	}
}
