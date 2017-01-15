QUnit.module( "setup and teardown", {
beforeEach: function() {
	assert.ok( true, "one extra assert per test" );
}, afterEach: function() {
	assert.ok( true, "and one extra assert after each test" );
}
});

QUnit.module("UI tests");

QUnit.test( "verify that required elements exist", function( assert ) {
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

QUnit.test( "verify location of wrapper div relative to main element", function( assert ) {
    var wrapperDiv = document.evaluate("/html/body/main/div", document, null, XPathResult.ANY_TYPE, null);
    assert.equal((new RegExp(wrapperDiv)).test('//*[@id="wrapper"]'), true, "wrapper div is located inside main element");
});


QUnit.test( "verify location of buttons relative to wrapper", function( assert ) {
    var backBtnPath = document.evaluate("/html/body/main/wrapper/a[1]", document, null, XPathResult.ANY_TYPE, null);
    var nextBtnPath = document.evaluate("/html/body/main/wrapper/a[2]", document, null, XPathResult.ANY_TYPE, null);
    assert.equal((new RegExp(backBtnPath)).test('a[contains(@class,"btn--back")'), true, "Back button was found as a child of the wrapper div");
    assert.equal((new RegExp(nextBtnPath)).test('a[contains(@class,"btn--next")'), true, "Next button was found as a child of the wrapper div");
});

QUnit.test("verify that correct riding cards are displayed when buttons are clicked", function( assert ) {
    var positionAfterFirstClickNext = BoD.btnClick('btnNext','click');
    assert.equal(positionAfterFirstClickNext,-500,'2nd (Antigonish) riding card is visible after Next button is clicked'); 
    var positionAfterSecondClickNext = BoD.btnClick('btnNext','click');
    assert.equal(positionAfterSecondClickNext,-1000,'3rd (Argyle-Barrington) riding card is visible after Next button is clicked again (twice)'); 

    var positionAfterFirstClickBack = BoD.btnClick('btnBack','click');
    var positionAfterSecondClickBack = BoD.btnClick('btnBack','click');
    assert.equal(positionAfterSecondClickBack,0,'1st (Annapolis) riding card is visible after Back button is clicked twice'); 
});
