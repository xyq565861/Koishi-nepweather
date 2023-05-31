import { json } from "stream/consumers";
import { Config } from "./config";
import { Context, Logger } from "koishi";

export class Baidumap {
private _ak:string;

private _logger: Logger;


constructor() {}
public  init(
    config: Config,
    parentName: string = "nepweather"
  ) {
    this._logger = new Logger( parentName+"/baidumap");
    this._ak=config.ak;
  }
public async getCoordinate(
    address: string,
    context: Context
  ): Promise<any> {
    try {


      const url = `https://api.map.baidu.com/geocoding/v3/?address=${encodeURIComponent(address)}&ret_coordtype=gcj02ll&output=json&ak=${this._ak}`;
      //this._logger.info(url);

      const res = await context.http.get<any>(url); //fetch(url)
      this._logger.info("coordinate 查询成功");


      return res;
    } catch (e) {
      this._logger.error("Baidumap get coordinate Failed");
      this._logger.error(e);
      

      return null;
    }
  }
}