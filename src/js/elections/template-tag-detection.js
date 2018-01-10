/*
 * check whether browser supports new HTML5 'template' tag
**/
function supportsTemplate() {
  return 'content' in document.createElement('template');
}

if (supportsTemplate()) {
  console.log('browser supports HTML5 template tag!');
} else {
  //use old templating techniques or libraries
  console.log('NO support for HTML5 template tag in this browser');
}
