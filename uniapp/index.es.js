const S = (e, ...t) => {
  console.warn("FanUtils:", e, ...t);
}, I = typeof window < "u";
function T(e) {
  return e instanceof Promise || typeof (e == null ? void 0 : e.then) == "function";
}
const D = (e) => /^1[3-9]{1}\d{9}$/.test(e);
function v(e) {
  const t = [];
  let r = !1;
  return (...n) => new Promise(async (o, s) => {
    if (t.push({ resolve: o, reject: s }), !r) {
      r = !0;
      try {
        const i = await e(...n);
        t.forEach((c) => c.resolve(i));
      } catch (i) {
        t.forEach((c) => c.reject(i));
      }
      t.length = 0, r = !1;
    }
  });
}
function x(e) {
  return "" + ((e == null ? void 0 : e.prefix) || "") + Math.floor(Math.random() * 1e6).toString(36);
}
const L = (e, t = !1) => {
  const r = e.replace(/-(\w)/g, (n, o) => o.toUpperCase());
  return t ? `${r[0].toUpperCase()}${r.substring(1)}` : r;
}, $ = (e) => e.replace(/[A-Z]/g, (t) => "-" + t.toLowerCase());
function W(e, t = 150) {
  let r = 0;
  return function(...n) {
    const o = Date.now();
    o - r > t && (e.apply(this, n), r = o);
  };
}
function Y(e, t = 200, r = !1) {
  let n;
  return function(...o) {
    if (n && clearTimeout(n), r)
      return n = null, e.apply(this, o);
    n = setTimeout(() => e.apply(this, o), t);
  };
}
function C(e, t = 1) {
  if (t < 0)
    return e;
  const r = decodeURIComponent(e);
  if (t === 0 && r.includes("%"))
    return C(r, 0);
  const n = t - 1;
  return n <= 0 ? r : C(r, n);
}
const A = (e = 0) => new Promise((t) => {
  setTimeout(() => t(!0), e);
});
let b;
const E = () => {
  if (b)
    return b;
  let e = !0;
  const t = uni.getDeviceInfo ? { ...uni.getDeviceInfo(), ...uni.getWindowInfo(), ...uni.getAppBaseInfo() } : uni.getSystemInfoSync();
  let r = t.platform.toLowerCase().includes("mac");
  const n = t.system ? t.system.toLowerCase().includes("ios") : r;
  let o = !0, s = !1, i = !1, c = !1, a = !1, g = !1, l = !1;
  //! // #ifdef MP-ALIPAY
  o = !1, s = !0, g = !0;
  //! // #endif
  //! // #ifdef MP-WEIXIN
  a = !0;
  //! // #endif
  //! // #ifdef MP
  c = !0;
  //! // #endif
  //! // #ifdef APP-PLUS
  i = !0;
  //! // #endif
  //! // #ifdef H5
  const m = navigator.userAgent;
  r = /macintosh|mac os x/i.test(m), o = /micromessenger/.test(m.toLowerCase()), s = /alipay/.test(m.toLowerCase()), l = o && m.includes("miniProgram");
  //! // #endif
  let u = uni.getMenuButtonBoundingClientRect && uni.getMenuButtonBoundingClientRect();
  if (!u || !u.left || !u.top || !u.width || !u.height) {
    e = !1;
    let p = 0, M = 96;
    t.platform === "devtools" ? p = n ? 5.5 : 7.5 : (p = n ? 4 : 8, M = n ? 88 : 96), t.statusBarHeight || (t.statusBarHeight = t.screenHeight - t.windowHeight - 20), u = {
      width: M,
      height: 32,
      bottom: t.statusBarHeight + p + 32,
      left: t.windowWidth - M - 10,
      right: t.windowWidth - 10,
      top: t.statusBarHeight + p
    };
  }
  let w = 44;
  t.statusBarHeight ? w = t.statusBarHeight + (u.top - t.statusBarHeight) * 2 + u.height : (e = !1, w = (u.top - (t.screenHeight - t.windowHeight - 20)) * 2 + u.height, t.statusBarHeight = 0);
  const y = {
    devicePixelRatio: t.pixelRatio,
    language: t.language || "",
    windowWidth: t.windowWidth,
    windowHeight: t.windowHeight,
    statusBarHeight: t.statusBarHeight,
    navBarHeight: w,
    mpMenuButtonRect: u,
    isIos: n,
    isMac: r,
    isWeixin: o,
    isAlipay: s,
    isApp: i,
    isMp: c,
    isMpWeixin: a,
    isMpAlipay: g,
    isMpWebWeixin: l
  };
  return e && (b = y), y;
}, R = (e) => uni.makePhoneCall({ phoneNumber: e }), U = (e) => {
  e && uni.setNavigationBarTitle({ title: e });
}, z = (e) => {
  const { frontColor: t = "", backgroundColor: r = "" } = e;
  uni.setNavigationBarColor({
    frontColor: t.toLowerCase(),
    backgroundColor: r.toLowerCase()
  });
}, P = (e) => new Promise((t, r) => {
  uni.getImageInfo({
    src: e,
    success: (n) => t(n.path),
    fail: (n) => r(new Error(n.errMsg || n.errorMessage))
  });
}), H = (e) => new Promise((t, r) => {
  uni.saveImageToPhotosAlbum({
    filePath: e,
    success: (n) => t(n),
    fail: (n) => {
      const o = n.errMsg || n.errorMessage || "";
      (o.includes("deny") || o.includes("denied")) && uni.showModal({
        title: "温馨提示",
        content: "请开启相册权限后再操作",
        confirmText: "去开启",
        success: (s) => {
          s.confirm && uni.openSetting();
        }
      }), r(new Error(o));
    }
  });
}), F = async (e) => {
  e.startsWith("http://tmp/") || (e = await P(e)), await H(e);
};
function J() {
  const e = getCurrentPages();
  return e[e.length - 1].$page.fullPath;
}
function j() {
  return new Promise((e) => e(!1));
}
const k = () => new Promise((e, t) => t("不支持")), G = (e) => new Promise((t, r) => {
  uni.setClipboardData({
    data: e || "",
    success: () => t({ text: e }),
    fail: (n) => {
      r(new Error(n.errMsg || n.errorMessage || "复制失败，请手动复制"));
    }
  });
}), f = (e, t = 2, r) => {
  const n = Number(e);
  if (isNaN(n))
    return 0;
  const { floor: o } = r || {}, s = Math.pow(10, t + 1), i = Math.pow(10, t);
  return (o ? Math.floor(n * s / 10) : Math.round(n * s / 10)) / i;
}, h = (e, t = 2, r) => {
  const { right: n, sign: o = "0" } = r || {}, s = String(e);
  let i = "";
  const c = t - s.length;
  if (c > 0)
    for (let a = 0; a < c; a++)
      i += o;
  return n ? `${s}${i}` : `${i}${s}`;
}, O = (e, t) => {
  const { lang: r = "zh", plusSign: n = !1, decimal: o, floor: s = !0 } = t || {}, i = r === "zh" ? 1e4 : 1e3, c = typeof o == "number" ? o : r === "zh" ? 2 : 1;
  if (e < i) {
    if (n) {
      if (e > 1e3)
        return `${Math.floor(e / 1e3) * 1e3}+`;
      if (e > 100)
        return `${Math.floor(e / 100) * 100}+`;
    }
    return f(e, c, { floor: s }) + "";
  }
  let a;
  if (r === "zh") {
    const g = ["", "万", "亿", "万亿"], l = Math.floor(Math.log(e) / Math.log(i));
    a = f(e / Math.pow(i, l), c, { floor: s }) + g[l];
  } else
    e >= 1e6 ? a = f(e / 1e6, c, { floor: s }) + "m" : e >= 1e4 ? a = f(e / 1e4, c, { floor: s }) + "w" : a = f(e / 1e3, c, { floor: s }) + "k";
  return `${a}${n ? "+" : ""}`;
}, _ = (e) => Number(e).toLocaleString(), d = /* @__PURE__ */ new Map(), N = (e, t, r) => {
  if (!e)
    return;
  const { expired: n = 0, runTime: o } = r || {}, s = { t: Date.now(), expired: n, data: t };
  o ? d.set(e, s) : uni.setStorageSync(e, JSON.stringify(s));
}, B = (e, t) => {
  if (!e)
    return null;
  const { runTime: r, expired: n } = t || {};
  let o = r ? d.get(e) : uni.getStorageSync(e);
  if (!o)
    return o;
  if (!r)
    try {
      o = JSON.parse(o);
    } catch (i) {
      return S("Error getStorage parse..", i), o;
    }
  const s = n || o.expired;
  return s && o.t && Date.now() - o.t > s ? null : o.data;
}, q = (e, t) => {
  const { runTime: r } = t || {};
  r ? d.delete(e) : uni.removeStorageSync(e);
}, K = (e) => {
  const { runTime: t } = e || {};
  t ? d.clear() : uni.clearStorageSync();
}, Z = (e) => (e.length > 19 && (e = e.substring(0, 19).replace("T", " ")), new Date(e.replace(/-/g, "/"))), Q = (e, t) => {
  const { format: r = "YYYY-MM-DD HH:mm:ss" } = t || {}, n = e.getFullYear(), o = h(e.getMonth() + 1, 2), s = h(e.getDate(), 2), i = h(e.getHours(), 2), c = h(e.getMinutes(), 2), a = h(e.getSeconds(), 2);
  return r.replace("YYYY", `${n}`).replace("MM", o).replace("DD", s).replace("HH", i).replace("mm", c).replace("ss", a);
}, V = (e, t, r, n) => {
  if (e = Number(e), t = Number(t), r = Number(r), n = Number(n), e === r && t === n)
    return 0;
  {
    const o = Math.PI * e / 180, s = Math.PI * r / 180, i = t - n, c = Math.PI * i / 180;
    let a = Math.sin(o) * Math.sin(s) + Math.cos(o) * Math.cos(s) * Math.cos(c);
    return a > 1 && (a = 1), a = Math.acos(a), a = a * 180 / Math.PI, a = a * 60 * 1.1515 * 1609.34, Math.round(a);
  }
}, X = (e) => {
  const { type: t = "gcj02", timeout: r } = e || {};
  return new Promise((n, o) => {
    const s = "fanLastGeolocation", i = B(s, { runTime: !0 });
    if (i) {
      n(i);
      return;
    }
    uni.getLocation({
      type: t,
      highAccuracyExpireTime: r,
      success: ({ latitude: c, longitude: a, accuracy: g }) => {
        const l = { accuracy: g, latitude: Number(c), longitude: Number(a) };
        N(s, l, { runTime: !0, expired: 3e4 }), n(l);
      },
      fail: (c) => o(new Error(c.errMsg || c.errorMessage))
    });
  });
};
export {
  L as camelize,
  K as clearStorage,
  x as createUniqueId,
  Z as dateFromString,
  Y as debounce,
  C as decodeString,
  Q as formatDate,
  V as getCoordinatesDistance,
  J as getCurrentUrl,
  X as getGeolocation,
  B as getStorage,
  E as getSystemInfo,
  I as inBrowser,
  j as isMpWebAlipay,
  T as isPromiseLike,
  $ as kebabCase,
  S as libLogWarn,
  k as loadJs,
  R as makingCall,
  v as mergeConcurrent,
  h as padNumber,
  _ as partNumber,
  q as removeStorage,
  f as roundNumber,
  F as saveImage,
  G as setClipboard,
  z as setNavigationBarColor,
  U as setPageTitle,
  N as setStorage,
  A as sleep,
  W as throttle,
  O as unitNumber,
  D as validatePhoneNumber
};
