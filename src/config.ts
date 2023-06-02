import { Dict, Schema } from 'koishi'

export interface Config {
    ak: string,
    releaRn: number,
    disRn: number,
    newsRn: number,
}
export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
        ak: Schema.string().description('baidu map开放平台的ak'),
    }).description('百度地图开放平台配置'),

    Schema.object({
        releaRn: Schema.number().description('游戏发售表每次请求条目数'),
        disRn: Schema.number().description('游戏打折表每次请求条目数'),
        newsRn: Schema.number().description('游戏新闻每次请求条目数'),
    }).description('游戏相关')
])