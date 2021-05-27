const cache_name = "music_notes_training";

const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/base.js",
  "/main.js",
  "/questions.js",
  "/staff.js",
  "/state.js",
  "/instrument_notes.js",
  "/instrument_piano.js",
  "/instrument_violin.js",
  "/view_main_menu.js",
  "/view_settings.js",
  "/view_training.js"
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
    )
});
