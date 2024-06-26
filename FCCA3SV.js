/// Three-state Face Centered Cellular Automata Simple Viewer
/// developed on three.js (r137)
/// 
/// Copyright 2017, 2022, 2024 KIT Ninagawa lab
/// Released under the MIT license.
/// see https://opensource.org/licenses/MIT

/// Model data
/// rule set for GI, GII, GIII, GIV, GV, SIx, SIIx, SIIIx
const rTbl  =	[////// c = 0
		0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,	// #2 = 0	f(0,0,0)=0, f(0,0,1)=0, f(0,0,2)=1, f(0,0,3)=0
		0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,	// #2 = 1	f(0,1,0)=0, f(0,1,1)=0, f(0,1,2)=1
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,		// #2 = 2	f(0,2,0)=0, f(0,2,1)=0, f(0,2,2)=0
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,		// #2 = 3	f(0,3,1)=0
		0, 0, 0, 0, 0, 0, 0, 0, 0,		// #2 = 4	f(0,4,0)=0
		0, 0, 0, 0, 0, 0, 0, 0,		// #2 = 5
		0, 0, 0, 0, 0, 0, 0,			// #2 = 6
		0, 0, 0, 0, 0, 0,			// #2 = 7
		0, 0, 0, 0, 0,			// #2 = 8	f(0,8,4)=0
		0, 0, 0, 0,			// #2 = 9
		0, 0, 0,				// #2 = 10
		0, 0,				// #2 = 11
		0,				// #2 = 12	f(0,12,0)=0
/////////  c = 1
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,	// #2 = 0	f(1,0,0)=0, f(1,0,1)=0
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,	// #2 = 1
		2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0,		// #2 = 2	f(1,2,0)=2, f(1,2,1)=2
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0,		// #2 = 3
		1, 1, 0, 0, 0, 0, 0, 0, 0,		// #2 = 4	f(1,4,0)=1, f(1,4,1)=1
		1, 0, 0, 0, 0, 0, 0, 0,		// #2 = 5	f(1,5,0)=1
		0, 0, 0, 0, 0, 0, 0,			// #2 = 6
		0, 0, 0, 0, 0, 0,			// #2 = 7
		0, 0, 0, 0, 1,			// #2 = 8	f(1,8,4)=1
		0, 0, 0, 0,			// #2 = 9
		0, 0, 0,				// #2 = 10
		0, 0,				// #2 = 11
		1,				// #2 = 12	f(1,12,0)=1
/////////  c = 2
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,	// #2 = 0	f(2,0,1)=f(2,0,2)=0
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,	// #2 = 1	f(2,1,2)=f(2,1,3)=0
		0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0,		// #2 = 2	f(2,2,2)=2, f(2,2,3)=2
		0, 0, 2, 0, 0, 0, 0, 0, 0, 0,		// #2 = 3	f(2,3,2)=2
		2, 2, 0, 0, 0, 0, 0, 0, 0,		// #2 = 4	f(2,4,0)=2, f(2,4,1)=2
		2, 0, 0, 0, 0, 0, 0, 0,		// #2 = 5	f(2,5,0)=2
		0, 0, 0, 0, 0, 0, 0,			// #2 = 6
		0, 0, 0, 0, 0, 0,			// #2 = 7
		0, 0, 0, 0, 2,			// #2 = 8	f(2,8,4)=2
		0, 0, 0, 0,			// #2 = 9
		0, 0, 0,				// #2 = 10
		0, 0,				// #2 = 11
		2 ];				// #2 = 12	f(2,12,0)=2



const  rTblLen = 273;  // length of rTbl
const  N_singleRls = 91;  // # of rules per states = rTblLen / N_ST
const  N_ST = 3;  // # of states
const  N_NBR = 13; // # of cells in neighborhood
const  X_SIZE = 16;  // any 3-D array size 
const  Y_SIZE = 22;  // even only
const  Z_SIZE = 22;  // even only
const  totCells = X_SIZE * Y_SIZE * Z_SIZE;
let  Base = Array(N_NBR);  // Base[x]: index of rule with x = #2
let  Rtbl = Array(N_ST);
let  step = 0;
let  sur = Array(N_ST).fill(0);    // # of surrounding cells in each state
let  pop = Array(N_ST).fill(0);   // # of cells in each state
let  Lattice = Array(2);

////////  View data
const  C_LEN = 4;  // cube length
const  RADIUS = 2.83;  // radius of cell = C_LEN / 2^(1/2)
const  opaSt = [0.0, 1.0, 0.5]; //opacity of each state
const  INTERVAL = 400;
let  spheres=[];
let  renderer;
let  scene;
let  camera;
let  counter;
let  population;

window.onload = function () {
	init();
	makeBase();  // make rule table Rtbl[][]
	loadConf();  //load init. conf. into Lattice[0][][][]
	initObject(); //objects initialization
	draw();
}

///////////////  Model functions   ///////////////

///////////////////////////////////////////////////
//  make Base[x] x:# of state 2
//  Base[0] = 0,  Base[1] = 13,  Base[2] = 25, 
//  Base[3] = 36, Base[4] = 46, Base[5] = 55, 
//  Base[6] = 63, Base[7] = 70, Base[8] = 76,
//  Base[9] = 81, Base[10] = 85, Base[11] = 88,
//  Base[12] = 90
///////////////////////////////////////////////////
function makeBase(){
	Base[0] = 0;
	for(let i = 1; i < N_NBR; i++){
		Base[i] = Base[i-1] + N_NBR - i + 1;
	}
}
//////////////////////////////////////////////////////////////////////
//  load init. conf into Lattice[0][X_SIZE][Y_SIZE][Z_SIZE]
//////////////////////////////////////////////////////////////////////
function loadConf(){
	// initialize Lattice with state 0
	for(let p = 0; p < 2; p++){
		Lattice[p] = new Array(X_SIZE).fill(0);
		for(let i = 0; i < X_SIZE; i++){
			Lattice[p][i] = new Array(Y_SIZE).fill(0);
			for(let j = 0; j < Y_SIZE; j++){
				Lattice[p][i][j] = new Array(Z_SIZE).fill(0);
			}
		}
	}

///////  configuration section start  ////////

////// side collision between GI - GII

//////   glider type I
Lattice[0][6][3][10] = 2;	// (13,3,10)
Lattice[0][6][3][9] = 2;	// (12,3,9)
Lattice[0][6][4][9] = 1;	// (13,4,9)
Lattice[0][6][4][10] = 1;	// (12,4,10)

//////   glider type II
Lattice[0][5][14][12] = 2;	// (10,14,12)
Lattice[0][5][14][10] = 2;	// (10,14,10)
Lattice[0][5][14][11] = 1;	// (11,14,11)
Lattice[0][5][13][11] = 1;	// (10,13,11)

///////  configuration section end  ////////
}

//////////////////////////////////////////////////////////////////////
//  make transition of each cell
//////////////////////////////////////////////////////////////////////
function transition(){
	let side = step % 2;
	let dSide = (side+1) % 2;
	for(let x = 0; x < X_SIZE; x++){
		for(let y = 0; y < Y_SIZE; y++){
			for(let z = 0; z < Z_SIZE; z++){
				countSurrounding(x, y, z, side); // resulted in let sur
				let indx = Lattice[side][x][y][z] * N_singleRls + Base[sur[2]] + sur[1];
				Lattice[dSide][x][y][z] = rTbl[indx];
			}
		}
	}
}

//////////////////////////////////////////////////////////////////////
//  count state-one cells in the surrounding
//  side: Lattice[side][][][] is used
//////////////////////////////////////////////////////////////////////
function countSurrounding(x, y, z, side){

	for (let i = 0; i < sur.length; i++) {
	    sur[i] = 0;
	}
	++sur[Lattice[side][x][(y-1+Y_SIZE)%Y_SIZE][(z-1+Z_SIZE)%Z_SIZE]];	//x, y-1, z-1
	++sur[Lattice[side][x][(y-1+Y_SIZE)%Y_SIZE][z]];					//x, y-1, z
	++sur[Lattice[side][x][(y-1+Y_SIZE)%Y_SIZE][(z+1)%Z_SIZE]];			//x, y-1, z+1
	++sur[Lattice[side][x][y][(z-1+Z_SIZE)%Z_SIZE]];					//x, y, z-1
	++sur[Lattice[side][x][y][(z+1)%Z_SIZE]];							//x, y, z+1
	++sur[Lattice[side][x][(y+1)%Y_SIZE][(z-1+Z_SIZE)%Z_SIZE]];			//x, y+1, z-1
	++sur[Lattice[side][x][(y+1)%Y_SIZE][z]];							//x, y+1, z
	++sur[Lattice[side][x][(y+1)%Y_SIZE][(z+1)%Z_SIZE]];				//x, y+1, z+1
	if((y+z)% 2 == 0){
		++sur[Lattice[side][(x-1+X_SIZE)%X_SIZE][(y-1+Y_SIZE)%Y_SIZE][z]];	//x-1, y-1, z
		++sur[Lattice[side][(x-1+X_SIZE)%X_SIZE][y][(z-1+Z_SIZE)%Z_SIZE]];	//x-1, y, z-1
		++sur[Lattice[side][(x-1+X_SIZE)%X_SIZE][y][(z+1)%Z_SIZE]];			//x-1, y, z+1
		++sur[Lattice[side][(x-1+X_SIZE)%X_SIZE][(y+1)%Y_SIZE][z]];			//x-1, y+1, z
	}
	else{
		++sur[Lattice[side][(x+1)%X_SIZE][(y-1+Y_SIZE)%Y_SIZE][z]];		//x+1, y-1, z
		++sur[Lattice[side][(x+1)%X_SIZE][y][(z-1+Z_SIZE)%Z_SIZE]];		//x+1, y, z-1
		++sur[Lattice[side][(x+1)%X_SIZE][y][(z+1)%Z_SIZE]];			//x+1, y, z+1
		++sur[Lattice[side][(x+1)%X_SIZE][(y+1)%Y_SIZE][z]];			//x+1, y+1, z
	}
}

///////////////////      View functions      ///////////////////

//////////////////////////////////////////////////////////////////////
//  count population and output into pop_ones, pop_twos
//////////////////////////////////////////////////////////////////////
function countPop(){

	for (let i = 0; i < pop.length; i++) {
	    pop[i] = 0;		
	}
	let side = step % 2;
	for(let x = 0; x < X_SIZE; x++){
		for(let y = 0; y < Y_SIZE; y++){
			for(let z = 0; z < Z_SIZE; z++){
				++pop[Lattice[side][x][y][z]];
			}
		}
	}
}

//////////////////////////////////////////////////////////////////////
//  initial setting
//////////////////////////////////////////////////////////////////////
function init() {
	if(rTbl.length != rTblLen){
		window.alert("rule table broken");
	}
	document.addEventListener("keydown",loop,false);
	const  canvasFrame = document.getElementById('canvas-frame');
	renderer = new THREE.WebGLRenderer({ canvas: canvasFrame });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(canvasFrame.clientWidth, canvasFrame.clientHeight);
	renderer.setClearColor(0xEEEEEE, 1.0);

	counter = document.getElementById("counter");
	population = document.getElementById("population");

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(
		45,
		canvasFrame.clientWidth / canvasFrame.clientHeight,
		1,
		10000
	);
	camera.up.set(0, 0, 1);
	camera.position.set(110, 110, 110);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	const light = new THREE.DirectionalLight(0x000000);
	light.intensity = 2;
	light.position.set(1, 1, 1);
	scene.add(light);
}


////////////////////////////////////////////////////////////////////
// object initilization
////////////////////////////////////////////////////////////////////
function initObject() {
	const axeshelper = new THREE.AxesHelper(100);
	axeshelper.position.set(0, 0, 0);
	scene.add(axeshelper);

	for(let cnt = 0, x = 0; x < X_SIZE; x++){
		for(let y = 0; y < Y_SIZE; y++){
			for(let z = 0; z < Z_SIZE; z++){
				spheres[cnt] = new THREE.Mesh(new THREE.SphereGeometry(RADIUS,12),
												new THREE.MeshNormalMaterial());
				spheres[cnt].position.set((2*x+ (y+z) % 2)*C_LEN, y*C_LEN, z*C_LEN);
				spheres[cnt].material.opacity = opaSt[Lattice[0][x][y][z]];
				spheres[cnt].material.transparent = true;
				scene.add(spheres[cnt]);
				cnt++;
			}
		}
	}
}

////////////////////////////////////////////////////////////////////
// object initilization
////////////////////////////////////////////////////////////////////
function draw() {
	counter.innerHTML = step;
	countPop();	// resulted in pop[]
	population.innerHTML = pop[1] + "," + pop[2] + "/" + totCells
	+ "(=" + X_SIZE +"*"+Y_SIZE +"*"+ Z_SIZE+")";
	renderer.render(scene, camera);
}

function loop() {
	draw();
	transition();  // transition from step to step+1
	step++;
	let side = step % 2;
	for(let cnt = 0, x = 0; x < X_SIZE; x++){
		for(let y = 0; y < Y_SIZE; y++){
			for(let z = 0; z < Z_SIZE; z++){
				spheres[cnt].material.opacity = opaSt[Lattice[side][x][y][z]];
				cnt++;
			}
		}
	}
//	requestAnimationFrame(loop);   this is too fast
	window.setTimeout(loop,INTERVAL);
}
