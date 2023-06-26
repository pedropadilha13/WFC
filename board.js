const DIRECTIONS = {
  up: 0,
  right: 1,
  down: 2,
  left: 3
};

class Board {
  constructor(dim) {
    this.dim = dim;
    const initialPossibilities = new Array(tiles.length).fill().map((_, i) => i);

    this.board = new Array(dim * dim).fill().map((_, i) => ({
      index: i,
      collapsed: false,
      possibilities: initialPossibilities
    }));
  }

  get(x, y) {
    return this.board[x + y * dim];
  }

  getNextCollapse() {
    const board = this.board.slice().filter(piece => !piece.collapsed);

    if (!board.length) {
      return null;
    }

    board.sort((a, b) => a.possibilities.length - b.possibilities.length);

    const len = board[0].possibilities.length;
    const collapsable = board.filter(piece => piece.possibilities.length === len);
    // console.log('Collapsable:', collapsable);
    const nextCollapsableIndex = floor(random(0, collapsable.length));
    const nextCollapsable = collapsable[nextCollapsableIndex];
    return nextCollapsable;
  }

  evalPossibleConnections(index) {
    for (let j = 0; j < this.dim; j++) {
      for (let i = 0; i < this.dim; i++) {
        const piece = this.get(i, j);

        if (!piece.collapsed) {
          if (j > 0) {
            this.analyzeDirection(i, j - 1, piece, 'up');
          }

          if (i < dim - 1) {
            this.analyzeDirection(i + 1, j, piece, 'right');
          }

          if (j < dim - 1) {
            this.analyzeDirection(i, j + 1, piece, 'down');
          }

          if (i > 0) {
            this.analyzeDirection(i - 1, j, piece, 'left');
          }
        }
      }
    }
  }

  analyzeDirection(i, j, piece, DIR) {
    const target = this.board[i + j * dim];

    // console.log(`--------------------- has ${DIR}`, target);
    // console.log(`${DIR} possibilities`, target.possibilities);

    const piecePossibilities = piece.possibilities.map(pp => ({
      index: pp,
      value: tiles[pp].connectors[DIRECTIONS[DIR]]
    }));

    let validPossibilities = [];
    for (const possibility of target.possibilities) {
      let valid = tiles[possibility].connectors[(DIRECTIONS[DIR] + 2) % 4];
      validPossibilities = validPossibilities.concat(valid);
    }

    // console.log({ validPossibilities, 'raw possibilities': piece.possibilities });
    piece.possibilities = this.checkValid(piecePossibilities, validPossibilities);
    // console.log('filtered possibilities', piece.possibilities);
  }

  checkValid(possibilities, validPossibilities) {
    return possibilities
      .filter(p => validPossibilities.includes(p.value.split('').reverse().join('')))
      .map(p => p.index);
    // for (let i = possibilities.length - 1; i >= 0; i--) {
    //   let element = possibilities[i];
    //   if (!validPossibilities.includes(element)) {
    //     possibilities.splice(i, 1);
    //   }
    // }
  }
}
