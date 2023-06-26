const dim = 20;

const W = 1300;
const H = W;

const w = W / dim;
const h = H / dim;

let tileImages = [];

function preload() {
  for (let i = 0; i < 13; i++) {
    tileImages[i] = loadImage(`tiles/${i}.png`);
  }
}

let tiles = [];
let board;

function setup() {
  tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA']);
  tiles[1] = new Tile(tileImages[1], ['BBB', 'BBB', 'BBB', 'BBB']);
  tiles[2] = new Tile(tileImages[2], ['BBB', 'BCB', 'BBB', 'BBB']);
  tiles[3] = new Tile(tileImages[3], ['BBB', 'BDB', 'BBB', 'BDB']);
  tiles[4] = new Tile(tileImages[4], ['EBB', 'BCB', 'BBE', 'AAA']);
  tiles[5] = new Tile(tileImages[5], ['EBB', 'BBB', 'BBB', 'BBE']);
  tiles[6] = new Tile(tileImages[6], ['BBB', 'BCB', 'BBB', 'BCB']);
  tiles[7] = new Tile(tileImages[7], ['BDB', 'BCB', 'BDB', 'BCB']);
  tiles[8] = new Tile(tileImages[8], ['BDB', 'BBB', 'BCB', 'BBB']);
  tiles[9] = new Tile(tileImages[9], ['BCB', 'BCB', 'BBB', 'BCB']);
  tiles[10] = new Tile(tileImages[10], ['BCB', 'BCB', 'BCB', 'BCB']);
  tiles[11] = new Tile(tileImages[11], ['BCB', 'BCB', 'BBB', 'BBB']);
  tiles[12] = new Tile(tileImages[12], ['BBB', 'BCB', 'BBB', 'BCB']);

  for (let i = 0; i < 13; i++) {
    for (let j = 1; j < 4; j++) {
      const rotated = tiles[i].rotate(j);
      tiles.push(rotated);
    }
  }

  createCanvas(W, H);
  background('gray');
  // frameRate(10);

  // randomSeed(553);
  
  board = new Board(dim);
}


function draw () {
  const nextCollapse = board.getNextCollapse();
  // console.log('nextCollapse', nextCollapse);

  if (!nextCollapse) {
    return noLoop();
  }
  
  const picked = nextCollapse.possibilities[floor(random(0, nextCollapse.possibilities.length))];
  nextCollapse.possibilities = [picked];
  nextCollapse.collapsed = true;
 
  board.evalPossibleConnections(nextCollapse.i);

  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      const piece = board.get(i, j);
      // console.log(piece);
      if (piece.collapsed) {
        image(tiles[piece.possibilities[0]].img, i * w, j * h, w, h);
      } else {
        fill(0);
        stroke(255);
        rect(i * w, j * h, w, h);
      }
      // fill(255, 0, 0);
      // textSize(22);
      // text(label(i, j), i * w + 40, j * h + 40)
    }
  }
}

// function mouseClicked() {
//   redraw();
// }

function label(i, j) {
  return `${i + j * dim} = i:${i} + j:${j} x dim}`;
}
