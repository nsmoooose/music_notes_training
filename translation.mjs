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
	"Language and instrument": {
		"en": "Language and instrument",
		"sv": "Språk och instrument"
	},
	"Levels": {
		"en": "Levels",
		"sv": "Nivå"
	},
	"Note training": {
		"en": "Note training",
		"sv": "Not träning"
	},
	"Notes, F#, Bb": {
		"en": "Notes, F#, Bb",
		"sv": "Noter, Fiss och Bess"
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
	}
}
