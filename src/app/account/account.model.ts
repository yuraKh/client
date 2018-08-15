export class Account {
    name: string;
    account: string;
    date: string;

    constructor(item?: Account) {
        if (item != undefined) {
            for (let key in item) {
                try {
                    this[key] = item[key];
                }
                catch (e) {
                }
            }
        }
    }
}