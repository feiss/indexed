#!/bin/bash

echo "/** INDEXED" > indexed.min.js
echo "*** indexed color mode for canvas, and powered by playground and twgl" >> indexed.min.js
echo "*** indexed module copyright 2015 Diego F. Goberna"  >> indexed.min.js

echo "*** playground by rezoner (http://github.com/rezoner/playground)" >> indexed.min.js
echo "*** twgl by greggman (https://github.com/greggman/twgl.js)" >> indexed.min.js

echo "*** see http://github.com/feiss/indexed"  >> indexed.min.js
echo "*/" >> indexed.min.js

python -m jsmin ../src/playground-base.js >> indexed.min.js
cat ../src/twgl.min.js >> indexed.min.js
python -m jsmin ../src/indexed.render.js >> indexed.min.js



echo "/** INDEXED" > indexed.js
echo "*** indexed color mode for canvas, and powered by playground and twgl" >> indexed.js
echo "*** indexed module copyright 2015 Diego F. Goberna"  >> indexed.js


echo "*** playground by rezoner (http://github.com/rezoner/playground)" >> indexed.js
echo "*** twgl by greggman (https://github.com/greggman/twgl.js)" >> indexed.js

echo "*** see http://github.com/feiss/indexed"  >> indexed.js
echo "*/" >> indexed.js

cat ../src/playground-base.js >> indexed.js
cat ../src/twgl.min.js >> indexed.js
cat ../src/indexed.render.js >> indexed.js
