# SHAREPLATE — Think before you waste.
Static HTML/CSS/JS site. No build step, no dependencies. The form and Share Journey are demonstrations only.

## Structure
index.html · css/style.css · js/script.js · render.yaml · assets/{images,videos,icons}

## Run locally
1. Install Python 3 (or Node). In this folder run: `python3 -m http.server 8000`
2. Open http://localhost:8000. (Opening index.html directly also works.)

## Add your photos and video (no code edits)
Photos are already included (reference images). To replace any, overwrite the file of the same name; see IMAGE-PROMPTS.md.
hero-poster.jpg, challenge.jpg, journey-1.jpg … journey-4.jpg, story-1.jpg … story-4.jpg, closing.jpg
Video: `assets/videos/shareplate-hero.mp4` (aim for under 8 MB, 1080p or lower, H.264, no audio).
Update each `alt` text in index.html to match your final photo. Use JPG at about 1600px wide, under 300 KB.

## GitHub
```
git init && git add . && git commit -m "SHAREPLATE site"
git branch -M main
git remote add origin https://github.com/<you>/shareplate.git
git push -u origin main
```

## Deploy on Render (Static Site)
New + → Static Site → connect the repo → Build Command: leave blank → Publish Directory: `.` → Create. (`render.yaml` is included for Blueprint deploys.)

## Test checklist
- Every nav link scrolls to its section; mobile menu opens and closes (under 900px).
- Hero text is readable over the video; video pauses with reduced-motion on.
- Share Journey: all 4 tabs (click and arrow keys) update text, status, image and progress bar.
- Checklist count updates; calculator updates; form shows errors, then a demo confirmation.
- No horizontal scroll at 360px, 768px, 1280px; no console errors.

## Hero video (plug-and-play)
1. Compress it (optional but recommended, target under 8 MB): `ffmpeg -i input.mp4 -vf scale=-2:1080 -an -c:v libx264 -crf 28 -preset slow -movflags +faststart shareplate-hero.mp4`
2. Put the result at `assets/videos/shareplate-hero.mp4` (exact name). The hero uses it automatically; until then the olive poster shows.
3. Optional: replace `assets/images/hero-poster.jpg` with a frame from the video.

## Image slots
Photos: challenge.jpg is a supplied reference photo; journey-1 to 4, hero-poster and closing are frames from the hero video.

## Stories of Change videos
Files live in `assets/videos/stories/` (mangalore, bidar-wedding, bengaluru-streetfood, college-canteen, mysore-restaurant, bakery .mp4) with posters in `assets/images/stories/` of the same names. Replace a file with the same name to swap a video. Each panel plays muted only while on screen; Watch with sound opens the full player.

## Platform (demo) features
Section "The SharePlate Platform": live stats, marketplace (search, filters, claim, food safety passport), Smart Match (transparent weighted rules), community demand board, status-based tracking, role dashboards (Donor, NGO, Volunteer, Admin), restaurant insights, Leaflet/OpenStreetMap map, recognition, Kannada/English switch, multi-role form.
All data is saved in the browser (localStorage key `shareplate.v1`); "Reset demo data" restores samples. No backend, no real login, no real donations. A backend would be needed for shared data and real authentication; none of the files contain API keys.
The map needs internet (Leaflet from cdnjs, tiles from OpenStreetMap). Kannada text was written without native review; please have a Kannada speaker check it.
