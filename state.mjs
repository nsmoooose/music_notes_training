export class MusicTrainerState {
	static add_answer(id, pass) {
		if(!(id in MusicTrainerState.results)) {
			MusicTrainerState.results[id] = {answers: 0, pass: 0};
		}
		MusicTrainerState.results[id].answers++;
		MusicTrainerState.results[id].pass += pass ? 1 : 0;
	}

	static reset() {
		MusicTrainerState.excercise = 1;
		MusicTrainerState.level = 1;
		MusicTrainerState.instrument = "piano";
		MusicTrainerState.results = {};
		localStorage.removeItem("results");
	}

	static load() {
		let x = localStorage.getItem("results");
		if(x != null) {
			x = JSON.parse(x);
			if(x.version == 1) {
				MusicTrainerState.level = x.level;
			} else if(x.version == 2) {
				MusicTrainerState.level = x.level;
				MusicTrainerState.instrument = x.instrument;
			} else if(x.version == 3) {
				MusicTrainerState.excercise = x.excercise;
				MusicTrainerState.level = x.level;
				MusicTrainerState.instrument = x.instrument;
			} else if(x.version == 4) {
				MusicTrainerState.excercise = x.excercise;
				MusicTrainerState.level = x.level;
				MusicTrainerState.instrument = x.instrument;
				MusicTrainerState.results = x.results;
			} else if(x.version == 5) {
				MusicTrainerState.excercise = x.excercise;
				MusicTrainerState.level = x.level;
				MusicTrainerState.instrument = x.instrument;
				MusicTrainerState.results = x.results;
				MusicTrainerState.language = x.language;
			}
		}
	}

	static persist() {
		let x = {
			"version": 5,
			"excercise": MusicTrainerState.excercise,
			"level": MusicTrainerState.level,
			"instrument": MusicTrainerState.instrument,
			"results": MusicTrainerState.results,
			"language": MusicTrainerState.language
		};
		let s = JSON.stringify(x);
		localStorage.setItem("results", s);
	}
}

MusicTrainerState.language = navigator.languages[0].substring(0, 2);
MusicTrainerState.excercise = 1;
MusicTrainerState.level = 1;
MusicTrainerState.instrument = "piano";
MusicTrainerState.results = {};
