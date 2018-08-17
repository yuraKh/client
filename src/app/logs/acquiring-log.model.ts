export class AcquiringLog {
  date: string;
  result: string;
  type: string;
  id_order: number;
  id_payment_system: number;
  name_payment_system: string;

  constructor(item?: AcquiringLog) {
    if (item !== undefined) {
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
