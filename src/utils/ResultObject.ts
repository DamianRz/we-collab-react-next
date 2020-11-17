export default class ResultObject {
  public statusCode: number;
  public value: any;
  public data: any;

  constructor(statusCode: number, value: any, data: any) {
    this.statusCode = statusCode;
    this.value = value;
    this.data = data;
  }
}
