declare module "common/index" {
    export const libLogWarn: (message?: any, ...optionalParams: any[]) => void;
    /**
     * 判断是否是浏览器环境
     */
    export const inBrowser: boolean;
    /**
     * 是否是一个Promise
     * @param it 要判断的变量
     * @returns boolean
     */
    export function isPromiseLike<T>(it: unknown): it is PromiseLike<T>;
    /**
     * 校验手机号
     * @param phone
     * @returns boolean
     */
    export const validatePhoneNumber: (phone: string) => boolean;
    /**
     * 合并异步任务的并发，即“相等”的异步任务并发情况下仅执行一次
     * @param fn 异步函数，请使用箭头函数避免上下文问题
     */
    export function mergeConcurrent<T extends any[]>(fn: (...args: T) => Promise<unknown>): (...args: T) => Promise<unknown>;
    /**
     * 生成一个随机ID，伪唯一
     * @param opt -{ prefix?: 前缀 }
     */
    export function createUniqueId(opt?: {
        prefix?: string;
    }): string;
    /**
     * 字符串（连字符）转驼峰格式
     * @param str 待转换的字符串
     * @param pascal 帕斯卡，是否转为大驼峰，即首字母也大写
     */
    export const camelize: (str: string, pascal?: boolean) => string;
    /**
     * 字符串（驼峰）转连字符
     * @param str 待转换的字符串
     */
    export const kebabCase: (str: string) => string;
    /**
     * 节流函数
     */
    export function throttle(fn: Function, wait?: number): (...args: any) => void;
    /**
     * 防抖函数
     */
    export function debounce(fn: Function, wait?: number, immediate?: boolean): (...args: any) => any;
    /**
     * 解码字符串（decodeURIComponent）
     * @param value 需要解码的文本
     * @param times 解码次数，默认1，若为0则递归解码直到不含 %
     */
    export function decodeString(value: string, times?: number): string;
    /**
     * 等待
     * @param time 等待时间，ms
     */
    export const sleep: (time?: number) => Promise<unknown>;
}
declare module "common/interfaces/index" {
    export type ValueOf<T> = T[keyof T];
    export interface MpMenuButtonRect {
        width: number;
        height: number;
        top: number;
        bottom: number;
        left: number;
        right: number;
    }
    export interface SystemInfo {
        devicePixelRatio: number;
        language: string;
        windowHeight: number;
        windowWidth: number;
        /**
         * 状态栏高度
         * h5环境下默认为0
         */
        statusBarHeight: number;
        /**
         * 导航栏高度：标题栏+状态栏
         * h5环境下默认为0
         */
        navBarHeight: number;
        /**
         * 小程序胶囊尺寸信息
         */
        mpMenuButtonRect?: MpMenuButtonRect;
        isMac: boolean;
        isIos: boolean;
        isWeixin: boolean;
        isAlipay: boolean;
        isApp?: boolean;
        isMp?: boolean;
        isMpWeixin?: boolean;
        isMpAlipay?: boolean;
        isMpWebWeixin?: boolean;
    }
}
declare module "system/index" {
    import { SystemInfo } from "common/interfaces/index";
    export const getSystemInfo: () => SystemInfo;
    /**
     * 拨打电话
     * @param phone 电话号码
     */
    export const makingCall: (phone: string) => Promise<any>;
    export const setPageTitle: (title: string) => void;
    /**
     * 设置导航栏背景色、前景色
     */
    export const setNavigationBarColor: (params: {
        frontColor?: string;
        backgroundColor?: string;
    }) => void;
    /**
     * 保存图片
     */
    export const saveImage: (url: string) => Promise<void>;
    /**
     * 获取当前页面url
     */
    export const getCurrentUrl: () => string;
    /**
     * 判断是否是支付宝小程序Web环境
     */
    export const isMpWebAlipay: () => Promise<boolean>;
    /**
     * 动态加载JS文件
     * @param url
     * @param props -给script标签添加属性
     * @returns 加载完成
     */
    export const loadJs: (url: string, props?: Record<string, any>) => Promise<unknown>;
}
declare module "clipboard/index" {
    /**
     * 复制/设置剪贴板内容
     * @param text 要复制到剪贴板的文本
     * @returns Promise<{text}> 复制成功进then，失败进catch
     */
    export const setClipboard: (text: string) => Promise<unknown>;
}
declare module "number/index" {
    /**
     * 四舍五入，Number.toFixed 是四舍六入五取偶
     * @param num     [待处理数字]
     * @param decimal [需要保留的小数位]
     * @param opt     {floor: 处理精度、舍入时是否向下取“整” 默认false}
     */
    export const roundNumber: (num: number | string, decimal?: number, opt?: {
        floor?: boolean;
    }) => number;
    /**
     * 给数字补齐长度
     * @param n 数字
     * @param width 位数，也就是最终字符串的长度
     * @param opt { right: 是否从右侧补, sign: 默认补0 }
     */
    export const padNumber: (n: number, width?: number, opt?: {
        right?: boolean;
        sign?: string;
    }) => string;
    /**
     * 把数字转成带单位的字符串：99->"99"，99999->"9.99万"
     * @param n 数值
     * @param opt { plusSign: 加单位后是否在末尾补加号; lang: zh|es 默认zh中文单位; decimal: 小数位数 默认lang=zh时为2，否则为1; floor: 是否向下取整 默认true }
     */
    export const unitNumber: (n: number, opt?: {
        lang?: string;
        plusSign?: boolean;
        decimal?: number;
        floor?: boolean;
    }) => string;
    /**
     * 把数字转换成三位逗号分隔的字符串(最多支持小数点三位)
     * @param n 要转化的数字
     * @returns 123,231
     */
    export const partNumber: (n: number | string) => string;
}
declare module "storage/interface" {
    export interface StorageOptions {
        /**
         * 有效期，毫秒
         */
        expired?: number;
        /**
         * 是否仅存运行时，采用 sesstionStorage
         */
        runTime?: boolean;
    }
}
declare module "storage/index" {
    import type { StorageOptions } from "storage/interface";
    /**
     * 本地存储-存
     * @param {String} k key
     * @param {any} data
     * @param {Object} options StorageOptions
     */
    export const setStorage: (k: string, data: any, options?: StorageOptions) => void;
    /**
     * 本地存储-取
     * @param {String} k key
     * @param {Object} options StorageOptions
     * @returns any
     */
    export const getStorage: (k: string, options?: StorageOptions) => any;
    /**
     * 移除某一项本地存储
     * @param k key
     * @param options StorageOptions
     */
    export const removeStorage: (k: string, options?: StorageOptions) => void;
    /**
     * 清空本地存储
     * @param options StorageOptions
     */
    export const clearStorage: (options?: StorageOptions) => void;
}
declare module "date/index" {
    /**
     * 从日期字符串获取 Date
     * @param {String} datetimeStr 日期时间 2021-12-17 02:16:16 | 2022-01-01T00:00:00+08:00
     * @returns Date
     */
    export const dateFromString: (datetimeStr: string) => Date;
    /**
     * 格式化日期
     * @param date 日期Date
     * @param opt { format: YYYY-MM-DD HH:mm:ss 目前只支持删减、改符号 }
     */
    export const formatDate: (date: Date, opt?: {
        format?: string;
    }) => string;
}
declare module "geolocation/helper" {
    /**
     * 计算两个经纬度（坐标点）之间的距离
     * @param lat1 纬度1
     * @param lng1 经度1
     * @param lat2 纬度2
     * @param lng2 经度2
     * @returns 距离/m
     */
    export const getCoordinatesDistance: (lat1: number | string, lng1: number | string, lat2: number | string, lng2: number | string) => number;
}
declare module "geolocation/index" {
    export * from "geolocation/helper";
    /**
     * 获取定位信息（经纬度）
     * @param opt -{
     *   type: wgs84-GPS坐标系 gcj02-火星坐标系;
     *   useWeixin: 是否优先使用微信jssdk 默认true;
     *   timeout: 超时时间 ms;
     *   weixinTimeout: useWeixin时超时时间 ms 默认取timeout;
     *   weixinReady: useWeixin时微信jssdk可用回调 默认取window.wx.ready;
     * }
     */
    export const getGeolocation: (opt?: {
        type?: "wgs84" | "gcj02" | undefined;
        useWeixin?: boolean | undefined;
        timeout?: number | undefined;
        weixinTimeout?: number | undefined;
        weixinReady?: ((fn: Function) => void) | undefined;
    } | undefined) => Promise<{
        accuracy: number;
        latitude: number;
        longitude: number;
        from: 'weixin' | 'browser';
        errMsg?: string | undefined;
    }>;
}
declare module "fan-utils" {
    export * from "common/index";
    export * from "system/index";
    export * from "clipboard/index";
    export * from "number/index";
    export * from "storage/index";
    export * from "date/index";
    export * from "geolocation/index";
}
