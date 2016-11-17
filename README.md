# elections-carousel

[![Build Status](https://travis-ci.org/hfagerlund/elections-carousel.svg?branch=master)](https://travis-ci.org/hfagerlund/elections-carousel)

Carousel presentation of data from a JSON election results feed.

Enables scrolling through the election results for all ridings using the Next and Back buttons, displaying the number of votes and percentage of the vote won by each candidate in each riding.

<img style="max-width:100%;" alt="screenshot of elections-carousel page" src="/screenshots/screenshot_elections-html.png" align="left" />

## Installation
### Download:
Download the **elections-carousel** project in [.zip format](https://github.com/hfagerlund/elections-carousel/archive/master.zip), or clone the repository using `$ git clone https://github.com/hfagerlund/elections-carousel.git`.

Then run:
```
$ npm install
```
from inside the directory where you extracted the **elections-carousel** project (ie. in the same directory where package.json is located).

Required [dependencies](https://github.com/hfagerlund/elections-carousel#requirements) can be installed using:
```
$ bower install
```

#### File structure:
```
|-elections-carousel
|---bower_components
|---build
|---js
|-----elections
|-----vendors
|---sass
|---stylesheets
|-json_feed
|-node_modules
|-screenshots
|-test
```
| Directory:  | Contains: |
| ------------- | ------------- |
| **/elections-carousel**  | all of project source code (ie. the project root)  |
| **/elections-carousel/bower_components/**  | required libraries - eg. local (minified) version of jQuery)  |
| **/elections-carousel/build** | minified version of the combined elections scripts  |
| **/elections-carousel/js/elections**  | unminified versions of all the elections scripts  |
| **/elections-carousel/js/vendors**  | third-party scripts - eg. Google fonts |
| **/elections-carousel/sass**  | SASS (.scss) files |
| **/elections-carousel/stylesheets**  | compiled CSS (.css) files |
| **/json_feed**  | local version of the JSON election results feed  |
| **/node_modules**  | **npm** package(s)/files |
| **/screenshots**  | screenshots of the **elections-carousel** project |
| **/test**  | QUnit test files |
- - -
### Requirements:
- Grunt
- Compass
- SASS
- npm
- Bower
- Ruby
- QUnit
- jQuery

(All copyrights for the above remain with their respective owners.)
- - -
### Configuration
* Replace the URL in [elections.js](https://github.com/hfagerlund/elections-carousel/blob/master/elections-carousel/js/elections/elections.js#L217) with `http://<path-to-json-feed-election-results.js>` so that it resembles:
```
var url = 'http://somehost/somedir/results.js';
```
* Remove the lines indicated by `<!-- DEV -->` comments (for use in a **development environment**), and uncomment the lines indicated by `<!-- PROD -->` comments (for use on a live site). Use the following link to the stylesheet in a production environment:

```
<link href="<path-to-your-page>/elections-carousel/stylesheets/screen.min.css" media="screen" rel="stylesheet" type="text/css" />
```
making the appropriate modification to `<path-to-your-page>`.
- - -
## Usage
Open a browser to the following URL for elections results:
```
<path-to-project-root>/elections-carousel/elections.html

```
where `<path-to-project-root>` is replaced with the path to your **elections-carousel** installation.

#### Adding elections-carousel to another page:
* **CSS**: Add the **elections-carousel** stylesheet (found in the project's **/elections-carousel/stylesheets** directory) to the page using:
```css 
<link href="<path-to-your-page>/elections-carousel/stylesheets/screen.css" media="screen" rel="stylesheet" type="text/css" />
```
making the appropriate modification to `<path-to-your-page>`.

* **HTML**: All that is required to use the **elections-carousel** component on a page is an element in the markup with the `id` attribute value of `eResults`:

##### Example:
```html
<div id="eResults">
```
An example page is provided (at **/elections-carousel/another-page_example.html**) showing the **elections-carousel** component used on a page containing other elements.

_NOTE_: The **elections-carousel** module does require that jQuery is being used on your page.
- - -
## Tests

#### In the browser:
Read the QUnit test results in the browser at URL:
```
<path-to-project-root>/test/elections.html

```

#### Command line:
Run all (QUnit) tests, and read the results, on the command line using Grunt:

```
$ grunt test

```
- - -
## License
Copyright (c) Heini Fagerlund. Licensed under the [MIT license](http://opensource.org/licenses/mit-license.php).
(See [LICENSE](https://github.com/hfagerlund/elections-carousel/blob/master/LICENSE).)
