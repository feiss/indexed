# Indexed
(work in progress!)

Javascript game framework emulating old 8-bit indexed color mode

It supports both canvas 2D and WebGL (default, using __twgl__).

Only PCX indexed image format supported yet, and PAL for palettes.

* src/__indexed.render.js__: core classes for drawing: Stage, Buffer, Palette
* __build__ folder: library packed together with playground and twgl

Live examples: http://feiss.be/exp/indexed/examples/

MIT Licensed. [playground](http://github.com/rezoner/playground) by @rezoner, 
[twgl](http://github.com/greggman/twgl.js) by @greggman.

Thanks to the above authors and Javier Campos for optimization tips.
