# FCCA3 simulator
This is a FCCA3 (Face-centered Cubic Cellular Automata with 3 states) simulator.  
This program needs three.js and is confirmed to run on r137 (https://github.com/mrdoob/three.js/releases).

## How to run:
1. Copy the files "FCCA3SV.html", "FCCA3SV.js", and "three.js" in a same folder.
2. Drag and drop the file "FCCA3SV.html" into the browser.

## How yo quit:
Close the "FCCA3SV.html" tab of the browser.

## How to edit the configuration
Edit the configuration section beneath the function loadConf.

The state of the cell with the coordinates (x,y,z) is given by
Lattice[0][x/2][y][z],
where '/' means integer division, e.g. 3/2 = 1.
x + y + z must be even. So you can choose the coordinate (3,4,5)
but cannot choose the coordinate (3,4,4).

## Transition rule
The transition rule is descrubed as gollowing;
c(t+1) = F( c(t), n2(t), n1(t) ),
where c(t) is the state of the self at time t, n2(t) is the number of state-2 in the surr

## Parameters you can modify in FCCA3SVauto.js
# Rule set
The rule set is designated in initRl.


# Lattice size
Y_SIZE and Z_SIZE are the lattice sizes in y and z axis respectively.
Both Y_SIZE and Z_SIZE must be even.
X_SIZE is half the lattice size in x axis. Therefore,
you can choose x-coordinate from 0 .. (X_SIZE * 2 - 1).
X_SIZE can take both even and odd.

# Cell state
The array opaSt designates the opacity of the cells in each state. 
