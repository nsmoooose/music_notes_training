export class MusicTrainerState {
	static add_answer(id, pass) {
		if(!(id in MusicTrainerState.results)) {
			MusicTrainerState.results[id] = {answers: 0, pass: 0};
		}
		MusicTrainerState.results[id].answers++;
		MusicTrainerState.results[id].pass += pass ? 1 : 0;
	}

	static result_reset() {
		MusicTrainerState.excercise = 1;
		MusicTrainerState.level = 1;
		MusicTrainerState.level_results = [];
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
				MusicTrainerState.level_results = x.level_results;
			} else if(x.version == 2) {
				MusicTrainerState.level = x.level;
				MusicTrainerState.level_results = x.level_results;
				MusicTrainerState.instrument = x.instrument;
			} else if(x.version == 3) {
				MusicTrainerState.excercise = x.excercise;
				MusicTrainerState.level = x.level;
				MusicTrainerState.level_results = x.level_results;
				MusicTrainerState.instrument = x.instrument;
			} else if (x.version == 4) {
				MusicTrainerState.excercise = x.excercise;
				MusicTrainerState.level = x.level;
				MusicTrainerState.level_results = x.level_results;
				MusicTrainerState.instrument = x.instrument;
				MusicTrainerState.results = x.results;
			}
		}
	}

	static persist() {
		let x = {
			"version": 4,
			"excercise": MusicTrainerState.excercise,
			"level": MusicTrainerState.level,
			"level_results": MusicTrainerState.level_results,
			"instrument": MusicTrainerState.instrument,
			"results": MusicTrainerState.results
		};
		let s = JSON.stringify(x);
		localStorage.setItem("results", s);
	}
}

MusicTrainerState.excercise = 1;
MusicTrainerState.level = 1;
MusicTrainerState.level_results = [];
MusicTrainerState.instrument = "piano";
MusicTrainerState.results = {};