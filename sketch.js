const dim = 2;

const W = 800;
const H = 800;

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
  console.log(tileImages)

  tiles[0] = new Tile(tileImages[0], ['AAA', 'AAA', 'AAA', 'AAA']);
  tiles[1] = new Tile(tileImages[1], ['BBB', 'BBB', 'BBB', 'BBB']);
  tiles[2] = new Tile(tileImages[2], ['BBB', 'BCB', 'BBB', 'BBB']);
  tiles[3] = new Tile(tileImages[3], ['BBB', 'BDB', 'BBB', 'BDB']);
  tiles[4] = new Tile(tileImages[4], ['EBB', 'BCB', 'BBE', 'AAA']);
  tiles[5] = new Tile(tileImages[5], ['EBB', 'BBB', 'BBB', 'BBE']);
  tiles[6] = new Tile(tileImages[6], ['BBB', 'BCB', 'BBB', 'BCB']);
  tiles[7] = new Tile(tileImages[7], ['BDB', 'BCB', 'BDB', 'BCB']);
  tiles[8] = new Tile(tileImages[8], ['DBD', 'BBB', 'BCB', 'BBB']);
  tiles[9] = new Tile(tileImages[9], ['BCB', 'BCB', 'BBB', 'BCB']);
  tiles[10] = new Tile(tileImages[10], ['BCB', 'BCB', 'BCB', 'BCB']);
  tiles[11] = new Tile(tileImages[11], ['BCB', 'BCB', 'BBB', 'BBB']);
  tiles[12] = new Tile(tileImages[12], ['BBB', 'BCB', 'BBB', 'BCB']);

  for (let i = 2; i < 13; i++) {
    // console.log(tiles[i]);
    for (let j = 1; j < 4; j++) {
      const rotated = tiles[i].rotate(j);
      tiles.push(rotated);
      // console.log(rotated);
    }
  }

  // console.log(tiles);

  createCanvas(W, H);
  background('gray');
  // image(tiles[0].img, 0, 0, w, h);
  
  board = new Board(dim);
  // board.board[2].collapsed = true;
  // board.board[2].possibilities = [8];
  // board.board[2].tile = 8;
}


function draw () {

  console.log(board.board);
  const nextCollapse = board.getNextCollapse();
  console.log(nextCollapse);

  nextCollapse.collapsed = true;
  
  const picked = nextCollapse.possibilities[random]
  
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      const piece = board.get(i, j);
      // console.log(i, j, piece);
      if (piece.collapsed) {
        const tile = tiles[piece.tile];
        const rotated = tile.rotate(5);
        image(rotated.img, i * w, j * h, w, h);
      } else {
        fill(0);
        stroke(255);
        rect(i * w, j * h, w, h);
      }
    }
  }
  
  noLoop();
  frameRate(10);
}
