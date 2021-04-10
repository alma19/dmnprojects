# Building Permits in DFW

Using mapbox, I created a choropleth map illustrating the number of residential building permits in the Dallas Fort Worth area. I was tasked with just making a simple map, but I took it upon myself allow users to explore single vs. multi-family permits, therefore giving readers a better understanding of the story. 

[Interactive](http://interactives.dallasnews.com/embeds/2018/building-permits-map/)
![building permits map](https://github.com/alma19/dmnprojects/blob/master/embed_building-permits-map/buildingpermits.png?raw=true)




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

`gulp publish` will upload your [`dist/`](dist/) folder to the `embeds/2018/building-permits-map/` folder on our interactives S3 bucket.

## Usage

#### Embedding in Serif

The below embed code can be pasted into a Serif "code block":

```html
<div id="embed-building-permits-map"></div>

<script src="//pym.nprapps.org/pym.v1.min.js"></script>
<script>new pym.Parent('embed-building-permits-map', '//interactives.dallasnews.com/embeds/2018/building-permits-map/', {})</script>
```

## Copyright

&copy;2018 The Dallas Morning News
