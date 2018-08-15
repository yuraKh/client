export class Operation {
    id: number;
    positions: number;
    date: string;
    status: string;
    createDate: string;
    user_id: number;
    sum_total: number;
    sum_card: number;
    sum_bonus: number;
    payment_system: string;
    payment_id?: any;
    payment_status: string;

    constructor(item?: Operation) {
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
