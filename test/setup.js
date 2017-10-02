var jsdom = require('jsdom');

function setupDom() {
  if (typeof document !== 'undefined') {
    return;
  }

  global.document = jsdom.jsdom('<html><body></body></html>');
  global.window = document.defaultView;

  var jquery = require('jquery');
  global.$ = require('jquery')(window);
};

setupDom();

