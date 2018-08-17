export class Account {
    name: string;
    account: string;
    date: string;

    constructor(item?: Account) {
        if (item !== undefined) {
            for (const key in item) {
                try {
                    this[key] = item[key];
                }
                catch (e) {

                }
            }
        }
    }
}
