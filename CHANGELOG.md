# Changelog:

- - -
## 2.0.0 - 2017-10-02
#### New features:
* Enabled more parameters to be user-configurable
* Added scripts to enable testing (by automating addition of test code blocks to source)

#### Changed:
* Refactored module methods - improved readability
* Relocated classnames, text content from script to (Mustache) template - improved separation of concerns
* Improved usability, look-and-feel:
  * Repositioned carousel control elements (fixed position, independent of height of slide)
  * More obvious 'highlighting' of winning candidate information
  * Realigned layout of text results/'legend' for graphs - easier readability
* Updated screenshot; added README section on 'Parameters'; added corresponding links to [documentation](https://hfagerlund.github.io/elections-carousel/) for sections relocated from README

#### Known Issues:
* comment-out.sh adds *multiple* leading forward slashes (issue is currently remedied in uncomment.sh which strips out all leading slashes - TODO: fix this in the comment-out.sh script itself).

- - -
## 1.0.1 - 2017-07-08
#### Fixed:
* Accessibility:
  * Replaced carousel control elements in template and modified corresponding attributes, behaviour, styling

- - -
## 1.0.0 - 2017-04-26
#### New features:
* Universal Module Definition (UMD) support
* Mustache client-side templating (cleaner separation of concerns)
* Support for coding style consistency (added .editorconfig)
* Code coverage reporting (using Istanbul)
* Preliminary cleanup for (potential future) npm package creation
* Integrated with Travis CI server
* Added local server setup (for data feed)
* Introduced CHANGELOG (ie. extracted into a separate document from README)

#### Changed:
* Launched [project documentation site](https://hfagerlund.github.io/elections-carousel/)
* Replaced QUnit test harness with TAPE (to support Node as well as browser)
  * ~~Upgraded QUnit version (from v.1.14.0 to v.2.0.1)~~
* Directory structure modifications (eg. relocated sample data feed)
* Modified markup, semantic improvements (eg. 'grouping' of text summary elements with container)
* Accessibility improvements:
  * Added ARIA role and support for carousel control activation using space bar, keyboard
* Styling changes:
  * Revised container identifiers (new classnames)
  * Fixed main heading display, indentation
  * Carousel controls' arrow icons and disabled/enabled state styling relocated from markup and script respectively
  * Removed 'print' stylesheet ('media' attribute for main stylesheet changed from 'screen' to 'all')
* Improved (JavaScript) linting
* Simplified dependency management, augmented build toolchain
  * Added Webpack (v.2.3.3)
  * Build runs using npm (removed Grunt)
  * Dependencies *fully* managed using npm (removed Bower)
* Updated format of README

- - -
## 0.4.0 - 2016-01-13
#### New features: 
* New look-and-feel (GUI improvements):
  * Switched from horizontal to vertical bars
   * Height of bars provides visualization of percentage of votes per candidate
  * Styling improvements: font updates, gradients, party 'labels' (included in list format), emphasized riding vote totals
  * (Minor) text copy changes

#### Changed:
* Improved alphabetical ordering of styling rules
* Removed unnecessary role attributes
* Updated screenshot

- - -
## 0.3.0 - 2016-01-13
#### Changed:
* Results listed in descending numeric order (reordered)

- - -
## 0.2.1 - 2015-12-14
#### Fixed:
* Removed deprecated code

- - -
## 0.2.0 - 2015-12-14
#### New features:
* Defined  global, read-only variables (JSHint strict mode)
* Automated package management

#### Changed:
* Refactored code, performance improvements
* Improved vote percentages (to 2 decimal places; totals 100%)
* Accessibility enhancement: 'Elected' text rendering

#### Fixed:
* Button (enabled/disabled) state bugs

- - -
## 0.1.1 - 2015-07-05 
#### New features:
* Enhanced button states

- - -
## 0.1.0 - 2015-07-05 
#### New features:
* Initial version

- - -
#### *Notes*: 
* All dates shown in YYYY-MM-DD format
* Using [SemVer](http://semver.org/)
* Using GitHub flow
