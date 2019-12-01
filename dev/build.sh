#!/bin/bash

# Be sure to be at the root of the project.
DIRECTORY=$(
  cd "$(dirname "${BASH_SOURCE[0]}")"
  pwd -P
)
cd "$DIRECTORY"
cd ..

echo "Removing the build directory..."
rm -rf build

echo "Creating JavaScript bundles..."
webpack --mode development --config dev/webpack.config.js

echo "Copying CSS files..."
cp src/css/*.css build

echo "Creating browser extension directories..."
cp -r src/extension-chrome build/extension-chrome
cp -r src/extension-firefox build/extension-firefox

echo "Removing manifest comments..."
./node_modules/.bin/strip-json-comments src/extension-chrome/manifest.json > build/extension-chrome/manifest.json
./node_modules/.bin/strip-json-comments src/extension-firefox/manifest.json > build/extension-firefox/manifest.json

echo "Copying bundled scripts to the browser extensions..."
cp build/*.js build/extension-chrome
cp build/*.map build/extension-chrome
cp build/*.css build/extension-chrome

cp build/*.js build/extension-firefox
cp build/*.map build/extension-firefox
cp build/*.css build/extension-firefox

echo "Creating extension files..."
zip -j build/github-rte-firefox.xpi build/extension-firefox/*.*

echo "Cleaning up..."
rm build/*.js
rm build/*.map
rm build/*.css
