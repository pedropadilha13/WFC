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
    this.evalPossibleConnecttions();

    const board = this.board.slice().filter(piece => !piece.collapsed);
    board.sort((a, b) => a.possibilities.length - b.possibilities.length)
    console.log(board);

    const len = board[0].possibilities.length;
    const collapsable = board.filter(piece => piece.possibilities.length === len);
    console.log(collapsable);
    return collapsable[floor(random(0, collapsable.length))];
  }

  evalPossibleConnecttions() {
    for (let i = 0; i < this.dim; i++) {
      for (let j = 0; j < this.dim; j++) {
        const piece = this.get(i, j);
        if (piece.collapsed) {
          continue;
        }

        
      }
    }
  }
}