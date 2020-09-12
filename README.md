# London COVID-19 Visualisation

Web app visualising the incidence of COVID-19 in London.

## Development

1. Clone the repo locally.
2. Install dependencies with `npm run install`.
3. Run development server with `npm run watch` and preview the site at `http://localhost:1234`.
4. To build a production version of the site, run `npm run build`.

The site is built using [Parcel](https://parceljs.org/) with entry point being `index.html`, built site is saved in the `dist/` directory.

## Directory structure

* `assets/` - Static data/asset. If asset is requested only at runtime, it should be copied with `parcel-plugin-static-files-copy` (configuration is `package.json` under `staticFiles`)
* `src/` - Source directory.
	* `components/` - Vue components
	* `javascripts/` - Javascript sources
	* `stylesheets/` - Less.js stylesheet sources
	* `main.js` - Entry point to the app
* `index.html` - Entry point to site

## License

[BSD 3 Clause](./LICENSE.md)