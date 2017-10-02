/*!
 * elections-carousel
 * @copyright (c) Heini Fagerlund
 * @version 2.0.0
 * @license MIT
 */

require('./setup');

var test = require('tape');
var eCarousel = require('../src/js/elections/elections-carousel.js');


test('module loading', function (assert) {
  assert.plan(2);
  assert.ok(eCarousel, 'the module loaded');
  assert.equal(typeof eCarousel, 'object', 'eCarousel is an object');
});

test('test callback (without making an Ajax request)', function (assert) {
  var mockData = {
			"id": 1,
			"name": "Annapolis",
			"num": 1,
			"pollsReported": 357, //***
			"pollsTotal": 57,
			"results": [
				{
					"name": "Henry Spurr",
					"partyId": 13,
					"votes": 834,
					"isElected": false,
					"partyCode": "NDP"
				}
			]
		}

  assert.equal(typeof eCarousel.extendData, 'function', 'eCarousel.extendData (callback function) is a function');

  var expectedResult = 357;
  assert.equal(eCarousel.extendData(mockData), expectedResult, 'extendData produces expected structure');


  assert.end();
});

