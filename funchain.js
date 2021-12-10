const crypto = require("crypto"),
  SHA256 = (info) => crypto.createHash("sha256").update(info).digest("hex");

class Block {
  constructor(timestamp = "", data = []) {
    this.timestamp = timestamp;
    this.data = data;
    this.hash = getHash();
    this.prevHash = "";
  }

  getHash() {
    return SHA256(JSON.stringify(this.data) + this.timestamp + this.prevHash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [new Block(Date.now().toString())];
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block) {
    block.prevHash = this.getLatestBlock().hash;
    block.hash = block.getHash();

    this.chain.push(block);
  }
}
