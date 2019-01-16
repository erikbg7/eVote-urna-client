import PublicKey from './publicKey';

export default class Table {
    constructor() {
        this.candidates = [];
    }
    publicKey: PublicKey;
    tableId: string;
    state: number;
    candidates: string[];
}
