
const ROOT = self.registration.scope;
const PREFIX = 'lazy-courage:' + new URL(ROOT).pathname + ':';
const CACHE = PREFIX + '5161261a626c32b2';
const ASSETS = ["art/cards/classes-and-gifts.webp","art/characters/companions.webp","art/characters/dataris/audience.webp","art/characters/dataris/gestures.webp","art/characters/mach/appearance.webp","art/characters/mach/battle.webp","art/characters/mach/blessing.webp","art/characters/mach/duel-close-clean.webp","art/characters/mach/hill-run.webp","art/characters/mach/lady-mouse.webp","art/characters/mach/leaves.webp","art/characters/mach/mage-contact.webp","art/characters/mach/meadow-gestures.webp","art/characters/mach/rebirth.webp","art/characters/mach/resting.webp","art/characters/mach/temple-actions-clean.webp","art/characters/mach/town-actions.webp","art/characters/mach/town.webp","art/characters/mach/travel.webp","art/characters/rabbit/fallen.webp","art/characters/rabbit/meadow.webp","art/characters/sayaka/battle.webp","art/characters/scorpion/battle.webp","art/characters/scorpion/idle.webp","art/characters/tantrum/authorities.webp","art/characters/tantrum/cart-journey.webp","art/characters/tantrum/cart-ride.webp","art/characters/tantrum/cast.webp","art/characters/tantrum/city-life.webp","art/characters/tantrum/drinking.webp","art/characters/tantrum/duel-v2.webp","art/characters/tantrum/gate-reactions.webp","art/characters/tantrum/guards-actions.webp","art/characters/tantrum/hunter-strike.webp","art/characters/tantrum/ichiro-family-v2.webp","art/characters/tantrum/ichiro-offended.webp","art/characters/tantrum/merchants.webp","art/characters/tantrum/priestess-poses.webp","art/characters/tantrum/priestesses.webp","art/characters/tantrum/tavern-cast.webp","art/characters/tantrum/tavern-service.webp","art/characters/tantrum/temple-cast-clean.webp","art/illustrations/prologue/apartment.webp","art/illustrations/prologue/ascent.webp","art/illustrations/prologue/cat.webp","art/illustrations/prologue/electrician.webp","art/illustrations/prologue/friend.webp","art/illustrations/prologue/kyoto.webp","art/illustrations/prologue/platform.webp","art/illustrations/prologue/satellite.webp","art/illustrations/prologue/summoning.webp","art/items/duel-and-travel.webp","art/items/hunt-and-tavern.webp","art/items/meadow.webp","art/items/town.webp","art/locations/fiol.webp","art/locations/guild.webp","art/locations/ichiro-farm.webp","art/locations/ichiro-hayloft.webp","art/locations/ichiro-village-road.webp","art/locations/tantrum-cell.webp","art/locations/tantrum-day-meadow.webp","art/locations/tantrum-gates.webp","art/locations/tantrum-hill.webp","art/locations/tantrum-hunter.webp","art/locations/tantrum-market.webp","art/locations/tantrum-pharmacy.webp","art/locations/tantrum-river.webp","art/locations/tantrum-road.webp","art/locations/tantrum-roofs.webp","art/locations/tantrum-street.webp","art/locations/tantrum-tavern.webp","art/locations/tantrum-temple-inside-v2.webp","art/locations/tantrum-temple-outside.webp","art/locations/tantrum.webp","art/locations/wasteland.webp","art/objects/tantrum-roof-repairs.webp","assets/alegreya-cyrillic-400-italic-CzOFVsaV.woff2","assets/alegreya-cyrillic-400-italic-DSxbt1-2.woff","assets/alegreya-cyrillic-400-normal-72Io3whm.woff2","assets/alegreya-cyrillic-400-normal-VT77nruV.woff","assets/alegreya-cyrillic-500-normal-h-VttLAG.woff","assets/alegreya-cyrillic-500-normal-uJUgykjJ.woff2","assets/alegreya-cyrillic-600-normal-BR3Uo04X.woff2","assets/alegreya-cyrillic-600-normal-CPGmphyD.woff","assets/alegreya-latin-400-italic-BXpar-rJ.woff2","assets/alegreya-latin-400-italic-CJvUQvZT.woff","assets/alegreya-latin-400-normal-BLlBRtDv.woff2","assets/alegreya-latin-400-normal-BuQWlRPA.woff","assets/golos-text-cyrillic-400-normal-BwL4n7Pb.woff","assets/golos-text-cyrillic-400-normal-C7us6pn1.woff2","assets/golos-text-cyrillic-500-normal-BSLQUuP1.woff2","assets/golos-text-cyrillic-500-normal-hXinzVVQ.woff","assets/golos-text-latin-400-normal-Coi1FYaD.woff2","assets/golos-text-latin-400-normal-DOuJOmdK.woff","assets/index-BbnPxHkM.js","assets/index-C0HAvf4r.css","icons/apple-touch-icon.png","icons/icon-192.png","icons/icon-512.png","icons/icon.svg","index.html","manifest.webmanifest"].map(path => new URL(path, ROOT).href);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS.map(url => new Request(url, { cache: 'reload' })))));
});
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith(PREFIX) && key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith(ROOT)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const url = event.request.mode === 'navigate' ? new URL('index.html', ROOT).href : event.request;
    // Only static local files are precached; Vary: Origin differs for module requests.
    return await cache.match(url, { ignoreSearch: true, ignoreVary: true }) || fetch(event.request);
  })());
});
