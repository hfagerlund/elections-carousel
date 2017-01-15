//customreporter.js - prints success message if JSHint passed the file and FAIL if it did not
"use strict";

module.exports = {
  reporter: function (errors) {
    console.log(errors.length ? "JSHint: FAIL" : "JSHint: Success! All files lint free");
  }
};
