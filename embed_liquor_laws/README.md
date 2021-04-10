# embed-liquor-laws

[Interactive](https://www.dallasnews.com/news/curious-texas/2018/08/29/do-blue-laws-still-exist-in-the-lone-star-state-curious-texas-investigates/)

This is an embeddable graphic built using the [`dmninteractives` Yeoman generator](https://github.com/DallasMorningNews/generator-dmninteractives). It's designed to be embedded using [Pym.js](http://blog.apps.npr.org/pym.js/) as a responsive `iframe`.

## Requirements

- Node - `brew install node`
- Gulp - `npm install -g gulp-cli`

## Local development

#### Installation

1. `npm install` to install development tooling
2. `gulp` to open a local development server

#### What's inside

- `src/index.html` - Graphic HTML markup; there's no Nunjucks, etc. so this is just straight HTML
- `src/embed.html` - A page to test your embed
- `src/js/*.js` - Graphic scripts, written in ES2015 (it'll be transpiled with Babel)
- `src/sass/*.scss` - Graphic styles in SCSS
- `dist/*` - All of the above, transpiled

_Important caveat:_ Video, audio and ZIP files are ignored by `git` regardless of where they're saved. You'll need to manually alter the [`.gitignore`](.gitignore) file to have them committed to Github.

#### Publishing

`gulp publish` will upload your [`dist/`](dist/) folder to the `embeds/2018/embed-liquor-laws/` folder on our interactives S3 bucket.

## Usage

#### Embedding in Serif

The below embed code can be pasted into a Serif "code block":

```html
<div id="embed-embed-liquor-laws"></div>

<script src="//pym.nprapps.org/pym.v1.min.js"></script>
<script>new pym.Parent('embed-embed-liquor-laws', '//interactives.dallasnews.com/embeds/2018/embed-liquor-laws/', {})</script>
```

## Copyright

&copy;2018 The Dallas Morning News
