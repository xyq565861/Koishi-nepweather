import { json } from "stream/consumers";
import { Config } from "./config";
import { Context, Logger } from "koishi";
import { Baidumap } from "./baidumap";
export class Sunrise {

private _baidumap: Baidumap;
private _logger: Logger;
constructor() {}
public  init(
    config: Config,
    
    parentName: string = "nepweather"
  ) {
    this._baidumap=new Baidumap();
    this._baidumap.init(config);
    this._logger = new Logger( parentName+"/sunrise");

  }
public async getSunrise(
    address:string,
    context: Context,
    date:string="today"
    
  ): Promise<any> {
    try {
        let lat: string;
        let lng: string;
        let mapRes=await this._baidumap.getCoordinate(address,context);
        this._logger.info(mapRes);
        if (mapRes.status=='0') {
            lat=mapRes.result.location.lat;
            lng=mapRes.result.location.lng;

        }else{
            return null;
        }
        const url = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}&formatted=0`;
        //this._logger.info(url);

        const res = await context.http.get<any>(url); //fetch(url)
        let resMsg=res;
        resMsg.date=date;
        resMsg.level=mapRes.result.level;
        resMsg.comprehension=mapRes.result.comprehension;
        resMsg.confidence=mapRes.result.confidence;
        this._logger.info("sunrise 查询成功");

        this._logger.info(typeof(resMsg));
        this._logger.info(resMsg);

        return res;
    } catch (e) {
      this._logger.error("Get sunrise Failed");
      this._logger.error(e);
      

      return null;
    }
  }
}