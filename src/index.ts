import { Context, Logger } from 'koishi'
import { Baidumap } from "./baidumap";
import { Sunrise } from "./sunrise";
import { Config } from "./config";
import { Gamerelease } from './gamerelease';

export const name = 'nepweather'
//export * from "./config";
export * from "./config";
export const reactive = true;

const logger: Logger = new Logger("nepweather");;
const baidumap: Baidumap = new Baidumap();
const sunrise: Sunrise = new Sunrise();
const gamerelease: Gamerelease = new Gamerelease();
export function apply(ctx: Context, config: Config) {

  //根据loc查询经纬度
  ctx.command('coordinate <loc>', "根据地址查询经纬度")
    .action(async (_, loc) => {

      const bmap = baidumap.init(config);
      if (loc == '' || loc == null) {
        return "参数错误 格式 coordinate <地址>";
      }
      let resMsg: string;

      try {
        let res = await baidumap.getCoordinate(loc, ctx);


        //logger.error(resText);
        //let res=JSON.parse(resText);

        if (res.status == '0') {
          resMsg = `目标地址：${loc} 
        经度：${res.result.location.lng} 纬度：${res.result.location.lat}目标地理级别：${res.result.level}目标解析精度：${res.result.comprehension}% 目标地理精度：${res.result.confidence}%`
        }
        else {
          resMsg = "查询错误";
          logger.error(`coordinate 查询错误 STATUSCODE:${res.status}`);

        }
      }
      catch (e) {
        logger.error("coordinate 消息解析错误");
        logger.error(e);

      }
      return resMsg;


    })
  //根据loc date查询日期
  ctx.command('sunrise <loc> [argdate]', "根据地址查看日出时间")

    .action(async (_, loc, argdate) => {

      const bsunrise = sunrise.init(config);
      if (loc == '' || loc == null) {
        return "参数错误 格式 sunrise <地址> [日期]";
      }
      let resMsg: string;
      let date = new Date();
      try {
        if (argdate == "明天") {
          date = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);
        }
        else if (argdate == "后天") {
          date = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);
        }
        else if (argdate == "大后天") {
          date = new Date(date.getTime() + 3 * 24 * 60 * 60 * 1000);
        }
        else if (argdate == "昨天") {
          date = new Date(date.getTime() - 24 * 60 * 60 * 1000);
        }
        else if (argdate == "前天") {
          date = new Date(date.getTime() - 2 * 24 * 60 * 60 * 1000);
        }
        else if (argdate == "大前天") {
          date = new Date(date.getTime() - 3 * 24 * 60 * 60 * 1000);
        }
        else
          try {
            let formatdata = new Date(Date.parse(argdate.replace(/-/g, "/")));
            if (formatdata.getFullYear() > 1970) {
              date = formatdata;
            }
          } catch { }
        let datestr = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`
        let res = await sunrise.getSunrise(loc, ctx, datestr);


        if (res.status == 'OK') {
          logger.info(res.results.sunrise);
          let sunriseDate = new Date(res.results.sunrise);
          let sunsetDate = new Date(res.results.sunset);
          let solarnoonDate = new Date(res.results.solar_noon);

          let dayLength = parseInt(res.results.day_length);

          resMsg = `查询地址：${loc} 目标日期：UTC+8 ${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}
        目标地理级别：${res.level} 目标解析精度：${res.comprehension}% 目标地理精度：${res.confidence}%
        日出时间:UTC+8 ${sunriseDate.getHours()}:${sunriseDate.getUTCMinutes()}:${sunriseDate.getUTCSeconds()} 
        日落时间:UTC+8 ${sunsetDate.getHours()}:${sunsetDate.getUTCMinutes()}:${sunsetDate.getUTCSeconds()} 
        正午时间:UTC+8 ${solarnoonDate.getHours()}:${solarnoonDate.getUTCMinutes()}:${solarnoonDate.getUTCSeconds()} 
        白天长度约:${Math.floor(dayLength / 3600)}小时${((dayLength % 3600) / 60).toFixed(0)}分钟 
        `

        }
        else {
          resMsg = "查询错误";
          logger.error(`sunrise 查询错误 STATUS:${res.status}`);
        }




      }
      catch (e) {
        logger.error("coordinate 消息解析错误");
        logger.error(e);

      }
      return resMsg;


    })
  //查询最近未发售游戏
  ctx.command('gamerelease [platform]', "查询最近未发售游戏")
    .action(async (_, platform) => {

      const bgamerease = gamerelease.init(config);

      let resMsg: string;
      let flaga = false;
      logger.info(typeof (platform));

      if (platform != '' && platform != null) {

        platform = platform.toLocaleLowerCase();
        if (!flaga && platform.includes("steam")) {
          flaga = true;
          platform = "999";
        }
        else if (!flaga && platform.includes("ps5")) {
          flaga = true;
          platform = "8";
        }
        else if (!flaga && platform.includes("ns")) {
          flaga = true;
          platform = "7";
        }
        else if (!flaga && platform.includes("ps4")) {
          flaga = true;
          platform = "1";
        }
        else if (!flaga && platform.includes("xsx") || platform.includes("xss")) {
          flaga = true;
          platform = "10";
        }
        else if (!flaga && platform.includes("xboxone")) {
          flaga = true;
          platform = "2";
        }
        else if (!flaga && platform.includes("epic")) {
          flaga = true;
          platform = "998";
        }
        else if (!flaga && platform.includes("uplay")) {
          flaga = true;
          platform = "994";
        }
        else if (!flaga && platform.includes("战网")) {
          flaga = true;
          platform = "992";
        }
        else if (!flaga && platform.includes("pc")) {
          flaga = true;
          platform = "995";
        }
        else if (!flaga && platform.includes("origin")) {
          flaga = true;
          platform = "993";
        }
        else if (!flaga && platform.includes("3ds")) {
          flaga = true;
          platform = "4";
        }
        else if (!flaga && platform.includes("wiiu")) {
          flaga = true;
          platform = "5";
        }
        else if (!flaga && platform.includes("psv")) {
          flaga = true;
          platform = "3";
        }
        else {
          platform = ""
        }
      }
      else {
        platform = ""
      }
      try {
        resMsg = '';
        let res = {
          'ret': 1,
          'games': []
        };
        //let games=[];
        for (let i = 0; i < 3; i++) {
          let result = await gamerelease.getrelease(platform, i, ctx);
          let flagb = true;
          //logger.info(result);
          if (result.ret == 0) {
            //至少一条查询成功，将ret置0表示查询成功
            res.ret = 0;
            //如果返回结果小于1个或者返回结果为空则将flag置否以跳出
            if (result.combine_game_platforms) {
              for (let game of result.combine_game_platforms) {
                res.games.push(game);
              }
              if (result.combine_game_platforms.length < 1) {
                flagb = false;
              }
            }
            else {
              flagb = false;
            }

          } else {
            resMsg += ("分页查询错误，页码：" + (i + 1)) + "\n";
            logger.error(`gamerelease 分页查询错误 page:${i} STATUS:${result.ret}`);
          }
          if (!flagb) {
            break;
          }
        }
        resMsg += "近期游戏发售信息：\n";
        if (!flaga) {
          resMsg += "全平台查询由于消息长度原因可能无法展示完全，请分平台进行查询 格式 gamerelease [平台]\n";
          resMsg += "支持的平台 STEAM EPIC Uplay PS5 PS4 NS等\n";

        }
        //logger.info(res);
        for (let game of res.games) {

          let name = game.name;
          let releaseDate =  `${new Date(game.release_date).toLocaleDateString("zh-CN", { timeZone: 'Asia/Shanghai' })}  ${new Date(game.release_date).toLocaleTimeString("zh-CN", { timeZone: 'Asia/Shanghai' })}`;
          let gameplatform = game.plat_name;
          if (game.other_platforms && game.other_platforms.length > 0) {
            for (let subplatform of game.other_platforms) {
              gameplatform += ("-" + subplatform.plat_name);

            }
          }

          let cn = game.is_cn == 1 ? '是' : '否';
          let duzhan = game.is_duzhan == 1 ? '是' : '否';
          let xgp = game.is_xgp == 1 ? '是' : '否';
          let vr = game.is_vr == 1 ? '是' : '否';

          resMsg += `${name}--${releaseDate}  平台:${gameplatform}  支持中文:${cn}  独占:${duzhan}  加入xgp:${xgp}  vr支持:${vr}\n`;
        }



      }
      catch (e) {
        resMsg="查询错误";
        logger.error("gamerelease 消息解析错误");
        logger.error(e);

      }
      return resMsg;


    })
  //查询打折游戏
  ctx.command('gamediscount [platform] <region>', "获取平台部分打折信息")
    .action(async (_, platform,region) => {

      const bgamerease = gamerelease.init(config);

      let resMsg: string;
      let flaga = 0;
      logger.info(typeof (platform));

      if (platform != '' && platform != null) {

        platform = platform.toLocaleLowerCase();

        if (platform.includes("steam")) {
          flaga = 1;

        }
        else if (!flaga && platform.includes("epic")) {
          flaga = 2;

        }
        else if (platform.includes("ps")) {
          flaga = 3;

        }
        else if (platform.includes("ns")) {
          flaga = 4;

        }

      }
      else {
        return "参数错误 格式 gamediscount <平台> 目前支持平台:STEAM EPIC NS PS"
      }
      if (flaga == 0) {
        return "平台错误 目前支持平台:STEAM EPIC NS PS"
      }
      try {
        resMsg = '';
        let res = {
          'ret': 1,
          'games': []
        };
        //let games=[];
        for (let i = 0; i < 1; i++) {
          let result;
          let flagb = true;

          //处理steam折扣接口
          if (flaga == 1) {
            result = await gamerelease.getdiscountsteam(i, ctx);
            //logger.info(result.ret);    
            //logger.info(result);
            if (result.ret == 0) {
              //至少一条查询成功，将ret置0表示查询成功
              //如果返回结果小于1个或者返回结果为空则将flag置否以跳出
              if (result.games) {
                for (let game of result.games) {
                  let gamedate={
                    'name':game.name,
                    'price':game.price,
                    'originPrice':game.origin_price,
                    'lowestPrice':game.history_price?game.history_price:'无',
                    'disEndDate':game.discount_expiration*1000,
                  };
                  res.games.push(gamedate);
                }
                if (result.games.length < 1) {
                  flagb = false;
                }
              }
              else {
                flagb = false;
              }
            }
          }
          //处理epic折扣接口

          else if (flaga==2) {

            result = await gamerelease.getdiscountepic(i, ctx);

            if (result.ret == 0) {
              //至少一条查询成功，将ret置0表示查询成功
              //如果返回结果小于1个或者返回结果为空则将flag置否以跳出
              if (result.items) {
                for (let game of result.items) {
                  let gamedate={
                    'name':game.name,
                    'price':Number(game.discount_price.replace(/[^0-9.]/ig,"")),
                    'originPrice':Number(game.price.replace(/[^0-9.]/ig,"")),
                    'lowestPrice':game.history_lowest_info?game.history_lowest_info.price:'无',
                    'disEndDate':game.end_date,
                  };
                  res.games.push(gamedate);
                }
                if (result.items.length < 1) {
                  flagb = false;
                }
              }
              else {
                flagb = false;
              }
            }
          }
          else if(flaga==3){
            let regionArg="HK";
            if(region&&regionArg.toLocaleUpperCase().includes("JP")){
              regionArg="JP";
            }

            result = await gamerelease.getdiscountps(i,regionArg, ctx);

            if (result.ret == 0) {
              //至少一条查询成功，将ret置0表示查询成功
              //如果返回结果小于1个或者返回结果为空则将flag置否以跳出
              if (result.items) {
                for (let game of result.items) {
                  let gamedate={
                    'name':game.name,
                    'price':Number(game.discount_price.split('(')[0].replace(/[^0-9.]/ig,"")),
                    'originPrice':Number(game.price.replace(/[^0-9.]/ig,"")),
                    'lowestPrice':game.history_lowest_info?game.history_lowest_info.price:'无',
                    'disEndDate':game.end_date,
                  };
                  res.games.push(gamedate);
                }
                if (result.items.length < 1) {
                  flagb = false;
                }
              }
              else {
                flagb = false;
              }
            }
          }
          
          else {
            resMsg += ("分页查询错误，页码：" + (i + 1)) + "\n";
            logger.error(`gamerelease 分页查询错误 page:${i} STATUS:${result.ret}`);
          }
          if (!flagb) {
            break;
          }
        }
        resMsg += (platform+"近期打折信息,默认采取人气排序：\n");
        // if (!flaga) {
        //   resMsg += "全平台查询由于消息长度原因可能无法展示完全，请分平台进行查询 格式 gamerelease [平台]\n";
        //   resMsg += "支持的平台 STEAM EPIC Uplay PS5 PS4 NS等\n";

        // }
        logger.info(res);
        for (let game of res.games) {

          let name = game.name;
          let enddate = `${new Date(game.disEndDate).toLocaleDateString("zh-CN", { timeZone: 'Asia/Shanghai' })}  ${new Date(game.disEndDate).toLocaleTimeString("zh-CN", { timeZone: 'Asia/Shanghai' })}`;
          let price = game.price;
          let originPrice = game.originPrice;
          let lowestPrice = game.lowestPrice;

          resMsg += `${name}--价格:${price}  原价:${originPrice} 折扣:${((1-(price/originPrice))*100).toFixed(0)}%off  史低价:${lowestPrice}   打折结束日期:${enddate}\n`;
        }



      }
      catch (e) {
        resMsg="查询错误";
        logger.error("gamediscount 消息解析错误");
        logger.error(e);

      }
      return resMsg;


    })
}
