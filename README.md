# Geo Dojo: the version you can host yourself

This folder is a complete, public copy of Geo Dojo that runs on any static web host. No server, database or account is needed.

## What's included

| File | What it is |
| --- | --- |
| `index.html` | The page |
| `atlas.js` | The app: globe, Explore, Quiz, Daily, Passport |
| `vendor.js` | The map-drawing libraries (parts of d3 and topojson), trimmed to what the app uses |
| `facts.js` | 3,484 facts about 248 places (at least 12 each) in 27 topics, each linked to the exact Wikipedia version it came from |
| `countries-info.js`, `countries-extra.js` | Flags, capitals, area, continent, population; currencies and official languages |
| `countries-50m.json`, `countries-110m.json` | Country borders (Natural Earth): the standard map and a lighter one used while the globe spins |
| `detail-<continent>.json` | The detailed map for deep zoom (small islands), one file per continent, loaded only for the part of the world someone zooms in on |
| `hydro.json` | Rivers and lakes |
| `sw.js`, `manifest.webmanifest`, `icons/` | Offline support and the app icon for "Add to Home Screen" |

Upload **everything in this folder, including the `icons` folder**, and keep the layout as it is.

## What works in this version

- **Explore:** the globe with deep zoom to small islands, facts and country cards
- **Play:** Quick rounds on four levels (Stroll, Trek, Expedition, Uncharted), **Survival**, a 90-second **Speed run**, and the **Daily** (the same 5 questions for everyone each day)
- **Reasons to come back:** a themed event every week, four Journeys of five linked rounds, daily missions, a login calendar, streak milestones, ghost races against your own best round, weak-spot rounds and a personal par
- **Scoring extras:** streaks, Fever, dares, the mystery multiplier, golden landmarks, bonus rounds, encores and prize chests
- **Power-ups:** a meter that fills as you answer, then a choice of one of two (50/50, Spotlight, Freeze, Double up, Shield, Second chance, Extra life)
- **High scores and Passport:** personal top-10 lists, stamps, mastery medals, collections, badges, achievements and stats
- **Skins:** 19 looks for the globe and page, unlocked by playing

Each visitor's passport, streaks and scores are saved in their own browser.

## What's left out

Party games, friends and challenges, global high scores, the weekly league, the shared treasure and the daily leaderboard rely on the shared database that only exists on claude.ai, so this version hides them. Keep using your claude.ai page for games with invited friends.

## Put it online (pick one)

### Netlify Drop (easiest, about a minute)
1. Go to **app.netlify.com/drop**.
2. Drag the whole `curious-atlas-site` folder onto the page.
3. Netlify gives you a live address like `something-random.netlify.app`. Sign up for a free account to keep it and to rename it.

### GitHub Pages (free, good if you'll update it)
1. Create a free account at **github.com** and make a new **public** repository, for example `curious-atlas`.
2. On the repository page, choose **Add file → Upload files**, drag in everything from this folder (including the `icons` folder) and click **Commit changes**.
3. Open **Settings → Pages**. Under **Branch**, choose `main` and `/ (root)`, then **Save**.
4. After a minute or two the site is live at `https://YOUR-USERNAME.github.io/curious-atlas/`.

### Cloudflare Pages
1. In the Cloudflare dashboard, open **Workers & Pages → Create → Pages → Upload assets**.
2. Name the project, upload the folder and deploy. It goes live at `your-project.pages.dev`.

All three give you free HTTPS and let you connect your own domain name later.

## Try it on your computer first (optional)

Opening `index.html` by double-clicking won't work, because browsers block it from loading the map file. Run a small local server instead. In a terminal, from inside this folder:

```
python3 -m http.server 8000
```

Then open **http://localhost:8000** in your browser.

## Updating it later

Replace the changed files on your host. On GitHub, upload them again; on Netlify, drag the folder again. The site needs nothing else. It loads only its fonts from Google Fonts; everything else is in this folder, and after the first visit it works offline.

## Credits

Facts link to the English Wikipedia articles they were checked against. Borders: Natural Earth via world-atlas. Flags, capitals, areas and continents: the world-countries dataset (mledoze/countries). Population: World Bank, 2023.

## Extras built in

- **Works offline and installs like an app.** After the first visit, the site keeps working without a connection, and phones and browsers offer "Add to Home Screen" / "Install". When you upload a new version, visitors get it on their next visit.
- **Skins.** Visitors pick a look from the Skin button above the globe, and their choice is remembered.
- **Progress backup.** In Passport, visitors can copy a progress code and restore it on another device or browser.
- **Optional visitor counter.** To count visits without cookies or tracking, make a free account at goatcounter.com, then put your site code in `config.json` as `"goatcounterCode": "yourcode"` and rebuild. Leave it empty to turn counting off (the default).
