#!/usr/bin/env sh
#
# get-bundle-hash.sh
#
# Gets the (dynamic) chunkhash values of the compiled CSS and JS bundles and automatically updates them in the HTML page (elections.html).
#
# Usage:
# $ chmod +x get-bundle-hash.sh
# $ get-bundle-hash.sh
#
# author: Heini Fagerlund
# version: 1.0.0
# license: MIT
#
# Copyright (c) Heini Fagerlund
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.

##---------------------------------
# REPLACE with your custom page name (default: elections.html)
htmlPage=elections.html

## do not edit below----------------
# update JavaScript file references:
sed -i "s/dist\/js.*\.js/dist\/js\/$(ls dist/js)/g" $htmlPage

# update CSS file references:
sed -i "s/dist\/css.*\.css/dist\/css\/$(ls dist/css)/g" $htmlPage
