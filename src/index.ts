import { Context ,Logger} from 'koishi'
import { Baidumap } from "./baidumap";
import { Sunrise } from "./sunrise";
import { Config } from "./config";
export const name = 'nepweather'
//export * from "./config";
export * from "./config";
export const reactive = true;
const logger: Logger=new Logger("nepweather");;
const baidumap: Baidumap = new Baidumap();
const sunrise: Sunrise = new Sunrise();
export function apply(ctx: Context,config: Config) {

  //根据loc查询经纬度
  ctx.command('coordinate <loc>')
  .action(async (_, loc) => {
    
    const bmap = baidumap.init(config);

    let resMsg:string;

    try{
      let res=await baidumap.getCoordinate(loc,ctx);
    
    
      //logger.error(resText);
      //let res=JSON.parse(resText);
      
      if (res.status=='0') {
        resMsg=`目标地址：${loc} 
        经度：${res.result.location.lng} 纬度：${res.result.location.lat}目标地理级别：${res.result.level}目标解析精度：${res.result.comprehension}% 目标地理精度：${res.result.confidence}%`
      }
      else{
        resMsg="查询错误";
        logger.error(`coordinate 查询错误 STATUSCODE:${res.status}`);

      }
    }
    catch(e){
      logger.error("coordinate 消息解析错误");
      logger.error(e);

    }
    return resMsg;


  })
  //根据loc date查询日期
  ctx.command('sunrise <loc> [argdate]')  

  .action(async (_, loc,argdate) => {
    
    const bsunrise = sunrise.init(config);

    let resMsg:string;
    let date =new Date();
    try{
      if (argdate=="明天") {
        date=new Date(date.getTime() + 3*24*60*60*1000);
      }
      else if (argdate=="后天") {
        date=new Date(date.getTime() + 3*24*60*60*1000);
      }
      else if (argdate=="大后天") {
        date=new Date(date.getTime() + 3*24*60*60*1000);
      }
      else if (argdate=="昨天") {
        date=new Date(date.getTime() - 24*60*60*1000);
      }
      else if (argdate=="前天") {
        date=new Date(date.getTime() - 2*24*60*60*1000);
      }
      else if (argdate=="大前天") {
        date=new Date(date.getTime() - 3*24*60*60*1000);
      }
      else 
      try{
        let formatdata=new Date(Date.parse(argdate.replace(/-/g,"/")));
        if (formatdata.getFullYear()>1970) {
          date=formatdata;
        }
      }catch{}
      let datestr=`${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}`
      let res=await sunrise.getSunrise(loc,ctx,datestr);
    
    
      if (res.status=='OK') {
        logger.info(res.results.sunrise);
        let sunriseDate=new Date(res.results.sunrise);
        let sunsetDate=new Date(res.results.sunset);
        let solarnoonDate=new Date(res.results.solar_noon);

        let dayLength=parseInt(res.results.day_length);
        
        resMsg=`查询地址：${loc} 目标日期：UTC+8 ${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}
        目标地理级别：${res.level} 目标解析精度：${res.comprehension}% 目标地理精度：${res.confidence}%
        日出时间:UTC+8 ${sunriseDate.getHours()}:${sunriseDate.getUTCMinutes()}:${sunriseDate.getUTCSeconds()} 
        日落时间:UTC+8 ${sunsetDate.getHours()}:${sunsetDate.getUTCMinutes()}:${sunsetDate.getUTCSeconds()} 
        正午时间:UTC+8 ${solarnoonDate.getHours()}:${solarnoonDate.getUTCMinutes()}:${solarnoonDate.getUTCSeconds()} 
        白天长度约:${Math.floor(dayLength/3600)}小时${((dayLength%3600)/60).toFixed(0)}分钟 
        `

      }
      else{
        resMsg="查询错误";
        logger.error(`sunrise 查询错误 STATUS:${res.status}`);
      }

   


    }
    catch(e){
      logger.error("coordinate 消息解析错误");
      logger.error(e);

    }
    return resMsg;


  })

}
