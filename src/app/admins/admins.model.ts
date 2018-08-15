export class Admin {
    id: number;
    email: string;
    phone: string;
    fio: string;
    status: string;
    create_date: string;
    update_date: string;

    constructor(item?: Admin) {
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