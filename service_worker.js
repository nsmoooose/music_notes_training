const cache_name = "music_notes_training";

const assets = [
	"/",
	"/index.html",
	"/style.css",
	"/base.mjs",
	"/help-sv.html",
	"/main.mjs",
	"/midi.mjs",
	"/questions.mjs",
	"/staff.mjs",
	"/state.mjs",
	"/translation.mjs",
	"/instrument_notes.mjs",
	"/instrument_piano.mjs",
	"/instrument_violin.mjs",
	"/view_excercises.mjs",
	"/view_levels.mjs",
	"/view_main_menu.mjs",
	"/view_settings.mjs",
	"/view_training.mjs"
];

self.addEventListener("install", installEvent => {
	installEvent.waitUntil(caches.open(cache_name).then(cache => {
		cache.addAll(assets);
	}));
});

self.addEventListener("fetch", fetchEvent => {
	/* No caching when developing this application. */
	if(fetchEvent.request.url.startsWith("http://127.0.0.1")) {
		return fetch(fetchEvent.request);
	}
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then(res => {
			return res || fetch(fetchEvent.request);
		})
	);
});
