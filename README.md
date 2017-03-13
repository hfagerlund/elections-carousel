# elections-carousel

[![Build Status](https://travis-ci.org/hfagerlund/elections-carousel.svg?branch=master)](https://travis-ci.org/hfagerlund/elections-carousel)

Carousel presentation of data from a JSON feed of election results.

Enables scrolling through the election results for all ridings using the Next and Back buttons, displaying the number of votes and percentage of the vote won by each candidate in each riding.

<img style="max-width:100%;" alt="screenshot of elections-carousel page" src="/screenshots/screenshot_elections-html.png" align="center" /><br />
*Figure 1: screenshot of elections.html page*

- - -

## Table of Contents:
* [Requirements](https://github.com/hfagerlund/elections-carousel#requirements)
* [Installation](https://github.com/hfagerlund/elections-carousel#installation)
  * [File structure](https://github.com/hfagerlund/elections-carousel#file-structure)
  * [Configuration](https://github.com/hfagerlund/elections-carousel#configuration)
* [Usage](https://github.com/hfagerlund/elections-carousel#usage)
  * [Adding elections-carousel to another page](https://github.com/hfagerlund/elections-carousel#adding-elections-carousel-to-another-page)
    * [Example page](https://github.com/hfagerlund/elections-carousel#example-page)
* [Running the Unit Tests](https://github.com/hfagerlund/elections-carousel#tests)
  * [In the browser](https://github.com/hfagerlund/elections-carousel#in-the-browser)
  * [On the command line](https://github.com/hfagerlund/elections-carousel#command-line)
* [License](https://github.com/hfagerlund/elections-carousel#license)

---

### Other:
* [Changelog](https://github.com/hfagerlund/elections-carousel/blob/master/CHANGELOG.md)
* [Releases](https://github.com/hfagerlund/elections-carousel/releases)
* [Roadmap](https://github.com/hfagerlund/elections-carousel/projects/1)

- - -
- - -

## Requirements
- npm
  - jQuery
  - QUnit
  - SASS

(All copyrights for the above remain with their respective owners.)

- - -

## Installation
Clone the repository using:
```
$ git clone https://github.com/hfagerlund/elections-carousel.git
```
or download the **elections-carousel** project in [.zip format](https://github.com/hfagerlund/elections-carousel/archive/master.zip).

> _**NOTE:**_ **For current development** (ie. [still in progress](https://github.com/hfagerlund/elections-carousel/projects/1)), please see the [latest feature branch](https://github.com/hfagerlund/elections-carousel/tree/modularization-commonjs). 

Install all required [dependencies](https://github.com/hfagerlund/elections-carousel#requirements) by running:
```
$ npm install
```
from inside the directory where you extracted the **elections-carousel** project (ie. in the same directory where package.json is located).

### File structure:
```
├── dist
│   ├── css
│   └── js
├── json_feed
├── node_modules
├── screenshots
├── src
│   ├── js
│   │   ├── elections
│   │   └── vendors
│   └── sass
└── test
```
| Directory:  | Contains: |
| ------------- | ------------- |
| **/dist**  | production-ready (minified,concatenated) files |
| **/dist/css**  | compiled CSS (.css) files |
| **/dist/js** | minified version of the combined elections scripts  |
| **/json_feed**  | local version of the JSON election results feed  |
| **/node_modules**  | **npm** package(s)/files |
| **/screenshots**  | screenshots of the **elections-carousel** project |
| **/src**  | all project source code |
| **/src/js/elections**  | unminified versions of all the elections scripts  |
| **/src/js/vendors**  | third-party scripts - eg. Google fonts |
| **/src/sass**  | SASS (.scss) files |
| **/test**  | QUnit test files |
- - -

### Configuration
**Note:** This section is *optional* - use these instructions only if setting up a local server to replace the included (Node) server configuration.

* Replace the URL in [elections.js](https://github.com/hfagerlund/elections-carousel/blob/master/elections-carousel/js/elections/elections.js#L217) with `http://<path-to-json-feed-election-results.js>` so that it resembles:
```
var url = 'http://somehost/somedir/results.js';
```
* Remove the lines indicated by `<!-- DEV -->` comments (for use in a **development environment**), and uncomment the lines indicated by `<!-- PROD -->` comments (for use on a live site). For example, use the following link to the stylesheet in a production environment:

```
<link href="<path-to-your-page>/dist/css/screen.min.css" media="screen" rel="stylesheet" type="text/css" />
```
making the appropriate modification to `<path-to-your-page>`.
- - -
## Usage
Open a browser to the following URL for elections results:
```
<path-to-project-root>/elections.html

```
where `<path-to-project-root>` is replaced with the path to your **elections-carousel** installation.

### Adding elections-carousel to another page:
* **CSS**: Add the **elections-carousel** stylesheet (found in the project's **/dist/css** directory) to the page using:
```html 
<link href="<path-to-your-page>/dist/css/screen.min.css" media="screen" rel="stylesheet" type="text/css" />
```
making the appropriate modification to `<path-to-your-page>`.

* **JS**: Add the **elections-carousel** scripts (found in the project's **/dist/js** directory) to the page using:
```html 
<script src="<path-to-your-page>/dist/js/election.all.min.js"></script>
```
making the appropriate modification to `<path-to-your-page>`.

* **HTML**: All that is required to use the **elections-carousel** component on a page is an element in the markup with the `id` attribute value of `eResults`:
```html
<div id="eResults">
```

#### Example page
An example page is provided (at **/another-page_example.html**) showing the **elections-carousel** component used on a page containing other elements.

(_NOTE_: The **elections-carousel** module requires that jQuery is being used on your page.)
- - -
## Running the Unit Tests

Prior to running the tests, run the following (from the root directory) to launch a local server for the JSON feed data:
```
$ cd json_feed
$ http-server
```

#### In the browser:
Read the QUnit test results in the browser at URL:
```
<path-to-project-root>/test/elections.html

```

#### On the command line:
Run all (QUnit) tests, and read the results, on the command line using the following:

```
$ npm run qunit

```
- - -
## License
Copyright (c) Heini Fagerlund. Licensed under the [MIT license](http://opensource.org/licenses/mit-license.php).
(See [LICENSE](https://github.com/hfagerlund/elections-carousel/blob/master/LICENSE).)
