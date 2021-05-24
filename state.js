export class MusicTrainerState {
	static level = 1;
	static level_results = [];
	static instrument = "piano";

	static result_reset() {
		MusicTrainerState.level = 1;
		MusicTrainerState.level_results = [];
		MusicTrainerState.instrument = "piano";
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
			}
		}
	}

	static persist() {
		let x = {
			"version": 2,
			"level": MusicTrainerState.level,
			"level_results": MusicTrainerState.level_results,
			"instrument": MusicTrainerState.instrument
		};
		let s = JSON.stringify(x);
		localStorage.setItem("results", s);
	}
}
