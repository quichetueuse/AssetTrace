import crypto from 'crypto';

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data; // Stocke les données recues des clients
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return crypto
            .createHash('sha256')
            .update(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data))
            .digest('hex');
    }
}

export class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, new Date().toISOString(), "Bloc Genesis (Origine)", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newData) {
        const previousBlock = this.getLatestBlock();
        const newBlock = new Block(
            previousBlock.index + 1, 
            new Date().toISOString(), 
            newData, 
            previousBlock.hash
        );
        this.chain.push(newBlock);
        return newBlock; // Retourne le bloc pour l'afficher
    }
}
