### dev note

For some reason intellisense relying on nuxt imports is only enabled once the `.nuxt/eslint.config.mjs` is open at least once, and needs to be opened at least once everytime the project is opened on vscode. Not sure how to fix this

### To update fonts

Run: `npm run updatefonts`

### This project depends on a few hard coded things:

If they change the app would break:

- The existance of this file, and it's structure https://raw.githubusercontent.com/google/fonts/main/tags/all/families.csv
- Google fonts base url: https://fonts.googleapis.com/css2?family=

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
