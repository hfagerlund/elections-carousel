#!/bin/bash

#: title	:  uncomment.sh
#: description	:  removes comments and indentations from all lines in source file containing 'TEST_CODE' string.
#: usage        :  $ chmod 0750 uncomment.sh ##to make script executable
#                  $ ./uncomment.sh ##to run script from root directory
#: version	: 2.0.1


##strip leading whitespaces from lines with 'TEST_CODE'
sed -i "/TEST_CODE/s/^ *//" ./src/js/elections/elections-carousel.js
##strip multiple leading // from lines with 'TEST_CODE'
sed -i '/TEST_CODE/s/^\/\/*//g' ./src/js/elections/elections-carousel.js
