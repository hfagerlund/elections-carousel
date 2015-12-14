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
