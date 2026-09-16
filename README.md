# Redirector

A GitHub Pages site that redirects visitors to a URL you can change anytime.

## How it works

`index.html` loads `redirect.json` and redirects the browser to the `url` value inside it.

## Changing the destination

Edit `redirect.json`:

```json
{
  "url": "https://example.com"
}
```

Commit and push — the live site will pick up the new destination immediately.

## Hosting on GitHub Pages

1. Push this repo to GitHub.
2. In the repo, go to Settings → Pages.
3. Under "Build and deployment", set Source to "Deploy from a branch", choose the `main` branch and `/ (root)` folder.
4. Save. Your site will be live at `https://<username>.github.io/<repo-name>/`.
