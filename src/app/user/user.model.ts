export class User {
    id: number;
    email: string;
    phone: string;
    status: string;
    fio: string;
    create_date: string;
    update_date: string;

    constructor(item?: User) {
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