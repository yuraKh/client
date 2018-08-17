export class SmsLog {

  type: string;
  result: string;
  request: string;
  date: string;

  constructor(item?: SmsLog) {
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
