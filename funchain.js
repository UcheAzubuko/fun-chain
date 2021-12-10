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
    this.chain = [new Block(Date.now().string())];
  }
}
