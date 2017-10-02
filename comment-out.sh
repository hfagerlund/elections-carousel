#!/bin/bash

#: title	:  comment-out.sh
#: description	:  comments out all lines in source file containing 'TEST_CODE'  string.
#: usage        :  $ chmod 0750 comment-out.sh ##to make script executable
#                  $ ./comment-out.sh ##to run script from root directory
#: version	: 2.0.0

sed -i '/TEST_CODE/ s/^/\/\//g' ./src/js/elections/elections-carousel.js
