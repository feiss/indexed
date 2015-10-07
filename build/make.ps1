#!/bin/bash

echo "/** INDEXED
*** indexed color mode for canvas, and powered by playground and twgl
*** indexed module copyright 2015 Diego F. Goberna

*** playground by rezoner (http://github.com/rezoner/playground)
*** twgl by greggman (https://github.com/greggman/twgl.js)

*** see http://github.com/feiss/indexed
*/" > indexed.min.js


cat libs/playground-base.min.js >> indexed.min.js
cat libs/twgl.min.js >> indexed.min.js
echo "/** INDEXED
*** indexed color mode for canvas, and powered by playground and twgl
*** copyright 2015 Diego F. Goberna, MIT licensed
*** see http://github.com/feiss/indexed
*/" >> indexed.min.js
python -m jsmin ../src/indexed.render.js >> indexed.min.js



echo "/** INDEXED
*** indexed color mode for canvas, and powered by playground and twgl
*** indexed module copyright 2015 Diego F. Goberna

*** playground by rezoner (http://github.com/rezoner/playground)
*** twgl by greggman (https://github.com/greggman/twgl.js)

*** see http://github.com/feiss/indexed
*/" > indexed.js

cat libs/playground-base.min.js >> indexed.js
cat libs/twgl.min.js >> indexed.js
cat ../src/indexed.render.js >> indexed.js
