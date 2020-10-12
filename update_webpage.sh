#!/bin/bash

cd src
node generate_css.js
node update_webpage_index.js
cd ..
cp ./dist/tech-badges.css ./webpage/assets/css/tech-badges.css

# create commit 
# git subtree push --prefix web-page origin gh-pages
