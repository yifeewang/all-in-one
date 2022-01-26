import CryptoJS from 'crypto-js';
import md5 from 'js-md5';
// #定义常量key、iv 此常量后端提供
const _KEV = 'iHATLhQo0zln1508';
const _IV = 'iHATLhQo0zln1508';

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

export const SUCESS_CODE = 100000
export const REFRESH_CODES = [110100, 110709, 110705, 110704, 110402, 110700]

class initLoading {
    constructor() {
        this.isLoading = false
        this.myContent = ''
    }
    showLoading(text = '') {
        this.isLoading = true
        this.myContent = text
    }
    hideLoading() {
        this.isLoading = false
        this.myContent = ''
    }
}

class initToast {
    showToast(msg, duration) {
        duration = isNaN(duration) ? 2000 : duration;
        var m = document.createElement('div');
        m.innerHTML = msg;
        m.style.cssText = "max-width:80%; background: #000; opacity: 0.6; height: auto; min-height: 30px; color: #fff; line-height: 30px; text-align: center; border-radius: 4px; position: fixed;top: 45%; left: 50%; transform: translateX(-50%); font-size: 16px;padding: 5px 10px;z-index: 9999;"
        document.body.appendChild(m);
        setTimeout(function () {
            var d = 0.5;
            m.style.webkitTransition = 'opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            setTimeout(function () {
                document.body.removeChild(m)
            }, d * 1000);
        }, duration);
    }
}

export const myLoading = new initLoading()
export const myToast = new initToast()

// 日期格式化
export const formatDate = (date, fmt = 'YYYY-MM-dd HH:mm:ss') => {
    if (date == null) return null;
    if (typeof date === 'string') {
        date = date.slice(0, 19).replace('T', ' ').replace(/-/g, '/');
        date = new Date(date);
    } else if (typeof date === 'number') {
        date = new Date(date);
    }
    const o = {
        '[Yy]+': date.getFullYear(), // 年
        'M+': date.getMonth() + 1, // 月份
        '[Dd]+': date.getDate(), // 日
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
        'H+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
    };
    const week = {
        '0': '/u65e5',
        '1': '/u4e00',
        '2': '/u4e8c',
        '3': '/u4e09',
        '4': '/u56db',
        '5': '/u4e94',
        '6': '/u516d'
    };
    if (/(Y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + '']);
    }
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
};

export const terminal = () => {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        return 'android'
    } else {
        return 'ios'
    }
}
export const getImageUrl = (name) => {
    return `../../images/${name}`
};


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

export const titles = { //弹窗标题
    "title1": "https://mdn.alipayobjects.com/merchant_appfe/afts/img/A*GKdsS6PCJF0AAAAAAAAAAAAADiR2AQ/.png", // 亲，活动尚未开始
    "title2": "https://mdn.alipayobjects.com/merchant_appfe/afts/img/A*xt6jSboR4AgAAAAAAAAAAAAADiR2AQ/.png", // 我的奖品
    "title3": "https://mdn.alipayobjects.com/merchant_appfe/afts/img/A*NdzBSb4q6dQAAAAAAAAAAAAADiR2AQ/.png", // 活动太火爆了
    "title4": "https://mdn.alipayobjects.com/merchant_appfe/afts/img/A*TeYUSo7zndYAAAAAAAAAAAAADiR2AQ/.png", // 红包抢光啦
    "title5": "https://mdn.alipayobjects.com/merchant_appfe/afts/img/A*RjZmT4fFI84AAAAAAAAAAAAADiR2AQ/.png", // 恭喜获得
    "title6": "https://mdn.alipayobjects.com/merchant_appfe/afts/img/A*nMGXSYw0_tAAAAAAAAAAAAAADiR2AQ/.png", // 填写收货信息
    "title7": "https://mdn.alipayobjects.com/merchant_appfe/afts/img/A*39c7Ta1UrLsAAAAAAAAAAAAADiR2AQ/.png" // 活动已结束
}

export const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}