import { Dict, Schema } from 'koishi'

export interface Config {
    ak: string,



}
export const Config: Schema<Config> = Schema.intersect([
    Schema.object({
        ak: Schema.string().required().description('baidu map开放平台的ak'),
    }).description('百度地图开放平台配置')
])