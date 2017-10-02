# elections-carousel

[![Build Status](https://travis-ci.org/hfagerlund/elections-carousel.svg?branch=master)](https://travis-ci.org/hfagerlund/elections-carousel)

Carousel presentation of data from a JSON feed of election results.

Enables scrolling through the election results for all ridings using the Next and Back controls (via mouse or keyboard), displaying the number of votes and automatically calculating the percentage of the vote won by each candidate in each riding.

<img style="max-width:100%;" alt="screenshot of elections-carousel page" src="/screenshots/screenshot_elections-html.png" align="center" /><br />
*Figure 1: screenshot of elections.html page*

Refer to the [documentation](https://hfagerlund.github.io/elections-carousel/) for complete details of customization and usage.
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

## Quick start

```
# clone the repo
$ git clone https://github.com/hfagerlund/elections-carousel.git

# install dependencies
$ npm install

# launch local server (for data feed)
$ http-server

## browse to http://127.0.0.1:8080/elections.html

```

## Features

* Automatic [bundle hash updates](https://hfagerlund.github.io/elections-carousel/);
* [Customizable](https://github.com/hfagerlund/elections-carousel#parameters);
* Modular (UMD support);
* [Keyboard support](https://hfagerlund.github.io/elections-carousel/developer-guide/usage/#keyboard-support).

## Parameters:
The following carousel features can be (optionally) customized:

| Parameter | Type<br><a id="default" name="default">(Default value) | Description |
| --- | --- | --- |
| **url** | url<br>*(default value: http://127.0.0.1:8080/src/assets/fixtures/results.js)* | The URL for the (JSON) data feed |
| **callback** | `string`<br>*(default value: gNews_getRidingDetailsCallback)* | The JSON-P callback function name |
| **headingtext** | `string`<br>*(default value: 2011 Election Results)* | The text content of the `<h1></h1>` tags |
| **slidewidth** | `int`<br>*(default value: 600)* | The width (in **px**) of each riding 'slide' |
| **templateid** | `string`<br>*(default value: #viewTemplate)* | The template identifier (ie. within the **template file** - refer to [templatepath](https://github.com/hfagerlund/elections-carousel#templatepath)) |
| <a id="templatepath" name="templatepath">**templatepath**</a> | path<br>*(default value: http://127.0.0.1:8080/src/assets/templates/viewFull.mustache)* | The full (absolute) path to the Mustache template file |
| **transitiontime** | `int`<br>*(default value: 300)* | The time span (in **milliseconds**) for carousel slide movement/rotation |

- - -

### Initialization:

#### No arguments:
If no arguments are provided when it is initialized, the module will run using its **default values**.

**Example:**

```javascript
ElectionsCarousel.init({});
```

is equivalent to:

```javascript
ElectionsCarousel.init({
                url            :'http://127.0.0.1:8080/src/assets/fixtures/results.js',
                callback       :'gNews_getRidingDetailsCallback',
                headingtext    : '2011 Election Results',
                slidewidth     : 600,
		templateid     : '#viewTemplate',
		templatepath   : 'http://127.0.0.1:8080/src/assets/templates/viewFull.mustache',
		transitiontime : 300
              });
```

- - -

#### Overriding a selected parameter's default value:
**Example**: Initialize the module with an explicit `'transitiontime'` value of 100 msec in order to override the default (of 300 msec) as follows:

```javascript
ElectionsCarousel.init({transitiontime: 100});
```
(NOTE: [Default values](https://github.com/hfagerlund/elections-carousel#default) will be used for all other unspecified parameters.)

- - -
## Running the Unit Tests

### On the command line:
Run all (Tape) tests, and read the results, on the command line using the following:

```
$ npm run test

```

- - -
## License
Copyright (c) Heini Fagerlund. Licensed under the [MIT license](http://opensource.org/licenses/mit-license.php).
(See [LICENSE](https://github.com/hfagerlund/elections-carousel/blob/master/LICENSE).)
