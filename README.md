# FCCA3 simulator
This is a FCCA3 (Face-centered Cubic Cellular Automata with 3 states) simulator.  
This program needs three.js and is confirmed to run on r137 (https://github.com/mrdoob/three.js/releases).

How to run:
1. Copy the files "FCCA3SV.html", "FCCA3SVauto.js", and "three.js" in a same folder.
2. Drag and drop the file "FCCA3SV.html" into Chrome.

How to edit the configuration
Edit the configuration section beneath the function loadConf.

The state of the cell with the coordinates (x,y,z) is given by
Lattice[0][x/2][y][z],
where '/' means integer division, e.g. 3/2 = 1.


