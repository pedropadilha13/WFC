class Tile {
  constructor(img, connectors) {
    this.img = img;
    this.connectors = connectors;
  }

  rotate(num) {
    const n = (num + 4 ) % 4;
    const width = this.img.width;
    const height = this.img.height;

    const newImg = createGraphics(width, height);
    newImg.imageMode(CENTER);
    newImg.translate(width / 2, height / 2);
    newImg.rotate(HALF_PI * n);
    newImg.image(this.img, 0, 0);

    const newConnectors = [];
    const l = this.connectors.length;

    for (let i = 0; i < l; i++) {
      newConnectors[i] = this.connectors[(i + n) % 4]
    }

    return new Tile(newImg, newConnectors);
  }

  // analyze() {}
}