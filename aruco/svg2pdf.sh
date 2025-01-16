#!/usr/bin/env bash

###
#
# @copyright (c) 2025. All rights reserved.
#
# @project        Aruco
# @author         Nicolas Jeanmonod
# @date           January 2025
#
# CONVERT SVG TO PDF WITH HEADLESS CHROME
#
# PREREQUISITES:
# Chrome (required): https://www.google.com/chrome/
# exiftool (optional): https://exiftool.org/ sudo apt install libimage-exiftool-perl
#
# READINGS:
# https://developers.google.com/web/updates/2017/04/headless-chrome
# https://source.chromium.org/chromium/chromium/src/+/master:headless/app/headless_shell_switches.cc
#
##

# Variables.
FILENAME=out
TITLE="P2 CAMERA CALIBRATION CANVAS"
SUBJECT="P2 CAMERA CALIBRATION CANVAS"
AUTHOR="Nicolas Jeanmonod"

# Alias to Headless Chrome.
shopt -s expand_aliases
if [[ "$OSTYPE" == "darwin"* ]]; then
    alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
    alias xdg-open="open"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    # whereis google-chrome
    alias chrome="/usr/bin/google-chrome"
else
    echo -e "$OSTYPE is not supported."
    exit 1
fi

# Transform SVG to PDF.
# Note that the print-to-pdf-no-header option works only in Chrome
# Canary. This is not a big issue here because there is no margins in
# the document and the header are thus printed outside of the visible
# area.
chrome \
    --headless \
    --print-to-pdf-no-header \
    --print-to-pdf=$FILENAME.pdf \
    $FILENAME.svg \
    > /dev/null 2>&1
status_code=$?
if [[ $status_code -ne 0 ]]; then
    exit $status_code
fi

# Edit metadata.
if hash exiftool 2>/dev/null; then
    exiftool \
        -Title="$TITLE" \
        -Subject="$SUBJECT" \
        -Author="$AUTHOR" \
        $FILENAME.pdf \
        > /dev/null 2>&1

    # Cleanup exiftool backup.
    rm $FILENAME.pdf_original
else
    echo -e "\nWARNING: exiftool not installed. See https://exiftool.org/ or sudo apt install libimage-exiftool-perl."
fi

# Open PDF file.
xdg-open $FILENAME.pdf
