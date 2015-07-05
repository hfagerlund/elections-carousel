module( "setup and teardown", {
setup: function() {
	assert.ok( true, "one extra assert per test" );
}, teardown: function() {
	assert.ok( true, "and one extra assert after each test" );
}
});

module("UI tests");

test( "verify that required elements exist", function( assert ) {
    var main = $("#eResults");
    var wrapper = $("#wrapper");
    var btns = $(".btn");
    var btnBack = $(".btn--back");
    var btnNext = $(".btn--next");
    var articles = document.getElementsByTagName("article");
    var ridings = document.getElementsByClassName("riding");

    assert.ok( main.length !== 0, "main element exists" );
    assert.equal( main.length, 1, "correct number of main elements (one) found" );
    assert.ok( wrapper.length !== 0, "wrapper element exists" );
    assert.equal( wrapper.length, 1, "correct number of wrapper divs (one) found" );
    assert.ok( btns.length !== 0, "button element exists" );
    assert.equal( btns.length, 2, "correct number of buttons (two) found" );
    assert.equal( btnBack.length, 1, "correct number of Back buttons (one) found" );
    assert.equal( btnNext.length, 1, "correct number of Next buttons (one) found" );
    assert.equal( articles.length, 10, "correct number of articles (ten) found" );
    assert.equal( ridings.length, 10, "correct number of ridings (ten) found" );
});

test( "verify location of wrapper div relative to main element", function( assert ) {
    var wrapperDiv = document.evaluate("/html/body/main/div", document, null, XPathResult.ANY_TYPE, null);
    equal((new RegExp(wrapperDiv)).test('//*[@id="wrapper"]'), true, "wrapper div is located inside main element");
});


test( "verify location of buttons relative to wrapper", function( assert ) {
    var backBtnPath = document.evaluate("/html/body/main/wrapper/a[1]", document, null, XPathResult.ANY_TYPE, null);
    var nextBtnPath = document.evaluate("/html/body/main/wrapper/a[2]", document, null, XPathResult.ANY_TYPE, null);
    equal((new RegExp(backBtnPath)).test('a[contains(@class,"btn--back")'), true, "Back button was found as a child of the wrapper div");
    equal((new RegExp(nextBtnPath)).test('a[contains(@class,"btn--next")'), true, "Next button was found as a child of the wrapper div");
});

/*
test( "shows button color change when disabled", function() {
	var btnID = 'Back';
    var stylesheetLength = document.styleSheets[1].cssRules.length; 
    var lastRule = document.styleSheets[1].cssRules[(stylesheetLength -1)].cssText; 
    var btns = document.getElementsByClassName("btn");
    var btnBack = btns[0];

    var evt = document.createEvent('CustomEvent');  
    evt.initCustomEvent('click', false, false, null);
    document.getElementsByClassName("btn")[0].dispatchEvent(evt);

    equal(lastRule, ".btn--back{background-color:#ffcccc;cursor:text;}", "new rule successfully added to main stylesheet");
});
*/

module("calculation tests");

test('verify total number of votes for each riding', function() {
    equal(sumPartyVotes([834,7709,1390,227]), 10160, "correct: sum of votes for riding is 10160");
    equal(sumPartyVotes([2868,3882,2323]), 9073, "correct: sum of votes for riding is 10160");
    equal(sumPartyVotes([2909,3931,355]), 7195, "correct: sum of votes for riding is 10160");
    equal(sumPartyVotes([6080,1700,2026,217]), 10023, "correct: sum of votes for riding is 10160");
    equal(sumPartyVotes([3440,3282,873]), 7595, "correct: sum of votes for riding is 10160");
    equal(sumPartyVotes([4390,1667,1696]), 7753, "correct: sum of votes for riding is 10160");
    equal(sumPartyVotes([3193,3341,2943]), 9477, "correct: sum of votes for riding is 10160");
    equal(sumPartyVotes([842,5122,2911,492]), 9367, "correct: sum of votes for riding is 10160");
    equal(sumPartyVotes([5569,1448,1236]), 8253, "correct: sum of votes for riding is 10160");
    equal(sumPartyVotes([3304,2293,2220]), 7817, "correct: sum of votes for riding is 10160");   
});

test('verify percentage of votes per candidate in a riding', function() {
    //for Riding 1 - Annapolis: 
    equal(percentageVotesForCandidate([834,7709,1390,227]), 2, "correct: candidate number 4 received 227 votes, equal to 2 percent of the total votes for this riding"); //result for last candidate in Riding 1
});
