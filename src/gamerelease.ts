import { json } from "stream/consumers";
import { Config } from "./config";
import { Context, Logger } from "koishi";

export class Gamerelease {

  private _logger: Logger;
  private _releaRn: number;
  private _disRn: number;


  constructor() { }
  public init(
    config: Config,
    parentName: string = "nepweather"
  ) {
    this._logger = new Logger(parentName + "/Gamerelease");
    this._releaRn = config.releaRn;
    this._disRn = config.disRn;

  }
  public async getrelease(
    platform_id: string,
    pageid: number,
    context: Context
  ): Promise<any> {
    try {

      const url = `https://v2.diershoubing.com/eb/combine_game/release_list/?has_filter=0&pn=${pageid}&rn=${this._releaRn}&sp=0&match_count=1&src=android&version=955&build_version=25&platform_id=${platform_id}`;
      const res = await context.http.get<any>(url); //fetch(url)
      this._logger.info(url);
      this._logger.info(res.combine_game_platforms.length);
      this._logger.info("getrelease 查询成功");

      return res;
    } catch (e) {
      this._logger.error("Gamerelease get getrelease Failed");
      this._logger.error(e);


      return null;
    }
  }
  public async getdiscountsteam(
    pageid: number,
    context: Context
  ): Promise<any> {
    try {

      const url = `https://steamapi.diershoubing.com:5000/game/discount/?src=android&version=955&build_version=25`;
      //const url = `127.0.0.1:8888`;
      // let data={
      //   rn: 1,
      //   pn: pageid,
      //   op: 1,
      //   low_status:0,
      //   has_filter:0,
      // };
      let data=`rn=${this._disRn}&pn=${pageid}&op=1&low_status=0&has_filter=0`;
      const res = await context.http.post<any>(url,data); //fetch(url)

      this._logger.info("get steam discount 查询成功");

      return res;
    } catch (e) {
      this._logger.error("Gamerelease get steam Failed");
      this._logger.error(e);


      return null;
    }
  }
  public async getdiscountepic(
    pageid: number,
    context: Context
  ): Promise<any> {
    try {

      
      const url = `https://v2.diershoubing.com/epic/discount/?src=android&version=955&build_version=25`;
      // let data={
      //   'rn': 12,
      //   'pn': pageid,
      //   'low_status':0,
      //   'has_filter':0,
      //   'operation_v':4,
      // };
      let data=`rn=${this._disRn}&pn=${pageid}&operation_v=4&low_status=0&has_filter=0`;
      const res = await context.http.post<any>(url,data); //fetch(url)
      //this._logger.info(url);
      //this._logger.info(res);
      this._logger.info("get epic discount 查询成功");

      return res;
    } catch (e) {
      this._logger.error("Gamerelease get epic Failed");
      this._logger.error(e);


      return null;
    }
  }
  public async getdiscountps(
    pageid: number,
    region: string,
    context: Context
  ): Promise<any> {
    try {
      const url = `https://v2.diershoubing.com/psn/discount/?src=android&version=955&build_version=25`;
      // let data={
      //   'pn': pageid,
      //   'od':2,
      //   'has_filter':0,
      //   'rn': 12,
      //   'region':"HK",
      //   'low_status':0,


      // };
      let data=`rn=${this._disRn}&pn=${pageid}&od=2&low_status=0&has_filter=0&region=${region}`;

      //this._logger.info(url);
      const res = await context.http.post<any>(url,data); //fetch(url)

      //this._logger.info(res);
      this._logger.info("get ps discount 查询成功");

      return res;
    } catch (e) {
      this._logger.error("Gamerelease get ps Failed");
      this._logger.error(e);


      return null;
    }
  }
  public async getdiscountns(
    pageid: number,
    region: string,
    context: Context
  ): Promise<any> {
    try {
      const url = `https://v2.diershoubing.com/ns/discount/?src=android&version=955&build_version=25`;
      // let data={
      //   'pn': pageid,
      //   'od':2,
      //   'has_filter':0,
      //   'rn': 12,
      //   'region':"HK",
      //   'low_status':0,
      // };pn=0&q=&od=2&has_filter=0&rn=20&region=JP&low_status=0&
      let data=`rn=${this._disRn}&pn=${pageid}&od=2&low_status=0&has_filter=0&region=${region}`;

      //this._logger.info(url);
      const res = await context.http.post<any>(url,data); //fetch(url)

      //this._logger.info(res);
      this._logger.info("get ns discount 查询成功");

      return res;
    } catch (e) {
      this._logger.error("Gamerelease get ns Failed");
      this._logger.error(e);


      return null;
    }
  }
}