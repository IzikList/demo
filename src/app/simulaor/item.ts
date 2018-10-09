export class Item {
    protected id: number;
    protected years?: number;
    protected leMonth?: number;
    protected currentShares?: number;
    protected pcReturn?: number;
    protected policyReturn?: number;
    protected premium?: number;
    protected limit?: number;
    protected oneSharePrice?: number;
    constructor() {
        this.years = 7;
        this.leMonth = 84;
        this.currentShares = 500000;
        this.pcReturn = 12;
        this.policyReturn = 1000000;
        this.premium = 3000;
        this.limit = 20;
        this.oneSharePrice = 0;
    }
}
