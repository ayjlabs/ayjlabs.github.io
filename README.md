# ayjtech.github.io

Website for **AYJ Labs** (formerly *Gaurav Yash Jain – AYJ*): easy DIY electronics projects. *Build. Test. Learn.*

Live at https://ayjtech.github.io/

- The latest [YouTube Shorts](https://www.youtube.com/@ayjlabs/shorts), playable in place
- Every video from [youtube.com/@ayjlabs](https://www.youtube.com/@ayjlabs), each with its parts list
- Circuit diagrams from the [AYJ Labs Facebook page](https://www.facebook.com/ayjgauravyashjain), shown blueprint-style with the original one tap away
- A parts bin: pick a component (BC547, NE555, LDR…) to see every project that uses it

It's a plain static site with no build step, so it runs as-is on GitHub Pages.

## Structure

```
index.html              page shell (hero, sections, dialogs)
assets/css/style.css    all styles
assets/js/data.js       hand-written content: projects, Shorts, parts, diagrams
assets/js/latest.js     generated: newest uploads and stats pulled from YouTube
scripts/                the updater that writes latest.js
.github/workflows/      runs the updater on a schedule
assets/js/main.js       rendering, search/filter, modal, lightbox, hero animation
assets/diagrams/        circuit diagrams (saved from Facebook)
assets/img/             brand images (logo, YouTube banner, social preview)
favicon.svg
.nojekyll               serve files as-is (skip Jekyll)
```

## Automatic updates

A GitHub Action (`.github/workflows/update-content.yml`) checks the channel every 3 days and rewrites `assets/js/latest.js`:

- **New Shorts** appear in the Shorts row on their own.
- **New videos** get a project card, with the parts list read from the video description when it is written as bullet lines (`*BC547 Transistor (x2)`).
- **Subscriber and view counts** are refreshed.

Each run commits any new uploads along with the refreshed numbers. To run it between scheduled checks, open the **Actions** tab, pick *Update content from YouTube* and press **Run workflow**.

**Checks before anything is replaced.** Fetched values are validated first:

- Entries from another channel, or with a broken id, empty title or impossible date, are skipped.
- Nothing is ever removed, and an emptied description doesn't wipe an existing parts list.
- A value that looks wrong is held back: a video's views falling more than 10%, channel views falling more than 2%, subscribers falling more than 10% or doubling, or an upload switching between Short and video. If the next run (on a later day) reports the same thing, it is accepted as real.
- The "stats as of" date only moves when the numbers were actually refreshed.

Each run lists what it added, refreshed, held back or skipped in its summary on the Actions tab.

Summaries, categories, circuit diagrams and "Build it" links are not automatic. To add them, copy the video into `data.js` as described below; entries there replace the generated ones.

**Optional: YouTube API key.** Without a key the updater reads YouTube's public feed, which lists only the 15 newest uploads and has no video lengths. With a key it reads every upload, lengths included.

1. In [Google Cloud Console](https://console.cloud.google.com/), create a project and enable **YouTube Data API v3**.
2. Under **Credentials**, create an **API key** and restrict it to the YouTube Data API v3.
3. In this repo: **Settings → Secrets and variables → Actions → New repository secret**, name `YT_API_KEY`, value the key.

## Editing content

The page is built from `assets/js/data.js`, plus whatever the updater has added in `assets/js/latest.js` (never edit that one by hand).

**Add a new video:** add an entry at the top of `projects`:

```js
{
  slug: "my-new-project",          // used in the URL: /#project/my-new-project
  id: "YouTubeVideoId",            // the part after watch?v=
  title: "My New Project",
  date: "2026-10-01",
  length: "5:12",
  views: 0,
  likes: 0,
  cats: ["sensors"],               // ids from `categories`
  summary: "One or two sentences.",
  parts: [
    { q: 1, n: "BC547 Transistor", k: "BC547" },  // k links the part to the Parts Bin
    { q: 2, n: "1K Resistor", k: "RESISTOR" }
  ],
  diagram: {                       // optional
    src: "assets/diagrams/my-new-project.jpg",
    w: 1200, h: 800,
    caption: "My New Project",
    fb: "https://www.facebook.com/photo.php?fbid=...",
    posted: "2026-10-01"
  }
}
```

**Add a new Short:** add an entry at the top of `shorts`:

```js
{
  id: "YouTubeVideoId",              // the part after /shorts/
  title: "This Tiny Box Controls Your AC 🤯",
  topic: "How a Relay Works",        // optional small label
  date: "2026-10-03",
  length: "0:33",
  project: "simple-relay-circuit"    // optional: slug of a related project to link to
}
```

The newest 8 Shorts are shown; the first one gets the "Latest" badge.

Reference numbers (P01, P02…) are assigned by upload order automatically. The channel stats in the hero and About section are filled in from `latest.js`.
