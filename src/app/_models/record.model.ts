export class Record {
    private type: string;
    private keys: string;
    private keyValues: string;
    private dataTypes: string;
    constructor() {}
    public setType(type: string): void {
        this.type = type;
    }
    public setKeys(keys: string): void {
        this.keys = keys;
    }
    public setKeyValues(keyValues: string): void {
        this.keyValues = keyValues;
    }
    public setDataTypes(dataTypes: string): void {
        this.dataTypes = dataTypes;
    }
}
