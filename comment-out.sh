#!/bin/bash

#: title	:  comment-out.sh
#: description	:  indents (by 4 spaces) and comments out all lines in source file containing 'TEST_CODE2' string; omits indentation for lines containing 'TEST_CODE1' string.
#: usage        :  $ chmod 0750 comment-out.sh ##to make script executable
#                  $ ./comment-out.sh ##to run script from root directory
#: version	: 2.0.1

sed -i '/TEST_CODE1/ s/^/\/\//g' ./src/js/elections/elections-carousel.js
sed -i '/TEST_CODE2/ s/^/    \/\//g' ./src/js/elections/elections-carousel.js
