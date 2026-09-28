# goit-js-hw-12

Homework assignment #12 from the [GoIT](https://goit.global/) JavaScript course. An image search app built with Vite that extends the previous task with **pagination**: it queries the [Pixabay API](https://pixabay.com/api/docs/) with [axios](https://axios-http.com/) using `async`/`await` and loads more results on demand with a "Load more" button.

## 📋 About

The user types a search term into the form and the app fetches matching photos from Pixabay, 15 per page:

- **Search form** — the query is trimmed and lowercased; if the field is empty, an iziToast warning is shown and no request is sent. Every new search resets the page counter, clears the gallery, and hides the "Load more" button.
- **HTTP request** — an `async` function calls `axios.get` on `https://pixabay.com/api` with the query, `image_type=photo`, `orientation=horizontal`, `safesearch=true`, and the `page` / `per_page` parameters.
- **Loader** — a spinner is shown while a request is in progress and hidden afterwards (`finally`).
- **Gallery** — each result is rendered as a card with the thumbnail and its stats: likes, views, comments, and downloads. New pages are appended to the existing gallery via `insertAdjacentHTML`.
- **Load more** — the button appears when more pages are available (total pages are calculated from `totalHits` and the page size). After each load, the page smoothly scrolls down by two gallery-card heights so the new images are visible.
- **End of results** — when the last page is reached, the button is hidden and an iziToast message says there are no more results.
- **Lightbox** — clicking a thumbnail opens the large image in a SimpleLightbox modal with the image tags as a caption; the lightbox is refreshed after every render.
- **Notifications** — iziToast messages are shown for an empty field, no matches for the query, and request errors.

## 🛠️ Tech Stack

- Vanilla JavaScript (ES modules, `async`/`await`, DOM API)
- HTML5 and CSS3 (modular stylesheets in `src/css`, CSS loader animation)
- [Vite](https://vitejs.dev/) — dev server and bundler
- [axios](https://github.com/axios/axios) — HTTP client
- [SimpleLightbox](https://github.com/andreknieriem/simplelightbox) — image modal
- [iziToast](https://github.com/marcelodolza/iziToast) — toast notifications
- `vite-plugin-html-inject` and `vite-plugin-full-reload` — HTML partials and live reload
- PostCSS (`postcss-sort-media-queries`, mobile-first sorting)
- GitHub Actions — automatic deploy to GitHub Pages

## 📁 Project Structure

```
goit-js-hw-12-main/
├── .github/workflows/
│   └── deploy.yml            # Build and deploy to GitHub Pages
├── src/
│   ├── index.html              # Page markup: form, gallery, "Load more", loader
│   ├── main.js                   # Search and pagination logic
│   ├── js/
│   │   ├── pixabay-api.js         # Pixabay request (axios, page size)
│   │   └── render-functions.js     # Gallery rendering, lightbox, loader and button helpers
│   ├── css/                         # Page and component styles
│   └── img/                          # Images and SVG sprite
├── vite.config.js                  # Vite configuration
└── package.json
```

## 🚀 Getting Started

Requires an LTS version of [Node.js](https://nodejs.org/) and an internet connection (the app calls the Pixabay API).

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## 📤 Deployment

The production build is deployed automatically to GitHub Pages (the `gh-pages` branch) on every push to `main`, via the workflow in `.github/workflows/deploy.yml`. The `build` script in `package.json` uses `--base=/goit-js-hw-12/`, which must match the repository name.
