import { json } from "stream/consumers";
import { Config } from "./config";
import { Context, Logger } from "koishi";

export class Gamerelease {

private _logger: Logger;


constructor() {}
public  init(
    config: Config,
    parentName: string = "nepweather"
  ) {
    this._logger = new Logger( parentName+"/Gamerelease");

  }
public async getrelease(
    platform_id: string,
    pageid:number,
    context: Context
  ): Promise<any> {
    try {

        const url = `https://v2.diershoubing.com/eb/combine_game/release_list/?has_filter=0&pn=${pageid}0&rn=10&sp=0&match_count=1&src=android&version=955&build_version=25&platform_id=${platform_id}`;
        const res = await context.http.get<any>(url); //fetch(url)
        this._logger.info("getrelease 查询成功");
       //this._logger.info(url);
      return res;
    } catch (e) {
      this._logger.error("Gamerelease get getrelease Failed");
      this._logger.error(e);
      

      return null;
    }
  }
}