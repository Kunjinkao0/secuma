export class Log {
  static OPEN = true;


  public static v(msg: any) {
    console.log(msg);
  }

  public static i(msg: any) {
    console.info(msg);
  }

  public static e(msg: any) {
    console.error(msg);
  }
}
