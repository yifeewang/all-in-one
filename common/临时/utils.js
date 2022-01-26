

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