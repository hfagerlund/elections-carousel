/*!
 * elections-carousel
 * @copyright (c) Heini Fagerlund
 * @version 1.0.0
 * @license MIT
 */

var test = require('tape');
var eCarousel = require('../src/js/elections/elections-carousel.js');


test('module loading', function (assert) {
  assert.plan(1);
  assert.ok(eCarousel, 'the module loaded');
});


var mocknum1 = 86.5735123;
var mocknum2 = 2000.92690;
var mocknum3 = 457.0908765;

test('rounding up percentage of votes', function (assert) {
  assert.plan(3);

  assert.equal(eCarousel.prototype.roundToTwoDec(mocknum1), 86.57, 'correct rounding (up) of vote percentage');
  assert.equal(eCarousel.prototype.roundToTwoDec(mocknum2), 2000.93, 'correct rounding (up) of vote percentage');
  assert.equal(eCarousel.prototype.roundToTwoDec(mocknum3), 457.09, 'correct rounding (up) of vote percentage');
});

