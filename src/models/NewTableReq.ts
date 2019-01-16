export class NewTableReq {
    electionsKey: ElectionsKey;
    candidates: string[];
    tableId: string;
}

export class ElectionsKey {
    keyNumber: string;
    mod: string;
}
