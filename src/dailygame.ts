import { json } from "stream/consumers";
import { Config } from "./config";
import { Context, Logger } from "koishi";

export class Dailygame {
    private _newsRn: number;

    private _logger: Logger;


    constructor() { }
    public init(
        config: Config,
        parentName: string = "nepweather"
    ) {
        this._logger = new Logger(parentName + "/dailygame");
        this._newsRn = config.newsRn;
    }
    public async getdailygame(
        context: Context
    ): Promise<any> {
        try {


            const url = `http://app02.vgtime.com:8080/vgtime-app/api/v3/launch/wallpaper_today`;

            const res = await context.http.get<any>(url); //fetch(url)

            const history = res.data.user_sign.history_in_today.toString().trim().replace(/<br\/>/g, '\n').replace(/^<br>/, '');

            this._logger.info("dailygame 查询成功");

            return history;

        } catch (e) {
            this._logger.error("Dailygame get dailygame Failed");
            this._logger.error(e);


            return null;
        }
    }
    public async getdailygamenews(
        context: Context
    ): Promise<any> {
        try {

            const url = `https://v2.diershoubing.com/feed/tag/?tag_type=7&pn=0&rn=${this._newsRn}&is_show_top_ad=0&src=android&version=955&build_version=25&signal=Wifi`;

            const res = await context.http.get<any>(url); //fetch(url)

            this._logger.info("getdailygamenews 查询成功");
            return res;
        } catch (e) {
            this._logger.error("Dailygame get dailygamenews Failed");
            this._logger.error(e);


            return null;
        }
    }
}