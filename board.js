class Board {
  constructor(dim) {
    this.dim = dim;
    const initialPossibilities = new Array(tiles.length).fill().map((_, i) => i);

    this.board = new Array(dim * dim).fill().map(() => ({
      collapsed: false,
      possibilities: initialPossibilities,
      tile: -1
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

  evalPossibleConnections() {
    console.log('BEPC');
    for (let i = 0; i < this.dim; i++) {
      for (let j = 0; j < this.dim; j++) {
        const piece = this.get(i, j);
        console.log(piece, piece.collapsed);
        if (!piece.collapsed) {
          // analyze above
          if (j > 0) {
            const up = this.board[i + (j - 1) * dim];
            for (const possibility of up.possibilities) {
              for (const piecePossibility of piece.possibilities) {
                if (
                  tiles[piecePossibility].connectors[0] !==
                  tiles[possibility].connectors[0].split('').reverse().join('')
                ) {
                  piece.possibilities = piece.possibilities.filter(pp => pp !== piecePossibility);
                } else {
                  console.log('pode', tiles[piecePossibility].connectors[0],
                  tiles[possibility].connectors[0].split('').reverse().join(''));
                }
              }
            }
          }
          console.log(1, piece.possibilities);

          // analyze right
          if (i < dim - 1) {
            const right = this.board[i + 1 + j * dim];
            for (const possibility of right.possibilities) {
              for (const piecePossibility of piece.possibilities) {
                if (
                  tiles[piecePossibility].connectors[1] !==
                  tiles[possibility].connectors[1].split('').reverse().join('')
                ) {
                  piece.possibilities = piece.possibilities.filter(pp => pp !== piecePossibility);
                } else {
                  console.log('pode', tiles[piecePossibility].connectors[1],
                  tiles[possibility].connectors[1].split('').reverse().join(''));
                }
              }
            }
          }
          console.log(2, piece.possibilities);

          // analyze below
          if (j < dim - 1) {
            const down = this.board[i + (j + 1) * dim];
            for (const possibility of down.possibilities) {
              for (const piecePossibility of piece.possibilities) {
                if (
                  tiles[piecePossibility].connectors[2] !==
                  tiles[possibility].connectors[2].split('').reverse().join('')
                ) {
                  piece.possibilities = piece.possibilities.filter(pp => pp !== piecePossibility);
                } else {
                  console.log('pode', tiles[piecePossibility].connectors[2],
                  tiles[possibility].connectors[2].split('').reverse().join(''));
                }
              }
            }
          }
          console.log(3, piece.possibilities);

          // analyze left
          if (i > 0) {
            const left = this.board[i - 1 + j * dim];
            for (const possibility of left.possibilities) {
              for (const piecePossibility of piece.possibilities) {
                if (
                  tiles[piecePossibility].connectors[3] !==
                  tiles[possibility].connectors[3].split('').reverse().join('')
                ) {
                  piece.possibilities = piece.possibilities.filter(pp => pp !== piecePossibility);
                } else {
                  console.log('pode', tiles[piecePossibility].connectors[3],
                  tiles[possibility].connectors[3].split('').reverse().join(''));
                }
              }
            }
          }
          console.log(4, piece.possibilities);
        }
      }
    }

    // this.board = nextBoard;
    console.log('EEPC');
  }
}
