# Red Light Cameras Map

Early in my internship I wanted to do a project with some red light camera data I found from the Texas department of transportation. The project didn’t work out at the time, but I was later approached by a reporter that heard through the grapevine that I had this data and wanted to work with me. After talking through some ideas we decided that I would map the red light cameras in the five most populous North Texas cities. 

I scraped the data PDFs using Python and regular expressions. From there I geocoded the street intersections and created a Mapbox map with the results. 

[Interactive](http://interactives.dallasnews.com/embeds/2018/red-lights-map/)
![red light camera map](https://github.com/alma19/dmnprojects/blob/master/embed_red_light_cameras/redlightcamera.png?raw=true)

# red-lights-map

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

`gulp publish` will upload your [`dist/`](dist/) folder to the `embeds/2018/red-lights-map/` folder on our interactives S3 bucket.

## Usage

#### Embedding in Serif

The below embed code can be pasted into a Serif "code block":

```html
<div id="embed-red-lights-map"></div>

<script src="//pym.nprapps.org/pym.v1.min.js"></script>
<script>new pym.Parent('embed-red-lights-map', '//interactives.dallasnews.com/embeds/2018/red-lights-map/', {})</script>
```

## Copyright

&copy;2018 The Dallas Morning News
