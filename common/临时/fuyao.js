

import CryptoJS from 'crypto-js';
import md5 from 'js-md5';
import {formatDate} from './utils'

// #定义常量key、iv 此常量后端提供
const _KEV = 'iHATLhQo0zln1508';
const _IV = 'iHATLhQo0zln1508';

/**
     * @name 查询最新奖品时间是否在当前周期(自然周期)时间范围 通过比较时间字符串的方式
     * @params
     *  @taskRefreshCircle 刷新周期
     *  @timeList 所有奖品的中奖时间
     *  @date 时间（2021年12月29日 15:19:46）
* */
 export const isFreshTimeRange = (taskRefreshCircle, timeList) => {
    let date = ''
    if(timeList.length>0){
        date = timeList.reduce((n1, n2) => {
            return n1 > n2 ? n1 : n2;
        });
    }
    if(!date){
        return false
    }
    const now = new Date(); const weekday = now.getDay(); let flag = true; // date时间是否在当前周期时间范围内

    switch (taskRefreshCircle) {
        case 0: // 按天刷新
            flag = formatDate(now).substring(0, 10) === date.substring(0, 10).replace(/[\u4E00-\u9FA5]/g, '-');
            break;
        case 1: // 按周刷新
            // 计算周一日期
            const monday = new Date(now.getTime() - (weekday > 0 ? weekday - 1 : 6) * 24 * 60 * 60 * 1000); // 周一的日期
            flag = date.substring(0, 10).replace(/[\u4E00-\u9FA5]/g, '-') >= formatDate(monday).substring(0, 10);
            break;
        case 2:// 按月刷新
            // console.log(formatDate(now).substring(0, 7) + '-01')
            // console.log(date.substring(0, 10).replace(/[\u4E00-\u9FA5]/g, '-'))
            // debugger
            flag = date.substring(0, 10).replace(/[\u4E00-\u9FA5]/g, '-') >= formatDate(now).substring(0, 7) + '-01';
            break;
        default:
            break;
    }
    return flag;
};


// #定义AES加密方法 
// #返回加密后的字符串 后续接口参数content要用到
// #参数data 需要加密的js对象 例如{a:2,b:'code'}
export const encrypt = (data = {}) => {
    const key = CryptoJS.enc.Utf8.parse(_KEV);
    const iv = CryptoJS.enc.Utf8.parse(_IV);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
    return encrypted.toString(); // 返回的是base64格式的密文 
}

// #定义AES解密方法 
// #参数encrypted 需要解密的字符串
export const decrypt = (encrypted) => {
    const key = CryptoJS.enc.Utf8.parse(_KEV);
    const iv = CryptoJS.enc.Utf8.parse(_IV);
    const decrypted = CryptoJS.AES.decrypt(encrypted, key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

// #md5加密 后续接口签名参数sign需要用到
// #返回content+盐(常量)+时间戳拼接起来然后md5转化后的字符串；
// #参数content AES加密后的字符串
// #time 时间戳
export const md5ForFy = (content, time) => {
    const SALT = '3afn4UpdQzENHhZji1jC';//加盐 此常量后端提供
    const s = content + SALT + time;
    return md5(s);
}