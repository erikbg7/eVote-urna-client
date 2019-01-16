export default class Response {
    tableID: string;
    state: number;
    publicKey: string;
    publicKeyMod: string;
    candidates: string[];
    part?: string;
    results?: number[];
}
