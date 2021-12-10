const crypto = require("crypto"),
  SHA256 = (info) => crypto.createHash("sha256").update(info).digest("hex");

class Block {
  constructor(timestamp = "", data = []) {
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.getHash();
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

    this.chain.push(Object.freeze(block));
  }

  isValid(blockchain = this) {
    for (let i = 1; i < blockchain.length; i++) {
      const currentBlock = blockchain.chain[i];
      const prevBlock = blockchain.chain[i - 1];

      if (
        currentBlock.hash !== currentBlock.getHash() ||
        currentBlock.prevHash !== prevBlock.hash
      )
        return false;
    }
    return true;
  }
}

const Funchain = new Blockchain();
Funchain.addBlock(new Block(Date.now().toString(), ["Hi", "folks"]));

// console.log(Funchain.chain);
console.log(Funchain.isValid());
