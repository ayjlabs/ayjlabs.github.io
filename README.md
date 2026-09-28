# ayjtech.github.io

Website for **AYJ — Gaurav Yash Jain**: easy DIY electronics projects, *to inspire the curious*.

Live at https://ayjtech.github.io/

- Every video from [youtube.com/@gauravyashjain](https://www.youtube.com/@gauravyashjain), each with its parts list
- Circuit diagrams from the [AYJ Facebook page](https://www.facebook.com/ayjgauravyashjain), shown blueprint-style with the original one tap away
- A parts bin: pick a component (BC547, NE555, LDR…) to see every project that uses it

It's a plain static site with no build step, so it runs as-is on GitHub Pages.

## Structure

```
index.html              page shell (hero, sections, dialogs)
assets/css/style.css    all styles
assets/js/data.js       ALL content: channel stats, projects, parts, diagrams
assets/js/main.js       rendering, search/filter, modal, lightbox, hero animation
assets/diagrams/        circuit diagrams (saved from Facebook)
assets/img/             brand images
favicon.svg
.nojekyll               serve files as-is (skip Jekyll)
```

## Editing content

Everything on the page is generated from `assets/js/data.js`.

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

Reference numbers (P01, P02…) are assigned by upload order automatically. The channel stats in the hero and About section are in `index.html` as well as in `data.js`; update both when they change.
