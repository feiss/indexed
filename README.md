# INDEXED
(work in progress! still not usable)

Javascript game framework emulating old 8-bit indexed color mode

It supports both canvas 2D and WebGL (default, using [twgl](twgljs.org)).

Only PCX indexed image format supported yet, and PAL for palettes.

* __indexed.render.js__: core classes for drawing: Stage, Buffer, Palette
* __indexed.engine.js__: helper classes and functions for building a game: Loader, GameLoop, Input, Sprite, ParticleSystem, Timer...