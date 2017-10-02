#!/bin/bash

#: title	:  uncomment.sh
#: description	:  removes comments from all lines in source file containing 'TEST_CODE' string.
#: usage        :  $ chmod 0750 uncomment.sh ##to make script executable
#                  $ ./uncomment.sh ##to run script from root directory
#: version	: 2.0.0


##will strip multiple leading // from line
sed -i '/TEST_CODE/s/^\/\/*//g' ./src/js/elections/elections-carousel.js

