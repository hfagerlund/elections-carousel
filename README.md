# elections-carousel

[![Build Status](https://travis-ci.org/hfagerlund/elections-carousel.svg?branch=master)](https://travis-ci.org/hfagerlund/elections-carousel)

Carousel presentation of data from a JSON feed of election results.

Enables scrolling through the election results for all ridings using the Next and Back controls (via mouse or keyboard), displaying the number of votes and percentage of the vote won by each candidate in each riding.

<img style="max-width:100%;" alt="screenshot of elections-carousel page" src="/screenshots/screenshot_elections-html.png" align="center" /><br />
*Figure 1: screenshot of elections.html page*

The **main title** and **data feed URL** are customizable - refer to the '[Configuration](https://github.com/hfagerlund/elections-carousel#configuration)' section for instructions.
- - -

## Table of Contents:
* [Requirements](https://github.com/hfagerlund/elections-carousel#requirements)
* [Installation](https://github.com/hfagerlund/elections-carousel#installation)
  * [File structure](https://github.com/hfagerlund/elections-carousel#file-structure)
* [Usage](https://github.com/hfagerlund/elections-carousel#usage)
  * [Adding elections-carousel to a page](https://github.com/hfagerlund/elections-carousel#adding-elections-carousel-to-a-page)
  * [Keyboard support](https://github.com/hfagerlund/elections-carousel#keyboard-support)
  * [Configuration](https://github.com/hfagerlund/elections-carousel#configuration)
* [Running the Unit Tests](https://github.com/hfagerlund/elections-carousel#tests)
  * [On the command line](https://github.com/hfagerlund/elections-carousel#command-line)
  * [In the browser](https://github.com/hfagerlund/elections-carousel#in-the-browser)
* [License](https://github.com/hfagerlund/elections-carousel#license)

---

### Other:
* [Changelog](https://github.com/hfagerlund/elections-carousel/blob/master/CHANGELOG.md)
* [Documentation](https://hfagerlund.github.io/elections-carousel/)
* [Releases](https://github.com/hfagerlund/elections-carousel/releases)
* [Roadmap](https://github.com/hfagerlund/elections-carousel/projects/1)

- - -
- - -

## Requirements
- npm
  - Babelify
  - Browserify
  - jQuery
  - Istanbul
  - Mustache
  - Tape
  - SASS

(All copyrights for the above remain with their respective owners.)

- - -

## Installation
Clone the repository using:
```
$ git clone https://github.com/hfagerlund/elections-carousel.git
```
or download the **elections-carousel** project in [.zip format](https://github.com/hfagerlund/elections-carousel/archive/master.zip).

Install all required [dependencies](https://github.com/hfagerlund/elections-carousel#requirements) by running:
```
$ npm install
```
from inside the directory where you extracted the **elections-carousel** project (ie. in the same directory where package.json is located).

### File structure:
```
├── coverage
├── dist
│   ├── css
│   └── js
├── docs
├── node_modules
├── screenshots
├── src
│   ├── assets
│   │   ├── fixtures
│   │   └── templates
│   ├── js
│   │   ├── elections
│   │   └── vendors
│   └── sass
└── test

```
| Directory:  | Contains: |
| ------------- | ------------- |
| **/coverage**  | (Istanbul) code coverage reports  |
| **/dist**  | production-ready (minified,concatenated,transpiled) files |
| **/dist/css**  | compiled CSS (.css) files |
| **/dist/js** | minified version of the combined elections scripts  |
| **/docs**  | documentation |
| **/node_modules**  | **npm** package(s)/files |
| **/screenshots**  | screenshots of the **elections-carousel** project |
| **/src**  | all project source code |
| **/src/assets**  | additional project files  |
| **/src/assets/fixtures**  | local version of the sample JSON election results feed |
| **/src/assets/templates**  | (Mustache) template files  |
| **/src/js/elections**  | unminified versions of all the elections scripts  |
| **/src/js/vendors**  | third-party scripts - eg. Google fonts |
| **/src/sass**  | SASS (.scss) files |
| **/test**  | (Tape) test files |
- - -


## Usage
Run the following from the root directory (to launch a local server for the JSON feed data):
```
$ http-server
```

Open a browser to the following URL for elections results:
```
http://127.0.0.1:8080/elections.html

```

### Adding elections-carousel to a page:
Refer to the included `elections.html` for an example page.

* **HTML**: Add the `class` attribute values of `ec ec-results` to an element in the markup:
```html
<div class="ec ec-results">
```
(Shown here applied to a `<div>`, but may be applied to any element - for example: `<article>` or whatever is semantically required.)

* **CSS**: Add the (bundled) stylesheet found in the project's **/dist/css** directory to the `<head>` section of the page using:
```html 
<link href="<path-to-your-page>/dist/css/main-<dynamic-bundle-hash>.css" media="all" rel="stylesheet" type="text/css" />
```
making the appropriate modifications to the `<path-to-your-page>` and `<dynamic-bundle-hash>` values.

* **JS**: Add the (bundled) script found in the project's **/dist/js** directory above the `</body>` tag on the page using:
```html 
<script src="<path-to-your-page>/dist/js/main-<dynamic-bundle-hash>.js"></script>
```
making the appropriate modifications to the `<path-to-your-page>` and `<dynamic-bundle-hash>` values.

  * **Automatic bundle hash updates**: Running the build (`$ npm run build:production`) will *automatically* update both the CSS and JavaScript bundle hashes on the (included) `elections.html` page. (Edit `get-bundle-hash.sh` to change the page to `<your-custom-page-name>.html`.)

### Keyboard support:
To use the elections-carousel controls via the keyboard:

* Press the **Tab** key once -> the 'Back' control will have focus, ie. 'Back' is selected. (*NOTE*: The 'Back' control is not initially enabled, therefore proceed to the next step to select the 'Next' control).
* Press the **Tab** key again -> the 'Next' control will have focus.
  * *To move the carousel 'cards'/slides forward*, press the **Enter** key. (This is equivalent to a mouse-click on the 'Next' control). 
  * Repeat as many times as desired to scroll through the riding 'cards'/slides.
* *To move the riding 'cards'/slides backwards*, press the **Shift and Tab** keys simultaneously to switch focus to the 'Back' control. Press the **Enter** key to activate the 'Back' control.

### Configuration:
The following features can be (optionally) customized by the user:
* **Heading**: The default (main) heading text '`2011 Election Results`' can be replaced by providing alternative text as an argument when initializing the elections-carousel.
* **Data Feed**: Data from another source can be displayed by providing an alternative URL as an argument when the elections-carousel is initialized.

```javascript
ecarousel.init({userURL:'http://localhost:8081/foo.js', userMainHeadingText: 'user generated heading text'});
```

If no arguments are provided, the default heading and (local) data feed at `/src/assets/fixtures` are displayed.

- - -
## Running the Unit Tests

### On the command line:
Run all (Tape) tests, and read the results, on the command line using the following:

```
$ npm run test

```

Generate (Istanbul) code coverage reports using:

```
$ npm run coverage
```

### In the browser:
View (Istanbul) code coverage results in the browser at:

```
http://127.0.0.1:8080/coverage/lcov-report/
```
- - -
## License
Copyright (c) Heini Fagerlund. Licensed under the [MIT license](http://opensource.org/licenses/mit-license.php).
(See [LICENSE](https://github.com/hfagerlund/elections-carousel/blob/master/LICENSE).)
